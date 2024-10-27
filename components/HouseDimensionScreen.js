  import React, { useState } from 'react';
  import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

  const HouseDimensionScreen = () => {
    const [houseLength, setHouseLength] = useState('');
    const [houseWidth, setHouseWidth] = useState('');
    const [houseArea, setHouseArea] = useState('');

    const calculateHouseArea = () => {
      if (houseLength && houseWidth) {
        const area = parseFloat(houseLength) * parseFloat(houseWidth);
        setHouseArea(area.toFixed(2)); // Set the result with 2 decimal places
      } else {
        setHouseArea(''); // Reset the area if inputs are cleared
      }
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>House Dimension Calculation</Text>

          <View style={styles.inputRow}>
            <Text style={styles.textLabel}>Length L (m):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter House Length"
              value={houseLength}
              onChangeText={setHouseLength}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.textLabel}>Width W (m):</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter House Width"
              value={houseWidth}
              onChangeText={setHouseWidth}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.calculateButton} onPress={calculateHouseArea}>
            <Text style={styles.buttonText}>Calculate Area</Text>
          </TouchableOpacity>

          {houseArea !== '' && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>House Area: {houseArea} m²</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 18,
      marginTop: 100,
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      justifyContent: 'space-between',
    },
    textLabel: {
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 2,
      borderColor: '#000',
      borderRadius: 5,
      padding: 5,
      width: 150,
      height: 35,
    },
    calculateButton: {
      backgroundColor: '#FCC205',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    resultContainer: {
      marginTop: 20,
      borderWidth: 2,
      borderColor: '#FCC205',
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#f9f9f9',
    },
    resultText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });

  export default HouseDimensionScreen;
