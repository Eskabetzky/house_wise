import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook;
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import for hamburger and account icon;





// DashboardCard Component
const DashboardCard = ({ icon, title }) => {
  return (
    <View style={styles.card}>
      <Icon name={icon} size={40} color="#353336" />
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      
      {/* Header with Menu and Account Icons */}
      <View style={styles.header}>
        {/* Left Side with Menu Icon */}
        <TouchableOpacity>
          <Icon name="menu" size={30} color='#353336'/>
        </TouchableOpacity>

        {/* Right Side with Account Circle Icon */}
        <TouchableOpacity style={styles.accountIcon}>
          <Icon name="account-circle" size={40} color='#353336'/>
        </TouchableOpacity>
      </View>
      
      <View style={styles.imagecontainer}>
        {/* Illustration */}
        <Text style={styles.illustration}>Dashboard</Text>
      </View>
      
      {/* Form Section */}
      <View style={styles.formContainer}>
        {/* Dashboard Section */}
       
        <TouchableOpacity style = {styles.concreteiconContainer2}>
                <Image  source={require('../assets/accountIcon.png')} style={styles.concreteicon} />
                <Text style={styles.concreteiconText}>Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.concreteiconContainer2}>
                <Image  source={require('../assets/HistoryIcon.png')} style={styles.concreteicon} />
                <Text style={styles.concreteiconText}>History</Text>
            </TouchableOpacity> 

        
        <TouchableOpacity style = {styles.concreteiconContainer2} onPress = {() => navigation.navigate ('Suggest')}>
                <Image  source={require('../assets/CreateIcon.png')} style={styles.concreteicon} />
                <Text style={styles.concreteiconText} >Create</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.concreteiconContainer2}>
                <Image  source={require('../assets/feedbackIcon.png')} style={styles.concreteicon} />
                <Text style={styles.concreteiconText} >Feedbacks</Text>
            </TouchableOpacity>
       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBF00',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

 
  concreteiconContainer2: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10 ,
    marginBottom: 10,
    borderColor: '#FCC205',
    borderWidth: 3,
    borderRadius: 15,
    width :150
  },
  concreteicon: {
    width: 120, // Adjust the width and height as per your icon's aspect ratio
    height: 80,
    resizeMode: 'contain',
  },

  concreteiconText: {
    fontSize: 15,
    fontWeight: 'bold',
  },

  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FCC205',
    position: 'absolute',
    top: 0,
    left: 0,
  },

  illustration: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 250,
    marginLeft: 40,
    fontWeight: 'bold',
  
  },
  formContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems:'center'
    
  },
 
  row: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth:3,
    borderColor:  '#FCC205',
    borderRadius:10,
    elevation: 10
  },
  
});

export default ProfileScreen;
