import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { User, Phone, Lock, Eye, EyeOff, Calendar, MapPin, ArrowRight, Heart, ArrowLeft } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RegisterRoute } from '@/lib/RouteProvider';
import { PatientContext } from '@/context/PatientContext/PatientContext';

const languages = {
  en: {
    title: 'Create Account',
    subtitle: 'Join HealthConnect for better healthcare',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    emailLabel: 'Email Address',
    emailPlaceholder: 'Enter your email address',
    ageLabel: 'Age',
    agePlaceholder: 'Enter your age',
    locationLabel: 'Village/City',
    locationPlaceholder: 'Enter your location',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Create a password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm your password',
    registerButton: 'Create Account',
    haveAccount: 'Already have an account?',
    signIn: 'Sign In',
    registering: 'Creating account...',
    terms: 'By creating an account, you agree to our Terms of Service and Privacy Policy'
  },
  hi: {
    title: 'खाता बनाएं',
    subtitle: 'बेहतर स्वास्थ्य सेवा के लिए हेल्थकनेक्ट में शामिल हों',
    nameLabel: 'पूरा नाम',
    namePlaceholder: 'अपना पूरा नाम दर्ज करें',
    phoneLabel: 'फोन नंबर',
    phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
    ageLabel: 'उम्र',
    agePlaceholder: 'अपनी उम्र दर्ज करें',
    locationLabel: 'गांव/शहर',
    locationPlaceholder: 'अपना स्थान दर्ज करें',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'पासवर्ड बनाएं',
    confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
    confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
    registerButton: 'खाता बनाएं',
    haveAccount: 'पहले से खाता है?',
    signIn: 'साइन इन करें',
    registering: 'खाता बनाया जा रहा है...',
    terms: 'खाता बनाकर, आप हमारी सेवा की शर्तों और गोपनीयता नीति से सहमत हैं'
  },
  pa: {
    title: 'ਖਾਤਾ ਬਣਾਓ',
    subtitle: 'ਬਿਹਤਰ ਸਿਹਤ ਸੇਵਾ ਲਈ ਹੈਲਥਕਨੈਕਟ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    nameLabel: 'ਪੂਰਾ ਨਾਮ',
    namePlaceholder: 'ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਾਖਲ ਕਰੋ',
    phoneLabel: 'ਫੋਨ ਨੰਬਰ',
    phonePlaceholder: 'ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ',
    emailLabel: 'ਈਮੇਲ ਪਤਾ',
    emailPlaceholder: 'ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਦਾਖਲ ਕਰੋ',
    ageLabel: 'ਉਮਰ',
    agePlaceholder: 'ਆਪਣੀ ਉਮਰ ਦਾਖਲ ਕਰੋ',
    locationLabel: 'ਪਿੰਡ/ਸ਼ਹਿਰ',
    locationPlaceholder: 'ਆਪਣਾ ਸਥਾਨ ਦਾਖਲ ਕਰੋ',
    passwordLabel: 'ਪਾਸਵਰਡ',
    passwordPlaceholder: 'ਪਾਸਵਰਡ ਬਣਾਓ',
    confirmPasswordLabel: 'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    confirmPasswordPlaceholder: 'ਆਪਣੇ ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    registerButton: 'ਖਾਤਾ ਬਣਾਓ',
    haveAccount: 'ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?',
    signIn: 'ਸਾਈਨ ਇਨ ਕਰੋ',
    registering: 'ਖਾਤਾ ਬਣਾਇਆ ਜਾ ਰਿਹਾ ਹੈ...',
    terms: 'ਖਾਤਾ ਬਣਾ ਕੇ, ਤੁਸੀਂ ਸਾਡੀ ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ ਅਤੇ ਗੋਪਨੀਯਤਾ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤ ਹੋ'
  }
};

export default function RegisterScreen() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'pa'>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    gender: '',
    location: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPatient } = useContext(PatientContext);

  React.useEffect(() => {
    loadLanguage();
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { name, phone, age, location, password, confirmPassword } = formData;

    if (!name || !phone || !age || !location || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (phone.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {


      const response = await axios.post(RegisterRoute, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        age: formData.age,
        gender: formData.gender,
        address: formData.location
      })

      if (response.data.status) {

        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('isLoggedIn', 'true');

        await fetchPatient();

        Alert.alert('Success', 'Account created successfully', [
          { text: 'OK', onPress: () => router.push('/(tabs)') }
        ]);
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }

    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    }

    setIsLoading(false);

  };

  const t = languages[currentLanguage];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Heart size={40} color="#22C55E" />
            <Text style={styles.logoText}>HealthConnect</Text>
          </View>

          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>
        </View>

        {/* Registration Form */}
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t.nameLabel}</Text>
            <View style={styles.inputContainer}>
              <User size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder={t.namePlaceholder}
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
              />
            </View>
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t.emailLabel}</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t.phoneLabel}</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder={t.phonePlaceholder}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* Age and Location Row */}
          <View style={styles.rowContainer}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>{t.ageLabel}</Text>
              <View style={styles.inputContainer}>
                <Calendar size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder={t.agePlaceholder}
                  value={formData.age}
                  onChangeText={(value) => handleInputChange('age', value)}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.inputLabel}>{t.locationLabel}</Text>
              <View style={styles.inputContainer}>
                <MapPin size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInput}
                  placeholder={t.locationPlaceholder}
                  value={formData.location}
                  onChangeText={(value) => handleInputChange('location', value)}
                />
              </View>
            </View>
          </View>

          {/* Gender Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Gender</Text>
            <View style={styles.genderContainer}>
              {['MALE', 'FEMALE', 'OTHER'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.genderOption,
                    formData.gender === option && styles.genderOptionSelected
                  ]}
                  onPress={() => handleInputChange('gender', option)}
                >
                  <Text
                    style={[
                      styles.genderText,
                      formData.gender === option && styles.genderTextSelected
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t.passwordLabel}</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t.confirmPasswordLabel}</Text>
            <View style={styles.inputContainer}>
              <Lock size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder={t.confirmPasswordPlaceholder}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>{t.terms}</Text>

          {/* Register Button */}
          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? t.registering : t.registerButton}
            </Text>
            {!isLoading && <ArrowRight size={20} color="#FFFFFF" />}
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.haveAccountText}>{t.haveAccount}</Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.signInText}>{t.signIn}</Text>
          </TouchableOpacity>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    padding: 8,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#22C55E',
    marginTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  registerButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  haveAccountText: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
  signInText: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: 'bold',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  genderOptionSelected: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  genderText: {
    fontSize: 16,
    color: '#1F2937',
  },
  genderTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});