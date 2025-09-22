import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import DoctorContextProvider from '@/Context/DoctorContext/DoctorContextProvider';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <DoctorContextProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </DoctorContextProvider>
    </>
  );
}
