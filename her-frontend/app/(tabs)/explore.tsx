import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function PersonalSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [email, setEmail] = useState('user@example.com');
  const [name, setName] = useState('Jane Doe');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSave = () => {
    // Handle save logic here
    alert('Settings saved successfully!');
  };

  const handleLogout = () => {
    // Handle log out logic here
    alert('You have been logged out.');
    router.push('/login'); // Redirect to the login page
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Settings</Text>

      {/* Personal Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6D4C41"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#6D4C41"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#6D4C41"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* App Preferences Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            color="#FE8268"
          />
        </View>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
            color="#FE8268"
          />
        </View>
      </View>

      {/* Save Changes Button */}
      <Button mode="contained" style={styles.saveButton} onPress={handleSave}>
        Save Changes
      </Button>

      {/* Log Out Button */}
      <Button
        mode="outlined"
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        Log Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBFC',
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: '#BACFE4',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFF4E6',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#FE8268',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFD6E0',
    borderRadius: 10,
    borderColor: '#BACFE4',
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  preferenceText: {
    fontSize: 16,
    color: '#6D4C41',
  },
  saveButton: {
    backgroundColor: '#FE8268',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    alignSelf: 'center',
    width: '80%',
  },
  logoutButton: {
    borderColor: '#FE8268',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    alignSelf: 'center',
    width: '80%',
    color: '#FE8268',
  },
});
