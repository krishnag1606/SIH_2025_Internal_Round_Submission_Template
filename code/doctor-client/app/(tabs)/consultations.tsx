import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Video, MessageSquare, Clock, User } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import axios from 'axios';
import { FetchUpcomingAppointmentsRoute } from '@/lib/RouteProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DoctorContext } from '@/Context/DoctorContext/DoctorContext';
import { router } from "expo-router";

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: string;
}

interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  status: string;
  availabilityId: number;
  availability: {
    id: number;
    doctorId: number;
    date: string;
    slot: string;
    isBooked: boolean;
  };
  patient: Patient;
}

export default function Consultations() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { socket } = useContext(DoctorContext);

  const fetchAppointments = async () => {
    const token = await AsyncStorage.getItem('token');

    try {
      const res = await axios.get(FetchUpcomingAppointmentsRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Fetched appointments:', res.data);
      setAppointments(res.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleCallPatient = (patientId: number) => {
    const videoRoomId = `room-${Date.now()}-${patientId}`;
    socket!.emit("call-patient", {
      patientId,
      metadata: {
        doctorName: "Dr. John Doe",
      },
      videoRoomId
    });
    router.push({ pathname: "/videocall", params: { roomId: videoRoomId } });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("call-failed", ({ reason }) => {
      console.warn("Call failed:", reason);
    });

    socket.on("call-accepted", ({ patientId, videoRoomId }) => {
      console.log("Patient accepted call, room:", videoRoomId);
      router.push({ pathname: "/videocall", params: { roomId: videoRoomId } });
    });

    return () => {
      socket.off("call-failed");
      socket.off("call-accepted");
    };
  }, []);


  const renderConsultationCard = (appointment: Appointment) => (
    <View key={appointment.id} style={styles.consultationCard}>
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{appointment.patient.name}</Text>
          <View style={styles.patientDetails}>
            <User size={14} color="#6B7280" />
            <Text style={styles.detailText}>
              ID: {appointment.patient.id}
            </Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.timeText}>{appointment.availability.slot}</Text>
        </View>
      </View>

      <Text style={styles.conditionText}>Status: {appointment.status}</Text>

      {activeTab === 'upcoming' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.videoButton]}
            onPress={() => { handleCallPatient(appointment.patient.id) }}>
            <Video size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{t('videoCall')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.chatButton]}>
            <MessageSquare size={18} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>{t('textChat')}</Text>
          </TouchableOpacity>
        </View>
      )
      }
    </View >
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('consultations')}</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
              {t('upcoming')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'past' && styles.activeTab]}
            onPress={() => setActiveTab('past')}
          >
            <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
              {t('past')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {appointments.map(renderConsultationCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  consultationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  patientDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  separator: {
    fontSize: 14,
    color: '#6B7280',
  },
  languageText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  conditionText: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 8,
  },
  videoButton: {
    backgroundColor: '#059669',
  },
  audioButton: {
    backgroundColor: '#0891B2',
  },
  chatButton: {
    backgroundColor: '#2563EB',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});