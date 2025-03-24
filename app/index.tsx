import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🍔</Text>
      <Text style={styles.subtitulo}>Bem-vindo à</Text>
      <Text style={styles.titulo}>Lanchonete Online</Text>

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botao} onPress={() => router.push('/menu')}>
          <Text style={styles.textoBotao}>Ver Cardápio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => router.push('/cadastro')}>
          <Text style={styles.textoBotao}>Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => router.push('/resumo')}>
          <Text style={styles.textoBotao}>Resumo do Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 20,
    color: '#888',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#222',
  },
  botoes: {
    width: '100%',
    gap: 16,
  },
  botao: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
