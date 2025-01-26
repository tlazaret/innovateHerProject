import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Image } from 'react-native';

interface MainPageButtonProps {
  buttontext: string;
  hexstring: string;  // Background color to blend with the silhouette
  imageSource: any;  // Silhouette image source
}

const MainPageButton: React.FC<MainPageButtonProps> = ({ buttontext, hexstring, imageSource }) => {
  return (
    <TouchableOpacity style={[styles.button]}>
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
      >

        <View style={[styles.overlay, { backgroundColor: hexstring }]}/>
        
        <Text style={[styles.buttonText, { fontFamily: 'Montserrat' }]}>{buttontext}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden', // Ensure the content fits within rounded corners
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain', // To preserve the silhouette aspect ratio
  },
  overlay: {
    position: 'absolute', // Position the overlay on top of the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7, // You can adjust this value to control the blending effect
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFBFC',
    fontWeight: 'bold',
    padding: 9,
  },
});

export default MainPageButton;
