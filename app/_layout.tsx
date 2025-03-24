import { Stack } from 'expo-router';
import { CarrinhoProvider } from '@src/contexts/CarrinhoContext';
import { ClienteProvider } from '@src/contexts/ClienteContext';

export default function RootLayout() {
  return (
    <CarrinhoProvider>
      <ClienteProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ClienteProvider>
    </CarrinhoProvider>
  );
}
