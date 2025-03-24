import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useCarrinho } from '@src/contexts/CarrinhoContext';
import { useCliente } from '@src/contexts/ClienteContext';
import { useRouter } from 'expo-router';

import { Alimento } from '@src/data/cardapio';

export default function ResumoScreen() {
  const { itens, limparCarrinho } = useCarrinho();
  const router = useRouter();
  const { cliente, isClienteLogado } = useCliente();


  const total = itens.reduce((sum, item) => sum + item.preco, 0);

  const finalizar = () => {
    if (!isClienteLogado) {
      Alert.alert(
        'Login necessário',
        'Você precisa estar logado para finalizar o pedido.',
        [
          {
            text: 'Fazer login',
            onPress: () => router.push('/cadastro'),
          },
          { text: 'Cancelar', style: 'cancel' },
        ]
      );
      return;
    }
  
    Alert.alert(
      'Confirmar Pedido',
      `Finalizar pedido para:\n\n👤 ${cliente?.nome}\n📧 ${cliente?.email}\n📍 ${cliente?.endereco}`,
      [
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert('Pedido Finalizado', 'Obrigado pela compra!');
            limparCarrinho();
            router.push('/menu');
          },
        },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };
  

  const agruparItens = () => {
    const agrupados: { [id: string]: { item: Alimento; quantidade: number } } = {};
  
    itens.forEach((item) => {
      if (agrupados[item.id]) {
        agrupados[item.id].quantidade += 1;
      } else {
        agrupados[item.id] = { item, quantidade: 1 };
      }
    });
  
    return Object.values(agrupados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumo do Pedido</Text>

      {itens.length === 0 ? (
        <Text style={styles.vazio}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={agruparItens()}
            keyExtractor={(item, index) => `${item.item.id}-${index}`}
            renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.nome}>
                    {item.quantidade}x - {item.item.nome}
                  </Text>
                  <Text style={styles.preco}>
                    R$ {(item.item.preco * item.quantidade).toFixed(2)}
                  </Text>
                </View>
              )}
          />

          <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

          <TouchableOpacity style={styles.botao} onPress={finalizar}>
            <Text style={styles.textoBotao}>Finalizar Pedido</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.botao, { backgroundColor: '#ccc' }]} onPress={limparCarrinho}>
            <Text style={[styles.textoBotao, { color: '#000' }]}>Limpar Carrinho</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  vazio: {
    fontSize: 16,
    color: '#666',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  nome: {
    fontSize: 16,
  },
  preco: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  botao: {
    backgroundColor: '#007aff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
