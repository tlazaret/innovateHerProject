import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function WorkoutsPage() {
  const [cycleInfo, setCycleInfo] = useState(
    'Movements you can do during this time of your cycle will be shown here.'
  );
  const [workoutPlan, setWorkoutPlan] = useState('Suggested workout plan: Rest day with light yoga.');
  const [photo, setPhoto] = useState(null); // State to store the photo

  const handleRefreshWorkoutPlan = () => {
    setWorkoutPlan('Updated workout plan: Light cardio and stretching.');
  };

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Workout',
      headerStyle: {
        backgroundColor: '#FFFBFC',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#264653',
      headerBackTitle: 'Back',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const handleTakePhoto = async () => {
    // Ask for camera permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Camera permission is required to take photos.');
      return;
    }

    // Open camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.uri); // Save the photo URI
      Alert.alert('Photo Taken', 'Your photo has been saved.');
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/mainbackground.png')} // Replace with your image path
      style={styles.background}
    >
      {/* Top Third: Cycle Info */}
      <View style={[styles.section, styles.topSection]}>
        <Text style={styles.title}>Today's Cycle Info</Text>
        <ScrollView style={styles.cycleInfoBox}>
          <Text style={styles.displayText}>{cycleInfo}</Text>
        </ScrollView>
      </View>

      {/* Middle Third: Workout Plan */}
      <View style={[styles.section, styles.middleSection]}>
        <View style={styles.workoutPlanHeader}>
          <Text style={styles.title}>Suggested Workout</Text>
          <IconButton
            icon="refresh"
            size={24}
            onPress={handleRefreshWorkoutPlan}
            style={styles.refreshButton}
            iconColor="#264653"
          />
        </View>
        <View style={styles.workoutPlanBox}>
          <Text style={styles.displayText}>{workoutPlan}</Text>
        </View>
      </View>

      {/* Bottom Third: Additional Workouts */}
      <View style={[styles.section, styles.bottomSection]}>
        <Text style={styles.title}>Add Another Workout</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.workoutButton}>
            <Text style={styles.buttonText}>HIIT</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.workoutButton}>
            <Text style={styles.buttonText}>Abs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.workoutButton}>
            <Text style={styles.buttonText}>Strength</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.workoutButton}>
            <Text style={styles.buttonText}>Yoga</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Camera Button */}
      <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
        <Text style={styles.cameraIcon}>📷</Text>
      </TouchableOpacity>

      {/* Show the photo if available */}
      {photo && (
        <View style={styles.photoPreview}>
          <Text style={styles.photoTitle}>Photo Preview:</Text>
          <ImageBackground source={{ uri: photo }} style={styles.photo} />
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-start',
    padding: 16,
  },
  section: {
    marginBottom: '5%', // Add spacing between sections
  },
  topSection: {
    flex: 1,
  },
  middleSection: {
    flex: 1,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#264653', // Dark green
    marginBottom: 12,
  },
  cycleInfoBox: {
    flex: 1,
    borderColor: '#264653', // Dark green border
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(233, 229, 219, 0.8)', // Semi-transparent beige
  },
  workoutPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  refreshButton: {
    marginRight: 8,
  },
  workoutPlanBox: {
    flex: 1,
    borderColor: '#264653', // Dark green border
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'rgba(233, 229, 219, 0.8)', // Semi-transparent beige
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 12,
    width: '100%',
  },
  workoutButton: {
    width: '45%',
    height: 50,
    backgroundColor: '#264653', // Dark green
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonText: {
    color: '#F4ECE2', // Light beige
    fontSize: 16,
    fontWeight: 'bold',
  },
  displayText: {
    fontSize: 16,
    color: '#264653', // Dark green text
    textAlign: 'left',
    lineHeight: 24,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: '#2A9D8F', // Teal for a modern pop of color
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  cameraIcon: {
    fontSize: 28,
    color: '#F4ECE2', // Light beige
  },
  photoPreview: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  photoTitle: {
    fontSize: 16,
    color: '#264653',
    marginBottom: 8,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
