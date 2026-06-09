import React from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { STORIES } from '../data/stories';

export default function LibraryScreen({ onOpenStory, favorites, childName }) {
  const ageGroups = [
    { range: '0-2', label: '0–2 anos' },
    { range: '3-4', label: '3–4 anos' },
    { range: '5-6', label: '5–6 anos' },
  ];

  const getStoriesByAge = (ageRange) => {
    return STORIES.filter((s) => s.ageRange === ageRange);
  };

  const renderStoryCard = (story) => {
    const gradients = [
      ['#ff6b9d', '#ffa94d'],
      ['#ffa94d', '#ffd93d'],
      ['#00d9ff', '#ff6b9d'],
      ['#ffd93d', '#00d9ff'],
    ];
    const gradient = gradients[parseInt(story.id) % gradients.length];

    return (
      <Pressable
        key={story.id}
        onPress={() => onOpenStory(story)}
        style={{ marginRight: 16 }}
      >
        <Box
          className="w-[200px] rounded-3xl overflow-hidden"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Box
            className="h-[140px] p-4 justify-center items-center"
            style={{
              backgroundColor: gradient[0],
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: gradient[1],
                borderRadius: 30,
                opacity: 0.7,
              }}
            />
            <View
              style={{
                position: 'absolute',
                width: 40,
                height: 40,
                backgroundColor: '#fff',
                borderRadius: 20,
                top: 30,
                right: 30,
                opacity: 0.5,
              }}
            />
          </Box>
          <Box className="bg-white p-4">
            <Text size="md" className="font-bold text-typography-900 mb-1">
              {story.title}
            </Text>
            <HStack space="xs" className="mb-2">
              <Badge action="info" className="rounded-full">
                <BadgeText size="xs">{story.ageRange} anos</BadgeText>
              </Badge>
              <Badge action="muted" className="rounded-full">
                <BadgeText size="xs">{story.readingTime} min</BadgeText>
              </Badge>
            </HStack>
          </Box>
        </Box>
      </Pressable>
    );
  };

  const favoriteStories = STORIES.filter((s) => favorites.includes(s.id));

  return (
    <Box className="flex-1 bg-[#fff5f7]">
      <ScrollView>
        <Box className="p-6 pt-8">
          <Heading size="2xl" className="text-typography-900 mb-2">
            Olá{childName ? `, ${childName}` : ''}! 👋
          </Heading>
          <Text size="lg" className="text-typography-600 mb-6">
            Que história vamos ler hoje?
          </Text>

          {favoriteStories.length > 0 && (
            <VStack space="md" className="mb-8">
              <Heading size="lg" className="text-typography-900">
                Suas Favoritas ⭐
              </Heading>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <HStack space="md">
                  {favoriteStories.map((story) => renderStoryCard(story))}
                </HStack>
              </ScrollView>
            </VStack>
          )}

          {ageGroups.map((group) => {
            const stories = getStoriesByAge(group.range);
            if (stories.length === 0) return null;

            return (
              <VStack key={group.range} space="md" className="mb-8">
                <Heading size="lg" className="text-typography-900">
                  {group.label}
                </Heading>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <HStack space="md">
                    {stories.map((story) => renderStoryCard(story))}
                  </HStack>
                </ScrollView>
              </VStack>
            );
          })}

          {favoriteStories.length === 0 && (
            <Box className="items-center justify-center py-12">
              <View
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#ffd93d',
                  borderRadius: 40,
                  marginBottom: 16,
                }}
              />
              <Text size="lg" className="text-typography-700 font-semibold mb-2">
                Nenhum favorito ainda
              </Text>
              <Text size="sm" className="text-typography-500 text-center px-8">
                Toque no coração durante a leitura para salvar suas histórias preferidas!
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
