import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Users, Globe, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onboardingSteps = [
  {
    icon: Heart,
    title: 'Welcome to HealthConnect',
    subtitle: 'Your trusted healthcare companion for rural India',
    description: 'Access quality healthcare services from anywhere, even without internet connection.'
  },
  {
    icon: Users,
    title: 'Connect with Doctors',
    subtitle: 'Expert doctors speaking your language',
    description: 'Video consultations with qualified doctors who understand your local context and speak Hindi, English, or Punjabi.'
  },
  {
    icon: Globe,
    title: 'Choose Your Language',
    subtitle: 'Select your preferred language',
    description: 'We support Hindi, English, and Punjabi to ensure you feel comfortable using our services.'
  }
];

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('selectedLanguage', selectedLanguage);
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      router.replace('/auth/login');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  };

  const getCurrentStep = () => onboardingSteps[currentStep];
  const IconComponent = getCurrentStep().icon;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.progressDot, 
                index <= currentStep && styles.progressDotActive
              ]} 
            />
          ))}
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <IconComponent size={80} color="#22C55E" strokeWidth={1.5} />
          </View>

          <Text style={styles.title}>{getCurrentStep().title}</Text>
          <Text style={styles.subtitle}>{getCurrentStep().subtitle}</Text>
          <Text style={styles.description}>{getCurrentStep().description}</Text>

          {/* Language Selection (only on last step) */}
          {currentStep === onboardingSteps.length - 1 && (
            <View style={styles.languageContainer}>
              <Text style={styles.languageTitle}>Choose Your Language:</Text>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language.code && styles.languageOptionActive
                  ]}
                  onPress={() => setSelectedLanguage(language.code)}
                >
                  <Text style={[
                    styles.languageName,
                    selectedLanguage === language.code && styles.languageNameActive
                  ]}>
                    {language.native}
                  </Text>
                  <Text style={[
                    styles.languageSubname,
                    selectedLanguage === language.code && styles.languageSubnameActive
                  ]}>
                    {language.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {currentStep > 0 && (
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <Text style={styles.skipButtonText}>Back</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Illustrations */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustration}>
            {currentStep === 0 && '🏥🌾'}
            {currentStep === 1 && '👨‍⚕️👩‍⚕️'}
            {currentStep === 2 && '🗣️📱'}
          </Text>
          <Text style={styles.illustrationText}>
            {currentStep === 0 && 'Healthcare for rural communities'}
            {currentStep === 1 && 'Expert medical consultation'}
            {currentStep === 2 && 'Multilingual support'}
          </Text>
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
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  progressDotActive: {
    backgroundColor: '#22C55E',
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#22C55E',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  languageContainer: {
    width: '100%',
    marginTop: 40,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageOption: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  languageOptionActive: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  languageName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  languageNameActive: {
    color: '#22C55E',
  },
  languageSubname: {
    fontSize: 14,
    color: '#6B7280',
  },
  languageSubnameActive: {
    color: '#16A34A',
  },
  navigationContainer: {
    alignItems: 'center',
    gap: 12,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 12,
  },
  skipButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  illustration: {
    fontSize: 48,
    marginBottom: 8,
  },
  illustrationText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});