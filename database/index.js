// database.js
import * as SQLite from 'expo-sqlite/legacy';

const databaseName = 'soma.db';
const db = SQLite.openDatabase(databaseName);

export const deleteDatabase = async () => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql('DROP TABLE IF EXISTS valorum');
      await tx.executeSql('DROP TABLE IF EXISTS valordois');
      await tx.executeSql('DROP TABLE IF EXISTS valortotal');
    });
    console.info('Banco de dados excluído com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir banco de dados: ', error);
    throw error;
  }
};


export const createTables = async () => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'CREATE TABLE IF NOT EXISTS valorum (id INTEGER PRIMARY KEY AUTOINCREMENT, vlr INTEGER)'
      );
      console.info('Tabela valorum criada com sucesso');

      await tx.executeSql(
        'CREATE TABLE IF NOT EXISTS valordois (id INTEGER PRIMARY KEY AUTOINCREMENT, vlr INTEGER)'
      );
      console.info('Tabela valordois criada com sucesso');

      await tx.executeSql(
        'CREATE TABLE IF NOT EXISTS valortotal (id INTEGER PRIMARY KEY AUTOINCREMENT, vlr INTEGER)'
      );
      console.info('Tabela valortotal criada com sucesso');
    });

    console.info('Transação de criação de tabelas completa.');
    return Promise.resolve();
  } catch (error) {
    console.error('Erro ao criar tabelas: ', error);
    return Promise.reject(error);
  }
};

export const addItem = async (tableName, vlr) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        `INSERT INTO ${tableName} (vlr) VALUES (?)`,
        [vlr]
      );
      console.info('Item adicionado com sucesso em', tableName);
    });
    return Promise.resolve();
  } catch (error) {
    console.error('Erro ao adicionar item em', tableName, ':', error);
    return Promise.reject(error);
  }
};

export const getItemsFromTable = async (database) => {
  try {
    const items = await new Promise((resolve, reject) => {
      db.readTransaction(
        (tx) => {
          tx.executeSql(
            `SELECT vlr FROM ${database}`,
            [],
            (_, result) => {
              if (result.rows && result.rows.length > 0) {
                const items = [];
                for (let i = 0; i < result.rows.length; i++) {
                  items.push(result.rows.item(i));
                }
                resolve(items);
              } else {
                resolve([]);
              }
            },
            (_, error) => {
              console.error(`Erro ao buscar itens de ${database}:`, error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error(`Erro de transação ao buscar itens de ${database}:`, error);
          reject(error);
        }
      );
    });
    return items;
  } catch (error) {
    console.error(`Erro ao buscar itens de ${database}:`, error);
    throw error;
  }
};


export const getValorumItems = async () => {
  try {
    console.log('Buscando itens de valorum...');
    const items = await getItemsFromTable('valorum');
    console.log('Itens de valorum recuperados:', items);
    return items;
  } catch (error) {
    console.error('Erro ao buscar itens de valorum:', error);
    throw error;
  }
};

export const getValordoisItems = async () => {
  try {
    console.log('Buscando itens de valordois...');
    const items = await getItemsFromTable('valordois');
    console.log('Itens de valordois recuperados:', items);
    return items;
  } catch (error) {
    console.error('Erro ao buscar itens de valordois:', error);
    throw error;
  }
};

export const getValortotalItems = async () => {
  try {
    console.log('Buscando itens de valortotal...');
    const items = await getItemsFromTable('valortotal');
    console.log('Itens de valortotal recuperados:', items);
    return items;
  } catch (error) {
    console.error('Erro ao buscar itens de valortotal:', error);
    throw error;
  }
};
