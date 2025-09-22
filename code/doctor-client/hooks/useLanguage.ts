import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  en: {
    // Onboarding
    welcome: 'Welcome to TeleMed',
    selectLanguage: 'Select Your Language',
    getStarted: 'Get Started',

    // Dashboard
    dashboard: 'Dashboard',
    upcomingConsultations: 'Upcoming Consultations',
    patientRecords: 'Patient Records',
    messages: 'Messages',
    prescriptions: 'Prescriptions',
    offline: 'Offline',
    online: 'Online',
    sync: 'Sync',

    // Navigation
    consultations: 'Consultations',
    patients: 'Patients',
    settings: 'Settings',

    // Patient Records
    searchPatients: 'Search Patients',
    addNotes: 'Add Notes',
    healthHistory: 'Health History',
    pastConsultations: 'Past Consultations',

    // Consultations
    upcoming: 'Upcoming',
    past: 'Past',
    startConsultation: 'Start Consultation',
    videoCall: 'Video Call',
    audioCall: 'Audio Call',
    textChat: 'Text Chat',

    // Common
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    confirm: 'Confirm',
    age: 'Age',
    gender: 'Gender',
    condition: 'Condition',

    // Prescription
    createPrescription: 'Create Prescription',
    medicineName: 'Medicine Name',
    dosage: 'Dosage',
    duration: 'Duration',
    sendPrescription: 'Send Prescription',
  },
  hi: {
    // Onboarding
    welcome: 'टेलीमेड में आपका स्वागत है',
    selectLanguage: 'अपनी भाषा चुनें',
    getStarted: 'शुरू करें',

    // Dashboard
    dashboard: 'डैशबोर्ड',
    upcomingConsultations: 'आगामी परामर्श',
    patientRecords: 'मरीज़ के रिकॉर्ड',
    messages: 'संदेश',
    prescriptions: 'नुस्खे',
    offline: 'ऑफलाइन',
    online: 'ऑनलाइन',
    sync: 'सिंक',

    // Navigation
    consultations: 'परामर्श',
    patients: 'मरीज़',
    settings: 'सेटिंग्स',

    // Patient Records
    searchPatients: 'मरीज़ों को खोजें',
    addNotes: 'नोट्स जोड़ें',
    healthHistory: 'स्वास्थ्य इतिहास',
    pastConsultations: 'पिछले परामर्श',

    // Consultations
    upcoming: 'आगामी',
    past: 'पिछला',
    startConsultation: 'परामर्श शुरू करें',
    videoCall: 'वीडियो कॉल',
    audioCall: 'ऑडियो कॉल',
    textChat: 'टेक्स्ट चैट',

    // Common
    save: 'सेव करें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    confirm: 'पुष्टि करें',
    age: 'आयु',
    gender: 'लिंग',
    condition: 'स्थिति',

    // Prescription
    createPrescription: 'नुस्खा बनाएं',
    medicineName: 'दवा का नाम',
    dosage: 'खुराक',
    duration: 'अवधि',
    sendPrescription: 'नुस्खा भेजें',
  },
  pa: {
    // Onboarding
    welcome: 'ਟੈਲੀਮੈਡ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    selectLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
    getStarted: 'ਸ਼ੁਰੂ ਕਰੋ',

    // Dashboard
    dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    upcomingConsultations: 'ਆਉਣ ਵਾਲੇ ਸਲਾਹ-ਮਸ਼ਵਰੇ',
    patientRecords: 'ਮਰੀਜ਼ਾਂ ਦੇ ਰਿਕਾਰਡ',
    messages: 'ਸੰਦੇਸ਼',
    prescriptions: 'ਨੁਸਖੇ',
    offline: 'ਔਫਲਾਈਨ',
    online: 'ਔਨਲਾਈਨ',
    sync: 'ਸਿੰਕ',

    // Navigation
    consultations: 'ਸਲਾਹ-ਮਸ਼ਵਰੇ',
    patients: 'ਮਰੀਜ਼',
    settings: 'ਸੈਟਿੰਗਾਂ',

    // Patient Records
    searchPatients: 'ਮਰੀਜ਼ਾਂ ਦੀ ਖੋਜ ਕਰੋ',
    addNotes: 'ਨੋਟਸ ਸ਼ਾਮਲ ਕਰੋ',
    healthHistory: 'ਸਿਹਤ ਇਤਿਹਾਸ',
    pastConsultations: 'ਪਿਛਲੇ ਸਲਾਹ-ਮਸ਼ਵਰੇ',

    // Consultations
    upcoming: 'ਆਉਣ ਵਾਲੇ',
    past: 'ਪਿਛਲੇ',
    startConsultation: 'ਸਲਾਹ-ਮਸ਼ਵਰਾ ਸ਼ੁਰੂ ਕਰੋ',
    videoCall: 'ਵੀਡੀਓ ਕਾਲ',
    audioCall: 'ਆਡੀਓ ਕਾਲ',
    textChat: 'ਟੈਕਸਟ ਚੈਟ',

    // Common
    save: 'ਸੇਵ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    edit: 'ਸੰਪਾਦਨ ਕਰੋ',
    delete: 'ਹਟਾਓ',
    confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
    age: 'ਉਮਰ',
    gender: 'ਲਿੰਗ',
    condition: 'ਹਾਲਤ',

    // Prescription
    createPrescription: 'ਨੁਸਖਾ ਬਣਾਓ',
    medicineName: 'ਦਵਾਈ ਦਾ ਨਾਮ',
    dosage: 'ਖੁਰਾਕ',
    duration: 'ਮਿਆਦ',
    sendPrescription: 'ਨੁਸਖਾ ਭੇਜੋ',
  },
};

export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const i18n = new I18n(translations);
  i18n.enableFallback = true;

  // (i18n as any).locale = Localization.locale;
  // (i18n as any).fallbacks = true;


  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
        (i18n as any).locale = savedLanguage;
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const changeLanguage = async (language: string) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      setCurrentLanguage(language);
      (i18n as any).locale = language;
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string, params?: object) => {
    return i18n.t(key, params);
  };

  return {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: [
      { code: 'en', name: 'English' },
      { code: 'hi', name: 'हिंदी' },
      { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    ],
  };
}
