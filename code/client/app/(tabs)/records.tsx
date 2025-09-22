import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QrCode, RefreshCw, Calendar, FileText, User, Heart, Smartphone } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mockHealthData = {
  patientId: 'RHC-2024-001234',
  name: 'Rajesh Kumar',
  age: 45,
  bloodGroup: 'B+',
  allergies: ['Penicillin', 'Dust'],
  emergencyContact: '+91 98765 43210',
  lastSync: '2024-01-15 14:30',
  consultations: [
    {
      date: '2024-01-10',
      doctor: 'Dr. Priya Sharma',
      diagnosis: 'Fever and Cold',
      prescription: 'Paracetamol 500mg, Rest',
      followUp: 'If symptoms persist after 3 days',
    },
    {
      date: '2024-01-05',
      doctor: 'Dr. Rajesh Kumar',
      diagnosis: 'Blood Pressure Check',
      prescription: 'Continue current medication',
      followUp: 'Next check in 1 month',
    },
  ],
  vitals: {
    lastUpdated: '2024-01-10',
    bloodPressure: '130/85',
    heartRate: '72 bpm',
    temperature: '98.6°F',
    weight: '68 kg',
  },
};

export default function RecordsScreen() {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSync, setLastSync] = useState(mockHealthData.lastSync);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    // Simulate network status
    const networkCheck = setInterval(() => {
      setIsOnline(Math.random() > 0.4);
    }, 5000);
    return () => clearInterval(networkCheck);
  }, []);

  const handleSync = async () => {
    if (!isOnline) return;
    
    setSyncInProgress(true);
    // Simulate sync process
    setTimeout(() => {
      const now = new Date().toLocaleString('en-IN');
      setLastSync(now);
      setSyncInProgress(false);
    }, 2000);
  };

  const PatientCard = () => (
    <View style={styles.patientCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Digital Health Card</Text>
        <View style={styles.qrContainer}>
          <QrCode size={48} color="#1F2937" />
          <Text style={styles.qrLabel}>Scan QR</Text>
        </View>
      </View>
      
      <View style={styles.patientInfo}>
        <Text style={styles.patientName}>{mockHealthData.name}</Text>
        <Text style={styles.patientId}>ID: {mockHealthData.patientId}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{mockHealthData.age} years</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Blood Group</Text>
            <Text style={styles.infoValue}>{mockHealthData.bloodGroup}</Text>
          </View>
        </View>
        
        <View style={styles.emergencyInfo}>
          <Smartphone size={16} color="#EF4444" />
          <Text style={styles.emergencyText}>Emergency: {mockHealthData.emergencyContact}</Text>
        </View>
      </View>
    </View>
  );

  const VitalsCard = () => (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Heart size={24} color="#EF4444" />
        <Text style={styles.sectionTitle}>Latest Vitals</Text>
      </View>
      
      <Text style={styles.lastUpdated}>Last updated: {mockHealthData.vitals.lastUpdated}</Text>
      
      <View style={styles.vitalsGrid}>
        <View style={styles.vitalItem}>
          <Text style={styles.vitalLabel}>Blood Pressure</Text>
          <Text style={styles.vitalValue}>{mockHealthData.vitals.bloodPressure}</Text>
        </View>
        <View style={styles.vitalItem}>
          <Text style={styles.vitalLabel}>Heart Rate</Text>
          <Text style={styles.vitalValue}>{mockHealthData.vitals.heartRate}</Text>
        </View>
        <View style={styles.vitalItem}>
          <Text style={styles.vitalLabel}>Temperature</Text>
          <Text style={styles.vitalValue}>{mockHealthData.vitals.temperature}</Text>
        </View>
        <View style={styles.vitalItem}>
          <Text style={styles.vitalLabel}>Weight</Text>
          <Text style={styles.vitalValue}>{mockHealthData.vitals.weight}</Text>
        </View>
      </View>
    </View>
  );

  const ConsultationCard = ({ consultation }: { consultation: any }) => (
    <View style={styles.consultationItem}>
      <View style={styles.consultationHeader}>
        <Text style={styles.consultationDate}>{consultation.date}</Text>
        <Text style={styles.doctorName}>{consultation.doctor}</Text>
      </View>
      <Text style={styles.diagnosis}>{consultation.diagnosis}</Text>
      <Text style={styles.prescription}>Prescription: {consultation.prescription}</Text>
      {consultation.followUp && (
        <Text style={styles.followUp}>Follow-up: {consultation.followUp}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Records</Text>
          <TouchableOpacity 
            style={[
              styles.syncButton, 
              { backgroundColor: isOnline ? '#22C55E' : '#9CA3AF' }
            ]}
            onPress={handleSync}
            disabled={!isOnline || syncInProgress}
          >
            <RefreshCw 
              size={16} 
              color="#FFFFFF" 
              style={syncInProgress ? styles.spinning : {}} 
            />
            <Text style={styles.syncText}>
              {syncInProgress ? 'Syncing...' : (isOnline ? 'Sync' : 'Offline')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.lastSyncText}>Last sync: {lastSync}</Text>
        
        {/* Patient Card */}
        <PatientCard />
        
        {/* Vitals */}
        <VitalsCard />
        
        {/* Allergies */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Allergies</Text>
          <View style={styles.allergiesList}>
            {mockHealthData.allergies.map((allergy, index) => (
              <View key={index} style={styles.allergyTag}>
                <Text style={styles.allergyText}>{allergy}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Consultation History */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Calendar size={24} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Recent Consultations</Text>
          </View>
          
          <View style={styles.consultationsList}>
            {mockHealthData.consultations.map((consultation, index) => (
              <ConsultationCard key={index} consultation={consultation} />
            ))}
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  syncText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  spinning: {
    // You would need to add animation here
  },
  lastSyncText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  // Patient Card Styles
  patientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  qrContainer: {
    alignItems: 'center',
  },
  qrLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  patientInfo: {},
  patientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  patientId: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  emergencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
  },
  emergencyText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#EF4444',
  },
  // Section Card Styles
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 16,
  },
  // Vitals Styles
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  // Allergies Styles
  allergiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  allergyText: {
    fontSize: 14,
    color: '#DC2626',
    fontWeight: '500',
  },
  // Consultations Styles
  consultationsList: {
    gap: 12,
  },
  consultationItem: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  consultationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  consultationDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  doctorName: {
    fontSize: 14,
    color: '#6B7280',
  },
  diagnosis: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  prescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  followUp: {
    fontSize: 14,
    color: '#F59E0B',
    fontStyle: 'italic',
  },
});