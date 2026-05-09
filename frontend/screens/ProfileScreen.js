import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, Image, StatusBar, Dimensions, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Firebase
import { auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');
const THEME_BLUE = '#00D4FF';
const BG_DARK = '#011835';
const db = getFirestore();

// --- 1. Reusable Setting Row ---
function SettingItem({ icon, title, subtitle, onPress, isDestructive = false, showChevron = true }) {
  return (
    <TouchableOpacity style={styles.settingCard} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconBox, { backgroundColor: isDestructive ? 'rgba(255,59,48,0.1)' : 'rgba(0,212,255,0.1)' }]}>
        <Ionicons name={icon} size={20} color={isDestructive ? '#FF3B30' : THEME_BLUE} />
      </View>
      <View style={styles.settingText}>
        <Text style={[styles.settingTitle, isDestructive && { color: '#FF3B30' }]}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && <Ionicons name="chevron-forward" size={18} color="#4A667C" />}
    </TouchableOpacity>
  );
}

// --- 2. Stat Card Component ---
function StatCard({ label, value, icon }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={18} color={THEME_BLUE} style={{ marginBottom: 8 }} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    fetchUserData();
  }, []);

  // Refresh data when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          // Fallback to auth data
          setUserData({
            fullName: user.displayName || 'ASHA Worker',
            email: user.email,
            role: 'healthcare_worker'
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              Alert.alert("Error", "Could not sign out. Try again.");
            }
          } 
        }
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { userData });
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const handleNotifications = () => {
    Alert.alert("Notifications", "Notification settings coming soon!");
  };

  const handleDataSync = () => {
    Alert.alert("Data Sync", "Syncing your data with cloud...\n\nLast synced: Just now", [
      { text: "OK" }
    ]);
  };

  const handleHelp = () => {
    Alert.alert(
      "Help & Support",
      "• Email: support@cataractscreen.org\n• Phone: 1800-XXX-XXXX\n• Working Hours: 9 AM - 6 PM",
      [{ text: "OK" }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About Cataract Screening",
      "Version 3.0.1 (Techathon Build)\n\nDeveloped to empower ASHA workers in early cataract detection.\n\n© 2026 Health Ministry Initiative",
      [{ text: "OK" }]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert("Privacy Policy", "Your data is secure and encrypted. We follow all healthcare data protection standards.");
  };

  const handleTerms = () => {
    Alert.alert("Terms of Service", "By using this app, you agree to follow medical ethics and patient confidentiality guidelines.");
  };

  const handleCertificates = () => {
    navigation.navigate('Certificates');
  };

  const handleTraining = () => {
    Alert.alert("Training Materials", "Access training videos and guides in the Learning section.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={BG_DARK} />
      
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* HEADER / ID CARD SECTION */}
        <View style={styles.header}>
          <View style={styles.profileFrame}>
            <View style={styles.avatarBorder}>
              {userData?.profileImage ? (
                <Image 
                  source={{ uri: userData.profileImage }} 
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.avatar}>
                  <Ionicons name="person" size={50} color="#0A1F33" />
                </View>
              )}
            </View>
            <TouchableOpacity 
              style={styles.editAvatarBtn} 
              onPress={handleEditProfile}
            >
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-seal" size={18} color={THEME_BLUE} />
            </View>
          </View>
          
          <Text style={styles.userName}>
            {userData?.fullName || 'Loading...'}
          </Text>
          <Text style={styles.userRole}>
            {userData?.designation || 'Certified ASHA Worker'}
          </Text>
          {userData?.ashaId && (
            <View style={styles.idBadge}>
              <Text style={styles.idText}>ID: {userData.ashaId}</Text>
            </View>
          )}
        </View>

        {/* IMPACT STATS */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR SERVICE IMPACT</Text>
          <View style={styles.statsRow}>
            <StatCard label="Total Scans" value="128" icon="eye-outline" />
            <StatCard label="Follow-ups" value="14" icon="medkit-outline" />
            <StatCard label="Communities" value="06" icon="business-outline" />
          </View>
        </View>

        {/* PROFILE MANAGEMENT */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PROFILE MANAGEMENT</Text>
          
          <SettingItem 
            icon="create-outline" 
            title="Edit Profile" 
            subtitle="Update your personal information"
            onPress={handleEditProfile}
          />
          <SettingItem 
            icon="key-outline" 
            title="Change Password" 
            subtitle="Update your account password"
            onPress={handleChangePassword}
          />
          <SettingItem 
            icon="notifications-outline" 
            title="Notifications" 
            subtitle="Manage alert preferences"
            onPress={handleNotifications}
          />
        </View>

        {/* ACCOUNT DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACCOUNT DETAILS</Text>
          
          <SettingItem 
            icon="location-outline" 
            title="Assigned Region" 
            subtitle={userData?.district && userData?.state 
              ? `${userData.district}, ${userData.state}` 
              : "Not set"}
            showChevron={false}
          />
          <SettingItem 
            icon="business-outline" 
            title="Health Center" 
            subtitle={userData?.hospitalName || "Not assigned"}
            showChevron={false}
          />
          <SettingItem 
            icon="call-outline" 
            title="Contact Number" 
            subtitle={userData?.phoneNumber || "Not provided"}
            showChevron={false}
          />
          <SettingItem 
            icon="mail-outline" 
            title="Email Address" 
            subtitle={userData?.email || auth.currentUser?.email}
            showChevron={false}
          />
        </View>

        {/* DATA & SECURITY */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DATA & SECURITY</Text>
          
          <SettingItem 
            icon="cloud-upload-outline" 
            title="Data Sync" 
            subtitle="Last synced: 12 mins ago"
            onPress={handleDataSync}
          />
          <SettingItem 
            icon="shield-checkmark-outline" 
            title="Privacy Policy" 
            subtitle="How we protect your data"
            onPress={handlePrivacyPolicy}
          />
          <SettingItem 
            icon="document-text-outline" 
            title="Terms of Service" 
            onPress={handleTerms}
          />
        </View>

        {/* LEARNING & CERTIFICATES */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>LEARNING & GROWTH</Text>
          
          <SettingItem 
            icon="school-outline" 
            title="Training Materials" 
            subtitle="Videos, guides & resources"
            onPress={handleTraining}
          />
          <SettingItem 
            icon="ribbon-outline" 
            title="My Certificates" 
            subtitle="View your achievements"
            onPress={handleCertificates}
          />
        </View>

        {/* SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SUPPORT</Text>
          
          <SettingItem 
            icon="help-circle-outline" 
            title="Help & Support" 
            subtitle="Get assistance"
            onPress={handleHelp}
          />
          <SettingItem 
            icon="information-circle-outline" 
            title="About App" 
            subtitle="Version 3.0.1"
            onPress={handleAbout}
          />
        </View>

        {/* LOGOUT SECTION */}
        <View style={[styles.section, { marginTop: 20 }]}>
          <SettingItem 
            icon="log-out-outline" 
            title="Sign Out" 
            subtitle="Logout from your account"
            isDestructive={true}
            onPress={handleLogout}
          />
          <Text style={styles.versionText}>
            App Version 3.0.1 (Techathon Build)
          </Text>
        </View>

        <View style={{ height: 20 }} />

      </ScrollView>

      {/* FLOAT BOTTOM NAVBAR */}
      <View style={navStyles.navWrapper}>
        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={22} color="#7A9BB5" />
          <Text style={navStyles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('History')}>
          <Ionicons name="stats-chart-outline" size={22} color="#7A9BB5" />
          <Text style={navStyles.navLabel}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navStyles.navItem} onPress={() => navigation.navigate('Clinics')}>
          <Ionicons name="map-outline" size={22} color="#7A9BB5" />
          <Text style={navStyles.navLabel}>Clinics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={navStyles.navItem}>
          <Ionicons name="person" size={22} color={THEME_BLUE} />
          <Text style={[navStyles.navLabel, { color: THEME_BLUE }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG_DARK },
  scroll: { paddingBottom: 130 },
  header: { alignItems: 'center', paddingTop: 40, paddingHorizontal: 24 },
  profileFrame: { position: 'relative', marginBottom: 15 },
  avatarBorder: { 
    width: 110, 
    height: 110, 
    borderRadius: 55, 
    borderWidth: 2, 
    borderColor: THEME_BLUE, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderStyle: 'dashed' 
  },
  avatar: { 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    backgroundColor: THEME_BLUE, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: THEME_BLUE,
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: BG_DARK
  },
  verifiedBadge: { 
    position: 'absolute', 
    bottom: 5, 
    right: 5, 
    backgroundColor: BG_DARK, 
    borderRadius: 12, 
    padding: 2 
  },
  userName: { fontSize: 26, fontWeight: '800', color: '#FFFFFF' },
  userRole: { 
    fontSize: 14, 
    color: THEME_BLUE, 
    fontWeight: '700', 
    marginTop: 4, 
    textTransform: 'uppercase', 
    letterSpacing: 1 
  },
  idBadge: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    paddingHorizontal: 12, 
    paddingVertical: 4, 
    borderRadius: 8, 
    marginTop: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)' 
  },
  idText: { 
    color: '#7A9BB5', 
    fontSize: 11, 
    fontWeight: '700', 
    fontFamily: 'monospace' 
  },
  section: { paddingHorizontal: 24, marginTop: 35 },
  sectionLabel: { 
    fontSize: 10, 
    fontWeight: '800', 
    letterSpacing: 2, 
    color: THEME_BLUE, 
    marginBottom: 15 
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  statCard: { 
    flex: 1, 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    borderRadius: 18, 
    padding: 15, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.05)' 
  },
  statValue: { fontSize: 18, fontWeight: '800', color: '#FFFFFF' },
  statLabel: { 
    fontSize: 9, 
    color: '#7A9BB5', 
    fontWeight: '700', 
    marginTop: 2, 
    textTransform: 'uppercase' 
  },
  settingCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    borderRadius: 16, 
    padding: 14, 
    marginBottom: 10, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.05)' 
  },
  iconBox: { 
    width: 40, 
    height: 40, 
    borderRadius: 10, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginRight: 15 
  },
  settingText: { flex: 1 },
  settingTitle: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  settingSubtitle: { fontSize: 12, color: '#7A9BB5', marginTop: 2 },
  versionText: { 
    textAlign: 'center', 
    color: '#4A667C', 
    fontSize: 10, 
    fontWeight: '700', 
    marginTop: 15, 
    textTransform: 'uppercase' 
  },
});

const navStyles = StyleSheet.create({
  navWrapper: {
    position: 'absolute', 
    bottom: 25, 
    left: 20, 
    right: 20, 
    height: 75,
    backgroundColor: 'rgba(1, 24, 53, 0.98)', 
    borderRadius: 25,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around',
    borderWidth: 1, 
    borderColor: 'rgba(0, 212, 255, 0.15)',
  },
  navItem: { alignItems: 'center', flex: 1 },
  navLabel: { 
    fontSize: 10, 
    fontWeight: '700', 
    marginTop: 4, 
    textTransform: 'uppercase', 
    color: '#7A9BB5' 
  },
});