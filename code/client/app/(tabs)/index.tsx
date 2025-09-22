import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  Stethoscope, 
  Pill, 
  FileText, 
  Brain, 
  Wifi, 
  WifiOff, 
  Settings,
  Globe
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = {
  en: {
    welcome: 'Welcome to HealthConnect',
    offline: 'Offline Mode',
    online: 'Connected',
    consultDoctor: 'Consult a Doctor',
    checkMedicines: 'Check Medicines',
    healthRecords: 'My Health Records',
    symptomChecker: 'Symptom Checker',
    emergencyHelp: 'Need help? Call: 102',
    changeLanguage: 'Language'
  },
  hi: {
    welcome: 'हेल्थकनेक्ट में आपका स्वागत है',
    offline: 'ऑफलाइन मोड',
    online: 'जुड़ा हुआ',
    consultDoctor: 'डॉक्टर से सलाह',
    checkMedicines: 'दवाइयां देखें',
    healthRecords: 'मेरे स्वास्थ्य रिकॉर्ड',
    symptomChecker: 'लक्षण जांचकर्ता',
    emergencyHelp: 'मदद चाहिए? कॉल करें: 102',
    changeLanguage: 'भाषा'
  },
  pa: {
    welcome: 'ਹੈਲਥਕਨੈਕਟ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    offline: 'ਔਫਲਾਈਨ ਮੋਡ',
    online: 'ਜੁੜਿਆ ਹੋਇਆ',
    consultDoctor: 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ',
    checkMedicines: 'ਦਵਾਈਆਂ ਦੇਖੋ',
    healthRecords: 'ਮੇਰੇ ਸਿਹਤ ਰਿਕਾਰਡ',
    symptomChecker: 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    emergencyHelp: 'ਮਦਦ ਚਾਹੀਦੀ? ਕਾਲ ਕਰੋ: 102',
    changeLanguage: 'ਭਾਸ਼ਾ'
  }
};

export default function HomeScreen() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'pa'>('en');

  useEffect(() => {
    loadLanguage();
    // Simulate network check
    const networkCheck = setInterval(() => {
      setIsOnline(Math.random() > 0.3); // Simulate occasional offline state
    }, 10000);

    return () => clearInterval(networkCheck);
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage as 'en' | 'hi' | 'pa');
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = () => {
    Alert.alert(
      'Select Language / भाषा चुनें / ਭਾਸ਼ਾ ਚੁਣੋ',
      '',
      [
        {
          text: 'English',
          onPress: () => saveLanguage('en')
        },
        {
          text: 'हिंदी (Hindi)',
          onPress: () => saveLanguage('hi')
        },
        {
          text: 'ਪੰਜਾਬੀ (Punjabi)',
          onPress: () => saveLanguage('pa')
        }
      ]
    );
  };

  const saveLanguage = async (language: 'en' | 'hi' | 'pa') => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = languages[currentLanguage];

  const DashboardButton = ({ 
    icon: Icon, 
    title, 
    color, 
    onPress 
  }: { 
    icon: any, 
    title: string, 
    color: string, 
    onPress: () => void 
  }) => (
    <TouchableOpacity 
      style={[styles.dashboardButton, { backgroundColor: color }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Icon size={48} color="#FFFFFF" strokeWidth={2} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>{t.welcome}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={changeLanguage} style={styles.languageButton}>
              <Globe size={20} color="#6B7280" />
              <Text style={styles.languageText}>{t.changeLanguage}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Connection Status */}
        <View style={[styles.statusBar, { backgroundColor: isOnline ? '#10B981' : '#EF4444' }]}>
          {isOnline ? <Wifi size={16} color="#FFFFFF" /> : <WifiOff size={16} color="#FFFFFF" />}
          <Text style={styles.statusText}>{isOnline ? t.online : t.offline}</Text>
        </View>

        {/* Dashboard Buttons */}
        <View style={styles.dashboardGrid}>
          <DashboardButton
            icon={Stethoscope}
            title={t.consultDoctor}
            color="#22C55E"
            onPress={() => router.push('/doctors')}
          />
          <DashboardButton
            icon={Pill}
            title={t.checkMedicines}
            color="#3B82F6"
            onPress={() => router.push('/medicines')}
          />
          <DashboardButton
            icon={FileText}
            title={t.healthRecords}
            color="#8B5CF6"
            onPress={() => router.push('/records')}
          />
          <DashboardButton
            icon={Brain}
            title={t.symptomChecker}
            color="#F97316"
            onPress={() => router.push('/symptom-checker')}
          />
        </View>

        {/* Emergency Help */}
        <View style={styles.emergencyCard}>
          <Text style={styles.emergencyText}>{t.emergencyHelp}</Text>
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
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  languageText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  dashboardGrid: {
    gap: 16,
  },
  dashboardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    flex: 1,
  },
  emergencyCard: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  emergencyText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});