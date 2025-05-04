import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { register } from '../services/api';
import { useNavigation } from '@react-navigation/native';


export default function RegisterScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    description: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      const message = await register({
        username: form.username,
        email: form.email,
        password: form.password,
        phone: form.phone,
        description: form.description,
      });
      Alert.alert('Thành công', message, [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Lỗi đăng ký', error.message || 'Không thể đăng ký');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled" >
        <Text style={styles.title}>Sign up for an account</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} placeholder="Enter username" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Enter email" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="Enter password" secureTextEntry />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput placeholder="Phone" style={styles.input} keyboardType="phone-pad" onChangeText={(v) => handleChange('phone', v)} />
        
        <Text style={styles.label}>Description</Text>
        <TextInput placeholder="Description" style={styles.input} onChangeText={(v) => handleChange('description', v)} />
      
        <Button title="Register" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
