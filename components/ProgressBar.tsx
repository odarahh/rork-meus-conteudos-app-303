import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current, 
  total, 
  color = '#EC4899' 
}) => {
  const { isDark } = useTheme();
  const percentage = Math.round((current / total) * 100);
  
  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { backgroundColor: isDark ? '#333333' : '#E5E5E5' }]}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.progressText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
          {current}/{total}
        </Text>
        <Text style={[styles.percentageText, { color }]}>
          • {percentage}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
  textContainer: {
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
});

export default ProgressBar;