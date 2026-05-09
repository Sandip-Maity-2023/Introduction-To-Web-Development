import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, ActivityIndicator, Linking, TextInput, ScrollView, StatusBar, Keyboard, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';

const THEME_BLUE = '#00D4FF';
const BG_DARK = '#011835';
const LOCATIONIQ_API_KEY = 'pk.9e06d6e9bb4da4893cb1263be3d62248';

export default function ClinicsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [manualLocation, setManualLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Get Device Location
  const getLocation = async () => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow location access to find nearby clinics.');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      fetchNearbyClinics(loc.coords.latitude, loc.coords.longitude);
    } catch (err) {
      Alert.alert('Error', 'Unable to retrieve your current location.');
      setLoading(false);
    }
  };

  // Fetch Location Suggestions (Autocomplete)
  const handleInputChange = async (text) => {
    setManualLocation(text);
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://us1.locationiq.com/v1/autocomplete.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(text)}&limit=5&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err) {
      setSuggestions([]);
    }
  };

  const clearInput = () => {
    setManualLocation('');
    setSuggestions([]);
  };

  const selectSuggestion = (item) => {
    setManualLocation(item.display_name);
    setSuggestions([]);
    Keyboard.dismiss();
    fetchNearbyClinics(parseFloat(item.lat), parseFloat(item.lon));
  };

  const handleManualSearch = () => {
    if (suggestions.length > 0) {
      selectSuggestion(suggestions[0]);
    } else if (manualLocation.length > 3) {
      Alert.alert("Selection Required", "Please tap a location from the suggestions list.");
    }
  };

  // Fetch Clinics/Hospitals from Overpass API
  const fetchNearbyClinics = async (lat, lon) => {
    try {
      setLoading(true);
      const radius = 8000; // Expanded to 8km for better results
      
      // Query both 'hospital' and 'clinic' nodes AND ways (polygons)
      const query = `
        [out:json][timeout:25];
        (
          node["amenity"~"hospital|clinic"](around:${radius},${lat},${lon});
          way["amenity"~"hospital|clinic"](around:${radius},${lat},${lon});
        );
        out center;
      `;
      
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();

      // Normalize data: Ways return 'center' while nodes return 'lat/lon'
      const formattedClinics = (data.elements || []).map(item => ({
        id: item.id,
        name: item.tags?.name || 'Medical Center',
        lat: item.lat || item.center?.lat,
        lon: item.lon || item.center?.lon,
        tags: item.tags
      }));

      setClinics(formattedClinics);
    } catch (err) {
      Alert.alert("Search Error", "Could not connect to the healthcare database.");
      setClinics([]);
    } finally {
      setLoading(false);
    }
  };

  const openMap = (clinic) => {
    if (!clinic.lat || clinic.lon) {
        const url = `https://www.openstreetmap.org/?mlat=${clinic.lat}&mlon=${clinic.lon}&zoom=16`;
        Linking.openURL(url);
    }
  };

  const getFullAddress = (tags) => {
    if (!tags) return 'Address not available';
    const parts = [tags['addr:street'], tags['addr:city'], tags['addr:postcode']].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : 'Location details available on map';
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eye Clinics</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <View style={styles.inputContainer}>
            <Ionicons name="search-outline" size={20} color="#7A9BB5" style={{ marginLeft: 10 }} />
            <TextInput
              style={styles.input}
              placeholder="Search city or area..."
              placeholderTextColor="#7A9BB5"
              value={manualLocation}
              onChangeText={handleInputChange}
            />
            {manualLocation.length > 0 && (
              <TouchableOpacity onPress={clearInput} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={20} color="#7A9BB5" />
              </TouchableOpacity>
            )}
          </View>
          
          <TouchableOpacity style={styles.searchIconBtn} onPress={handleManualSearch}>
            <LinearGradient colors={[THEME_BLUE, '#00A8CC']} style={styles.gradientBtn}>
              <Ionicons name="arrow-forward" size={22} color="#000" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {suggestions.length > 0 && (
          <View style={styles.suggestionsBox}>
            <ScrollView keyboardShouldPersistTaps="handled">
              {suggestions.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionItem}
                  onPress={() => selectSuggestion(item)}
                >
                  <Ionicons name="location-outline" size={16} color={THEME_BLUE} />
                  <Text style={styles.suggestionText} numberOfLines={1}>{item.display_name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TouchableOpacity style={styles.gpsButton} onPress={getLocation}>
          <Ionicons name="navigate" size={18} color="#000" />
          <Text style={styles.gpsButtonText}>Use Current Location</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>NEARBY FACILITIES</Text>
        
        {loading ? (
          <View style={styles.loaderArea}>
            <ActivityIndicator size="large" color={THEME_BLUE} />
            <Text style={styles.loadingText}>Searching for clinics...</Text>
          </View>
        ) : (
          <FlatList
            data={clinics}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.clinicCard} onPress={() => openMap(item)}>
                <View style={styles.clinicInfo}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="business" size={20} color={THEME_BLUE} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.clinicName}>{item.name}</Text>
                    <Text style={styles.addressText} numberOfLines={2}>
                      {getFullAddress(item.tags)}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#444" />
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="map-outline" size={50} color="rgba(255,255,255,0.1)" />
                <Text style={styles.emptyText}>No facilities found in this area.</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG_DARK },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: '900', letterSpacing: 1 },
  backBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 },
  container: { flex: 1, paddingHorizontal: 20 },
  searchWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 15, marginBottom: 5 },
  inputContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 15, height: 55, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  input: { flex: 1, color: 'white', paddingHorizontal: 10, fontSize: 15 },
  clearBtn: { padding: 10 },
  searchIconBtn: { marginLeft: 10 },
  gradientBtn: { width: 55, height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  suggestionsBox: { backgroundColor: '#021f45', borderRadius: 15, marginTop: 5, maxHeight: 200, zIndex: 100, elevation: 5, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  suggestionItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: '#052d61' },
  suggestionText: { color: 'white', marginLeft: 10, fontSize: 13, flex: 1 },
  gpsButton: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.9)', padding: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginTop: 15, gap: 8 },
  gpsButtonText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  sectionLabel: { color: '#7A9BB5', fontSize: 10, fontWeight: 'bold', marginTop: 25, marginBottom: 15, letterSpacing: 2 },
  clinicCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  clinicInfo: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(0, 212, 255, 0.1)', justifyContent: 'center', alignItems: 'center' },
  clinicName: { color: 'white', fontWeight: 'bold', fontSize: 15 },
  addressText: { color: '#7A9BB5', fontSize: 11, marginTop: 4, lineHeight: 16 },
  loaderArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: THEME_BLUE, marginTop: 10, fontSize: 12 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 },
  emptyText: { color: 'rgba(255,255,255,0.2)', marginTop: 10, fontSize: 13 }
});