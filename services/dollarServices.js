// DollarServices (nativo) — CRUD genérico + realtime sobre as tabelas do Supabase
// do projeto. Mesma API do web, adaptada pra React Native (import relativo, JS).
//
// Uso:
//   import { createDataService } from '../services/dollarServices';
//   const tasks = createDataService('tasks');
//   const rows = await tasks.findMany({ orderBy: { column: 'created_at', ascending: false }, limit: 50 });
//   const unsub = tasks.subscribe((payload) => { /* atualiza a lista em tempo real */ });

import { supabase } from '../lib/supabaseClient';

export class UniversalDataService {
  constructor(tableName) {
    this.tableName = tableName;
  }

  async findMany(options = {}) {
    let query = supabase.from(this.tableName).select(options.select || '*');
    if (options.filters) {
      for (const [key, value] of Object.entries(options.filters)) {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      }
    }
    if (options.orderBy) {
      query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending !== false });
    }
    if (options.limit) query = query.limit(options.limit);
    if (options.offset) query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async findOne(options = {}) {
    const rows = await this.findMany(options);
    return rows.length > 0 ? rows[0] : null;
  }

  async findById(id) {
    return this.findOne({ filters: { id } });
  }

  async findByUserId(userId, options = {}) {
    return this.findMany({ ...options, filters: { user_id: userId } });
  }

  async create(data) {
    const { data: result, error } = await supabase.from(this.tableName).insert(data).select().single();
    if (error) throw error;
    return result;
  }

  async update(id, data) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return result;
  }

  async delete(id) {
    const { error } = await supabase.from(this.tableName).delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  async count(filters = {}) {
    let query = supabase.from(this.tableName).select('*', { count: 'exact', head: true });
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) query = query.eq(key, value);
    }
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  /**
   * Realtime: assina INSERT/UPDATE/DELETE da tabela. Retorna uma função pra cancelar.
   *   useEffect(() => tasks.subscribe(() => reload()), []);
   */
  subscribe(onChange) {
    const channel = supabase
      .channel(`rt-${this.tableName}-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: this.tableName }, (payload) => {
        onChange?.(payload);
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }
}

export function createDataService(tableName) {
  return new UniversalDataService(tableName);
}

// Alias: const db = DollarServices('tabela'); await db.findMany(...)
export { createDataService as DollarServices };
