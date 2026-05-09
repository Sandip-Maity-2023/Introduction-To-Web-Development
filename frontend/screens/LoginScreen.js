import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Animated, Dimensions, StatusBar,
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Firebase
import { auth } from '../services/firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');
const THEME_BLUE = '#00D4FF';
const BG_DARK = '#011835';

// Initialize Firestore
const db = getFirestore();

// --- Simple Math CAPTCHA Component ---
function MathCaptcha({ onVerify }) {
  const [num1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(Math.floor(Math.random() * 10) + 1);
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const correctAnswer = num1 + num2;

  useEffect(() => {
    if (userAnswer && parseInt(userAnswer) === correctAnswer) {
      setIsVerified(true);
      onVerify(true);
    } else {
      setIsVerified(false);
      onVerify(false);
    }
  }, [userAnswer]);

  return (
    <View style={captchaStyles.container}>
      <View style={captchaStyles.header}>
        <Ionicons name="shield-checkmark" size={16} color={THEME_BLUE} />
        <Text style={captchaStyles.title}>Security Verification</Text>
      </View>
      <View style={captchaStyles.questionBox}>
        <Text style={captchaStyles.question}>
          What is {num1} + {num2}?
        </Text>
        <View style={captchaStyles.inputWrapper}>
          <TextInput
            style={captchaStyles.input}
            placeholder="Answer"
            placeholderTextColor="rgba(255,255,255,0.3)"
            keyboardType="numeric"
            value={userAnswer}
            onChangeText={setUserAnswer}
            maxLength={3}
          />
          {isVerified && (
            <Ionicons name="checkmark-circle" size={20} color="#00FF88" />
          )}
        </View>
      </View>
    </View>
  );
}

// --- Eye Pulse Animation ---
function EyePulse() {
  const scale1 = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale1, { toValue: 1.2, duration: 1500, useNativeDriver: true }),
        Animated.timing(scale1, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={eyeStyles.wrapper}>
      <Animated.View style={[eyeStyles.ring, { transform: [{ scale: scale1 }] }]} />
      <View style={eyeStyles.eyeOuter}>
        <View style={eyeStyles.iris}>
          <View style={eyeStyles.pupil} />
        </View>
      </View>
    </View>
  );
}

