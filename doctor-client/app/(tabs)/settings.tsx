import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Globe, Bell, Shield, User, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSelector from '@/components/LanguageSelector';

export default function Settings() {
  const { t } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);

  const settingsOptions = [
    {
      title: 'Language',
      subtitle: 'Change app language',
      icon: Globe,
      onPress: () => setShowLanguageSelector(true),
    },
    {
      title: 'Profile',
      subtitle: 'Manage your profile information',
      icon: User,
      onPress: () => {},
    },
    {
      title: 'Privacy & Security',
      subtitle: 'Manage privacy settings',
      icon: Shield,
      onPress: () => {},
    },
    {
      title: 'Help & Support',
      subtitle: 'Get help and support',
      icon: HelpCircle,
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('settings')}</Text>
      </View>

      {showLanguageSelector ? (
        <View style={styles.languageSelectorContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowLanguageSelector(false)}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <LanguageSelector />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Bell size={24} color="#6B7280" />
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>Notifications</Text>
                  <Text style={styles.settingSubtitle}>Receive appointment reminders</Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>

            {settingsOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.settingItem}
                  onPress={option.onPress}
                >
                  <View style={styles.settingLeft}>
                    <IconComponent size={24} color="#6B7280" />
                    <View style={styles.settingText}>
                      <Text style={styles.settingTitle}>{option.title}</Text>
                      <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#9CA3AF" />
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <LogOut size={24} color="#DC2626" />
                <View style={styles.settingText}>
                  <Text style={[styles.settingTitle, styles.dangerText]}>Sign Out</Text>
                  <Text style={styles.settingSubtitle}>Sign out from your account</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>TeleMed v1.0.0</Text>
            <Text style={styles.footerSubtext}>Built for healthcare professionals in rural India</Text>
          </View>
        </ScrollView>
      )}
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
  },
  languageSelectorContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 24,
    paddingBottom: 0,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 24,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  dangerText: {
    color: '#DC2626',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});