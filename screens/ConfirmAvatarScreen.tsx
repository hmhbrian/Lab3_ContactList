import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { imageUpload } from '../services/imageUpload';
import { updateAvatar } from '../services/api';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackAvatarParamList } from '../services/types';

export default function ConfirmAvatarScreen() {
    const route = useRoute<RouteProp<RootStackAvatarParamList, 'ConfirmAvatar'>>();
    const navigation = useNavigation<any>();
    const { image } = route.params;

  const handleConfirm = async () => {
    try {
      const fileName = `avatar_${Date.now()}.jpg`;

      const avatarUrl = await imageUpload(image.base64, fileName);
      if (!avatarUrl) {
        Alert.alert('Lỗi', 'Không thể tải ảnh lên Supabase');
        return;
      }
      await updateAvatar(avatarUrl);

      Alert.alert('Thành công', 'Avatar đã được cập nhật');
      navigation.replace('MainTabs');
    } catch (error) {
      console.error('Avatar update error:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật avatar');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Xác nhận Avatar</Text>
        <Image source={{ uri: image.uri }} style={styles.avatar} />
        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});