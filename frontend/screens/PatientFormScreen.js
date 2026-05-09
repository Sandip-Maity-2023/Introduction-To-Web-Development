import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, 
  StatusBar, Alert, ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';

// Firebase imports
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const THEME_BLUE = '#00D4FF';
const THEME_CYAN = '#00f2fe';
const BG_DARK = '#011835';

// Sample Data Structure (In a real app, fetch this from an API or large JSON file)
const STATE_DATA = [
  { label: 'West Bengal', value: 'WB' },
  { label: 'Maharashtra', value: 'MH' },
  { label: 'Karnataka', value: 'KA' },
  // Add more states...
];

const DISTRICT_DATA = {
  'WB': [{ label: 'North 24 Parganas', value: 'N24' }, { label: 'South 24 Parganas', value: 'S24' }],
  'MH': [{ label: 'Mumbai', value: 'MUM' }, { label: 'Pune', value: 'PUN' }],
};

export default function PatientFormScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  
  // New Location States
  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [block, setBlock] = useState('');
  const [pincode, setPincode] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleProceed = async () => {
    if (!name.trim() || !phone.trim() || !age.trim() || !state || !district || !pincode) {
      Alert.alert("Missing Information", "Please fill all required fields including location details.");
      return;
    }

    if (phone.length < 10 || pincode.length < 6) {
      Alert.alert("Validation Error", "Please check your phone number and pincode.");
      return;
    }

    try {
      setLoading(true);
      const patientData = {
        name,
        phone,
        age: parseInt(age),
        gender,
        location: {
          state,
          district,
          block,
          pincode
        },
        createdAt: serverTimestamp()
      };

      await addDoc(collection(db, "patients"), patientData);
      setLoading(false);
      navigation.navigate('Scan', { patient: patientData });
    } catch (error) {
      setLoading(false);
      Alert.alert("Cloud Error", "Failed to sync patient data.");
    }
  };

  const renderDropdown = (label, data, value, onChange, placeholder, icon) => (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.itemText}
        activeColor="rgba(0, 212, 255, 0.2)"
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={item => onChange(item.value)}
        renderLeftIcon={() => (
          <Ionicons name={icon} size={20} color={THEME_BLUE} style={{ marginRight: 10 }} />
        )}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[BG_DARK, '#021f45', '#011835']} style={StyleSheet.absoluteFill} />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Patient Intake</Text>
              <Text style={styles.subtitle}>Digital Screening Enrollment</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            {/* Basic Info */}
            <Text style={styles.label}>FULL NAME</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={THEME_BLUE} style={styles.inputIcon} />
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Suman Mondal" placeholderTextColor="rgba(255,255,255,0.3)" />
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>AGE</Text>
                <View style={styles.inputWrapper}>
                  <TextInput style={[styles.input, { paddingLeft: 15 }]} value={age} onChangeText={setAge} keyboardType="numeric" placeholder="Yrs" placeholderTextColor="rgba(255,255,255,0.3)" />
                </View>
              </View>
              <View style={{ flex: 1.5 }}>
                <Text style={styles.label}>CONTACT</Text>
                <View style={styles.inputWrapper}>
                  <TextInput style={[styles.input, { paddingLeft: 15 }]} value={phone} onChangeText={setPhone} keyboardType="numeric" maxLength={10} placeholder="10 Digits" placeholderTextColor="rgba(255,255,255,0.3)" />
                </View>
              </View>
            </View>

            {/* Location Section */}
            <View style={styles.divider} />
            
            {renderDropdown("STATE", STATE_DATA, state, setState, "Select State", "map-outline")}
            
            {state && renderDropdown("DISTRICT", DISTRICT_DATA[state] || [], district, setDistrict, "Select District", "location-outline")}

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>BLOCK</Text>
                <View style={styles.inputWrapper}>
                  <TextInput style={[styles.input, { paddingLeft: 15 }]} value={block} onChangeText={setBlock} placeholder="Block" placeholderTextColor="rgba(255,255,255,0.3)" />
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>PINCODE</Text>
                <View style={styles.inputWrapper}>
                  <TextInput style={[styles.input, { paddingLeft: 15 }]} value={pincode} onChangeText={setPincode} keyboardType="numeric" maxLength={6} placeholder="600xxx" placeholderTextColor="rgba(255,255,255,0.3)" />
                </View>
              </View>
            </View>

            <Text style={styles.label}>GENDER</Text>
            <View style={styles.genderRow}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity key={g} style={[styles.genderBtn, gender === g && styles.genderBtnActive]} onPress={() => setGender(g)}>
                  <Text style={[styles.genderText, gender === g && styles.genderTextActive]}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.submitBtnContainer} onPress={handleProceed} disabled={loading}>
            <LinearGradient colors={[THEME_BLUE, THEME_CYAN]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.submitGradient}>
              {loading ? <ActivityIndicator color="#000" /> : <><Text style={styles.submitBtnText}>PROCEED TO SCAN</Text><Ionicons name="arrow-forward" size={20} color="black" /></>}
            </LinearGradient>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 24, paddingBottom: 50 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  backButton: { padding: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 15, marginRight: 15 },
  titleContainer: { flex: 1 },
  title: { color: 'white', fontSize: 26, fontWeight: 'bold' },
  subtitle: { color: '#7A9BB5', fontSize: 13 },
  
  formCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 25, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  label: { color: THEME_BLUE, fontSize: 11, fontWeight: 'bold', letterSpacing: 1.2, marginTop: 15, marginLeft: 5 },
  inputWrapper: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', 
    borderRadius: 15, marginTop: 8, height: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  inputIcon: { marginLeft: 15 },
  input: { flex: 1, color: 'white', paddingHorizontal: 12, fontSize: 15 },
  
  dropdown: {
    height: 50, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 15,
    paddingHorizontal: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginTop: 8
  },
  dropdownContainer: { backgroundColor: '#021f45', borderRadius: 15, borderWidth: 1, borderColor: THEME_BLUE },
  placeholderStyle: { color: 'rgba(255,255,255,0.3)', fontSize: 15 },
  selectedTextStyle: { color: 'white', fontSize: 15 },
  itemText: { color: 'white' },
  
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 10 },
  row: { flexDirection: 'row', gap: 12 },
  genderRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  genderBtn: { flex: 1, paddingVertical: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  genderBtnActive: { backgroundColor: THEME_BLUE, borderColor: THEME_BLUE },
  genderText: { color: '#7A9BB5', textAlign: 'center', fontWeight: '600' },
  genderTextActive: { color: '#000', fontWeight: 'bold' },
  
  submitBtnContainer: { marginTop: 30, borderRadius: 18, overflow: 'hidden' },
  submitGradient: { height: 55, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 },
  submitBtnText: { color: '#000', fontWeight: '900', fontSize: 15 }
});