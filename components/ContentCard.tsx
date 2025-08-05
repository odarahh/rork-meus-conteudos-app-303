import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import ProgressBar from './ProgressBar';
import CardMenu from './CardMenu';

export interface ContentCardProps {
  title: string;
  imageUri: string;
  deadline: string;
  currentProgress: number;
  totalLessons: number;
  progressPercentage: number;
  progressColor?: string;
  onAccessPress: () => void;
  onFavoritePress: () => void;
  onStarPress: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  imageUri,
  deadline,
  currentProgress,
  totalLessons,
  progressColor = '#EC4899',
  onAccessPress,
  onFavoritePress,
  onStarPress,
}) => {
  const { isDark } = useTheme();
  
  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]} testID="content-card">
      <View style={styles.topRow}>
        <Image source={{ uri: imageUri }} style={styles.thumbnail} />
        
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]} numberOfLines={2}>{title}</Text>
        </View>
        
        <View style={styles.menuContainer}>
          <CardMenu 
            onFavorite={onFavoritePress}
            onStar={onStarPress}
          />
        </View>
      </View>
      
      <View style={styles.secondRow}>
        <View style={styles.deadlineContainer}>
          <Calendar color={isDark ? '#AAAAAA' : '#666666'} size={16} />
          <Text style={[styles.deadlineText, { color: isDark ? '#AAAAAA' : '#666666' }]}>até {deadline}</Text>
        </View>
        
        <View style={styles.progressInfo}>
          <Text style={[styles.progressText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            {currentProgress}/{totalLessons}
          </Text>
          <Text style={[styles.percentageText, { color: progressColor }]}>
            • {Math.round((currentProgress / totalLessons) * 100)}%
          </Text>
        </View>
      </View>
      
      <ProgressBar 
        current={currentProgress} 
        total={totalLessons} 
        color={progressColor}
      />
      
      <TouchableOpacity 
        style={[styles.accessButton, { backgroundColor: isDark ? '#333333' : '#E5E5E5' }]} 
        onPress={onAccessPress}
        activeOpacity={0.7}
        testID="access-button"
      >
        <Text style={[styles.accessButtonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginLeft: 8,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 72,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineText: {
    marginLeft: 4,
    fontSize: 14,
  },
  progressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
  },
  percentageText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  accessButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  accessButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContentCard;