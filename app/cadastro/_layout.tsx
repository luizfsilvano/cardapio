import { Stack, Slot, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import React from 'react';

export default function MenuLayout() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Cadastro',
        }}
      />
      <Slot />
    </>
  );
}
