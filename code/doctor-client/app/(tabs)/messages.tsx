import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MessageCircle, Mic, Send, Clock, Check, CheckCheck } from 'lucide-react-native';
import { useLanguage } from '@/hooks/useLanguage';

interface Message {
  id: string;
  patientName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messageType: 'text' | 'voice';
  isRead: boolean;
  preferredLanguage: string;
}

export default function Messages() {
  const { t } = useLanguage();

  const messages: Message[] = [
    {
      id: '1',
      patientName: 'Rajesh Kumar',
      lastMessage: 'Thank you for the prescription, doctor. When should I take the next dose?',
      timestamp: '10:30 AM',
      unreadCount: 2,
      messageType: 'text',
      isRead: false,
      preferredLanguage: 'Hindi',
    },
    {
      id: '2',
      patientName: 'Preet Kaur',
      lastMessage: 'Voice message received',
      timestamp: 'Yesterday',
      unreadCount: 1,
      messageType: 'voice',
      isRead: false,
      preferredLanguage: 'Punjabi',
    },
    {
      id: '3',
      patientName: 'Amit Sharma',
      lastMessage: 'I am feeling much better now. Thank you!',
      timestamp: '2 days ago',
      unreadCount: 0,
      messageType: 'text',
      isRead: true,
      preferredLanguage: 'English',
    },
  ];

  const renderMessageCard = (message: Message) => (
    <TouchableOpacity key={message.id} style={styles.messageCard}>
      <View style={styles.cardHeader}>
        <View style={styles.patientInfo}>
          <Text style={styles.patientName}>{message.patientName}</Text>
          <Text style={styles.languageTag}>{message.preferredLanguage}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{message.timestamp}</Text>
          {message.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{message.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.messagePreview}>
        {message.messageType === 'voice' ? (
          <View style={styles.voiceMessage}>
            <Mic size={16} color="#2563EB" />
            <Text style={styles.messageText}>{message.lastMessage}</Text>
          </View>
        ) : (
          <Text style={[
            styles.messageText,
            !message.isRead && styles.unreadMessage
          ]}>
            {message.lastMessage}
          </Text>
        )}
        <View style={styles.messageStatus}>
          {message.isRead ? (
            <CheckCheck size={16} color="#059669" />
          ) : (
            <Check size={16} color="#6B7280" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('messages')}</Text>
        <TouchableOpacity style={styles.composeButton}>
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.composeButtonText}>New Message</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {messages.map(renderMessageCard)}
      </ScrollView>

      <View style={styles.floatingActions}>
        <TouchableOpacity style={styles.voiceButton}>
          <Mic size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <MessageCircle size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
  },
  composeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 12,
  },
  composeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  languageTag: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2563EB',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  unreadBadge: {
    backgroundColor: '#DC2626',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  messagePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voiceMessage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadMessage: {
    color: '#374151',
    fontWeight: '500',
  },
  messageStatus: {
    marginLeft: 8,
  },
  floatingActions: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'column',
    gap: 12,
  },
  voiceButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  messageButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});