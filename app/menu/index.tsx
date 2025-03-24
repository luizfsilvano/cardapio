import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, FlatList, StyleSheet } from 'react-native';
import CardItem from '@components/CardItem';
import { cardapio } from '@src/data/cardapio';

export default function MenuScreen() {
  const router = useRouter();

  React.useLayoutEffect(() => {
    router.setParams?.({});
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cardapio}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardItem item={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  list: {
    padding: 12,
  },
});
