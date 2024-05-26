import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Button from './components/buttons';
import { createTables, addItem, deleteDatabase } from './database';

export default function App() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [totalValue, setTotalValue] = useState('');
  const [value1Inserted, setValue1Inserted] = useState('');
  const [value2Inserted, setValue2Inserted] = useState('');

  useEffect(() => {
    createTables();
  }, []);

  const handleAddValues = () => {
    if (value1 && value2) {
      addItem('valorum', parseInt(value1));
      addItem('valordois', parseInt(value2));
      setValue1Inserted(value1);
      setValue2Inserted(value2);
    } else {
      console.log('Por favor, preencha os dois valores.');
    }
  };

  const handleCalculateTotalAndInsert = () => {
    let total = parseInt(value1 || 0) + parseInt(value2 || 0);
    setTotalValue(total.toString());
    addItem('valortotal', total);
  };

  const handleDeleteDatabase = () => {
    deleteDatabase();
    setTotalValue('');
    setValue1('');
    setValue2('');
    setValue1Inserted('');
    setValue2Inserted('');
  };

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
        <Button title="Adicionar Valores" onPress={handleAddValues} />
        <View style={styles.buttonSeparator} />
        <Button title="Calcular Total e Inserir" onPress={handleCalculateTotalAndInsert} />
        <View style={styles.buttonSeparator} />
        <Button title="Deletar Banco de Dados" onPress={handleDeleteDatabase} />
      </View>
      <View style={styles.valuesContainer}>
        <Text style={styles.valuesText}>Valor inserido para valorum: {value1Inserted}</Text>
        <Text style={styles.valuesText}>Valor inserido para valordois: {value2Inserted}</Text>
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
    marginTop:20,
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