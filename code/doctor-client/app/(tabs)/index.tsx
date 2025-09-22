import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar, Users, MessageCircle, FileText } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import OfflineIndicator from '@/components/OfflineIndicator';
import { DoctorContext } from '@/Context/DoctorContext/DoctorContext';

export default function Dashboard() {
  const { t } = useLanguage();

  const dashboardCards = [
    {
      title: t('upcomingConsultations'),
      icon: Calendar,
      color: '#2563EB',
      count: '5',
      onPress: () => { },
    },
    {
      title: t('patientRecords'),
      icon: Users,
      color: '#0891B2',
      count: '142',
      onPress: () => { },
    },
    {
      title: t('messages'),
      icon: MessageCircle,
      color: '#059669',
      count: '8',
      onPress: () => { },
    },
    {
      title: t('prescriptions'),
      icon: FileText,
      color: '#DC2626',
      count: '23',
      onPress: () => { },
    },
  ];

  const { doctor } = useContext(DoctorContext);

  if (!doctor) {
    return (
      <View style={styles.container}>
        <OfflineIndicator />
        <View style={styles.header}>
          <Text style={styles.welcome}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <OfflineIndicator />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome back, {doctor.name}</Text>
          <Text style={styles.subtitle}>Here's your overview for today</Text>
        </View>

        <View style={styles.cardsContainer}>
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.card, { borderLeftColor: card.color }]}
                onPress={card.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: `${card.color}15` }]}>
                      <IconComponent size={28} color={card.color} />
                    </View>
                    <Text style={styles.cardCount}>{card.count}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{card.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Start Emergency Consultation</Text>
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Add Patient</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Create Prescription</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 40,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  quickActions: {
    padding: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: '#DC2626',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
});