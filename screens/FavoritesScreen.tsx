import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStacFavoritekParamList } from '../services/types';
import { getFavoriteUsers, User } from '../services/api';

const FavoriteUsersScreen = () => {
  const [favorites, setFavorites] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  type NavigationProp = NativeStackNavigationProp<RootStacFavoritekParamList, 'Favorites'>;
    const navigation = useNavigation<NavigationProp>();

  const loadFavorites = async () => {
    try {
      const data = await getFavoriteUsers();
      setFavorites(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const renderItem = ({ item, index }: any) => {
    const isLastOddItem = favorites.length % 2 === 1 && index === favorites.length - 1;
  
    return (
      <TouchableOpacity
        style={[styles.item, isLastOddItem && { alignSelf: 'center' }]}
        onPress={() => navigation.navigate('ContactDetail', { id: item.id })}
      >
        <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
        <Text style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
    );
  };
  
  // const renderItem = ({ item }: { item: User }) => (
  //   <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ContactDetail', { id: item.id })}>
  //     <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
  //     <Text style={styles.username}>{item.username}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
      </View>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default FavoriteUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  list: {
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 10,
    backgroundColor: '#CCFFFF',
    borderRadius: 10,
    alignItems: 'center',
    padding: 16,
    maxWidth: '48%',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 18,
    color: 'red',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

