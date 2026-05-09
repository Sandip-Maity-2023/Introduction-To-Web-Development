import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, StatusBar, Alert, ActivityIndicator, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

// Firebase
import { auth } from '../services/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const THEME_BLUE = '#00D4FF';
const BG_DARK = '#011835';
const db = getFirestore();
const storage = getStorage();

export default function EditProfileScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Form fields
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [ashaId, setAshaId] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileImage(data.profileImage || null);
          setFullName(data.fullName || '');
          setAshaId(data.ashaId || '');
          setHospitalName(data.hospitalName || '');
          setPhoneNumber(data.phoneNumber || '');
          setDesignation(data.designation || '');
          setState(data.state || '');
          setDistrict(data.district || '');
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Needed', 'Please grant camera roll permissions to upload a profile picture.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled) {
        setUploading(true);
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    } finally {
      setUploading(false);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const user = auth.currentUser;
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const imageRef = ref(storage, `profile_images/${user.uid}.jpg`);
      await uploadBytes(imageRef, blob);
      
      const downloadURL = await getDownloadURL(imageRef);
      setProfileImage(downloadURL);
      
      Alert.alert('Success', 'Profile picture uploaded!');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image: ' + error.message);
    }
  };

  const handleSave = async () => {
    if (!fullName.trim()) {
      Alert.alert('Required', 'Please enter your full name');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: fullName,
        photoURL: profileImage
      });

      // Update Firestore document
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        fullName,
        ashaId,
        hospitalName,
        phoneNumber,
        designation,
        state,
        district,
        profileImage,
        updatedAt: new Date().toISOString()
      });

      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section */}
        <View style={styles.imageSection}>
          <TouchableOpacity onPress={pickImage} disabled={uploading}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={50} color="#0A1F33" />
                </View>
              )}
              <View style={styles.cameraIcon}>
                {uploading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Ionicons name="camera" size={18} color="#FFFFFF" />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.imageHint}>Tap to change profile picture</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          
          <Text style={styles.label}>FULL NAME *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={THEME_BLUE} />
            <TextInput
              style={styles.input}
              placeholder="Your full name"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <Text style={styles.label}>ASHA ID / HEALTHCARE ID *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="card-outline" size={20} color={THEME_BLUE} />
            <TextInput
              style={styles.input}
              placeholder="ASHA123456789"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={ashaId}
              onChangeText={setAshaId}
              autoCapitalize="characters"
            />
          </View>

          <Text style={styles.label}>HOSPITAL / HEALTH CENTER</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="business-outline" size={20} color={THEME_BLUE} />
            <TextInput
              style={styles.input}
              placeholder="Primary Health Center"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={hospitalName}
              onChangeText={setHospitalName}
            />
          </View>

          <Text style={styles.label}>PHONE NUMBER</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="call-outline" size={20} color={THEME_BLUE} />
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="9876543210"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>

          <Text style={styles.label}>DESIGNATION</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="medical-outline" size={20} color={THEME_BLUE} />
            <TextInput
              style={styles.input}
              placeholder="ASHA Worker / Nurse / Doctor"
              placeholderTextColor="rgba(255,255,255,0.3)"
              value={designation}
              onChangeText={setDesignation}
            />
          </View>

          <View style={styles.rowInputs}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>STATE</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="location-outline" size={18} color={THEME_BLUE} />
                <TextInput
                  style={[styles.input, { fontSize: 14 }]}
                  placeholder="West Bengal"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={state}
                  onChangeText={setState}
                />
              </View>
            </View>

            <View style={styles.halfInput}>
              <Text style={styles.label}>DISTRICT</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="pin-outline" size={18} color={THEME_BLUE} />
                <TextInput
                  style={[styles.input, { fontSize: 14 }]}
                  placeholder="Kolkata"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={district}
                  onChangeText={setDistrict}
                />
              </View>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity 
            style={styles.saveBtn} 
            onPress={handleSave}
            disabled={loading}
          >
            <LinearGradient
              colors={[THEME_BLUE, '#0088FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              {loading ? (
                <ActivityIndicator color="#011835" />
              ) : (
                <Text style={styles.btnText}>SAVE CHANGES</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG_DARK },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)'
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5
  },
  scroll: { padding: 25 },
  imageSection: {
    alignItems: 'center',
    marginBottom: 30
  },
  avatarContainer: {
    position: 'relative'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: THEME_BLUE
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: THEME_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: THEME_BLUE
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: THEME_BLUE,
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: BG_DARK
  },
  imageHint: {
    color: '#7A9BB5',
    fontSize: 13,
    marginTop: 10
  },
  formContainer: { width: '100%' },
  label: {
    color: THEME_BLUE,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 1.2
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)'
  },
  input: {
    flex: 1,
    color: 'white',
    marginLeft: 12,
    fontSize: 15
  },
  countryCode: {
    color: THEME_BLUE,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  halfInput: {
    flex: 1
  },
  saveBtn: {
    height: 58,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    marginTop: 20
  },
  btnGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#011835',
    fontWeight: '900',
    fontSize: 15,
    letterSpacing: 2
  },
});