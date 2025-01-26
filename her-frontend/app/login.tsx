import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Welcome back! You’re logged in and ready to go.');
    router.push('/'); // Navigate to home/dashboard page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Let’s get you back to reaching your goals and keeping that glow. 💖
      </Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#53444D"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#53444D"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      {/* Return to Home */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        style={styles.returnHomeButton}
      >
        <Text style={styles.returnHomeText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFBFC', // Bright, light pink background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#BACFE4', // Soft blue for the title
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#FF9FA9', // Warm pink for the subtitle
    textAlign: 'center',
    marginBottom: 28,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  input: {
    height: 48,
    borderColor: '#BACFE4', // Blue border
    borderWidth: 1.5,
    marginBottom: 16,
    paddingHorizontal: 12,
    width: '85%',
    color: '#53444D', // Neutral dark text
    backgroundColor: '#FFD6E0', // Light pink input background
    borderRadius: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FE8268', // Vibrant coral pink
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginTop: 18,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFBFC', // Light text
    fontSize: 18,
    fontWeight: 'bold',
  },
  returnHomeButton: {
    marginTop: 24,
  },
  returnHomeText: {
    color: '#BACFE4', // Soft blue for the link
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
