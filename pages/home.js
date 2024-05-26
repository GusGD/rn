import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../components/buttons';
import { createTables, addItem, deleteDatabase } from '../database';

export default function HomeScreen({ navigation }) {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [value1Inserted, setValue1Inserted] = useState('');
  const [value2Inserted, setValue2Inserted] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    createTables();
  }, []);

  const handleAddValues = async () => {
    if (value1 && value2 && !isFetching) {
      setIsFetching(true);

      try {
        await addItem('valorum', parseInt(value1));
        await addItem('valordois', parseInt(value2));
        setValue1Inserted(value1);
        setValue2Inserted(value2);
      } catch (error) {
        console.log('Erro ao adicionar valores:', error);
      } finally {
        setIsFetching(false);
      }
    } else {
      console.log('Por favor, preencha os dois valores.');
    }
  };

  const handleCalculateTotalAndInsert = async () => {
    if (!isFetching) {
      setIsFetching(true);

      try {
        let total = parseInt(value1 || 0) + parseInt(value2 || 0);
        setTotalValue(total.toString());
        await addItem('valortotal', total);
      } catch (error) {
        console.log('Erro ao calcular e inserir total:', error);
      } finally {
        setIsFetching(false);
      }
    }
  };

  const handleDeleteDatabase = async () => {
    if (!isFetching) {
      setIsFetching(true);

      try {
        await deleteDatabase();
        setTotalValue('');
        setValue1('');
        setValue2('');
        setValue1Inserted('');
        setValue2Inserted('');
      } catch (error) {
        console.error('Erro ao excluir banco de dados:', error);
      } finally {
        setIsFetching(false);
      }
    }
  };

  const handleNavigateToListValores = () => {
    navigation.navigate('Lista de Valores');
  };

  const isButtonDisabled = !value1 || !value2 || isFetching;

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue1(text)}
          value={value1}
          placeholder="Valor para valorum"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValue2(text)}
          value={value2}
          placeholder="Valor para valordois"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Valores"
          onPress={handleAddValues}
          disabled={isButtonDisabled}
        />
        <View style={styles.buttonSeparator} />
        <Button
          title="Calcular Total e Inserir"
          onPress={handleCalculateTotalAndInsert}
          disabled={isButtonDisabled}
        />
        <View style={styles.buttonSeparator} />
        <Button
          title="Deletar Banco de Dados"
          onPress={handleDeleteDatabase}
          disabled={isButtonDisabled}
        />
        <View style={styles.buttonSeparator} />
        <Button
          title="Listar Valores"
          onPress={handleNavigateToListValores}
          disabled={isButtonDisabled}
        />
      </View>
      <View style={styles.valuesContainer}>
        <Text style={styles.valuesText}>Ultimo valor inserido para valor um: {value1Inserted}</Text>
        <Text style={styles.valuesText}>Ultimo valor inserido para valor dois: {value2Inserted}</Text>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: {totalValue}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '45%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonSeparator: {
    marginVertical: 10,
  },
  valuesContainer: {
    marginBottom: 20,
  },
  valuesText: {
    fontSize: 16,
  },
  totalContainer: {
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
