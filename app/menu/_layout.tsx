import { Stack, Slot, useRouter } from 'expo-router';
import { useCarrinho } from '@src/contexts/CarrinhoContext';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function MenuLayout() {
    const router = useRouter();

    const { itens } = useCarrinho();
    const totalItens = itens.length;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Cardápio',
          headerRight: () => (
            <Pressable onPress={() => router.push('/resumo')} style={{ marginRight: 16 }}>
                <View>
                    <Ionicons name="cart-outline" size={24} color="black" />
                    {totalItens > 0 && (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{totalItens}</Text>
                        </View>
                    )}
                </View>
            </Pressable>
          ),
        }}
      />
      <Slot />
    </>
  );
}

const styles = StyleSheet.create({
    badge: {
      position: 'absolute',
      top: -6,
      right: -10,
      backgroundColor: 'red',
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 1,
      minWidth: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeText: {
      color: 'white',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
  
