import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getAllUsers, User, logout } from '../services/api';
import { RootStackParamList } from '../services/types';
import ContactItem from '../components/ContactItem';

export default function AllContactsScreen() {
  const [contacts, setContacts] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AllContacts'>;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getAllUsers();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError('');
    try {
      const data = await getAllUsers();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load contacts');
    } finally {
      setRefreshing(false);
    }
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading contacts...</Text>
      </View>
    );
  }

  if (error && !contacts.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadContacts}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.contactCard}
      onPress={() => navigation.navigate('ContactDetail', { id: item.id })}
    >
      <ContactItem contact={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Contacts</Text>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#007bff']} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#e63946',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 10,
  },
  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: '#e63946',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});