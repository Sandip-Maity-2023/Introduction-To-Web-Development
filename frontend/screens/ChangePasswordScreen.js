import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, StatusBar, Alert, ActivityIndicator, ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Firebase
import { auth } from '../services/firebaseConfig';
import { 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider 
} from 'firebase/auth';

const THEME_BLUE = '#00D4FF';
const BG_DARK = '#011835';

export default function ChangePasswordScreen({ navigation }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = () => {
    if (!currentPassword) {
      Alert.alert('Required', 'Please enter your current password');
      return false;
    }
    if (!newPassword) {
      Alert.alert('Required', 'Please enter a new password');
      return false;
    }
    if (newPassword.length < 6) {
      Alert.alert('Invalid', 'New password must be at least 6 characters');
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'New passwords do not match');
      return false;
    }
    if (currentPassword === newPassword) {
      Alert.alert('Invalid', 'New password must be different from current password');
      return false;
    }
    return true;
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;

    setLoading(true);
    try {
      const user = auth.currentUser;
      
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, newPassword);
      
      Alert.alert(
        'Success',
        'Your password has been changed successfully!',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
      
      // Clear fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
    } catch (error) {
      let errorMessage = 'Failed to change password';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'New password is too weak';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please log out and log in again before changing password';
      }
      
      Alert.alert('Error', errorMessage);
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
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        {/* Security Icon */}
        <View style={styles.iconSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="lock-closed" size={40} color={THEME_BLUE} />
          </View>
          <Text style={styles.subtitle}>
            Keep your account secure with a strong password
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          
          <Text style={styles.label}>CURRENT PASSWORD *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={THEME_BLUE} />
            <TextInput
              style={styles.input}
              placeholder="Enter current password"
              placeholderTextColor="rgba(255,255,255,0.3)"
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              <Ionicons 
                name={showCurrent ? "eye-off" : "eye"} 
                size={20} 
                color="rgba(255,255,255,0.5)" 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>NEW PASSWORD *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="key-outline" size={20} color={THEME_BLUE} />
            <TextInput
              style={styles.input}
              placeholder="Minimum 6 characters"
              placeholderTextColor="rgba(255,255,255,0.3)"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Ionicons 
                name={showNew ? "eye-off" : "eye"} 
                size={20} 
                color="rgba(255,255,255,0.5)" 
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>CONFIRM NEW PASSWORD *</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="checkmark-circle-outline" size={20} color={THEME_BLUE} />
            <TextInput
              style={styles.input}
              placeholder="Re-enter new password"
              placeholderTextColor="rgba(255,255,255,0.3)"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons 
                name={showConfirm ? "eye-off" : "eye"} 
                size={20} 
                color="rgba(255,255,255,0.5)" 
              />
            </TouchableOpacity>
          </View>

          {/* Security Tips */}
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>
              <Ionicons name="information-circle" size={14} color={THEME_BLUE} /> Password Tips
            </Text>
            <Text style={styles.tipText}>• Use at least 6 characters</Text>
            <Text style={styles.tipText}>• Mix letters, numbers & symbols</Text>
            <Text style={styles.tipText}>• Avoid common words or patterns</Text>
          </View>

          {/* Change Password Button */}
          <TouchableOpacity 
            style={styles.saveBtn} 
            onPress={handleChangePassword}
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
                <Text style={styles.btnText}>UPDATE PASSWORD</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

        </View>

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
  scroll: { padding: 25, flexGrow: 1 },
  iconSection: {
    alignItems: 'center',
    marginBottom: 35
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(0, 212, 255, 0.3)',
    marginBottom: 15
  },
  subtitle: {
    color: '#7A9BB5',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20
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
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)'
  },
  input: {
    flex: 1,
    color: 'white',
    marginLeft: 12,
    fontSize: 15
  },
  tipsBox: {
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    borderLeftWidth: 3,
    borderLeftColor: THEME_BLUE
  },
  tipsTitle: {
    color: THEME_BLUE,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.5
  },
  tipText: {
    color: '#7A9BB5',
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 18
  },
  saveBtn: {
    height: 58,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 8,
    marginTop: 10
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