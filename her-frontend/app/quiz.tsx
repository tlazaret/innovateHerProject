import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

export default function QuizPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState({});
  const [accountDetails, setAccountDetails] = useState({ name: '', email: '', password: '' });
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Sign Up',
      headerStyle: {
        backgroundColor: '#FFFBFC', // Match your app's color scheme
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#2E86AB',
      },
      headerTintColor: '#2E86AB', // Color of the back arrow
      headerBackTitle: 'Back', // Text for the back button
      headerBackTitleVisible: true, // Ensures the text is displayed
    });
  }, [navigation]);
  

  const questions = [
    { question: 'Create Account', type: 'createAccount' },
    { question: 'How old are you?', type: 'integer' },
    { question: 'What is your weight (in pounds)?', type: 'integer' },
    { question: 'What is your height (in inches)?', type: 'integer' },
    {
      question: 'What is your gender?',
      type: 'string',
      options: ['Female', 'Male', 'Other'],
    },
    {
      question: 'Are you currently on birth control?',
      type: 'string',
      options: ['Yes', 'No'],
    },
    {
      question: "What's the start date of last period?",
      type: 'date',
    },
    {
      question: "What's the end date of your last period?",
      type: 'date',
    },
    {
      question: 'What are your goals?',
      type: 'array',
      options: ['Lose weight', 'Build habits', 'Tone/build muscle', 'Other'],
    },
    {
      question: 'Do you have any dietary restrictions?',
      type: 'array',
      options: ['Allergies to peanuts', 'Pescetarian', 'Vegetarian', 'Vegan'],
    },
  ];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setBlur(true);
      setTimeout(() => {
        setBlur(false);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    } else {
      const submission = {
        accountDetails,
        answers,
      };

      console.log('Quiz Submission:', JSON.stringify(submission, null, 2));
      alert('Thank you for completing the quiz!');
      router.push('/mainpage');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleInputChange = (value) => {
    setAnswers({ ...answers, [currentQuestionIndex]: value });
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    switch (currentQuestion.type) {
      case 'createAccount':
        return (
            <><TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#B0BEC5"
                value={accountDetails.name}
                onChangeText={(text) => setAccountDetails({ ...accountDetails, name: text })} /><TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#B0BEC5"
                    value={accountDetails.email}
                    onChangeText={(text) => setAccountDetails({ ...accountDetails, email: text })}
                    keyboardType="email-address" /><TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#B0BEC5"
                    value={accountDetails.password}
                    onChangeText={(text) => setAccountDetails({ ...accountDetails, password: text })}
                    secureTextEntry={true} /></>
        
        );
      case 'integer':
        return (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={handleInputChange}
            value={answers[currentQuestionIndex] || ''}
            placeholder="Enter a number"
            placeholderTextColor="#B0BEC5"
          />
        );
      case 'string':
        return currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.textBubble,
              selectedOption === option && styles.selectedBubble,
            ]}
            onPress={() => {
              setSelectedOption(option);
              handleInputChange(option);
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ));
      case 'array':
        return currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.textBubble,
              answers[currentQuestionIndex]?.includes(option) && styles.selectedBubble,
            ]}
            onPress={() => {
              const newAnswers = answers[currentQuestionIndex] || [];
              if (newAnswers.includes(option)) {
                handleInputChange(newAnswers.filter((item) => item !== option));
              } else {
                handleInputChange([...newAnswers, option]);
              }
            }}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ));
      case 'date':
        return (
          <TouchableOpacity
            style={[
              styles.textBubble,
              answers[currentQuestionIndex] && styles.selectedBubble,
            ]}
            onPress={() => setShow(true)}
          >
            <Text style={styles.optionText}>
              {answers[currentQuestionIndex] || 'Select Date'}
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  setShow(false);
                  const currentDate = selectedDate || date;
                  setDate(currentDate);
                  handleInputChange(currentDate.toISOString().split('T')[0]);
                }}
              />
            )}
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {currentQuestionIndex === 0 ? 'Welcome to SenseHer' : 'Getting to Know You'}
      </Text>
      {blur && (
        <BlurView intensity={50} tint="light" style={StyleSheet.absoluteFill}>
          <Text style={styles.blurText}>Loading next question...</Text>
        </BlurView>
      )}
      {!blur && (
        <>
          <Text style={styles.questionContainer}>
            <Text style={styles.question}>
              {questions[currentQuestionIndex].question}
            </Text>
          </Text>

          <View style={styles.centeredContent}>{renderQuestion()}</View>
          <Button
            mode="contained"
            onPress={handleNextQuestion}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Next
          </Button>
          {currentQuestionIndex > 0 && (
            <Button
              mode="contained"
              onPress={handlePreviousQuestion}
              style={[styles.button]}
              labelStyle={styles.buttonText}
            >
              Previous
            </Button>
          )}
        </>
      )}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFBFC',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E86AB',
    textAlign: 'center',
    marginBottom: '10%',
    marginTop: '5%',
  },
  questionContainer: {
    width: '80%',
    padding: 14,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFFBFC', // Border color
    backgroundColor: '#FFD6E0', // Light bubble color
    marginBottom: 40,
  },
  question: {
    fontSize: 16,
    color: '#2E86AB', // Text color
    textAlign: 'center',
    fontWeight: '600',
  },
  blurText: {
    fontSize: 20,
    color: '#FE8268',
    textAlign: 'center',
    marginTop: '50%',
  },
  centeredContent: {
    width: '100%',
    alignItems: 'center',                   
  },
  textBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFBFC',
    borderRadius: 20,
    marginVertical: 8,
    alignItems: 'center',
    width: '80%',
  },
  selectedBubble: {
    backgroundColor: '#FFD6E0',
  },
  optionText: {
    fontSize: 16,
    color: '#6D4C41',
  },
  input: {
    height: 40,
    borderColor: '#FFC2C9',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '40%',
    color: '#6D4C41',
    backgroundColor: '#FFFBFC',
    borderRadius: 10,
    fontSize: 17,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2E86AB',
    marginTop: 16,
    width: '80%',
    borderRadius: 15,
  },
  buttonText: {
    color: '#FFFBFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  returnHomeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  returnHomeText: {
    color: '#2E86AB',
    fontSize: 16,
    marginBottom: 20,
  },
});


