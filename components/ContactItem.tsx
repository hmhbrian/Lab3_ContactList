import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { User } from '../services/api';

interface Props {
  contact: User;
}

export default function ContactItem({ contact }: Props) {
  const avatarSource =
    contact.avatarUrl && contact.avatarUrl.trim() !== ''
      ? { uri: contact.avatarUrl }
      : require('../assets/default-avatar.png');
  return (
    <View style={styles.container}>
      <Image source={avatarSource} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{contact.username}</Text>
        <Text style={styles.email}>{contact.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 25,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  email: {
    color: 'gray',
  },
});
