import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Eye, EyeOff, Phone, Lock, ArrowRight, Heart } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LoginRoute } from '@/lib/RouteProvider';
import { PatientContext } from '@/context/PatientContext/PatientContext';

const languages = {
  en: {
    title: 'Welcome Back',
    subtitle: 'Sign in to your HealthConnect account',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'Enter your phone number',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Sign In',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    signUp: 'Sign Up',
    or: 'OR',
    loggingIn: 'Signing in...'
  },
  hi: {
    title: 'वापस स्वागत है',
    subtitle: 'अपने हेल्थकनेक्ट खाते में साइन इन करें',
    phoneLabel: 'फोन नंबर',
    phonePlaceholder: 'अपना फोन नंबर दर्ज करें',
    passwordLabel: 'पासवर्ड',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    loginButton: 'साइन इन करें',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    signUp: 'साइन अप करें',
    or: 'या',
    loggingIn: 'साइन इन हो रहा है...'
  },
  pa: {
    title: 'ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ',
    subtitle: 'ਆਪਣੇ ਹੈਲਥਕਨੈਕਟ ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ',
    phoneLabel: 'ਫੋਨ ਨੰਬਰ',
    phonePlaceholder: 'ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ',
    passwordLabel: 'ਪਾਸਵਰਡ',
    passwordPlaceholder: 'ਆਪਣਾ ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ',
    loginButton: 'ਸਾਈਨ ਇਨ ਕਰੋ',
    forgotPassword: 'ਪਾਸਵਰਡ ਭੁੱਲ ਗਏ?',
    noAccount: 'ਖਾਤਾ ਨਹੀਂ ਹੈ?',
    signUp: 'ਸਾਈਨ ਅੱਪ ਕਰੋ',
    or: 'ਜਾਂ',
    loggingIn: 'ਸਾਈਨ ਇਨ ਹੋ ਰਿਹਾ ਹੈ...'
  }
};

export default function LoginScreen() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'pa'>('en');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async () => {
    if (!phoneNumber || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {

      const response = await axios.post(LoginRoute, {
        phone: phoneNumber,
        password: password
      })

      if (response.data.status) {
        console.log('Login successful:', response.data);
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('isLoggedIn', 'true');

        await fetchPatient();

        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', response.data.message || 'Login failed. Please try again.');
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
          <View style={styles.logoContainer}>
            <Heart size={48} color="#22C55E" />
            <Text style={styles.logoText}>HealthConnect</Text>
          </View>
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.subtitle}>{t.subtitle}</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Phone Number Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>{t.phoneLabel}</Text>
            <View style={styles.inputContainer}>
              <Phone size={20} color="#6B7280" />
              <TextInput
                style={styles.textInput}
                placeholder={t.phonePlaceholder}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
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
                value={password}
                onChangeText={setPassword}
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

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>{t.forgotPassword}</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? t.loggingIn : t.loginButton}
            </Text>
            {!isLoading && <ArrowRight size={20} color="#FFFFFF" />}
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>{t.or}</Text>
            <View style={styles.dividerLine} />
          </View>
        </View>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.noAccountText}>{t.noAccount}</Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text style={styles.signUpText}>{t.signUp}</Text>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22C55E',
    marginTop: 8,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22C55E',
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6B7280',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
  signUpText: {
    fontSize: 16,
    color: '#22C55E',
    fontWeight: 'bold',
  },
});