export default function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  
  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Signup specific fields
  const [fullName, setFullName] = useState('');
  const [ashaId, setAshaId] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  
  // CAPTCHA
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const validateSignupFields = () => {
    if (!fullName.trim()) {
      Alert.alert("Required", "Please enter your full name.");
      return false;
    }
    if (!ashaId.trim()) {
      Alert.alert("Required", "Please enter your ASHA ID.");
      return false;
    }
    if (!hospitalName.trim()) {
      Alert.alert("Required", "Please enter your hospital/health center name.");
      return false;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      Alert.alert("Invalid", "Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!designation.trim()) {
      Alert.alert("Required", "Please select your designation.");
      return false;
    }
    if (!state.trim()) {
      Alert.alert("Required", "Please enter your state.");
      return false;
    }
    if (!district.trim()) {
      Alert.alert("Required", "Please enter your district.");
      return false;
    }
    return true;
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Required", "Please enter both email and password.");
      return;
    }

    if (isLogin && !captchaVerified) {
      Alert.alert("CAPTCHA Required", "Please complete the security verification.");
      return;
    }

    if (!isLogin && !validateSignupFields()) {
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Welcome back!");
      } else {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update profile with display name
        await updateProfile(user, {
          displayName: fullName
        });

        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          fullName,
          ashaId,
          hospitalName,
          phoneNumber,
          designation,
          state,
          district,
          email,
          createdAt: new Date().toISOString(),
          role: 'healthcare_worker'
        });

        Alert.alert("Success", "Account created successfully! Please sign in.");
        
        // Reset form and switch to login
        resetForm();
        setIsLogin(true);
      }
    } catch (error) {
      let errorMessage = error.message;
      
      // Provide user-friendly error messages
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please login instead.";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      }
      
      Alert.alert("Authentication Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setAshaId('');
    setHospitalName('');
    setPhoneNumber('');
    setDesignation('');
    setState('');
    setDistrict('');
    setCaptchaVerified(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Email Needed", "Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset link sent! Check your email inbox.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleToggleMode = () => {
    resetForm();
    setIsLogin(!isLogin);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[BG_DARK, '#002B4D']} style={styles.fullScreen}>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          style={{ flex: 1 }}
        >
          <ScrollView 
            contentContainerStyle={styles.scroll} 
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            
            {/* Header Section */}
            <View style={styles.header}>
              <EyePulse />
              <Text style={styles.title}>
                {isLogin ? "Welcome Back" : "Join Our Mission"}
              </Text>
              <Text style={styles.subtitle}>
                {isLogin 
                  ? "Sign in to continue screening" 
                  : "Register as a healthcare professional"}
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              
              {/* Signup Additional Fields */}
              {!isLogin && (
                <>
                  <Text style={styles.label}>FULL NAME *</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="person-outline" size={20} color={THEME_BLUE} />
                    <TextInput
                      style={styles.input}
                      placeholder="Dr. Rajesh Kumar"
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

                  <Text style={styles.label}>HOSPITAL / HEALTH CENTER *</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="business-outline" size={20} color={THEME_BLUE} />
                    <TextInput
                      style={styles.input}
                      placeholder="Primary Health Center, Kolkata"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      value={hospitalName}
                      onChangeText={setHospitalName}
                    />
                  </View>

                  <Text style={styles.label}>PHONE NUMBER *</Text>
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

                  <Text style={styles.label}>DESIGNATION *</Text>
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
                      <Text style={styles.label}>STATE *</Text>
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
                      <Text style={styles.label}>DISTRICT *</Text>
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
                </>
              )}

              {/* Email Field */}
              <Text style={styles.label}>EMAIL ADDRESS *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="mail-outline" size={20} color={THEME_BLUE} />
                <TextInput
                  style={styles.input}
                  placeholder="name@healthcare.org"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              {/* Password Field */}
              <Text style={styles.label}>PASSWORD *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="lock-closed-outline" size={20} color={THEME_BLUE} />
                <TextInput
                  style={styles.input}
                  placeholder="Minimum 6 characters"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="rgba(255,255,255,0.5)" 
                  />
                </TouchableOpacity>
              </View>

              {/* CAPTCHA for Login */}
              {isLogin && (
                <MathCaptcha onVerify={setCaptchaVerified} />
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPass}>
                  <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>
              )}

              {/* Main Action Button */}
              <TouchableOpacity 
                style={styles.mainBtn} 
                onPress={handleAuth} 
                disabled={loading}
              >
                <LinearGradient 
                  colors={[THEME_BLUE, '#0088FF']} 
                  start={{x: 0, y: 0}} 
                  end={{x: 1, y: 0}}
                  style={styles.btnGradient}
                >
                  {loading ? (
                    <ActivityIndicator color="#011835" />
                  ) : (
                    <Text style={styles.btnText}>
                      {isLogin ? "SIGN IN" : "CREATE ACCOUNT"}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Toggle Login/Signup */}
              <View style={styles.footerToggle}>
                <Text style={styles.footerText}>
                  {isLogin ? "Don't have an account?" : "Already registered?"}
                </Text>
                <TouchableOpacity onPress={handleToggleMode}>
                  <Text style={styles.toggleLink}>
                    {isLogin ? " Sign Up" : " Login"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Medical Info Section */}
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>
                <Ionicons name="medical" size={16} color={THEME_BLUE} /> CATARACT AWARENESS
              </Text>
              <Text style={styles.infoText}>
                Cataracts cause the eye's natural lens to become cloudy. Early detection via 
                smartphone screening helps prevent reversible blindness in rural areas. 
                Join us in making eye care accessible to everyone.
              </Text>
            </View>

            <View style={{ height: 30 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_DARK },
  fullScreen: { flex: 1 },
  scroll: { flexGrow: 1, padding: 25, paddingTop: 40 },
  header: { alignItems: 'center', marginBottom: 35 },
  title: { 
    color: 'white', 
    fontSize: 28, 
    fontWeight: '900', 
    marginTop: 15,
    textAlign: 'center'
  },
  subtitle: { 
    color: '#7A9BB5', 
    fontSize: 14, 
    marginTop: 5,
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
  forgotPass: { 
    alignSelf: 'flex-end', 
    marginBottom: 20,
    marginTop: -5
  },
  forgotText: { 
    color: '#7A9BB5', 
    fontSize: 13,
    textDecorationLine: 'underline'
  },
  mainBtn: { 
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
  footerToggle: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 25,
    marginBottom: 10
  },
  footerText: { 
    color: '#7A9BB5', 
    fontSize: 14 
  },
  toggleLink: { 
    color: THEME_BLUE, 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  infoBox: {
    marginTop: 30,
    backgroundColor: 'rgba(0, 212, 255, 0.05)',
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: THEME_BLUE
  },
  infoTitle: { 
    color: THEME_BLUE, 
    fontWeight: 'bold', 
    fontSize: 12, 
    marginBottom: 8,
    letterSpacing: 0.5
  },
  infoText: { 
    color: '#7A9BB5', 
    fontSize: 13, 
    lineHeight: 20 
  }
});

const eyeStyles = StyleSheet.create({
  wrapper: { 
    width: 100, 
    height: 100, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  ring: { 
    position: 'absolute', 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    borderWidth: 2, 
    borderColor: THEME_BLUE, 
    opacity: 0.2 
  },
  eyeOuter: { 
    width: 65, 
    height: 65, 
    borderRadius: 32.5, 
    backgroundColor: '#0A1F33', 
    borderWidth: 2, 
    borderColor: THEME_BLUE, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: THEME_BLUE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10
  },
  iris: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#005A8E', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  pupil: { 
    width: 14, 
    height: 14, 
    borderRadius: 7, 
    backgroundColor: '#000' 
  },
});

const captchaStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 212, 255, 0.08)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    color: THEME_BLUE,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
    letterSpacing: 1
  },
  questionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  question: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    width: 100,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  }
});