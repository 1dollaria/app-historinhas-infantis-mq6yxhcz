import React from 'react';
import { View, Pressable } from 'react-native';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';

export default function CustomTabBar({ currentScreen, onChangeScreen }) {
  const tabs = [
    { id: 'library', label: 'Início' },
    { id: 'explore', label: 'Explorar' },
    { id: 'favorites', label: 'Favoritos' },
    { id: 'parents', label: 'Pais' },
  ];

  const renderIcon = (tabId, isActive) => {
    const color = isActive ? '#ff6b9d' : '#9ca3af';

    if (tabId === 'library') {
      return (
        <View
          style={{
            width: 24,
            height: 24,
            backgroundColor: color,
            borderRadius: 12,
          }}
        />
      );
    }

    if (tabId === 'explore') {
      return (
        <View style={{ width: 24, height: 24, position: 'relative' }}>
          <View
            style={{
              position: 'absolute',
              width: 18,
              height: 18,
              backgroundColor: color,
              borderRadius: 9,
              top: 0,
              left: 3,
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              backgroundColor: color,
              borderRadius: 6,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      );
    }

    if (tabId === 'favorites') {
      return (
        <View
          style={{
            width: 24,
            height: 22,
            position: 'relative',
          }}
        >
          <View
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              backgroundColor: color,
              borderRadius: 12,
              top: 0,
              left: 0,
              transform: [{ rotate: '45deg' }],
            }}
          />
          <View
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              backgroundColor: color,
              borderRadius: 12,
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
              borderLeftWidth: 12,
              borderRightWidth: 12,
              borderTopWidth: 16,
              borderLeftColor: 'transparent',
              borderRightColor: 'transparent',
              borderTopColor: color,
              bottom: 0,
              left: 0,
            }}
          />
        </View>
      );
    }

    if (tabId === 'parents') {
      return (
        <View style={{ width: 24, height: 24 }}>
          <View
            style={{
              width: 14,
              height: 14,
              backgroundColor: color,
              borderRadius: 7,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              width: 24,
              height: 10,
              backgroundColor: color,
              borderRadius: 12,
              marginTop: 2,
            }}
          />
        </View>
      );
    }
  };

  return (
    <HStack
      className="bg-white border-t border-outline-200 pb-2 pt-3 px-2"
      space="xs"
    >
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <Pressable
            key={tab.id}
            onPress={() => onChangeScreen(tab.id)}
            style={{ flex: 1, alignItems: 'center' }}
          >
            <VStack space="xs" className="items-center">
              {renderIcon(tab.id, isActive)}
              <Text
                size="xs"
                className={isActive ? 'text-[#ff6b9d] font-semibold' : 'text-typography-500'}
              >
                {tab.label}
              </Text>
            </VStack>
          </Pressable>
        );
      })}
    </HStack>
  );
}
