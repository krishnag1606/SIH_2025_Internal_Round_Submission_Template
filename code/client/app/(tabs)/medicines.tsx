import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, List, Check, X, Navigation } from 'lucide-react-native';

const pharmacies = [
  {
    id: 1,
    name: 'Sharma Medical Store',
    distance: '0.8 km',
    medicines: {
      'Paracetamol 500mg': true,
      'Amoxicillin 250mg': true,
      'Crocin Advance': false,
      'ORS Packets': true,
    },
    address: 'Main Market, Village Road',
    phone: '+91 98765 43210',
  },
  {
    id: 2,
    name: 'Health Plus Pharmacy',
    distance: '1.2 km',
    medicines: {
      'Paracetamol 500mg': true,
      'Amoxicillin 250mg': false,
      'Crocin Advance': true,
      'ORS Packets': true,
    },
    address: 'Near Bus Stand',
    phone: '+91 98765 43211',
  },
  {
    id: 3,
    name: 'City Medical Hall',
    distance: '2.1 km',
    medicines: {
      'Paracetamol 500mg': true,
      'Amoxicillin 250mg': true,
      'Crocin Advance': true,
      'ORS Packets': false,
    },
    address: 'Civil Hospital Road',
    phone: '+91 98765 43212',
  },
];

export default function MedicinesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const PharmacyCard = ({ pharmacy }: { pharmacy: any }) => (
    <View style={styles.pharmacyCard}>
      <View style={styles.pharmacyHeader}>
        <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
        <View style={styles.distanceContainer}>
          <Navigation size={16} color="#6B7280" />
          <Text style={styles.distance}>{pharmacy.distance}</Text>
        </View>
      </View>
      
      <Text style={styles.address}>{pharmacy.address}</Text>
      <Text style={styles.phone}>{pharmacy.phone}</Text>
      
      <View style={styles.medicinesContainer}>
        <Text style={styles.medicinesTitle}>Medicine Availability:</Text>
        {Object.entries(pharmacy.medicines).map(([medicine, available]) => (
          <View key={medicine} style={styles.medicineRow}>
            {available ? (
              <Check size={16} color="#10B981" />
            ) : (
              <X size={16} color="#EF4444" />
            )}
            <Text style={[
              styles.medicineName, 
              { color: available ? '#10B981' : '#EF4444' }
            ]}>
              {medicine}
            </Text>
            <Text style={[
              styles.medicineStatus,
              { color: available ? '#10B981' : '#EF4444' }
            ]}>
              {available ? 'Available' : 'Out of Stock'}
            </Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>Call Pharmacy</Text>
      </TouchableOpacity>
    </View>
  );

  const MapView = () => (
    <View style={styles.mapContainer}>
      <Text style={styles.mapPlaceholder}>🗺️ Map View</Text>
      <Text style={styles.mapSubtext}>Lightweight map showing nearby pharmacies</Text>
      
      {/* Simple map representation */}
      <View style={styles.simpleMap}>
        {pharmacies.map((pharmacy, index) => (
          <View 
            key={pharmacy.id} 
            style={[
              styles.mapPin, 
              { 
                top: `${20 + index * 25}%`, 
                left: `${30 + index * 15}%` 
              }
            ]}
          >
            <MapPin size={24} color="#EF4444" fill="#EF4444" />
            <Text style={styles.mapPinLabel}>{pharmacy.name}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.switchViewButton}
        onPress={() => setViewMode('list')}
      >
        <List size={20} color="#FFFFFF" />
        <Text style={styles.switchViewText}>Switch to List View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Find Medicines</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for medicines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity 
            style={[
              styles.toggleButton, 
              viewMode === 'list' && styles.activeToggle
            ]}
            onPress={() => setViewMode('list')}
          >
            <List size={20} color={viewMode === 'list' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.toggleText,
              { color: viewMode === 'list' ? '#FFFFFF' : '#6B7280' }
            ]}>
              List View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.toggleButton, 
              viewMode === 'map' && styles.activeToggle
            ]}
            onPress={() => setViewMode('map')}
          >
            <MapPin size={20} color={viewMode === 'map' ? '#FFFFFF' : '#6B7280'} />
            <Text style={[
              styles.toggleText,
              { color: viewMode === 'map' ? '#FFFFFF' : '#6B7280' }
            ]}>
              Map View
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Content */}
        {viewMode === 'list' ? (
          <View style={styles.pharmaciesList}>
            {pharmacies.map((pharmacy) => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </View>
        ) : (
          <MapView />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    color: '#1F2937',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#3B82F6',
  },
  toggleText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  pharmaciesList: {
    gap: 16,
  },
  pharmacyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pharmacyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  address: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginBottom: 16,
  },
  medicinesContainer: {
    marginBottom: 16,
  },
  medicinesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  medicineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  medicineName: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
  },
  medicineStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
  callButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Map View Styles
  mapContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    minHeight: 400,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapPlaceholder: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  simpleMap: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    position: 'relative',
    marginBottom: 20,
  },
  mapPin: {
    position: 'absolute',
    alignItems: 'center',
  },
  mapPinLabel: {
    fontSize: 10,
    color: '#1F2937',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
  switchViewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
  },
  switchViewText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});