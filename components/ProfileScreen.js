import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'; // Icons used
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing and retrieving user data

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState(null); // State to hold user profile

  // Fetch user data from AsyncStorage or Backend
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userProfile'); // Retrieve user data from AsyncStorage
      if (userData) {
        setUserProfile(JSON.parse(userData)); // Parse and set user data
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  // On component mount, fetch user data
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header with Hamburger Icon */}
      <View style={styles.header}>
        <Image
          source={{
            uri: userProfile?.profileImage || 'https://www.example.com/default-profile.png', // Default image if no user image
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>
          {userProfile ? userProfile.name : 'Guest User'} {/* Display user's name or Guest */}
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionContainer}>
        {/* Create Option with Custom + Icon */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Build')}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="plus" size={18} color="white" />
          </View>
          <Text style={styles.optionText}>Create</Text>
        </TouchableOpacity>

        {/* History Icon */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('History')}>
          <FontAwesome5 name="history" size={24} color="black" />
          <Text style={styles.optionText}>History</Text>
        </TouchableOpacity>

        {/* Feedback Icon */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Feedback')}>
          <MaterialIcons name="feedback" size={24} color="black" />
          <Text style={styles.optionText}>Feedback</Text>
        </TouchableOpacity>

        {/* Logout Option */}
        <TouchableOpacity style={[styles.option, styles.logout]}>
          <Ionicons name="log-out-outline" size={24} color="red" />
          <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FCC205',
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  optionContainer: {
    marginTop: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  optionText: {
    marginLeft: 20,
    fontSize: 16,
  },
  iconContainer: {
    backgroundColor: '#FCC205', // Custom background for the icon
    padding: 10,
    borderRadius: 50, // Makes it circular
    justifyContent: 'center',
    alignItems: 'center',
  },
  logout: {
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    marginTop: 20,
  },
});
