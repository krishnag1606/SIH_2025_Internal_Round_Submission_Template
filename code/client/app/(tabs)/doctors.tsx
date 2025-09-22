import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, Phone, MessageSquare, Star, Clock, Globe, Search } from 'lucide-react-native';
import { router } from 'expo-router';
import { DoctorContext, DoctorType } from '@/context/DoctorContext/DoctorContext';

export default function DoctorsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCall, setActiveCall] = useState(false);

  const { doctors } = useContext(DoctorContext);

  const DoctorCard = ({ doctor }: { doctor: DoctorType }) => (
    <View style={styles.doctorCard}>
      <View style={styles.doctorInfo}>
        <View style={styles.doctorHeader}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" />
            {/* <Text style={styles.rating}>{doctor.rating}</Text> */}
          </View>
        </View>
        <Text style={styles.specialty}>{doctor.specialization}</Text>
        <Text style={styles.experience}>{doctor.experience} experience</Text>

        <View style={styles.languageContainer}>
          <Globe size={16} color="#6B7280" />
          <Text style={styles.languages}>{doctor.language.map(l => l.language).join(', ')}</Text>
        </View>

        {/* <View style={styles.availabilityContainer}>
          <Clock size={16} color={doctor.available ? '#10B981' : '#EF4444'} />
          <Text style={[styles.nextSlot, { color: doctor.available ? '#10B981' : '#EF4444' }]}>
            {doctor.available ? `Available - ${doctor.nextSlot}` : doctor.nextSlot}
          </Text>
        </View> */}
      </View>

      <View style={styles.callButtons}>
        {/* <TouchableOpacity
          style={[styles.callButton, styles.videoButton]}
          onPress={() => setActiveCall(true)}
        // disabled={!doctor.available}
        >
          <MessageSquare size={20} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Chat</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[styles.callButton, styles.audioButton]}
        // disabled={!doctor.available}
        >
          <Phone size={20} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Audio</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.callButton, styles.chatButton]}
        >
          <MessageSquare size={20} color="#FFFFFF" />
          <Text style={styles.callButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.callButton, styles.bookButton]}
          onPress={() => router.push(`/booking/${doctor.id}`)}
        >
          <Text style={styles.callButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (activeCall) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.videoCallContainer}>
          {/* Doctor Video */}
          <View style={styles.doctorVideo}>
            <Text style={styles.videoLabel}>Dr. Priya Sharma</Text>
            <Text style={styles.videoSubLabel}>General Medicine</Text>
          </View>

          {/* Patient Video (small) */}
          <View style={styles.patientVideo}>
            <Text style={styles.patientVideoLabel}>You</Text>
          </View>

          {/* Call Controls */}
          <View style={styles.callControls}>
            <TouchableOpacity style={[styles.controlButton, styles.muteButton]}>
              <Phone size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.videoToggleButton]}>
              <Video size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, styles.chatToggleButton]}>
              <MessageSquare size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.controlButton, styles.endCallButton]}
              onPress={() => setActiveCall(false)}
            >
              <Phone size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Network Status */}
          <View style={styles.networkStatus}>
            <Text style={styles.networkText}>Connection: Good</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Available Doctors</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by specialty or name..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Doctors List */}
        <View style={styles.doctorsList}>
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
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
  doctorsList: {
    gap: 16,
  },
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doctorInfo: {
    marginBottom: 16,
  },
  doctorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
  },
  specialty: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  languages: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextSlot: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  callButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  videoButton: {
    backgroundColor: '#22C55E',
  },
  audioButton: {
    backgroundColor: '#3B82F6',
  },
  chatButton: {
    backgroundColor: '#22C55E',
  },
  bookButton: {
    backgroundColor: '#F97316',
  },
  // Video Call Styles
  videoCallContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  doctorVideo: {
    flex: 1,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoLabel: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  videoSubLabel: {
    color: '#9CA3AF',
    fontSize: 16,
    marginTop: 8,
  },
  patientVideo: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 120,
    height: 160,
    backgroundColor: '#374151',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patientVideoLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
    backgroundColor: '#6B7280',
  },
  videoToggleButton: {
    backgroundColor: '#3B82F6',
  },
  chatToggleButton: {
    backgroundColor: '#8B5CF6',
  },
  endCallButton: {
    backgroundColor: '#EF4444',
  },
  networkStatus: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  networkText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});