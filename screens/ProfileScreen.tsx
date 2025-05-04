import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackAvatarParamList } from '../services/types';
import { User, getCurrentUser, logout } from '../services/api';
import { pickImage } from '../utils/imagePickerHelper';

export default function ProfileScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  type NavigationProp = NativeStackNavigationProp<RootStackAvatarParamList, 'Profile'>;
  const navigation = useNavigation<NavigationProp>();

  useFocusEffect(
      useCallback(() => {
        const fetchUser = async () => {
          try {
            const user = await getCurrentUser();
            setUser(user);
          } catch (error: any) {
            Alert.alert('Lỗi', error.message || 'Không thể tải dữ liệu');
          } finally {
            setLoading(false);
          }
        };
        fetchUser();
      }, [])
    );

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await getCurrentUser();
  //       setUser(user);
  //     } catch (error: any) {
  //       Alert.alert('Lỗi', error.message || 'Không thể tải dữ liệu');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  const handleChooseAvatar = async () => {
    const image = await pickImage();
    if (image) {
      navigation.navigate('ConfirmAvatar', { image });
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error: any) {
      Alert.alert('Lỗi', error.message || 'Không thể đăng xuất');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;

  if (!user) return <Text style={styles.errorText}>Không tìm thấy người dùng</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        <Text style={styles.name}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
        <Text style={styles.description}>{user.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleChooseAvatar}>
            <Text style={styles.buttonText}>Cập nhật avatar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 40,
  },
  profileCard: {
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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#e63946',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#e63946',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});