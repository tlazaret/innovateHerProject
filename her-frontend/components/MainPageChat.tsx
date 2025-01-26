import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

const MainPageChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ user: string; bot: string }[]>([]);
  const scrollViewRef = useRef<ScrollView>(null); //automatic scroll to bottom


  const handleSend = () => {
    if (message.trim() !== '') {
      const newMessage = { user: message, bot: getBotResponse(message) };
      setChatHistory((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };
  React.useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);

  const getBotResponse = (userMessage: string): string => {

    if (userMessage.toLowerCase().includes('hello')) {
      return 'Haiiiiiiiii :3333';
    } else if (userMessage.toLowerCase().includes('wellness')) {
      return 'Let me help you with your fitness and health needs!';
    } else {
      return "I'm here to help! Can you tell me more?";
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <ScrollView ref={scrollViewRef} style={styles.chatContainer}         
       onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}>
        {chatHistory.map((entry, index) => (
          <View key={index} style={styles.messageContainer}>
            {/*user */}
            <View style={[styles.messageBubble, styles.userMessage]}>
              <Text style={styles.messageText}>{entry.user}</Text>
            </View>
            {/*bot*/}
            <View style={[styles.messageBubble, styles.botMessage]}>
              <Text style={styles.messageText}>{entry.bot}</Text>
            </View>
          </View>
        ))}
      </ScrollView>


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
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#BACFE4',
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#FFFBFC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%', 
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
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainPageChat;
