import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from "expo-router";
import WeekCalendar from '@/components/MainPageCalendar';

const MainPage: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Main Page" }} />
      <View style={styles.container}>
        <WeekCalendar/>
        <Text style={styles.title}>THIS IS MAINPAGE</Text>
        <Text style={styles.subtitle}>AHHHHHHH</Text>

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#495057',
  },
});

export default MainPage;
