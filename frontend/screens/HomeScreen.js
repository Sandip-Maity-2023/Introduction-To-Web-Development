import React, { useEffect, useRef, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, SafeAreaView,
  ScrollView, Animated, Dimensions, StatusBar, ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
// Corrected Path: Go up to 'frontend', then into 'services'
import { db } from '../services/firebaseConfig'; 
// Added 'where' to the imports
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

const { width } = Dimensions.get('window');
const THEME_BLUE = '#00D4FF';
const BG_DARK = '#011835';

// --- 1. Eye Pulse Animation (Visual Identity) ---
function EyePulse() {
  const scale1 = useRef(new Animated.Value(1)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const scale3 = useRef(new Animated.Value(1)).current;
  const iris = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = (anim, delay, toValue = 1.35) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue, duration: 1800, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        ])
      );
    const blinkIris = Animated.loop(
      Animated.sequence([
        Animated.timing(iris, { toValue: 1.12, duration: 2200, useNativeDriver: true }),
        Animated.timing(iris, { toValue: 0.9, duration: 2200, useNativeDriver: true }),
      ])
    );
    pulse(scale1, 0).start();
    pulse(scale2, 400, 1.6).start();
    pulse(scale3, 800, 1.9).start();
    blinkIris.start();
  }, [scale1, scale2, scale3, iris]);

  return (
    <View style={eyeStyles.wrapper}>
      {[scale3, scale2, scale1].map((s, i) => (
        <Animated.View key={i} style={[eyeStyles.ring, {
          width: 80 + i * 28, height: 80 + i * 28, borderRadius: (80 + i * 28) / 2,
          opacity: 0.12 - i * 0.03, backgroundColor: THEME_BLUE, transform: [{ scale: s }],
        }]} />
      ))}
      <View style={eyeStyles.eyeOuter}>
        <Animated.View style={[eyeStyles.iris, { transform: [{ scale: iris }] }]}>
          <View style={eyeStyles.pupil}><View style={eyeStyles.highlight} /></View>
        </Animated.View>
        <ScanLineSmall />
      </View>
    </View>
  );
}

function ScanLineSmall() {
  const scanY = useRef(new Animated.Value(-38)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanY, { toValue: 38, duration: 1600, useNativeDriver: true }),
        Animated.timing(scanY, { toValue: -38, duration: 1600, useNativeDriver: true }),
      ])
    ).start();
  }, [scanY]);
  return <Animated.View style={[eyeStyles.scanLine, { transform: [{ translateY: scanY }] }]} />;
}

// --- 2. Reusable Components ---
function InfoCard({ icon, title, body }) {
  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.iconWrapper}><Text style={cardStyles.iconText}>{icon}</Text></View>
      <View style={cardStyles.textBlock}>
        <Text style={cardStyles.title}>{title}</Text>
        <Text style={cardStyles.body}>{body}</Text>
      </View>
    </View>
  );
}

function SymptomChip({ label }) {
  return (
    <View style={chipStyles.chip}>
      <View style={chipStyles.dot} />
      <Text style={chipStyles.label}>{label}</Text>
    </View>
  );
}

