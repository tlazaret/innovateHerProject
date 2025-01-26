import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from 'expo-router';
import { Circle } from 'react-native-progress';
import MainPageChat from '@/components/MainPageChat';

const CyclePage: React.FC = () => {
  const navigation = useNavigation();

  const getCurrentDate = () => {
    const today = new Date();
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(today);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Cycle Plan',
      headerStyle: {
        backgroundColor: '#FFFBFC',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#FF8491',
      headerBackTitle: 'Back',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ImageBackground
          source={require('@/assets/images/mainbackground.png')}
          style={styles.background}
        >
          <View style={styles.container}>
            <View style={styles.textBox}>
              <Text style={styles.textBoxText}>{getCurrentDate()}.</Text>
            </View>

            <Text style={styles.phaseText}>
              This is the ______ phase of your period. SPECIFIC PHRASE FOR THIS PHASE
            </Text>

            <View style={styles.progressContainer}>
              <Circle
                size={150}
                progress={0.75}
                thickness={20}
                color="#CE381A"
                unfilledColor="#E8E8E8"
              />
              <Text style={styles.percentageLabel}>Fertility estimate</Text>
            </View>

            <View style={styles.chatContainer}>
              <MainPageChat />
            </View>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  textBox: {
    width: '100%',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  textBoxText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#53444D',
  },
  phaseText: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    color: '#53444D',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  percentageLabel: {
    fontSize: 16,
    color: '#53444D',
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginTop: 30, 
  },
});

export default CyclePage;
