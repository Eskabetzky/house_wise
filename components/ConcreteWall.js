import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BlocksQuantityCalculation = () => {
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [blockLength, setBlockLength] = useState('');
  const [blockWidth, setBlockWidth] = useState('');
  const [cementRatio, setCementRatio] = useState('1');
  const [sandRatio, setSandRatio] = useState('5');
  const [blockPrice, setBlockPrice] = useState('');
  const [cementPrice, setCementPrice] = useState('');
  const [sandPrice, setSandPrice] = useState('');
  const [rebarPricePerMeter, setRebarPricePerMeter] = useState('');
  const [rebarDiameter, setRebarDiameter] = useState('10mm');
  const [tieWirePrice, setTieWirePrice] = useState(''); // New state for Tie Wire Price

  const [wallArea, setWallArea] = useState('');
  const [totalBlocks, setTotalBlocks] = useState('');
  const [totalCost, setTotalCost] = useState('');
  const [cementBags, setCementBags] = useState('');
  const [sandVolume, setSandVolume] = useState('');
  const [totalCementCost, setTotalCementCost] = useState('');
  const [totalSandCost, setTotalSandCost] = useState('');
  const [totalRebars, setTotalRebars] = useState('');
  const [commercialRebars, setCommercialRebars] = useState('');
  const [totalRebarCost, setTotalRebarCost] = useState('');
  const [overallCost, setOverallCost] = useState('');

  // New states for tie wire calculations
  const [tieWireOption, setTieWireOption] = useState('option1');
  const [tieWireWeight, setTieWireWeight] = useState('');
  const [tieWireCost, setTieWireCost] = useState(''); // New state for Tie Wire Cost

  const calculateBlocks = () => {
    // Parse all numeric inputs
    const parsedWallLength = parseFloat(wallLength);
    const parsedWallHeight = parseFloat(wallHeight);
    const parsedBlockPrice = parseFloat(blockPrice);
    const parsedCementPrice = parseFloat(cementPrice);
    const parsedSandPrice = parseFloat(sandPrice);
    const parsedRebarPricePerMeter = parseFloat(rebarPricePerMeter);
    const parsedTieWirePrice = parseFloat(tieWirePrice);

    if (
      isNaN(parsedWallLength) ||
      isNaN(parsedWallHeight) ||
      isNaN(parsedBlockPrice) ||
      isNaN(parsedCementPrice) ||
      isNaN(parsedSandPrice) ||
      isNaN(parsedRebarPricePerMeter) ||
      isNaN(parsedTieWirePrice)
    ) {
      alert('Please enter valid numeric values for all inputs.');
      return;
    }

    const area = parsedWallLength * parsedWallHeight;
    const blocks = area * 12.5;
    const cost = blocks * parsedBlockPrice;
    const cement = area * 0.522;
    const sand = area * 0.435;

    const cementCost = cement * parsedCementPrice;
    const sandCost = sand * parsedSandPrice;

    const verticalRebars = area * 1.60;
    const horizontalRebars = area * 2.15;
    const totalRebarsValue = verticalRebars + horizontalRebars;
    const commercialRebarsValue = Math.ceil (totalRebarsValue / 6.0);

    const rebarCost = commercialRebarsValue * parsedRebarPricePerMeter;

    // Calculate tie wire based on the selected option
    let tieWireKg = 0;
    if (tieWireOption === 'option1') {
      tieWireKg = area * 0.024; // Vertical bars 80 cm, horizontal 3 layers
    } else if (tieWireOption === 'option2') {
      tieWireKg = area * 0.044; // Vertical bars 60 cm, horizontal 2 layers
    }

    const calculatedTieWireCost = tieWireKg * parsedTieWirePrice;

    setTieWireWeight(tieWireKg.toFixed(2));
    setTieWireCost(calculatedTieWireCost.toFixed(2));

    // Calculate overall cost including tie wire
    const totalMaterialCost = cost + cementCost + sandCost + rebarCost + calculatedTieWireCost;

    setWallArea(area.toFixed(2));
    setTotalBlocks(blocks.toFixed(0));
    setTotalCost(cost.toFixed(2));
    setCementBags(cement.toFixed(0));
    setSandVolume(sand.toFixed(2));
    setTotalCementCost(cementCost.toFixed(2));
    setTotalSandCost(sandCost.toFixed(2));
    setTotalRebars(totalRebarsValue.toFixed(2));
    setCommercialRebars(Math.ceil(commercialRebarsValue));
    setTotalRebarCost(rebarCost.toFixed(2));

    // Set overall cost including tie wire
    setOverallCost(totalMaterialCost.toFixed(2));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Blocks and Rebars Quantity Calculation</Text>

        {/* Inputs Section */}
        <Text style={styles.sectionTitle}>Dimension of Wall</Text>
        <View style={styles.inputColumn}>
          <Text style={styles.textLabel}>Length L (m):</Text>
          <TextInput
            style={styles.input}
            placeholder="Length"
            value={wallLength}
            onChangeText={setWallLength}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputColumn}>
          <Text style={styles.textLabel}>Height h (m):</Text>
          <TextInput
            style={styles.input}
            placeholder="Height"
            value={wallHeight}
            onChangeText={setWallHeight}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Dimension of Block</Text>
        <View style={styles.inputColumn}>
          <Text style={styles.textLabel}>Length L (cm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Length"
            value={blockLength}
            onChangeText={setBlockLength}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputColumn}>
          <Text style={styles.textLabel}>Width w (cm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Width"
            value={blockWidth}
            onChangeText={setBlockWidth}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Mortar Ratio and Quantity</Text>
        <Text style={styles.textDescription}>Use class B Mix Proportion</Text>
        <View style={styles.inputRow}>
          <Text style={styles.textLabel}>Cement:</Text>
          <TextInput
            style={styles.mortarinput}
            placeholder="Cement Ratio"
            value={cementRatio}
            onChangeText={setCementRatio}
            keyboardType="numeric"
          />
          <Text style={styles.textLabel}>Sand:</Text>
          <TextInput
            style={styles.mortarinput}
            placeholder="Sand Ratio"
            value={sandRatio}
            onChangeText={setSandRatio}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Reinforcement Inputs</Text>
        <View style={styles.inputColumn}>
          <Text style={styles.textLabel}>Rebar Diameter:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rebarDiameter}
              style={styles.picker}
              onValueChange={(itemValue) => setRebarDiameter(itemValue)}
            >
              <Picker.Item label="10mm" value="10mm" />
              <Picker.Item label="12mm" value="12mm" />
              <Picker.Item label="16mm" value="16mm" />
            </Picker>
          </View>
        </View>
        <View style={styles.inputColumn}>
          <Text style={styles.textLabel}>Vertical Reinforcement Spacing (cm):</Text>
          <TextInput
            style={styles.input}
            placeholder="80"
            value="80"
            editable={false}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputColumn}>
          <Text style={styles.textLabel}>Horizontal Reinforcement Layers:</Text>
          <TextInput
            style={styles.input}
            placeholder="3"
            value="3"
            editable={false}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.smallText}>
          Standard Spacing for Vertical 80 cm and for Horizontal 3 Layers
        </Text>

        <Text style={styles.sectionTitle}>Tie Wire Option</Text>
        <Text style={styles.smallText}>Option I - Vertical 80cm, Horizontal 3 Layers"</Text>
        <Text style={styles.smallText}>Option II - Vertical 60cm, Horizontal 2 Layers</Text>
        <View style={styles.pickerContainer2}>
          <Picker
            selectedValue={tieWireOption}
            style={styles.picker2}
            onValueChange={(itemValue) => setTieWireOption(itemValue)}
          >
            <Picker.Item label="Option I" value="option1" />
            <Picker.Item label="Option II" value="option2" />
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Block Price</Text>
        <View style={styles.inputColumn}>
          <Text>₱</Text>
          <TextInput
            style={styles.input}
            placeholder="Price per Block"
            value={blockPrice}
            onChangeText={setBlockPrice}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Cement Price</Text>
        <View style={styles.inputColumn}>
          <Text>₱</Text>
          <TextInput
            style={styles.input}
            placeholder="Price per Bag of Cement"
            value={cementPrice}
            onChangeText={setCementPrice}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Sand Price</Text>
        <View style={styles.inputColumn}>
          <Text>₱</Text>
          <TextInput
            style={styles.input}
            placeholder="Price per Cubic Meter of Sand"
            value={sandPrice}
            onChangeText={setSandPrice}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Rebar Price</Text>
        <View style={styles.inputColumn}>
          <Text>₱</Text>
          <TextInput
            style={styles.input}
            placeholder="per Comm. Length"
            value={rebarPricePerMeter}
            onChangeText={setRebarPricePerMeter}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionTitle}>Tie Wire Price</Text>
        <View style={styles.inputColumn}>
          <Text>₱</Text>
          <TextInput
            style={styles.input}
            placeholder="Price per Kilogram"
            value={tieWirePrice}
            onChangeText={setTieWirePrice}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateBlocks}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        {/* Results Section */}
        <View style={styles.resultsTable}>
          <View style={styles.resultsRowHeader}>
            <Text style={styles.cellHeader}>Description</Text>
            <Text style={styles.cellHeader}>Value</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Wall Area:</Text>
            <Text>{wallArea} m²</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Blocks:</Text>
            <Text>{totalBlocks} pcs</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Cement Bags Required:</Text>
            <Text>{cementBags} pcs</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Sand Volume Required:</Text>
            <Text>{sandVolume} m³</Text>
          </View>

          <View style={styles.resultsRow}>
            <Text>Total Rebars (meters):</Text>
            <Text>{totalRebars} m</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Commercial Rebars (6m length):</Text>
            <Text>{commercialRebars} pcs</Text>
          </View>

          {/* New Row for Tie Wire Calculation */}
          <View style={styles.resultsRow}>
            <Text>Total Tie Wire (kg):</Text>
            <Text>{tieWireWeight} kg</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Cost of Tie Wire:</Text>
            <Text>{tieWireCost} ₱</Text>
          </View>

          <View style={styles.resultsRow}>
            <Text>Total Cost of Blocks:</Text>
            <Text>{totalCost} ₱</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Cement Cost:</Text>
            <Text>{totalCementCost} ₱</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Sand Cost:</Text>
            <Text>{totalSandCost} ₱</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Total Rebar Cost:</Text>
            <Text>{totalRebarCost} ₱</Text>
          </View>
          <View style={styles.resultsRow}>
            <Text>Overall Wall Material Cost:</Text>
            <Text>{overallCost} ₱</Text>
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
    borderWidth: 3,
    borderColor: '#FCC205',
    borderRadius: 32,
  },
  title: {
    alignItems: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    marginTop: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  textDescription: {
    marginBottom: 10,
    alignContent: 'center',
  },
  textLabel: {
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  inputColumn: {
    flexDirection: 'column',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 150,
    height: 35,
    marginHorizontal: 10,
  },
  mortarinput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 100,
    height: 35,
    marginHorizontal: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  picker: {
    width: 150, // Increased width for better display
    height: 30, // Increased height for better touch targets

  },

  pickerContainer2: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 150,
    height: 40,
    marginHorizontal: 10,

  },
  picker2: {
    width: 150, // Increased width for better display
    height: 40, // Increased height for better touch targets

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
  resultsTable: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FCC205',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  resultsRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor: '#FCC205',
    padding: 5,
    borderRadius: 5,
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 5,
  },
  cellHeader: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
});

export default BlocksQuantityCalculation;
