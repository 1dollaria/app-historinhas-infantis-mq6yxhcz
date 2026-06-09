import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function BottomTabBar({ currentScreen, onChangeScreen }) {
  const tabs = [
    { id: 'home', label: 'Histórias' },
    { id: 'add', label: 'Adicionar' },
    { id: 'settings', label: 'Config' },
  ];

  const renderIcon = (tabId, isActive) => {
    const iconColor = isActive ? '#6366f1' : '#9ca3af';

    if (tabId === 'home') {
      return (
        <View style={styles.iconContainer}>
          <View style={[styles.homeIcon, { backgroundColor: iconColor }]} />
        </View>
      );
    }

    if (tabId === 'add') {
      return (
        <View style={styles.iconContainer}>
          <View style={[styles.addIconH, { backgroundColor: iconColor }]} />
          <View style={[styles.addIconV, { backgroundColor: iconColor }]} />
        </View>
      );
    }

    if (tabId === 'settings') {
      return (
        <View style={styles.iconContainer}>
          <View style={[styles.settingsIcon, { borderColor: iconColor }]} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <Pressable
            key={tab.id}
            style={styles.tab}
            onPress={() => onChangeScreen(tab.id)}
          >
            {renderIcon(tab.id, isActive)}
            <Text
              style={[
                styles.tabLabel,
                isActive && styles.tabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  homeIcon: {
    width: 20,
    height: 16,
    borderRadius: 2,
  },
  addIconH: {
    position: 'absolute',
    width: 16,
    height: 3,
    borderRadius: 1.5,
  },
  addIconV: {
    position: 'absolute',
    width: 3,
    height: 16,
    borderRadius: 1.5,
  },
  settingsIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2.5,
  },
  tabLabel: {
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#6366f1',
    fontWeight: '600',
  },
});