import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getValorumItems, getValordoisItems, getValortotalItems } from '../database';

export default function ListValores() {
  const [valores1, setValores1] = useState([]);
  const [valores2, setValores2] = useState([]);
  const [valores3, setValores3] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchValores();
  }, []);

  const fetchValores = async () => {
    if (!isFetching) {
      setIsFetching(true);

      try {
        console.log('Fetching valores...');

        const items1 = await getValorumItems();
        console.debug('Valores da tabela "valorum" recuperados:', items1);

        const items2 = await getValordoisItems();
        console.debug('Valores da tabela "valordois" recuperados:', items2);

        const items3 = await getValortotalItems();
        console.debug('Valores da tabela "valortotal" recuperados:', items3);

        setValores1(items1);
        setValores2(items2);
        setValores3(items3);

        setError(null);
      } catch (error) {
        console.error('Erro ao buscar valores:', error);
        setError('Erro ao buscar valores. Por favor, tente novamente.');
      } finally {
        setIsFetching(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.vlr}
      </Text>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Valores</Text>
      {error && <Text style={styles.error}>{error}</Text>} 
      <View>
        <Text style={styles.subtitle}>Valores da tabela 'valorum'</Text>
        <FlatList
          data={valores1}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </View>
      <View>
        <Text style={styles.subtitle}>Valores da tabela 'valordois'</Text>
        <FlatList
          data={valores2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </View>
      <View>
        <Text style={styles.subtitle}>Valores da tabela 'valortotal'</Text>
        <FlatList
          data={valores3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    flex: 1,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
