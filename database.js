import * as SQLite from 'expo-sqlite/legacy';
import * as FileSystem from 'expo-file-system';

const db = SQLite.openDatabase('items.db');

const initializeDatabase = async () => {
  try {
    const { exists } = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`);
    if (!exists) {
      await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`);
    }
  } catch (error) {
    console.log('Error initializing database directory: ', error);
  }
};

const getDatabaseDirectory = async () => {
    try {
      await initializeDatabase(); // Espera a inicialização do diretório do banco de dados
      const dbInfo = await FileSystem.getInfoAsync(db._name);
      console.log('Database info:', dbInfo); // Adicione esta linha
      return dbInfo.uri;
    } catch (error) {
      console.log('Error getting database directory: ', error);
      return null;
    }
};


getDatabaseDirectory().then(directory => {
    console.log('Database directory: ', directory);
  });

export const createTable = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER)',
        [],
        () => console.log('Table created successfully'),
        (_, error) => console.log('Error creating table: ', error)
      );
    },
    (error) => console.log('Transaction error: ', error)
  );
};

// Função para adicionar um novo item
export const addItem = (name, quantity) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'INSERT INTO items (name, quantity) VALUES (?, ?)',
        [name, quantity],
        () => console.log('Item added successfully'),
        (_, error) => console.log('Error adding item: ', error)
      );
    },
    (error) => console.log('Transaction error: ', error)
  );
};

// Função para obter todos os itens
export const getItems = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        'SELECT * FROM items',
        [],
        (_, { rows }) => callback(rows._array),
        (_, error) => console.log('Error fetching items: ', error)
      );
    },
    (error) => console.log('Transaction error: ', error)
  );
};
