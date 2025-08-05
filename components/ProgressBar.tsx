import React from 'react';
import { StyleSheet, View } from 'react-native';
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  progressContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ProgressBar;