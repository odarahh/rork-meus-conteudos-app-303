import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Sun, Menu } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const router = useRouter();
  const { toggleTheme, isDark } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
        testID="back-button"
      >
        <ArrowLeft color={isDark ? '#FFFFFF' : '#000000'} size={24} />
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>{title}</Text>
      
      <View style={styles.rightButtons}>
        <TouchableOpacity 
          style={styles.themeButton} 
          onPress={toggleTheme}
          testID="theme-toggle"
        >
          <Sun color={isDark ? '#FFFFFF' : '#000000'} size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuButton} testID="menu-button">
          <Menu color={isDark ? '#FFFFFF' : '#000000'} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeButton: {
    padding: 8,
    marginRight: 8,
  },
  menuButton: {
    padding: 8,
  },
});

export default Header;