// --- MAIN HOME SCREEN ---
export default function HomeScreen({ navigation }) {
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Real-time Firestore Listener for Recent 2 Scans ---
  useEffect(() => {
    // UPDATED QUERY: Added where clause to prevent duplicate/incomplete records
    const q = query(
      collection(db, 'patients'), 
      where("is_analyzed", "==", true),
      orderBy('createdAt', 'desc'), 
      limit(2)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentScans(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Fetch Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* HERO SECTION */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>ASHA-Karmi Portal Active</Text>
          </View>
          <EyePulse />
          <Text style={styles.heroTitle}>{"Eye Scan\nAssistant"}</Text>
        </View>

        {/* 1. ANALYZE VISION SECTION */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaEyebrow}>START NEW SCREENING</Text>
          <Text style={styles.ctaTitle}>Analyze Vision</Text>
          
          <View style={styles.stepRow}>
            {['Details', 'Scan', 'Analyze', 'Report'].map((step, i) => (
              <View key={step} style={styles.step}>
                <View style={styles.stepNum}><Text style={styles.stepNumText}>{i + 1}</Text></View>
                <Text style={styles.stepLabel}>{step}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.scanButton} 
            onPress={() => navigation.navigate('PatientForm')} 
            activeOpacity={0.8}
          >
            <View style={styles.scanButtonInner}>
              <Ionicons name="scan-outline" size={22} color="#020C18" />
              <Text style={styles.scanButtonText}>Scan Your Eyes</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 2. RECENT HISTORY SECTION (Dynamic Data) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>RECENT SCREENINGS</Text>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.historyScroll}>
            {loading ? (
              <View style={[styles.historyCard, { justifyContent: 'center' }]}>
                <ActivityIndicator color={THEME_BLUE} />
              </View>
            ) : (
              recentScans.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Ionicons 
                      name={item.cataract_status === 'Positive' ? "alert-circle" : "checkmark-circle"} 
                      size={16} 
                      color={item.cataract_status === 'Positive' ? "#FF9500" : "#34C759"} 
                    />
                    <Text style={styles.historyDate}>
                      {item.createdAt?.seconds 
                        ? new Date(item.createdAt.seconds * 1000).toLocaleDateString([], {day: '2-digit', month: 'short'}).toUpperCase() 
                        : 'NEW'}
                    </Text>
                  </View>
                  <Text style={styles.patientName} numberOfLines={1}>{item.name || 'Patient'}</Text>
                  <Text style={[styles.historyStatus, { color: item.cataract_status === 'Positive' ? '#FF9500' : '#34C759' }]}>
                    {item.cataract_status === 'Positive' ? 'Follow-up' : 'Healthy'}
                  </Text>
                </View>
              ))
            )}
            <TouchableOpacity style={styles.historyCardAdd} onPress={() => navigation.navigate('History')}>
              <Ionicons name="add" size={24} color="#7A9BB5" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* 3. UNDERSTANDING CATARACTS SECTION (DETAILED) */}
        <View style={styles.eduSection}>
          <Text style={styles.sectionLabel}>UNDERSTANDING CATARACTS</Text>
          <Text style={styles.sectionTitle}>What is a Cataract?</Text>
          <Text style={styles.sectionBody}>
            A cataract is a progressive clouding of the eye's natural crystalline lens. This lens is responsible for focusing light onto the retina to create sharp images. 
            When proteins in the lens begin to clump together, it creates a "foggy" effect, similar to looking through a frost-covered window or a smoggy windshield.
          </Text>
          
          <Text style={[styles.sectionTitle, { fontSize: 18, marginTop: 25 }]}>Why Early Detection Matters</Text>
          <Text style={styles.sectionBody}>
            Cataracts are the primary cause of reversible blindness worldwide. Without screening, the condition often goes unnoticed until significant vision loss occurs. 
            Early identification allows for timely monitoring and low-risk surgical intervention, which has a 95% success rate in restoring 20/20 vision.
          </Text>
        </View>

        {/* 4. KEY IMPACT & CAUSE CARDS (EXPANDED) */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionLabel}>GLOBAL IMPACT & CLINICAL CAUSES</Text>
          <InfoCard 
            icon="🌐" 
            title="Global Crisis" 
            body="Cataracts are responsible for 51% of world blindness, affecting over 20 million people globally, mostly in rural areas with limited healthcare access." 
          />
          <InfoCard 
            icon="⚡" 
            title="Protein Clumping" 
            body="The lens is mostly water and protein. Aging causes proteins to denature and clump, which prevents light from passing through clearly to the retina." 
          />
          <InfoCard 
            icon="🧓" 
            title="The Age Factor" 
            body="Senile cataracts are the most common form. By age 80, more than half of all citizens either have a cataract or have had cataract surgery." 
          />
          <InfoCard 
            icon="⚠️" 
            title="Secondary Risks" 
            body="Systemic conditions like Diabetes Mellitus, prolonged use of corticosteroid medications, and hypertension significantly accelerate lens clouding." 
          />
          <InfoCard 
            icon="☀️" 
            title="Environmental Stress" 
            body="Excessive exposure to Ultraviolet (UV) radiation from sunlight without protection is a major environmental trigger for early-onset cataracts." 
          />
          <InfoCard 
            icon="🚬" 
            title="Lifestyle Impact" 
            body="Smoking and excessive alcohol consumption introduce oxidative stress into the ocular system, damaging the lens fibers over time." 
          />
        </View>

        {/* 5. SYMPTOMS SECTION (FULL LIST) */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WATCH OUT FOR</Text>
          <Text style={styles.sectionTitle}>Common Symptoms</Text>
          <View style={styles.chips}>
            {[
              'Cloudy or Blurry vision', 
              'Difficulty with night vision', 
              'Sensitivity to light/glare', 
              'Need for brighter light for reading',
              'Seeing "halos" around lights',
              'Frequent changes in eyeglass power',
              'Fading or yellowing of colors',
              'Double vision in a single eye',
              'Increased squinting in daylight',
              'Loss of depth perception'
            ].map((s) => (
              <SymptomChip key={s} label={s} />
            ))}
          </View>
        </View>

        {/* 6. PRO TIPS FOR ASHA-KARMIS */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <Text style={styles.sectionLabel}>PRO TIPS FOR ASHA-KARMIS</Text>
          <View style={styles.tipCard}>
             <Ionicons name="bulb-outline" size={24} color={THEME_BLUE} />
             <View style={{ flex: 1 }}>
               <Text style={[styles.tipText, { fontWeight: '700', color: 'white' }]}>Optimal Scanning Environment</Text>
               <Text style={styles.tipText}>
                 Ensure the patient's head is steady. Best results are achieved in indirect natural light. Avoid using the phone flash if the environment is already bright to prevent corneal reflection.
               </Text>
             </View>
          </View>
        </View>

      </ScrollView>

      {/* FLOAT BOTTOM NAVBAR */}
      <View style={navStyles.navWrapper}>
        <TouchableOpacity style={navStyles.navItem}>
          <Ionicons name="home" size={22} color={THEME_BLUE} />
          <Text style={[navStyles.navLabel, { color: THEME_BLUE }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('History')}>
          <Ionicons name="stats-chart-outline" size={22} color="#7A9BB5" />
          <Text style={navStyles.navLabel}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Clinics')}>
          <Ionicons name="map-outline" size={22} color="#7A9BB5" />
          <Text style={navStyles.navLabel}>Clinics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={22} color="#7A9BB5" />
          <Text style={navStyles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── STYLES (UNTOUCHED) ───
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG_DARK },
  scroll: { paddingBottom: 130 },
  hero: { alignItems: 'center', paddingTop: 30, paddingHorizontal: 24 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,212,255,0.1)', borderWidth: 1, borderColor: 'rgba(0,212,255,0.25)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 6, marginBottom: 20 },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: THEME_BLUE, marginRight: 8 },
  badgeText: { color: THEME_BLUE, fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  heroTitle: { fontSize: 38, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', lineHeight: 44, marginTop: 15 },
  
  ctaSection: { paddingHorizontal: 24, marginTop: 40, alignItems: 'center' },
  ctaEyebrow: { fontSize: 10, fontWeight: '800', letterSpacing: 2, color: THEME_BLUE, marginBottom: 8 },
  ctaTitle: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginBottom: 25 },
  stepRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 30 },
  step: { alignItems: 'center', flex: 1 },
  stepNum: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(0,212,255,0.1)', borderWidth: 1, borderColor: THEME_BLUE, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  stepNumText: { color: THEME_BLUE, fontWeight: '800', fontSize: 12 },
  stepLabel: { color: '#7A9BB5', fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  scanButton: { backgroundColor: THEME_BLUE, borderRadius: 18, paddingVertical: 18, alignItems: 'center', width: '100%' },
  scanButtonInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  scanButtonText: { color: '#020C18', fontSize: 16, fontWeight: '800' },

  section: { paddingHorizontal: 24, marginTop: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 2, color: THEME_BLUE, textTransform: 'uppercase' },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginTop: 8, marginBottom: 12 },
  seeAll: { color: THEME_BLUE, fontSize: 12, fontWeight: '700' },
  
  historyScroll: { gap: 12 },
  historyCard: { width: 130, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  historyDate: { color: '#7A9BB5', fontSize: 10, fontWeight: '700' },
  patientName: { color: 'white', fontWeight: '700', fontSize: 14, marginBottom: 4 },
  historyStatus: { fontSize: 12, fontWeight: '800' },
  historyCardAdd: { width: 50, backgroundColor: 'rgba(0,212,255,0.05)', borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: '#7A9BB5' },

  eduSection: { paddingHorizontal: 24, marginTop: 45 },
  sectionBody: { fontSize: 15, color: '#7A9BB5', lineHeight: 24, textAlign: 'justify' },
  
  cardsSection: { paddingHorizontal: 24, marginTop: 40 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 5 },
  
  tipCard: { flexDirection: 'row', backgroundColor: 'rgba(0, 212, 255, 0.05)', padding: 18, borderRadius: 20, borderLeftWidth: 4, borderLeftColor: THEME_BLUE, gap: 15 },
  tipText: { color: '#7A9BB5', fontSize: 13, lineHeight: 20 },
});

const chipStyles = StyleSheet.create({
  chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0, 212, 255, 0.08)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(0, 212, 255, 0.15)', marginBottom: 5 },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: THEME_BLUE, marginRight: 8 },
  label: { color: 'white', fontSize: 12, fontWeight: '600' },
});

const navStyles = StyleSheet.create({
  navWrapper: {
    position: 'absolute', bottom: 25, left: 20, right: 20, height: 75,
    backgroundColor: 'rgba(1, 24, 53, 0.98)', borderRadius: 25,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
    borderWidth: 1, borderColor: 'rgba(0, 212, 255, 0.15)',
  },
  navItem: { alignItems: 'center', flex: 1 },
  navLabel: { fontSize: 10, fontWeight: '700', marginTop: 4, textTransform: 'uppercase', color: '#7A9BB5' },
});

const eyeStyles = StyleSheet.create({
  wrapper: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute' },
  eyeOuter: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#0A1F33', borderWidth: 2, borderColor: THEME_BLUE, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  iris: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#005A8E', alignItems: 'center', justifyContent: 'center' },
  pupil: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#010A12', alignItems: 'flex-end', padding: 4 },
  highlight: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.6)' },
  scanLine: { position: 'absolute', left: 5, right: 5, height: 1.5, backgroundColor: 'rgba(0,212,255,0.6)' },
});

const cardStyles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 18, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  iconWrapper: { width: 45, height: 45, borderRadius: 12, backgroundColor: 'rgba(0,212,255,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 15 },
  iconText: { fontSize: 20 },
  textBlock: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  body: { fontSize: 13, color: '#7A9BB5', lineHeight: 20 },
});