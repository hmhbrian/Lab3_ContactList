import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getUserById, User, addToFavorites, removeFromFavorites,getFavoriteUsers } from '../services/api';

export default function ContactDetailScreen({ route }: any) {
  const { id } = route.params;
  const [contact, setContact] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id);
        setContact(user);

        const favorites = await getFavoriteUsers();
        const isFav = favorites.some((u: User) => u.id === id);
        setIsFavorite(isFav);
      } catch (error: any) {
        Alert.alert('Lỗi', error.message || 'Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!contact) return;
  
    try {
      if (isFavorite) {
        await removeFromFavorites(id);
        setIsFavorite(false);
        Alert.alert('Đã xóa', 'Đã xóa khỏi danh sách yêu thích');
      } else {
        await addToFavorites(id);
        setIsFavorite(true);
        Alert.alert('Thành công', 'Đã thêm vào danh sách yêu thích');
      }
    } catch (error: any) {
      console.error('Error details:', error);
      Alert.alert('Lỗi', error.message || 'Không thể xử lý yêu cầu');
    }
  };
  

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
  
  if (!contact) return <Text style={styles.errorText}>Không tìm thấy người dùng</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: contact.avatarUrl }} style={styles.avatar} />
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{contact.username}</Text>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <MaterialIcons
              name={isFavorite ? 'star' : 'star-border'}
              size={30}
              color={isFavorite ? '#ffd700' : '#666'}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <MaterialIcons name="email" size={20} color="#666" style={styles.icon} />
          <Text style={styles.detailText}>Email</Text>
          <Text style={styles.detailValue}>{contact.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="phone" size={20} color="#666" style={styles.icon} />
          <Text style={styles.detailText}>Work</Text>
          <Text style={styles.detailValue}>{contact.phone}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="person" size={20} color="#666" style={styles.icon} />
          <Text style={styles.detailText}>Description</Text>
          <Text style={styles.detailValue}>{contact.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#c8e6c9',
    padding: 70,
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 25,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  starIcon: {
    marginLeft: 5,
  },
  detailsContainer: {
    padding: 18,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
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
});