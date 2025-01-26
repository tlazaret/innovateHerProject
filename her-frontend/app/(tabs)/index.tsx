import { Image, StyleSheet, Platform, ImageBackground, View, Text,  ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import WeekCalendar from '@/components/MainPageCalendar';
import MainPageButton from '@/components/MainPageButton';
import MainPageChat from '@/components/MainPageChat';



export default function HomeScreen() {

  return (
    <ImageBackground
      source={require('@/assets/images/mainbackground.png')}  // Local image path
      style={styles.background}
    >
   
        <WeekCalendar />
        <View style={styles.mainContainer}>
          <View style={styles.buttonContainer}>
            <MainPageButton buttontext='Meal Prep' hexstring='#988F2A' imageSource={require('@/assets/images/food.png')}/>
            <MainPageButton buttontext='Workout' hexstring='#2E86AB' imageSource={require('@/assets/images/yoga.png')}/>
            <MainPageButton buttontext='Cycle' hexstring='#FF8491' imageSource={require('@/assets/images/drop.png')}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={{
          fontSize: 20,
          fontWeight: 'semibold',
          fontStyle: 'italic', // Makes the text italic
          color: '#53444D',
        }}>Unsure of your goals for today?</Text>
          </View>
          <MainPageChat/>
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensures the image takes up the whole screen
    justifyContent: 'flex-start', // Aligns children to the top
    alignItems: 'center', // Center horizontally if needed
  },
  scrollView: {
    width: '100%', // Full width of the screen
    marginTop: 50, // Add padding or margin to move the calendar down from the top
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute the items evenly
    alignItems: 'center', // Align items vertically in the center
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items horizontally (e.g., left and right)
    width: '100%',
    paddingHorizontal: 10, // Adjust for padding around text elements
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center', // Align items horizontally in the center
    width: '100%', // Ensure full width for the main container
    paddingHorizontal: 10, // Add horizontal padding for better spacing
    bottom: 175
  },
});