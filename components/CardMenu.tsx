import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Heart, Star, MoreVertical } from 'lucide-react-native';

interface CardMenuProps {
  onFavorite: () => void;
  onStar: () => void;
}

const CardMenu: React.FC<CardMenuProps> = ({ onFavorite, onStar }) => {
  const [menuVisible, setMenuVisible] = useState(false);

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

  return (
    <View>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton} testID="card-menu-button">
        <MoreVertical color="#FFFFFF" size={20} />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={handleFavorite}>
              <Heart color="#FFFFFF" size={20} />
              <Text style={styles.menuText}>Adicionar aos favoritos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={handleStar}>
              <Star color="#FFFFFF" size={20} />
              <Text style={styles.menuText}>Favoritar</Text>
            </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 8,
    width: '80%',
    maxWidth: 300,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuText: {
    color: '#FFFFFF',
    marginLeft: 12,
    fontSize: 16,
  },
});

export default CardMenu;