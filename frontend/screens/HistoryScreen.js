import React, { useEffect, useState, useMemo } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  ActivityIndicator, StatusBar, Alert, RefreshControl, Dimensions, Modal, TextInput, Platform
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import DateTimePicker from '@react-native-community/datetimepicker';

// Firebase Imports
import { db } from '../services/firebaseConfig';
// FIXED: Removed the extra characters causing the syntax error
import { collection, onSnapshot, query, orderBy, doc, deleteDoc, where } from "firebase/firestore";
import { generatePDF } from '../services/pdfService';

const { width } = Dimensions.get('window');
const BG_DARK = '#020C18';
const THEME_BLUE = '#00D4FF';
const SUCCESS_GREEN = '#34C759';
const ERROR_RED = '#FF3B30';

const GlassButton = ({ onPress, icon, active }) => (
  <TouchableOpacity onPress={onPress} style={styles.glassBtnContainer}>
    <BlurView intensity={20} tint="light" style={[styles.glassBtn, active && { backgroundColor: 'rgba(0, 212, 255, 0.2)' }]}>
      <Ionicons name={icon} size={20} color={active ? THEME_BLUE : "white"} />
    </BlurView>
  </TouchableOpacity>
);

export default function HistoryScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [filterVisible, setFilterVisible] = useState(false);
  const [dateFilter, setDateFilter] = useState('All'); 
  
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const subscribeToPatients = () => {
    setLoading(true);
    try {
      const patientsRef = collection(db, "patients");
      
      // Filter to only show records that have been successfully analyzed/published
      const q = query(
        patientsRef, 
        where("is_analyzed", "==", true), 
        orderBy("createdAt", "desc")
      );

      return onSnapshot(q, (snapshot) => {
        const pData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPatients(pData);
        setLoading(false);
        setRefreshing(false);
      }, (error) => {
        console.error("Firestore Error:", error);
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToPatients();
    return () => unsubscribe && unsubscribe();
  }, []);

  const filteredData = useMemo(() => {
    return patients.filter(item => {
      const nameMatch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
      const mobileVal = (item.mobile || item.phone || "").toString();
      const mobileMatch = mobileVal.includes(searchQuery);
      const matchesSearch = nameMatch || mobileMatch;
      
      if (!item.createdAt || dateFilter === 'All') return matchesSearch;
      
      const itemDate = new Date(item.createdAt.seconds * 1000);
      const now = new Date();
      let matchesDate = true;

      if (dateFilter === 'Today') {
        matchesDate = itemDate.toDateString() === now.toDateString();
      } else if (dateFilter === 'Yesterday') {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        matchesDate = itemDate.toDateString() === yesterday.toDateString();
      } else if (dateFilter === 'Week') {
        const lastWeek = new Date();
        lastWeek.setDate(now.getDate() - 7);
        matchesDate = itemDate >= lastWeek;
      } else if (dateFilter === 'Month') {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        matchesDate = itemDate >= lastMonth;
      } else if (dateFilter === 'Custom Range') {
        const start = new Date(fromDate.setHours(0, 0, 0, 0));
        const end = new Date(toDate.setHours(23, 59, 59, 999));
        matchesDate = itemDate >= start && itemDate <= end;
      }

      return matchesSearch && matchesDate;
    });
  }, [patients, searchQuery, dateFilter, fromDate, toDate]);

  const handleDelete = (id, name) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert("Delete Record", `Permanently delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
          await deleteDoc(doc(db, "patients", id));
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }}
    ]);
  };

  const renderItem = ({ item }) => {
    const isPositive = item.cataract_status === "Positive";
    const statusColor = isPositive ? ERROR_RED : SUCCESS_GREEN;
    const dateObj = item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000) : new Date();

    return (
      <BlurView intensity={10} tint="dark" style={styles.patientCard}>
        <View style={styles.cardHeader}>
          <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
          <Text style={styles.patientName} numberOfLines={1}>{item.name?.toUpperCase() || "UNKNOWN"}</Text>
          <View style={[styles.badge, { borderColor: statusColor }]}>
            <Text style={[styles.badgeText, { color: statusColor }]}>{isPositive ? "CATARACT +" : "NORMAL"}</Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}><Ionicons name="person-outline" size={12} color={THEME_BLUE} /><Text style={styles.detailText}>Age: {item.age || "N/A"}</Text></View>
          <View style={styles.detailItem}><Ionicons name="call-outline" size={12} color={THEME_BLUE} /><Text style={styles.detailText}>{item.mobile || item.phone || "No Mobile"}</Text></View>
          <View style={styles.detailItem}><Ionicons name="location-outline" size={12} color={THEME_BLUE} /><Text style={styles.detailText}>{item.village || "N/A"}</Text></View>
          <View style={styles.detailItem}><Ionicons name="calendar-outline" size={12} color={THEME_BLUE} /><Text style={styles.detailText}>{dateObj.toLocaleDateString()}</Text></View>
        </View>

        <View style={styles.analysisRow}>
          <Text style={styles.analysisLabel}>AI CONFIDENCE: <Text style={{color: statusColor, fontWeight: 'bold'}}>{item.cataract_value || "0"}%</Text></Text>
          <Text style={styles.timeLabel}>{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.viewReportBtn} onPress={() => generatePDF(item)}>
            <LinearGradient colors={['rgba(0,212,255,0.15)', 'rgba(0,212,255,0.05)']} style={styles.btnGradient}>
              <FontAwesome5 name="file-pdf" size={14} color={THEME_BLUE} /><Text style={styles.viewReportText}>VIEW REPORT</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id, item.name)}>
            <Ionicons name="trash-outline" size={18} color={ERROR_RED} />
          </TouchableOpacity>
        </View>
      </BlurView>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={[BG_DARK, '#041629']} style={styles.fullScreen}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backCircle}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>PATIENT ARCHIVES</Text>
            <Text style={styles.headerSub}>{filteredData.length} Records Found</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <GlassButton icon="refresh" onPress={subscribeToPatients} />
            <GlassButton icon="options-outline" onPress={() => setFilterVisible(true)} active={dateFilter !== 'All'} />
          </View>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="rgba(255,255,255,0.3)" style={{ marginLeft: 15 }} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search name or mobile..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {loading ? (
          <View style={styles.center}><ActivityIndicator size="large" color={THEME_BLUE} /></View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={subscribeToPatients} tintColor={THEME_BLUE} />}
            ListEmptyComponent={() => (
              <View style={styles.center}>
                <Text style={{color: 'white', opacity: 0.5}}>No analyzed records found.</Text>
              </View>
            )}
          />
        )}

        {/* Filter Modal */}
        <Modal visible={filterVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <BlurView intensity={95} tint="dark" style={styles.filterMenu}>
              <Text style={styles.filterTitle}>FILTER RECORDS</Text>
              <View style={styles.quickOptions}>
                {['All', 'Today', 'Yesterday', 'Week', 'Month'].map((opt) => (
                  <TouchableOpacity 
                    key={opt} 
                    style={[styles.miniBtn, dateFilter === opt && styles.activeMiniBtn]} 
                    onPress={() => setDateFilter(opt)}
                  >
                    <Text style={[styles.miniBtnText, dateFilter === opt && {color: 'black'}]}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.divider} />
              <Text style={styles.sectionLabel}>CUSTOM DATE RANGE</Text>
              <View style={styles.dateRow}>
                <TouchableOpacity style={styles.datePickerBtn} onPress={() => setShowFromPicker(true)}>
                  <Text style={styles.dateLabel}>FROM</Text>
                  <Text style={styles.dateValue}>{fromDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.datePickerBtn} onPress={() => setShowToPicker(true)}>
                  <Text style={styles.dateLabel}>TO</Text>
                  <Text style={styles.dateValue}>{toDate.toLocaleDateString()}</Text>
                </TouchableOpacity>
              </View>

              {(showFromPicker || showToPicker) && (
                <DateTimePicker
                  value={showFromPicker ? fromDate : toDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e, d) => {
                    setShowFromPicker(false);
                    setShowToPicker(false);
                    if(d) {
                      if(showFromPicker) setFromDate(d);
                      else setToDate(d);
                      setDateFilter('Custom Range');
                    }
                  }}
                />
              )}

              <TouchableOpacity style={styles.applyBtn} onPress={() => setFilterVisible(false)}>
                <Text style={styles.applyBtnText}>APPLY FILTERS</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setDateFilter('All'); setFilterVisible(false); }}>
                <Text style={{color: 'rgba(255,255,255,0.4)', fontWeight: 'bold', fontSize: 12}}>RESET ALL</Text>
              </TouchableOpacity>
            </BlurView>
          </View>
        </Modal>

      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG_DARK },
  fullScreen: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  backCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: { color: 'white', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  headerSub: { color: THEME_BLUE, fontSize: 10, fontWeight: 'bold' },
  glassBtnContainer: { borderRadius: 12, overflow: 'hidden' },
  glassBtn: { width: 42, height: 42, justifyContent: 'center', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 20, borderRadius: 15, height: 50, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  searchInput: { flex: 1, color: 'white', paddingHorizontal: 15, fontSize: 14 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContainer: { padding: 16, paddingBottom: 50 },
  patientCard: { borderRadius: 24, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', overflow: 'hidden' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 10 },
  patientName: { color: 'white', fontSize: 16, fontWeight: 'bold', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1 },
  badgeText: { fontSize: 10, fontWeight: '900' },
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6, width: '47%' },
  detailText: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '500' },
  analysisRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
  analysisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '900' },
  timeLabel: { color: 'rgba(255,255,255,0.2)', fontSize: 10 },
  actionRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  viewReportBtn: { flex: 1, borderRadius: 12, overflow: 'hidden' },
  btnGradient: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 14, gap: 8 },
  viewReportText: { color: THEME_BLUE, fontSize: 12, fontWeight: '900' },
  deleteBtn: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  filterMenu: { padding: 25, borderTopLeftRadius: 35, borderTopRightRadius: 35, borderTopWidth: 1, borderColor: THEME_BLUE },
  filterTitle: { color: 'white', fontWeight: '900', textAlign: 'center', marginBottom: 20, letterSpacing: 2 },
  quickOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 15 },
  miniBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  activeMiniBtn: { backgroundColor: THEME_BLUE, borderColor: THEME_BLUE },
  miniBtnText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 10 },
  sectionLabel: { color: THEME_BLUE, fontSize: 10, fontWeight: '900', marginBottom: 15, textAlign: 'center', letterSpacing: 1 },
  dateRow: { flexDirection: 'row', gap: 15, marginBottom: 25 },
  datePickerBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: 15, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  dateLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: '900', marginBottom: 5 },
  dateValue: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  applyBtn: { backgroundColor: THEME_BLUE, padding: 18, borderRadius: 20, alignItems: 'center' },
  applyBtnText: { color: 'black', fontWeight: '900', letterSpacing: 1 },
  cancelBtn: { marginTop: 15, padding: 10, alignItems: 'center' }
});