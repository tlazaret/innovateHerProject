import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, Modal, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainPageChat from '@/components/MainPageChat';

const MealPlanPage: React.FC = () => {
  const navigation = useNavigation();

  const [floatAnim] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState<string | null>(null); 
  const [closeButtonColor, setCloseButtonColor] = useState<string>('#FF8491'); 

  const buttonColors = {
    Fruit: '#FF9FA9',
    Vegetables: '#8DB580',
    Protein: '#CE381A',
    Grains: '#DDCA7D',
    Supplements: '#6A5ACD',
    Water: '#3498DB',
  };

  const openModal = (button: string) => {
    setModalVisible(button);
    setCloseButtonColor(buttonColors[button] || '#FF8491'); 
  };

  const closeModal = () => {
    setModalVisible(null);
  };

  const handlePlateButtonPress = (component: string) => {
    console.log(`${component}`);
    openModal(component);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Meal Plan',
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

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [navigation, floatAnim]);

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
              <Text style={styles.textBoxText}>
                This is where you are in your cycle. You are in the INSERT PHASE. This is my suggested meal plan for you:
              </Text>
              <Text style={styles.textBoxTextMealPlan}>
                yapyapyap
              </Text>
            </View>

            <Animated.View
              style={[
                styles.floatingButtonContainer,
                {
                  transform: [
                    {
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 2.5],
                        outputRange: [0, -15],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => handlePlateButtonPress('Fruit')}
                >
                  <MaterialCommunityIcons name="fruit-watermelon" size={30} color={buttonColors.Fruit} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => handlePlateButtonPress('Vegetables')}
                >
                  <Icon name="leaf" size={30} color={buttonColors.Vegetables} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => handlePlateButtonPress('Protein')}
                >
                  <FontAwesome6 name="cow" size={30} color={buttonColors.Protein} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => handlePlateButtonPress('Grains')}
                >
                  <FontAwesome6 name="wheat-awn" size={30} color={buttonColors.Grains} />
                </TouchableOpacity>
              </View>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => handlePlateButtonPress('Supplements')}
                >
                  <FontAwesome6 name="pills" size={30} color={buttonColors.Supplements} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => handlePlateButtonPress('Water')}
                >
                  <Icon name="tint" size={30} color={buttonColors.Water} />
                </TouchableOpacity>
              </View>
            </Animated.View>

            {modalVisible && (
              <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={closeModal}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                      <Text style={styles.modalTitle}>{modalVisible} for today:</Text>
                      <Text style={styles.modalText}>
                        Based on your cycle, this is what {modalVisible.toLowerCase()} I recommend. 
                      </Text>
                    </ScrollView>
                    <TouchableOpacity onPress={closeModal} style={[styles.closeButton, { backgroundColor: closeButtonColor }]}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}

            {/* chatbot */}
            <View style={styles.chatcontainer}>
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
    marginBottom: 40,
    borderRadius: 10,
  },
  textBoxText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#53444D',
  },
  textBoxTextMealPlan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#53444D',
  },
  floatingButtonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  floatingButton: {
    padding: 15,
    borderRadius: 50,
    borderColor: 'white',
    margin: 10,
    shadowColor: '#53444D',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalContent: {
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#53444D',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#53444D',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  chatcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginTop: -20,
    marginBottom: 15
  },
});

export default MealPlanPage;
