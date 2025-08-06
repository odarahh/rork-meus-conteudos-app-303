import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, Award, MoreVertical } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import ProgressBar from './ProgressBar';

export interface ContentCardProps {
  title: string;
  imageUri: string;
  deadline: string;
  currentProgress: number;
  totalLessons: number;
  progressPercentage: number;
  progressColor?: string;
  isCompleted?: boolean;
  isFavorited?: boolean;
  isStarred?: boolean;
  onAccessPress: () => void;
  onFavoritePress: () => void;
  onStarPress: () => void;
  onMenuPress: () => void;
  onCertificatePress?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  imageUri,
  deadline,
  currentProgress,
  totalLessons,
  progressColor = '#EC4899',
  isCompleted = false,
  isFavorited = false,
  isStarred = false,
  onAccessPress,
  onFavoritePress,
  onStarPress,
  onMenuPress,
  onCertificatePress,
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
          <TouchableOpacity onPress={onMenuPress} style={styles.menuButton} testID="card-menu-button">
            <MoreVertical color={isDark ? '#FFFFFF' : '#000000'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      
      {!isCompleted ? (
        <>
          <View style={styles.progressBarContainer}>
            <ProgressBar 
              current={currentProgress} 
              total={totalLessons} 
              color={progressColor}
            />
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
        </>
      ) : (
        <View style={styles.completedContainer}>
          <Text style={[styles.completedText, { color: progressColor }]}>Concluído</Text>
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.accessButton, { backgroundColor: isDark ? '#333333' : '#E5E5E5' }]} 
        onPress={onAccessPress}
        activeOpacity={0.7}
        testID="access-button"
      >
        <Text style={[styles.accessButtonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Acessar</Text>
      </TouchableOpacity>
      
      {isCompleted && onCertificatePress && (
        <TouchableOpacity 
          style={[styles.certificateButton, { backgroundColor: isDark ? '#333333' : '#E5E5E5' }]} 
          onPress={onCertificatePress}
          activeOpacity={0.7}
          testID="certificate-button"
        >
          <View style={styles.certificateButtonContent}>
            <Award color={isDark ? '#FFFFFF' : '#000000'} size={16} />
            <Text style={[styles.certificateButtonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Emitir certificado</Text>
          </View>
        </TouchableOpacity>
      )}
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
    marginBottom: 0,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  menuContainer: {
    marginLeft: 8,
  },
  menuButton: {
    padding: 4,
  },
  progressBarContainer: {
    marginLeft: 62,
    marginBottom: 4,
    marginTop: -2,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 62,
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
  completedContainer: {
    marginLeft: 62,
    marginBottom: 8,
    marginTop: -2,
  },
  completedText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  certificateButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  certificateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ContentCard;