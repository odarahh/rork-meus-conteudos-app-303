import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Heart, Star, MoreVertical, X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface CardMenuProps {
  courseTitle: string;
  onFavorite: () => void;
  onStar: () => void;
  isFavorited?: boolean;
  isStarred?: boolean;
}

const CardMenu: React.FC<CardMenuProps> = ({ 
  courseTitle, 
  onFavorite, 
  onStar, 
  isFavorited = false, 
  isStarred = false 
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { isDark } = useTheme();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleFavorite = () => {
    onFavorite();
    setMenuVisible(false);
  };

  const handleStar = () => {
    onStar();
    setMenuVisible(false);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton} testID="card-menu-button">
        <MoreVertical color={isDark ? '#FFFFFF' : '#000000'} size={20} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={closeMenu}
        >
          <View style={[styles.menuContainer, { backgroundColor: isDark ? '#1F1F1F' : '#FFFFFF' }]}>
            {/* Header with title and close button */}
            <View style={styles.menuHeader}>
              <Text style={[styles.menuTitle, { color: isDark ? '#FFFFFF' : '#000000' }]} numberOfLines={2}>
                {courseTitle}
              </Text>
              <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                <X color={isDark ? '#FFFFFF' : '#000000'} size={20} />
              </TouchableOpacity>
            </View>
            
            {/* Subtitle */}
            <Text style={[styles.menuSubtitle, { color: isDark ? '#AAAAAA' : '#666666' }]}>
              Escolha uma das opções disponíveis para este curso
            </Text>
            
            {/* Menu options */}
            <View style={styles.menuOptions}>
              <TouchableOpacity 
                style={[styles.menuItem, { borderBottomColor: isDark ? '#333333' : '#E5E5E5' }]} 
                onPress={handleFavorite}
                activeOpacity={0.7}
              >
                <Heart 
                  color="#EC4899" 
                  size={20} 
                  fill={isFavorited ? '#EC4899' : 'transparent'}
                />
                <Text style={[styles.menuText, { color: '#EC4899' }]}>
                  {isFavorited ? 'Desfavoritar' : 'Favoritar'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={handleStar}
                activeOpacity={0.7}
              >
                <Star 
                  color="#EC4899" 
                  size={20} 
                  fill={isStarred ? '#EC4899' : 'transparent'}
                />
                <Text style={[styles.menuText, { color: '#EC4899' }]}>
                  {isStarred ? 'Remover Avaliação' : 'Avaliar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  menuContainer: {
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  closeButton: {
    padding: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  menuOptions: {
    gap: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CardMenu;