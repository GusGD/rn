// database.js
import { openDatabase } from 'expo-sqlite/legacy';

const databaseName = 'soma.db';
const db = openDatabase(databaseName);

export const deleteDatabase = () => {
  db.transaction(
    (tx) => {
      tx.executeSql('DROP TABLE IF EXISTS valorum');
      tx.executeSql('DROP TABLE IF EXISTS valordois');
      tx.executeSql('DROP TABLE IF EXISTS valortotal');
    },
    (error) => console.log('Erro de transação: ', error)
  );
};

export const createTables = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS valorum (id INTEGER PRIMARY KEY AUTOINCREMENT, vlr INTEGER)',
        [],
        () => console.log('Tabela valorum criada com sucesso'),
        (_, error) => console.log('Erro ao criar tabela valorum: ', error)
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS valordois (id INTEGER PRIMARY KEY AUTOINCREMENT, vlr INTEGER)',
        [],
        () => console.log('Tabela valordois criada com sucesso'),
        (_, error) => console.log('Erro ao criar tabela valordois: ', error)
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS valortotal (id INTEGER PRIMARY KEY AUTOINCREMENT, total INTEGER)',
        [],
        () => console.log('Tabela valortotal criada com sucesso'),
        (_, error) => console.log('Erro ao criar tabela valortotal: ', error)
      );
    },
    (error) => console.log('Erro de transação: ', error),
    () => console.log('Transação de criação de tabelas completa.')
  );
};

export const addItem = (tableName, vlr) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `INSERT INTO ${tableName} (vlr) VALUES (?)`,
        [vlr],
        () => console.log('Item adicionado com sucesso em', tableName),
        (_, error) => console.log('Erro ao adicionar item em', tableName, ':', error)
      );
    },
    (error) => console.log('Erro de transação: ', error)
  );
};
