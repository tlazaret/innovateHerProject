import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRouter } from 'expo-router';
import WeekCalendar from '@/components/MainPageCalendar';
import MainPageButton from '@/components/MainPageButton';
import MainPageChat from '@/components/MainPageChat';

export default function HomeScreen() {
  const [showSignUp, setShowSignUp] = useState(true); // Modal visibility state
  const router = useRouter();

  const handleNavigation = (destination) => {
    setShowSignUp(false); // Close the modal
    setTimeout(() => router.push(destination), 300); // Navigate after modal animation
  };

  return (
    <ImageBackground
      source={require('@/assets/images/mainbackground.png')} // Local image path
      style={styles.background}
    >
      {/* Sign Up Modal */}
      <Modal
        visible={showSignUp}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSignUp(false)} // Handle back press on Android
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSignUp(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Welcome to</Text>
            <Text style={styles.modalTitle2}>🌸 SenseHer 🌸</Text>

            <Text style={styles.modalText}>
              Ready to embrace your fabulous self? Sign up now to get started!
            </Text>

            <View style={styles.buttonGroup}>
              {/* Sign-Up Button */}
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => handleNavigation('/quiz')}
              >
                <Text style={styles.buttonText}>Sign Up ✨</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => handleNavigation('/login')}
              >
                <Text style={styles.buttonText}>Login ✨</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Main Content */}
      <WeekCalendar />
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>
          <MainPageButton
            buttontext="Meal Prep"
            hexstring="#988F2A"
            imageSource={require('@/assets/images/food.png')}
            dest="/mealplanpage"
          />
          <MainPageButton
            buttontext="Workout"
            hexstring="#2E86AB"
            imageSource={require('@/assets/images/yoga.png')}
            dest="/workout"
          />
          <MainPageButton
            buttontext="Cycle"
            hexstring="#FF8491"
            imageSource={require('@/assets/images/drop.png')}
            dest="/cyclepage"
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'semibold',
              fontStyle: 'italic',
              color: '#53444D',
            }}
          >
            Unsure of your goals for today?
          </Text>
        </View>
        <MainPageChat />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#FFF4E6',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#2E86AB',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFF4E6',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 8,
  },
  modalTitle2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86AB',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#6D4C41',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonWrapper: {
    backgroundColor: '#2E86AB',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    width: '45%',
  },
  buttonText: {
    color: '#FFF4E6',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    bottom: 175,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 16,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
});
