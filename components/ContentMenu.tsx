import React, { useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import { Heart, Star, X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

interface ContentMenuProps {
  visible: boolean;
  courseTitle: string;
  onClose: () => void;
  onFavorite: () => void;
  onStar: () => void;
  isFavorited?: boolean;
  isStarred?: boolean;
}

const MENU_HEIGHT = 280;
const DRAG_THRESHOLD = 50;

const ContentMenu: React.FC<ContentMenuProps> = ({
  visible,
  courseTitle,
  onClose,
  onFavorite,
  onStar,
  isFavorited = false,
  isStarred = false,
}) => {
  const { isDark } = useTheme();
  const translateY = useRef(new Animated.Value(MENU_HEIGHT)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const currentTranslateY = useRef(MENU_HEIGHT);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        translateY.setOffset(currentTranslateY.current);
        translateY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        translateY.flattenOffset();
        
        if (gestureState.dy > DRAG_THRESHOLD || gestureState.vy > 0.5) {
          closeMenu();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: Platform.OS !== 'web',
            tension: 100,
            friction: 8,
          }).start(() => {
            currentTranslateY.current = 0;
          });
        }
      },
    })
  ).current;

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.spring(translateY, {
        toValue: MENU_HEIGHT,
        useNativeDriver: Platform.OS !== 'web',
        tension: 100,
        friction: 8,
      }),
    ]).start(() => {
      currentTranslateY.current = MENU_HEIGHT;
      onClose();
    });
  };

  useEffect(() => {
    if (visible) {
      const openMenu = () => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: Platform.OS !== 'web',
            tension: 100,
            friction: 8,
          }),
        ]).start(() => {
          currentTranslateY.current = 0;
        });
      };
      openMenu();
    } else {
      translateY.setValue(MENU_HEIGHT);
      opacity.setValue(0);
      currentTranslateY.current = MENU_HEIGHT;
    }
  }, [visible, translateY, opacity]);

  const handleFavorite = () => {
    onFavorite();
    closeMenu();
  };

  const handleStar = () => {
    onStar();
    closeMenu();
  };

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={closeMenu}
    >
      <Animated.View style={[styles.overlay, { opacity }]}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={closeMenu}
        />
        
        <Animated.View
          style={[
            styles.menuContainer,
            {
              backgroundColor: isDark ? '#1F1F1F' : '#2A2A2A',
              transform: [{ translateY }],
            },
          ]}
          {...(Platform.OS !== 'web' ? panResponder.panHandlers : {})}
        >
          {/* Drag indicator */}
          <View style={styles.dragIndicator} />
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: '#FFFFFF' }]} numberOfLines={2}>
              {courseTitle}
            </Text>
            <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
              <X color="#FFFFFF" size={20} />
            </TouchableOpacity>
          </View>
          
          {/* Subtitle */}
          <Text style={[styles.subtitle, { color: '#AAAAAA' }]}>
            Escolha uma das opções disponíveis para este curso
          </Text>
          
          {/* Menu options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.option}
              onPress={handleFavorite}
              activeOpacity={0.7}
            >
              <Heart
                color="#EC4899"
                size={20}
                fill={isFavorited ? '#EC4899' : 'transparent'}
              />
              <Text style={[styles.optionText, { color: '#EC4899' }]}>
                {isFavorited ? 'Desfavoritar' : 'Favoritar'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.option}
              onPress={handleStar}
              activeOpacity={0.7}
            >
              <Star
                color="#EC4899"
                size={20}
                fill={isStarred ? '#EC4899' : 'transparent'}
              />
              <Text style={[styles.optionText, { color: '#EC4899' }]}>
                {isStarred ? 'Remover Avaliação' : 'Avaliar'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Permission text */}
          <Text style={styles.permissionText}>
            Permissão de acesso até dia 26/08/2025
          </Text>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  menuContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 34,
    paddingTop: 12,
    minHeight: MENU_HEIGHT,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  optionText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  permissionText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'left',
  },
});

export default ContentMenu;