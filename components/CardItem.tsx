import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { Alimento } from '@src/data/cardapio';
import { useCarrinho } from 'src/contexts/CarrinhoContext';

type Props = {
  item: Alimento;
};

export default function CardItem({ item }: Props) {
  const { adicionarItem } = useCarrinho();

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.imagem }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>
        <View style ={styles.botaoContainer}>
          <Button title="Adicionar" onPress={() => adicionarItem(item)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  botaoContainer: {
    marginTop: 10,
    width: 100,
    height: 40,
    alignSelf: 'flex-start'
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descricao: {
    fontSize: 14,
    color: '#555',
  },
  preco: {
    marginTop: 6,
    fontSize: 14,
    color: '#000',
  },
});
