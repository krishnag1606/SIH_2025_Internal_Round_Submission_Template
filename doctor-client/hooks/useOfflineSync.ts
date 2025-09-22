import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface SyncData {
  id: string;
  type: 'patient_note' | 'prescription' | 'consultation';
  data: any;
  timestamp: number;
}

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingSync, setPendingSync] = useState<SyncData[]>([]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
      if (state.isConnected) {
        syncPendingData();
      }
    });

    loadPendingSync();
    return unsubscribe;
  }, []);

  const loadPendingSync = async () => {
    try {
      const data = await AsyncStorage.getItem('pendingSync');
      if (data) {
        setPendingSync(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading pending sync data:', error);
    }
  };

  const savePendingSync = async (data: SyncData[]) => {
    try {
      await AsyncStorage.setItem('pendingSync', JSON.stringify(data));
      setPendingSync(data);
    } catch (error) {
      console.error('Error saving pending sync data:', error);
    }
  };

  const addToSyncQueue = async (item: Omit<SyncData, 'id' | 'timestamp'>) => {
    const syncItem: SyncData = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updated = [...pendingSync, syncItem];
    await savePendingSync(updated);

    if (isOnline) {
      syncPendingData();
    }
  };

  const syncPendingData = async () => {
    if (!isOnline || pendingSync.length === 0 || isSyncing) return;

    setIsSyncing(true);
    try {
      // Simulate API calls for syncing
      for (const item of pendingSync) {
        await syncSingleItem(item);
      }
      
      // Clear synced data
      await savePendingSync([]);
    } catch (error) {
      console.error('Error syncing data:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const syncSingleItem = async (item: SyncData) => {
    // Simulate API call
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  return {
    isOnline,
    isSyncing,
    pendingSync: pendingSync.length,
    addToSyncQueue,
    syncPendingData,
  };
}