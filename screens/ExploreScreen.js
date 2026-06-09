import React from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { STORIES } from '../data/stories';

export default function ExploreScreen({ onOpenStory }) {
  const themes = [
    { id: 'animals', label: 'Animais', color: '#ffa94d' },
    { id: 'fantasy', label: 'Fantasia', color: '#ff6b9d' },
    { id: 'nature', label: 'Natureza', color: '#00d9ff' },
    { id: 'friendship', label: 'Amizade', color: '#ffd93d' },
    { id: 'bedtime', label: 'Hora de Dormir', color: '#2c3e50' },
  ];

  const ageRanges = [
    { range: '0-2', label: '0–2 anos' },
    { range: '3-4', label: '3–4 anos' },
    { range: '5-6', label: '5–6 anos' },
  ];

  const getStoriesByTheme = (theme) => {
    return STORIES.filter((s) => s.theme === theme);
  };

  const getStoriesByAge = (ageRange) => {
    return STORIES.filter((s) => s.ageRange === ageRange);
  };

  const renderThemeCard = (theme) => {
    const stories = getStoriesByTheme(theme.id);
    return (
      <Pressable key={theme.id} style={{ marginRight: 16 }}>
        <Box
          className="w-[160px] h-[120px] rounded-3xl p-4 justify-end"
          style={{
            backgroundColor: theme.color,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Text size="lg" className="text-white font-bold">
            {theme.label}
          </Text>
          <Text size="xs" className="text-white opacity-80">
            {stories.length} {stories.length === 1 ? 'história' : 'histórias'}
          </Text>
        </Box>
      </Pressable>
    );
  };

  const renderAgeCard = (ageGroup) => {
    const stories = getStoriesByAge(ageGroup.range);
    return (
      <Pressable key={ageGroup.range} style={{ marginRight: 16 }}>
        <Box
          className="w-[140px] h-[100px] rounded-3xl p-4 justify-center items-center bg-white"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text size="xl" className="text-typography-900 font-bold mb-1">
            {ageGroup.label}
          </Text>
          <Text size="xs" className="text-typography-500">
            {stories.length} {stories.length === 1 ? 'história' : 'histórias'}
          </Text>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box className="flex-1 bg-[#fff5f7]">
      <ScrollView>
        <Box className="p-6 pt-8">
          <Heading size="2xl" className="text-typography-900 mb-2">
            Explorar 🔍
          </Heading>
          <Text size="lg" className="text-typography-600 mb-6">
            Descubra histórias por tema e idade
          </Text>

          <VStack space="lg">
            <VStack space="md">
              <Heading size="lg" className="text-typography-900">
                Temas
              </Heading>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space="md">
                  {themes.map((theme) => renderThemeCard(theme))}
                </HStack>
              </ScrollView>
            </VStack>

            <VStack space="md">
              <Heading size="lg" className="text-typography-900">
                Por Faixa Etária
              </Heading>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space="md">
                  {ageRanges.map((age) => renderAgeCard(age))}
                </HStack>
              </ScrollView>
            </VStack>

            <VStack space="md" className="mt-4">
              <Heading size="lg" className="text-typography-900">
                Todas as Histórias
              </Heading>
              {STORIES.map((story) => (
                <Pressable key={story.id} onPress={() => onOpenStory(story)}>
                  <Box
                    className="bg-white rounded-3xl p-4"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 3,
                    }}
                  >
                    <HStack className="items-center" space="md">
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          backgroundColor: '#ffa94d',
                          borderRadius: 30,
                        }}
                      />
                      <VStack space="xs" className="flex-1">
                        <Text size="md" className="font-bold text-typography-900">
                          {story.title}
                        </Text>
                        <Text size="sm" className="text-typography-600">
                          {story.ageRange} anos • {story.readingTime} min
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                </Pressable>
              ))}
            </VStack>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
