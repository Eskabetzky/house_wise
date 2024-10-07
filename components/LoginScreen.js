import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Access navigation

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  // Handle Google Authentication response
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;

      if (authentication) {
        // Here, authentication will have access_token
        console.log('Access Token:', authentication.accessToken);
      }
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.imagecontainer}>
        {/* Illustration */}
        <Image source={require('../assets/HWLogo.png')} style={styles.illustration} />
      </View>
      {/* Form Section */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <FontAwesome name="envelope" size={20} color="#000" style={styles.icon} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="gray"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <FontAwesome name="lock" size={20} color="#000" style={styles.icon} />
        </View>

        <TouchableOpacity onPress={() => console.log('Forgot Password? pressed')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* or Login with Google */}
        <View style={styles.googleButtonWrapper}>
          <View style={styles.line} />
          <Text style={styles.googleButtonText}>or</Text>
          <View style={styles.line} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity disabled={!request} onPress={() => promptAsync()}>
            <FontAwesome name="google" size={32} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="facebook" size={32} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="twitter" size={32} color="#1DA1F2" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Sign up')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCC205',
    justifyContent: 'center',
    alignItems: 'center',

  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 250,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '97.5%',
    height: '80%',
    backgroundColor: '#FCC205',
    padding: 30,
    borderRadius: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#353336',
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: '#FCC205',
    paddingHorizontal: 10,
  
  },
  input: {
    flex: 1,
    height: 45,
    color: '#000', // Changed to black for better visibility
    padding: 10,
  },
  icon: {
    marginLeft: 10,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    color: '#000',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#353336',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 200,
    marginLeft: 50,
    borderColor: '#FCC205',
    borderWidth: 1,
    elevation: 10,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FCC205',
  },
  googleButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#353336',
    fontSize: 11,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#000',
    marginHorizontal: 1,
    marginTop: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  footerText: {
    color: '#000',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 65,
  },
  registerText: {
    marginLeft: 10,
    marginTop: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default LoginScreen;
