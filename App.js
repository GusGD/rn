import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { createTable, addItem, getItems } from './database';

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    createTable();

    addItem('Item 1', 5);
    addItem('Item 2', 10);

    getItems((items) => {
      console.log('Items:', items);
      setItems(items); 
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Items:</Text>
      {items.map((item) => (
        <Text key={item.id}>
          {item.name}: {item.quantity}
        </Text>
      ))}
    </View>
  );
}
