import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Wifi, WifiOff, RotateCcw } from 'lucide-react-native';
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { useLanguage } from '@/hooks/useLanguage';

export default function OfflineIndicator() {
  const { isOnline, isSyncing, pendingSync, syncPendingData } = useOfflineSync();
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        {isOnline ? (
          <Wifi size={20} color="#059669" />
        ) : (
          <WifiOff size={20} color="#DC2626" />
        )}
        <Text style={[
          styles.statusText,
          { color: isOnline ? '#059669' : '#DC2626' }
        ]}>
          {isOnline ? t('online') : t('offline')}
        </Text>
      </View>

      {pendingSync > 0 && (
        <TouchableOpacity
          style={[styles.syncButton, isSyncing && styles.syncing]}
          onPress={syncPendingData}
          disabled={!isOnline || isSyncing}
        >
          <RotateCcw 
            size={16} 
            color="#FFFFFF" 
            style={isSyncing && styles.rotating}
          />
          <Text style={styles.syncText}>
            {isSyncing ? 'Syncing...' : `${t('sync')} (${pendingSync})`}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#2563EB',
    borderRadius: 16,
  },
  syncing: {
    opacity: 0.7,
  },
  syncText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  rotating: {
    // Add rotation animation here if needed
  },
});