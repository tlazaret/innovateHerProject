import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router'; // Import the router

interface MainPageButtonProps {
  buttontext: string;
  hexstring: string;
  imageSource: any;
  dest: string;  
}

const MainPageButton: React.FC<MainPageButtonProps> = ({ buttontext, hexstring, imageSource, dest }) => {
  const router = useRouter();  

  const handlePress = () => {
    router.push(dest as RelativePathString); 
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <ImageBackground source={imageSource} style={styles.imageBackground}>
        <View style={[styles.overlay, { backgroundColor: hexstring }]} />
        <Text style={styles.buttonText}>{buttontext}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
    elevation: 3,

    shadowColor:'#53444D',

    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    width: 100,
    height: 100
    //alignItems: 'center',
    //resizeMode: 'contain',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.85,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFBFC",
    fontWeight: 'bold',
    padding: 9,
    //alignItems: 'center'
  },
});

export default MainPageButton;
