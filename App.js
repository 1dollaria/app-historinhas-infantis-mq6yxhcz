import './global.css';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import LibraryScreen from './screens/LibraryScreen';
import ReaderScreen from './screens/ReaderScreen';
import ExploreScreen from './screens/ExploreScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ParentsScreen from './screens/ParentsScreen';
import CustomTabBar from './components/CustomTabBar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('library');
  const [selectedStory, setSelectedStory] = useState(null);
  const [favorites, setFavorites] = useState(['1', '3', '5']);
  const [childName, setChildName] = useState('Sofia');
  const [childAge, setChildAge] = useState('4');
  const [readingTimeToday, setReadingTimeToday] = useState(12);
  const [settings, setSettings] = useState({
    fontSize: 'medium',
    nightMode: false,
    sounds: true,
  });

  const toggleFavorite = (storyId) => {
    setFavorites((prev) =>
      prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId]
    );
  };

  const openStory = (story) => {
    setSelectedStory(story);
    setCurrentScreen('reader');
  };

  const closeReader = () => {
    setSelectedStory(null);
    setCurrentScreen('library');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'library':
        return (
          <LibraryScreen
            onOpenStory={openStory}
            favorites={favorites}
            childName={childName}
          />
        );
      case 'reader':
        return (
          <ReaderScreen
            story={selectedStory}
            onClose={closeReader}
            isFavorite={favorites.includes(selectedStory?.id)}
            onToggleFavorite={() => toggleFavorite(selectedStory?.id)}
          />
        );
      case 'explore':
        return <ExploreScreen onOpenStory={openStory} />;
      case 'favorites':
        return (
          <FavoritesScreen
            favorites={favorites}
            onOpenStory={openStory}
          />
        );
      case 'parents':
        return (
          <ParentsScreen
            childName={childName}
            childAge={childAge}
            readingTimeToday={readingTimeToday}
            settings={settings}
            onUpdateChildName={setChildName}
            onUpdateChildAge={setChildAge}
            onUpdateSettings={setSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        {renderScreen()}
        {currentScreen !== 'reader' && (
          <CustomTabBar
            currentScreen={currentScreen}
            onChangeScreen={setCurrentScreen}
          />
        )}
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5f7',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});
