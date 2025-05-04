import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'http://192.168.1.10:8080/api'; 

export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
  description: string;
}

let isAuthenticated = false;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  await AsyncStorage.setItem('token', data.token);
  return data.token;
};

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const register = async (user: {
  username: string;
  email: string;
  password: string;
  phone: string;
  description: string;
}) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Register failed');
  return response.json();
};

export function logout() {
  isAuthenticated = false;
}

export const getAllUsers = async (): Promise<User[]> => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',  
    headers: {
      Authorization: `Bearer ${token}`,  // Truyền token vào header
      'Content-Type': 'application/json', 
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json(); 
};

export const getUserById = async (id: string): Promise<User> => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};

export const updateAvatar  = async (avatarUrl: string): Promise<void> => {
  const token = await getToken();
  const response = await fetch(`${API_URL}/users/avatar`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({avatarUrl}),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error('Failed to update avatar: ' + text);
  }
};

export const getCurrentUser = async (): Promise<User> => {
  const token = await getToken(); 
  const response = await fetch(`${API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }

  return response.json();
};

export const getFavoriteUsers = async (): Promise<User[]> => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/users/favorites`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch favorite users');
  }

  return response.json();
};

export const addToFavorites = async (favoriteId: string): Promise<void> => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/users/favorites`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({favoriteId}),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error('Failed to add user to favorites: ' + text);
  }
};


export const removeFromFavorites = async (favoriteId: string): Promise<void> => {
  const token = await getToken();

  const response = await fetch(`${API_URL}/users/favorites/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({favoriteId}),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error('Failed to add user to favorites: ' + text);
  }
};


