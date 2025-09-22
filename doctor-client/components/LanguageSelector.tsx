import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, availableLanguages, t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('selectLanguage')}</Text>
      
      <View style={styles.languageList}>
        {availableLanguages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={[
              styles.languageOption,
              currentLanguage === language.code && styles.selectedOption
            ]}
            onPress={() => changeLanguage(language.code)}
          >
            <Text style={[
              styles.languageName,
              currentLanguage === language.code && styles.selectedText
            ]}>
              {language.name}
            </Text>
            {currentLanguage === language.code && (
              <Check size={24} color="#2563EB" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 32,
    textAlign: 'center',
  },
  languageList: {
    gap: 16,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  languageName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
  },
  selectedText: {
    color: '#2563EB',
  },
});