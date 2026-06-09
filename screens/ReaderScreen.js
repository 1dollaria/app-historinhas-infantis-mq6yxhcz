import React, { useState } from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Button, ButtonText } from '@/components/ui/button';

export default function ReaderScreen({ story, onClose, isFavorite, onToggleFavorite }) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!story) return null;

  const totalPages = story.pages.length;
  const isLastPage = currentPage === totalPages - 1;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const restart = () => {
    setCurrentPage(0);
  };

  const renderIllustration = () => {
    const colors = ['#ff6b9d', '#ffa94d', '#ffd93d', '#00d9ff'];
    const shapes = [];
    for (let i = 0; i < 4; i++) {
      const size = 40 + Math.random() * 60;
      const top = Math.random() * 120;
      const left = Math.random() * 200;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const isCircle = Math.random() > 0.5;
      shapes.push(
        <View
          key={i}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: isCircle ? size / 2 : 16,
            top,
            left,
            opacity: 0.7,
          }}
        />
      );
    }
    return shapes;
  };

  return (
    <Box className="flex-1 bg-white">
      <Box className="p-4 border-b border-outline-200">
        <HStack className="items-center justify-between">
          <Pressable onPress={onClose}>
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: '#f3f4f6',
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 12,
                  height: 2,
                  backgroundColor: '#6b7280',
                  transform: [{ rotate: '45deg' }],
                  position: 'absolute',
                }}
              />
              <View
                style={{
                  width: 12,
                  height: 2,
                  backgroundColor: '#6b7280',
                  transform: [{ rotate: '-45deg' }],
                  position: 'absolute',
                }}
              />
            </View>
          </Pressable>
          <Text size="sm" className="text-typography-700 font-semibold">
            {story.title}
          </Text>
          <Pressable onPress={onToggleFavorite}>
            <View
              style={{
                width: 32,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 18,
                  position: 'relative',
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    width: 10,
                    height: 10,
                    backgroundColor: isFavorite ? '#ff6b9d' : '#d1d5db',
                    borderRadius: 10,
                    top: 0,
                    left: 0,
                    transform: [{ rotate: '45deg' }],
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: 10,
                    height: 10,
                    backgroundColor: isFavorite ? '#ff6b9d' : '#d1d5db',
                    borderRadius: 10,
                    top: 0,
                    right: 0,
                    transform: [{ rotate: '45deg' }],
                  }}
                />
                <View
                  style={{
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: 10,
                    borderRightWidth: 10,
                    borderTopWidth: 14,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderTopColor: isFavorite ? '#ff6b9d' : '#d1d5db',
                    bottom: 0,
                    left: 0,
                  }}
                />
              </View>
            </View>
          </Pressable>
        </HStack>
      </Box>

      <ScrollView className="flex-1">
        <Box className="p-6">
          <Box
            className="rounded-3xl mb-6 overflow-hidden"
            style={{
              height: 240,
              backgroundColor: '#fff5f7',
              position: 'relative',
            }}
          >
            {renderIllustration()}
          </Box>

          {!isLastPage ? (
            <VStack space="lg">
              <Text
                size="xl"
                className="text-typography-900 leading-9"
                style={{ lineHeight: 36 }}
              >
                {story.pages[currentPage]}
              </Text>
            </VStack>
          ) : (
            <VStack space="lg" className="items-center py-8">
              <Heading size="2xl" className="text-typography-900">
                Fim 🌙
              </Heading>
              <Text size="lg" className="text-typography-600 text-center">
                Gostou da história?
              </Text>
              <Button
                onPress={restart}
                className="bg-[#ff6b9d] rounded-3xl px-8 py-4 mt-4"
              >
                <ButtonText size="lg" className="font-bold">
                  Ler de novo
                </ButtonText>
              </Button>
            </VStack>
          )}
        </Box>
      </ScrollView>

      {!isLastPage && (
        <Box className="p-6 border-t border-outline-200">
          <VStack space="md">
            <HStack className="justify-center" space="xs">
              {Array.from({ length: totalPages }).map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: i === currentPage ? 12 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: i === currentPage ? '#ff6b9d' : '#d1d5db',
                  }}
                />
              ))}
            </HStack>
            <HStack space="md">
              <Button
                onPress={prevPage}
                isDisabled={currentPage === 0}
                className="flex-1 bg-background-100 rounded-3xl py-4"
              >
                <ButtonText
                  size="lg"
                  className={currentPage === 0 ? 'text-typography-400' : 'text-typography-900'}
                >
                  ◀ Anterior
                </ButtonText>
              </Button>
              <Button
                onPress={nextPage}
                className="flex-1 bg-[#ff6b9d] rounded-3xl py-4"
              >
                <ButtonText size="lg" className="font-bold">
                  Próxima ▶
                </ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
