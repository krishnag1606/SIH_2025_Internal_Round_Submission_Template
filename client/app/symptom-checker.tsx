import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mic, Chrome as Home, Stethoscope, Pill } from 'lucide-react-native';
import { router } from 'expo-router';

const symptomQuestions = [
  {
    id: 1,
    question: 'Are you experiencing fever?',
    hindi: 'क्या आपको बुखार है?',
    punjabi: 'ਕੀ ਤੁਹਾਨੂੰ ਬੁਖਾਰ ਹੈ?',
    options: ['Yes / हाँ / ਹਾਂ', 'No / नहीं / ਨਹੀਂ']
  },
  {
    id: 2,
    question: 'Do you have a cough?',
    hindi: 'क्या आपको खांसी है?',
    punjabi: 'ਕੀ ਤੁਹਾਨੂੰ ਖੰਘ ਹੈ?',
    options: ['Yes / हाँ / ਹਾਂ', 'No / नहीं / ਨਹੀਂ']
  },
  {
    id: 3,
    question: 'Are you experiencing difficulty breathing?',
    hindi: 'क्या आपको सांस लेने में कठिनाई है?',
    punjabi: 'ਕੀ ਤੁਹਾਨੂੰ ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਿਲ ਹੈ?',
    options: ['Yes / हाँ / ਹਾਂ', 'No / नहीं / ਨਹੀਂ']
  },
  {
    id: 4,
    question: 'Do you have body aches?',
    hindi: 'क्या आपके शरीर में दर्द है?',
    punjabi: 'ਕੀ ਤੁਹਾਡੇ ਸਰੀਰ ਵਿੱਚ ਦਰਦ ਹੈ?',
    options: ['Yes / हाँ / ਹਾਂ', 'No / नहीं / ਨਹੀਂ']
  }
];

const recommendations = {
  homecare: {
    title: 'Home Care Recommended',
    hindi: 'घरेलू देखभाल की सिफारिश',
    punjabi: 'ਘਰੇਲੂ ਦੇਖਭਾਲ ਦੀ ਸਿਫਾਰਿਸ਼',
    icon: Home,
    color: '#22C55E',
    advice: [
      'Rest and drink plenty of fluids',
      'Take paracetamol for fever if needed',
      'Monitor symptoms for 2-3 days'
    ]
  },
  pharmacy: {
    title: 'Visit Pharmacy',
    hindi: 'फार्मेसी जाएं',
    punjabi: 'ਫਾਰਮੇਸੀ ਜਾਓ',
    icon: Pill,
    color: '#3B82F6',
    advice: [
      'Consult pharmacist for over-the-counter medicines',
      'Get medicines for symptom relief',
      'Follow dosage instructions carefully'
    ]
  },
  doctor: {
    title: 'Consult Doctor',
    hindi: 'डॉक्टर से सलाह लें',
    punjabi: 'ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਲਓ',
    icon: Stethoscope,
    color: '#EF4444',
    advice: [
      'Book appointment immediately',
      'Severe symptoms detected',
      'Professional medical attention required'
    ]
  }
};

