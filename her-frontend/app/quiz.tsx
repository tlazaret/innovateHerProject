import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, RadioButton, Checkbox } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [accountDetails, setAccountDetails] = useState({ name: '', email: '', password: '' });
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [blur, setBlur] = useState(false);

  const questions = [
    { question: 'Create Account', type: 'createAccount' },
    { question: 'What is your age?', type: 'integer' },
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
      router.push('/');
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
                placeholderTextColor="#A8896D"
                value={accountDetails.name}
                onChangeText={(text) => setAccountDetails({ ...accountDetails, name: text })} /><TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#A8896D"
                    value={accountDetails.email}
                    onChangeText={(text) => setAccountDetails({ ...accountDetails, email: text })}
                    keyboardType="email-address" /><TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#A8896D"
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
            placeholderTextColor="#A8896D"
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
          <Text style={styles.question}>
            {questions[currentQuestionIndex].question}
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
    justifyContent: 'top',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8EDE3',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A8896D',
    textAlign: 'center',
    marginBottom: '20%',
    marginTop: '10%',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    color: '#D4A373',
    textAlign: 'center',
  },
  blurText: {
    fontSize: 20,
    color: '#D4A373',
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
    backgroundColor: '#FFF4E6',
    borderRadius: 20,
    marginVertical: 8,
    alignItems: 'center',
    width: '80%',
  },
  selectedBubble: {
    backgroundColor: '#D4A373',
  },
  optionText: {
    fontSize: 16,
    color: '#6D4C41',
  },
  input: {
    height: 40,
    borderColor: '#A8896D',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
    color: '#6D4C41',
    backgroundColor: '#FFF4E6',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#D4A373',
    marginTop: 16,
    width: '80%',
  },
  previousButton: {
    backgroundColor: '#FFF4E6',
  },
  buttonText: {
    color: '#FFF4E6',
    fontSize: 16,
  },
  returnHomeButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  returnHomeText: {
    color: '#A8896D',
    fontSize: 16,
  },

  
});

