import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Header from './Header';
import ContentCard from './ContentCard';
import ContentMenu from './ContentMenu';
import { courseData } from '@/mocks/courseData';

const MyContentScreen: React.FC = () => {
  const { isDark } = useTheme();
  const [favoritedCourses, setFavoritedCourses] = useState<Set<string>>(new Set());
  const [starredCourses, setStarredCourses] = useState<Set<string>>(new Set());
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const handleAccessPress = (courseId: string) => {
    console.log(`Accessing course: ${courseId}`);
  };

  const handleFavoritePress = (courseId: string) => {
    setFavoritedCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
        console.log(`Removed course from favorites: ${courseId}`);
      } else {
        newSet.add(courseId);
        console.log(`Added course to favorites: ${courseId}`);
      }
      return newSet;
    });
  };

  const handleStarPress = (courseId: string) => {
    setStarredCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
        console.log(`Removed star from course: ${courseId}`);
      } else {
        newSet.add(courseId);
        console.log(`Starred course: ${courseId}`);
      }
      return newSet;
    });
  };

  const handleCertificatePress = (courseId: string) => {
    console.log(`Emitting certificate for course: ${courseId}`);
  };

  const handleMenuPress = (courseId: string) => {
    setSelectedCourse(courseId);
    setMenuVisible(true);
    console.log(`Opening menu for course: ${courseId}`);
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
    setSelectedCourse(null);
  };

  const handleMenuFavorite = () => {
    if (selectedCourse) {
      handleFavoritePress(selectedCourse);
    }
  };

  const handleMenuStar = () => {
    if (selectedCourse) {
      handleStarPress(selectedCourse);
    }
  };

  const selectedCourseData = selectedCourse ? courseData.find(course => course.id === selectedCourse) : null;

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <Header title="Meus conteúdos" />
      
      <FlatList
        data={courseData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ContentCard
            title={item.title}
            imageUri={item.imageUri}
            deadline={item.deadline}
            currentProgress={item.currentProgress}
            totalLessons={item.totalLessons}
            progressPercentage={(item.currentProgress / item.totalLessons) * 100}
            progressColor={item.progressColor}
            isCompleted={item.isCompleted}
            isFavorited={favoritedCourses.has(item.id)}
            isStarred={starredCourses.has(item.id)}
            onAccessPress={() => handleAccessPress(item.id)}
            onFavoritePress={() => handleFavoritePress(item.id)}
            onStarPress={() => handleStarPress(item.id)}
            onMenuPress={() => handleMenuPress(item.id)}
            onCertificatePress={() => handleCertificatePress(item.id)}
          />
        )}
        testID="course-list"
      />
      
      {selectedCourseData && (
        <ContentMenu
          visible={menuVisible}
          courseTitle={selectedCourseData.title}
          onClose={handleMenuClose}
          onFavorite={handleMenuFavorite}
          onStar={handleMenuStar}
          isFavorited={favoritedCourses.has(selectedCourse!)}
          isStarred={starredCourses.has(selectedCourse!)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});

export default MyContentScreen;