export default function SymptomChecker() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [useVoice, setUseVoice] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < symptomQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      generateRecommendation(newAnswers);
    }
  };

  const generateRecommendation = (userAnswers: string[]) => {
    // Simple logic for demonstration
    const yesCount = userAnswers.filter(answer => answer.includes('Yes')).length;
    
    let recommendation;
    if (yesCount >= 3) {
      recommendation = 'doctor';
    } else if (yesCount >= 2) {
      recommendation = 'pharmacy';
    } else {
      recommendation = 'homecare';
    }

    setTimeout(() => {
      setShowResult(true);
    }, 500);
  };

  const resetChecker = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setTextInput('');
  };

  const getRecommendation = () => {
    const yesCount = answers.filter(answer => answer.includes('Yes')).length;
    if (yesCount >= 3) return recommendations.doctor;
    if (yesCount >= 2) return recommendations.pharmacy;
    return recommendations.homecare;
  };

  if (showResult) {
    const recommendation = getRecommendation();
    const IconComponent = recommendation.icon;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Symptom Assessment</Text>
        </View>

        <ScrollView contentContainerStyle={styles.resultContent}>
          <View style={[styles.resultCard, { borderColor: recommendation.color }]}>
            <View style={[styles.iconContainer, { backgroundColor: recommendation.color }]}>
              <IconComponent size={48} color="#FFFFFF" />
            </View>
            
            <Text style={styles.resultTitle}>{recommendation.title}</Text>
            <Text style={styles.resultSubtitle}>{recommendation.hindi}</Text>
            <Text style={styles.resultSubtitle}>{recommendation.punjabi}</Text>
            
            <View style={styles.adviceContainer}>
              <Text style={styles.adviceTitle}>Recommendations:</Text>
              {recommendation.advice.map((advice, index) => (
                <View key={index} style={styles.adviceItem}>
                  <Text style={styles.adviceBullet}>•</Text>
                  <Text style={styles.adviceText}>{advice}</Text>
                </View>
              ))}
            </View>
            
            <View style={styles.actionButtons}>
              {recommendation === recommendations.doctor && (
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
                  onPress={() => router.push('/doctors')}
                >
                  <Stethoscope size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Book Doctor</Text>
                </TouchableOpacity>
              )}
              
              {recommendation === recommendations.pharmacy && (
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
                  onPress={() => router.push('/medicines')}
                >
                  <Pill size={20} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Find Medicines</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity 
                style={[styles.actionButton, { backgroundColor: '#6B7280' }]}
                onPress={resetChecker}
              >
                <Text style={styles.actionButtonText}>Check Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Symptom Checker</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Input Method Toggle */}
        <View style={styles.inputToggle}>
          <TouchableOpacity 
            style={[styles.toggleOption, !useVoice && styles.activeToggle]}
            onPress={() => setUseVoice(false)}
          >
            <Text style={[styles.toggleText, { color: !useVoice ? '#FFFFFF' : '#6B7280' }]}>
              Text Input
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleOption, useVoice && styles.activeToggle]}
            onPress={() => setUseVoice(true)}
          >
            <Mic size={16} color={useVoice ? '#FFFFFF' : '#6B7280'} />
            <Text style={[styles.toggleText, { color: useVoice ? '#FFFFFF' : '#6B7280' }]}>
              Voice Input
            </Text>
          </TouchableOpacity>
        </View>

        {useVoice ? (
          <View style={styles.voiceContainer}>
            <TouchableOpacity style={styles.voiceButton}>
              <Mic size={48} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.voiceInstructions}>
              Tap to describe your symptoms in your preferred language
            </Text>
          </View>
        ) : (
          <View style={styles.textContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Describe your symptoms here... / यहाँ अपने लक्षणों का वर्णन करें... / ਇੱਥੇ ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ..."
              multiline
              numberOfLines={4}
              value={textInput}
              onChangeText={setTextInput}
            />
            <TouchableOpacity style={styles.analyzeButton}>
              <Text style={styles.analyzeButtonText}>Analyze Symptoms</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Question Flow */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>Or answer these questions:</Text>
          
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${((currentQuestion + 1) / symptomQuestions.length) * 100}%` }]} />
          </View>
          
          <Text style={styles.questionCounter}>
            Question {currentQuestion + 1} of {symptomQuestions.length}
          </Text>
          
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>
              {symptomQuestions[currentQuestion].question}
            </Text>
            <Text style={styles.questionTextHindi}>
              {symptomQuestions[currentQuestion].hindi}
            </Text>
            <Text style={styles.questionTextPunjabi}>
              {symptomQuestions[currentQuestion].punjabi}
            </Text>
            
            <View style={styles.optionsContainer}>
              {symptomQuestions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswer(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  scrollContent: {
    padding: 20,
  },
  inputToggle: {
    flexDirection: 'row',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  toggleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#3B82F6',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  voiceContainer: {
    alignItems: 'center',
    padding: 40,
    marginBottom: 20,
  },
  voiceButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  voiceInstructions: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  analyzeButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  questionCounter: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  questionCard: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  questionTextHindi: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
  },
  questionTextPunjabi: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  // Result Styles
  resultContent: {
    padding: 20,
    alignItems: 'center',
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 2,
    width: '100%',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  adviceContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
  },
  adviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  adviceItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  adviceBullet: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
    marginTop: 2,
  },
  adviceText: {
    flex: 1,
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  actionButtons: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});