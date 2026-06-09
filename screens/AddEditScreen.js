import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Pressable,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function AddEditScreen({ story, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setAuthor(story.author);
      setAgeRange(story.ageRange);
      setCategory(story.category);
      setDescription(story.description);
      setPublished(story.published);
    }
  }, [story]);

  const handleSave = () => {
    if (!title.trim()) {
      return;
    }

    const storyData = {
      ...(story || {}),
      title: title.trim(),
      author: author.trim(),
      ageRange: ageRange.trim(),
      category: category.trim(),
      description: description.trim(),
      published,
    };

    onSave(storyData);
  };

  const categories = ['Aventura', 'Fantasia', 'Clássico', 'Educativo', 'Fábula'];
  const ageRanges = ['0-3 anos', '3-6 anos', '4-8 anos', '6-10 anos', '8-12 anos'];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Pressable onPress={onCancel} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Cancelar</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {story ? 'Editar História' : 'Nova História'}
        </Text>
        <Pressable onPress={handleSave} style={styles.headerButton}>
          <Text style={[styles.headerButtonText, styles.saveButton]}>
            Salvar
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título da história"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Autor</Text>
          <TextInput
            style={styles.input}
            value={author}
            onChangeText={setAuthor}
            placeholder="Nome do autor"
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Faixa Etária</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
            {ageRanges.map((range) => (
              <Pressable
                key={range}
                style={[
                  styles.chip,
                  ageRange === range && styles.chipActive,
                ]}
                onPress={() => setAgeRange(range)}
              >
                <Text
                  style={[
                    styles.chipText,
                    ageRange === range && styles.chipTextActive,
                  ]}
                >
                  {range}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Categoria</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipContainer}>
            {categories.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.chip,
                  category === cat && styles.chipActive,
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={[
                    styles.chipText,
                    category === cat && styles.chipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Descreva a história..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.switchSection}>
          <View style={styles.switchLabelContainer}>
            <Text style={styles.label}>Publicar história</Text>
            <Text style={styles.switchDescription}>
              Tornar visível para os usuários
            </Text>
          </View>
          <Switch
            value={published}
            onValueChange={setPublished}
            trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
            thumbColor={published ? '#6366f1' : '#f3f4f6'}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerButton: {
    padding: 8,
    minWidth: 70,
  },
  headerButtonText: {
    fontSize: 16,
    color: '#6b7280',
  },
  saveButton: {
    color: '#6366f1',
    fontWeight: '600',
    textAlign: 'right',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  chipContainer: {
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  chipText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  switchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  switchLabelContainer: {
    flex: 1,
  },
  switchDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
});