import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

// MenuItem Component
const MenuItem = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Image source={icon} style={styles.menuIcon} />
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );
};

// ProfileScreen Component
const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder for profile image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Marvin Dala</Text>
        <Text style={styles.points}>Pinaka Gwapo</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem 
          title="Edit Profile" 
          icon={require('../assets/accountIcon.png')} 
          onPress={() => navigation.navigate('Profile')} 
        />
        <MenuItem 
          title="Saved Project" 
          icon={require('../assets/HistoryIcon.png')} 
          onPress={() => navigation.navigate('SavedProjects')} 
        />
        <MenuItem 
          title="Create Project" 
          icon={require('../assets/CreateIcon.png')} 
          onPress={() => navigation.navigate('Suggest')} 
        />
        <MenuItem 
          title="Feedbacks" 
          icon={require('../assets/feedbackIcon.png')} 
          onPress={() => navigation.navigate('Feedback')} 
        />
        <MenuItem 
          title="Log out" 
          icon={require('../assets/logout.png')} 
          onPress={() => navigation.navigate('Logout')} 
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Light cream background color
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FCC205',
    borderRadius: 20,
  },
  tabText: {
    color: '#353336',
    fontWeight: '600',
    fontSize: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FCC205',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#353336',
    marginVertical: 10,
  },
  points: {
    fontSize: 18,
    color: '#353336',
    backgroundColor: '#FCC205',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuIcon: {
    width: 24, // Adjust icon size as needed
    height: 24,
    marginRight: 15,
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: 18,
    color: '#6e367c',
  },
});

export default ProfileScreen;
