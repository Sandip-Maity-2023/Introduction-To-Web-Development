import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
  Dimensions, ActivityIndicator, Animated, StatusBar, Easing,
} from 'react-native';

import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');
const MASK_SIZE = width * 0.75;
const THEME_COLOR = '#00D4FF';
const DANGER_COLOR = '#FF3B30';
const SUCCESS_COLOR = '#34C759';

// ---------- COMPONENTS ----------

const GlassButton = ({ onPress, icon, label, style, color = 'white' }) => (
  <TouchableOpacity onPress={onPress} style={[styles.glassBtnContainer, style]}>
    <BlurView intensity={20} tint="light" style={styles.glassBtn}>
      <Ionicons name={icon} size={22} color={color} />
      {label && <Text style={[styles.glassBtnLabel, { color }]}>{label}</Text>}
    </BlurView>
  </TouchableOpacity>
);

const FrameCorners = ({ size }) => (
  <View style={[styles.frameContainer, { width: size, height: size }]}>
    <View style={[styles.corner, styles.topLeft]} />
    <View style={[styles.corner, styles.topRight]} />
    <View style={[styles.corner, styles.bottomLeft]} />
    <View style={[styles.corner, styles.bottomRight]} />
  </View>
);

function ScanLine({ size }) {
  const scanY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanY, {
          toValue: size,
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scanY, {
          toValue: 0,
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [size]);

  return (
    <Animated.View 
      style={[
        styles.scanLine, 
        { width: size, transform: [{ translateY: scanY }] }
      ]} 
    />
  );
}

// ---------- MAIN SCREEN ----------

export default function ScanScreen({ navigation, route }) {
  const isFocused = useIsFocused();
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [flash, setFlash] = useState('off');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const cameraRef = useRef(null);
  
  // Extracting patient data and ID from route params
  const patient = route?.params?.patient || { name: 'Unknown Patient' };
  const patientId = route?.params?.patientId; // Crucial for Firebase Update

  // Permission Guard
  if (!permission || !permission.granted) {
    return (
      <View style={styles.permContainer}>
        <BlurView intensity={30} tint="dark" style={styles.permCard}>
          <MaterialCommunityIcons name="camera-iris" size={80} color={THEME_COLOR} />
          <Text style={styles.permTitle}>Camera Access Required</Text>
          <Text style={styles.permSub}>To perform precise eye scans, we need access to your device camera.</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={requestPermission}>
            <Text style={styles.primaryBtnText}>ENABLE CAMERA</Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current || isProcessing) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsProcessing(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: false,
        skipMetadata: true,
      });
      processImage(photo.uri, photo.width, photo.height);
    } catch (e) {
      console.error("Capture failed", e);
      setIsProcessing(false);
    }
  };

  const handleGalleryPick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0];
      processImage(img.uri, img.width, img.height);
    }
  };

  const processImage = async (uri, width, height) => {
    setIsProcessing(true);
    const cropSize = Math.min(width, height) * 0.9;
    const originX = (width - cropSize) / 2;
    const originY = (height - cropSize) / 2;

    try {
      const cropped = await ImageManipulator.manipulateAsync(
        uri,
        [
          { crop: { originX, originY, width: cropSize, height: cropSize } },
          { resize: { width: 1000, height: 1000 } },
        ],
        { compress: 0.85, format: ImageManipulator.SaveFormat.JPEG }
      );
      setCapturedImage(cropped.uri);
      setPreviewVisible(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsProcessing(false);
    }
  };

  // ---------- RENDER PREVIEW ----------
  if (previewVisible) {
    return (
      <View style={styles.previewContainer}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.previewContent}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>Scan Captured</Text>
            <View style={styles.patientBadge}>
              <Text style={styles.patientText}>PATIENT: {patient.name?.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.imageCard}>
            <Image source={{ uri: capturedImage }} style={styles.fullImage} />
            <FrameCorners size="100%" />
          </View>

          <View style={styles.previewFooter}>
            <TouchableOpacity 
              style={styles.secondaryBtn} 
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setPreviewVisible(false);
              }}
            >
              <Ionicons name="refresh" size={20} color="white" />
              <Text style={styles.secondaryBtnText}>RETAKE</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.analyzeBtn}
              onPress={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                // Passing patientId forward to result screen for the Firebase Update logic
                navigation.navigate('Result', { image: capturedImage, patient, patientId });
              }}
            >
              <Text style={styles.analyzeBtnText}>START ANALYSIS</Text>
              <Ionicons name="analytics" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  // ---------- RENDER CAMERA ----------
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {isFocused && (
        <CameraView 
          style={styles.camera} 
          ref={cameraRef} 
          facing={facing}
          flash={flash}
        >
          <SafeAreaView style={styles.overlay}>
            
            {/* Top Navigation Bar */}
            <View style={styles.headerNav}>
              <GlassButton icon="chevron-back" onPress={() => navigation.goBack()} />
              
              <View style={styles.headerStatus}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>SYSTEM LIVE</Text>
              </View>

              <GlassButton 
                icon={flash === 'on' ? "flash" : "flash-off"} 
                onPress={() => {
                   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                   setFlash(flash === 'on' ? 'off' : 'on');
                }}
                color={flash === 'on' ? THEME_COLOR : 'white'}
              />
            </View>

            {/* Scanning Viewfinder */}
            <View style={styles.centerSection}>
              <View style={styles.viewfinder}>
                <FrameCorners size={MASK_SIZE} />
                <View style={styles.innerView}>
                  <ScanLine size={MASK_SIZE} />
                </View>
                
                {/* HUD Elements */}
                <View style={[styles.hudText, { top: -30 }]}>
                  <Text style={styles.hudLabel}>ALIGNMENT: <Text style={{color: SUCCESS_COLOR}}>OPTIMAL</Text></Text>
                </View>
                <View style={[styles.hudText, { bottom: -30 }]}>
                  <Text style={styles.hudLabel}>RESOLUTION: 4K • HDR</Text>
                </View>
              </View>
            </View>

            {/* Bottom Controls */}
            <View style={styles.footerNav}>
              <Text style={styles.instructionText}>Position eye within the markers and hold steady</Text>
              
              <View style={styles.controlsRow}>
                {/* Switch Camera */}
                <TouchableOpacity 
                  style={styles.utilityBtn} 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    setFacing(facing === 'back' ? 'front' : 'back');
                  }}
                >
                  <Ionicons name="camera-reverse-outline" size={28} color="white" />
                </TouchableOpacity>

                {/* Main Capture */}
                <TouchableOpacity 
                  activeOpacity={0.8}
                  style={styles.captureOuter}
                  onPress={handleCapture}
                  disabled={isProcessing}
                >
                  <View style={styles.captureInner}>
                    {isProcessing ? (
                      <ActivityIndicator color={THEME_COLOR} size="large" />
                    ) : (
                      <View style={styles.captureTrigger} />
                    )}
                  </View>
                </TouchableOpacity>

                {/* Gallery */}
                <TouchableOpacity 
                  style={styles.utilityBtn} 
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    handleGalleryPick();
                  }}
                >
                  <Ionicons name="images-outline" size={28} color="white" />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomBar} />
            </View>

          </SafeAreaView>
        </CameraView>
      )}
    </View>
  );
}

