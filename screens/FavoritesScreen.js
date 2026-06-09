import React from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Badge, BadgeText } from '@/components/ui/badge';
import { STORIES } from '../data/stories';

export default function FavoritesScreen({ favorites, onOpenStory }) {
  const favoriteStories = STORIES.filter((s) => favorites.includes(s.id));

  const renderStoryCard = (story) => {
    const gradients = [
      ['#ff6b9d', '#ffa94d'],
      ['#ffa94d', '#ffd93d'],
      ['#00d9ff', '#ff6b9d'],
      ['#ffd93d', '#00d9ff'],
    ];
    const gradient = gradients[parseInt(story.id) % gradients.length];

    return (
      <Pressable key={story.id} onPress={() => onOpenStory(story)}>
        <Box
          className="rounded-3xl overflow-hidden mb-4"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <HStack>
            <Box
              className="w-[120px] h-[120px] justify-center items-center"
              style={{
                backgroundColor: gradient[0],
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: gradient[1],
                  borderRadius: 25,
                  opacity: 0.7,
                }}
              />
            </Box>
            <Box className="flex-1 bg-white p-4 justify-center">
              <Text size="lg" className="font-bold text-typography-900 mb-2">
                {story.title}
              </Text>
              <HStack space="xs">
                <Badge action="info" className="rounded-full">
                  <BadgeText size="xs">{story.ageRange} anos</BadgeText>
                </Badge>
                <Badge action="muted" className="rounded-full">
                  <BadgeText size="xs">{story.readingTime} min</BadgeText>
                </Badge>
              </HStack>
            </Box>
          </HStack>
        </Box>
      </Pressable>
    );
  };

  return (
    <Box className="flex-1 bg-[#fff5f7]">
      <ScrollView>
        <Box className="p-6 pt-8">
          <Heading size="2xl" className="text-typography-900 mb-2">
            Favoritos ⭐
          </Heading>
          <Text size="lg" className="text-typography-600 mb-6">
            Suas histórias salvas
          </Text>

          {favoriteStories.length > 0 ? (
            <VStack space="md">
              {favoriteStories.map((story) => renderStoryCard(story))}
            </VStack>
          ) : (
            <Box className="items-center justify-center py-16">
              <View
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: '#ffd93d',
                  borderRadius: 50,
                  marginBottom: 20,
                }}
              />
              <Heading size="lg" className="text-typography-900 mb-2">
                Nenhum favorito ainda
              </Heading>
              <Text size="md" className="text-typography-500 text-center px-8">
                Toque no coração durante a leitura para salvar suas histórias preferidas aqui!
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    </Box>
  );
}
