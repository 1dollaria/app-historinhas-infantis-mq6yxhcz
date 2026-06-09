import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import StoryCard from '../components/StoryCard';

export default function HomeScreen({ stories, onEdit, onDelete, onAdd }) {
  const [filter, setFilter] = useState('all');

  const filteredStories = stories.filter((story) => {
    if (filter === 'published') return story.published;
    if (filter === 'draft') return !story.published;
    return true;
  });

  const handleDelete = (id, title) => {
    Alert.alert(
      'Excluir História',
      `Tem certeza que deseja excluir "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => onDelete(id) },
      ]
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <View style={styles.bookIcon} />
      </View>
      <Text style={styles.emptyText}>Nenhuma história encontrada</Text>
      <Text style={styles.emptySubtext}>
        Comece criando sua primeira história infantil
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Historinhas Infantis</Text>
        <Text style={styles.headerSubtitle}>Gerencie suas histórias</Text>
      </View>

      <View style={styles.filterContainer}>
        <Pressable
          style={[
            styles.filterButton,
            filter === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('all')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'all' && styles.filterTextActive,
            ]}
          >
            Todas ({stories.length})
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filter === 'published' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('published')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'published' && styles.filterTextActive,
            ]}
          >
            Publicadas ({stories.filter((s) => s.published).length})
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterButton,
            filter === 'draft' && styles.filterButtonActive,
          ]}
          onPress={() => setFilter('draft')}
        >
          <Text
            style={[
              styles.filterText,
              filter === 'draft' && styles.filterTextActive,
            ]}
          >
            Rascunhos ({stories.filter((s) => !s.published).length})
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredStories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StoryCard
            story={item}
            onEdit={() => onEdit(item)}
            onDelete={() => handleDelete(item.id, item.title)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
      />

      <Pressable style={styles.fab} onPress={onAdd}>
        <View style={styles.fabIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6366f1',
    padding: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  bookIcon: {
    width: 40,
    height: 32,
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabIcon: {
    width: 24,
    height: 4,
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
});