// ---------- STYLES (NO CHANGES MADE TO GUI) ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'space-between' },
  headerNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  headerStatus: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: SUCCESS_COLOR, marginRight: 8 },
  liveText: { color: 'white', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  centerSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  viewfinder: { width: MASK_SIZE, height: MASK_SIZE, justifyContent: 'center', alignItems: 'center' },
  innerView: { width: MASK_SIZE - 10, height: MASK_SIZE - 10, overflow: 'hidden', backgroundColor: 'rgba(0,212,255,0.03)' },
  scanLine: { height: 4, backgroundColor: THEME_COLOR, shadowColor: THEME_COLOR, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 10 },
  frameContainer: { position: 'absolute' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: THEME_COLOR, borderWidth: 3 },
  topLeft: { top: 0, left: 0, borderBottomWidth: 0, borderRightWidth: 0 },
  topRight: { top: 0, right: 0, borderBottomWidth: 0, borderLeftWidth: 0 },
  bottomLeft: { bottom: 0, left: 0, borderTopWidth: 0, borderRightWidth: 0 },
  bottomRight: { bottom: 0, right: 0, borderTopWidth: 0, borderLeftWidth: 0 },
  hudText: { position: 'absolute', width: '100%', alignItems: 'center' },
  hudLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '600', letterSpacing: 1.5 },
  footerNav: { paddingBottom: 20, alignItems: 'center' },
  instructionText: { color: 'white', fontSize: 13, marginBottom: 30, textAlign: 'center', width: '70%', opacity: 0.8 },
  controlsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%', paddingHorizontal: 20 },
  captureOuter: { width: 88, height: 88, borderRadius: 44, borderWidth: 4, borderColor: 'white', padding: 6, justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: '100%', height: '100%', borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  captureTrigger: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' },
  utilityBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  bottomBar: { width: 120, height: 5, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 10, marginTop: 30 },
  previewContainer: { flex: 1, backgroundColor: '#050B12' },
  previewContent: { flex: 1, padding: 24, justifyContent: 'space-between' },
  previewHeader: { alignItems: 'center', marginTop: 10 },
  previewTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  patientBadge: { marginTop: 10, paddingHorizontal: 12, paddingVertical: 4, backgroundColor: 'rgba(0,212,255,0.1)', borderRadius: 6, borderWidth: 1, borderColor: THEME_COLOR },
  patientText: { color: THEME_COLOR, fontSize: 12, fontWeight: '800' },
  imageCard: { width: width - 48, height: width - 48, alignSelf: 'center', borderRadius: 20, overflow: 'hidden', elevation: 20, shadowColor: '#000', shadowRadius: 15, shadowOpacity: 0.5 },
  fullImage: { width: '100%', height: '100%' },
  previewFooter: { gap: 16 },
  analyzeBtn: { height: 64, backgroundColor: SUCCESS_COLOR, borderRadius: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12 },
  analyzeBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  secondaryBtn: { height: 56, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  secondaryBtnText: { color: 'white', fontSize: 16, fontWeight: '600' },
  glassBtnContainer: { borderRadius: 12, overflow: 'hidden' },
  glassBtn: { padding: 12, flexDirection: 'row', alignItems: 'center' },
  glassBtnLabel: { marginLeft: 8, fontWeight: 'bold', fontSize: 12 },
  permContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', padding: 30 },
  permCard: { width: '100%', padding: 40, borderRadius: 30, alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  permTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
  permSub: { color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 12, lineHeight: 20 },
  primaryBtn: { backgroundColor: THEME_COLOR, paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, marginTop: 30, width: '100%', alignItems: 'center' },
  primaryBtnText: { color: '#000', fontWeight: '900', fontSize: 14 },
});