import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // For the send icon
import MainPage from '@/app/mainpage';

const MainPageChat = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('Message sent:', message);
      setMessage(''); // Clear the input field after sending
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask your wellness companion...."
        placeholderTextColor="#FFFBFC"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Feather name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,

  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFFBFC',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,

    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    marginLeft: 10,
   // backgroundColor: '#BACFE4',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainPageChat;
