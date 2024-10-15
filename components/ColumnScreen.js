import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

const ColumnScreen = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [numberOfFootings, setNumberOfFootings] = useState('1'); // Default to 1 footing
  const [rebarDiameter, setRebarDiameter] = useState('12'); // Default to 12 mm

  const [rebarQuantity, setRebarQuantity] = useState(0);
  const [cementBags, setCementBags] = useState(0);
  const [sandCubicMeters, setSandCubicMeters] = useState(0);
  const [aggregatesCubicMeters, setAggregatesCubicMeters] = useState(0);

  const calculateMaterials = () => {
    const lengthVal = parseFloat(length); // in mm
    const widthVal = parseFloat(width); // in mm
    const heightVal = parseFloat(height); // in meters
    const numberOfFootingsVal = parseInt(numberOfFootings);
    const rebarDiameterVal = parseFloat(rebarDiameter);

    // Validate input fields
    if (isNaN(lengthVal) || isNaN(widthVal) || isNaN(heightVal) || isNaN(numberOfFootingsVal) || isNaN(rebarDiameterVal)) {
      Alert.alert('Invalid input', 'Please enter valid numbers for all fields.');
      return;
    }

    // Ensure inputs are positive numbers
    if (lengthVal <= 0 || widthVal <= 0 || heightVal <= 0 || numberOfFootingsVal <= 0 || rebarDiameterVal <= 0) {
      Alert.alert('Invalid input', 'Values must be greater than zero.');
      return;
    }

    // Step 1: Calculate cross-sectional area of the column (in mm²) and convert to m²
    const crossSectionArea = lengthVal * widthVal; // in mm²
    const crossSectionAreaInMeters = crossSectionArea * 0.000001; // convert from mm² to m²

    // Step 2: Calculate the total volume of the column (in m³)
    const totalVolume = heightVal * crossSectionAreaInMeters * numberOfFootingsVal; // m³

    // Step 3: Calculate rebar area
    const rebarArea = Math.PI * (Math.pow(rebarDiameterVal / 2, 2)); // in mm²

    // Step 4: Minimum steel area for the column (875 mm²)
    const minSteelArea = 875; // in mm²

    // Step 5: Calculate number of rebars needed
    const steelQuantity = Math.ceil(minSteelArea / rebarArea); // total rebars needed, rounded up

    // Step 6: Calculate the quantities of materials based on the total volume
    const totalCement = totalVolume * 9; // Bags of cement (Class A mix: 9 bags per m³ of concrete)
    const totalSand = totalVolume * 0.5; // Sand in cubic meters (0.5 m³ per m³ of concrete)
    const totalAggregates = totalVolume * 1; // Aggregates in cubic meters (1 m³ per m³ of concrete)

    // Update state with calculated values
    setRebarQuantity(steelQuantity);
    setCementBags(totalCement);
    setSandCubicMeters(totalSand);
    setAggregatesCubicMeters(totalAggregates);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Column Material Calculation</Text>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Cross Section Length (mm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Length"
            value={length}
            onChangeText={setLength}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Cross Section Width (mm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Width"
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Height (m):</Text>
          <TextInput
            style={styles.input}
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Number of Footings:</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of Footings"
            value={numberOfFootings}
            onChangeText={setNumberOfFootings}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Rebar Diameter (mm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Rebar Diameter"
            value={rebarDiameter}
            onChangeText={setRebarDiameter}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateMaterials}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        {/* Display results dynamically */}
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Calculation Results:</Text>
          <View style={styles.resultsRow}>
            <Text>Total Rebars Needed: </Text>
            <Text>{rebarQuantity} pcs.</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Cement Needed: </Text>
            <Text>{cementBags.toFixed(2)} bags</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Sand Needed: </Text>
            <Text>{sandCubicMeters.toFixed(2)} m³</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Aggregates Needed: </Text>
            <Text>{aggregatesCubicMeters.toFixed(2)} m³</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    height: 40,
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
    padding: 15,
    backgroundColor: '#d1f7c4',
    borderRadius: 10,
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ColumnScreen;
