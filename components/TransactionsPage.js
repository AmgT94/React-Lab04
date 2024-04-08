import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Modal, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import firebase from '../services/firebaseConfig';

const db = firebase.database();

const TransactionsPage = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newTransactionAmount, setNewTransactionAmount] = useState('');
  const [newTransactionDate, setNewTransactionDate] = useState('');
  const [newTransactionCity, setNewTransactionCity] = useState('');
  const [newTransactionProvince, setNewTransactionProvince] = useState('');

  useEffect(() => {
    const transactionsRef = db.ref('transactionsData');
    const handleData = (snapshot) => {
      const transactionsData = snapshot.val();
      if (transactionsData) {
        setTransactions(Object.values(transactionsData));
      } else {
        setTransactions([]);
      }
    };

    transactionsRef.on('value', handleData);

    return () => {
      transactionsRef.off('value', handleData);
    };
  }, []);

  const addTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      name: newTransactionName,
      amount: newTransactionAmount,
      date: newTransactionDate,
      location: `${newTransactionCity}, ${newTransactionProvince}`
    };

    db.ref('transactionsData').push(newTransaction);
    setModalVisible(false);
  };

  const renderTransactionItem = ({ item, index }) => (
    <TouchableOpacity 
      style={styles.transactionItem} 
      onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}
    >
      <View style={styles.transactionContent}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionAmount}>${item.amount}</Text>
      </View>
      {index !== transactions.length - 1 && <View style={styles.divider}></View>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Add Record" onPress={() => setModalVisible(true)} />
      <FlatList 
        data={transactions} 
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id.toString()}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={text => setNewTransactionName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={text => setNewTransactionAmount(text)}
            />
            <View style={styles.cityProvinceContainer}>
              <TextInput
                style={[styles.input, styles.cityInput]}
                placeholder="City"
                onChangeText={text => setNewTransactionCity(text)}
              />
              <TextInput
                style={[styles.input, styles.provinceInput]}
                placeholder="Province"
                onChangeText={text => setNewTransactionProvince(text)}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Date (YYYY-MM-DD)"
              onChangeText={text => setNewTransactionDate(text)}
            />
            <View style={styles.buttonContainer}>
              <Button title="Add Record" onPress={addTransaction} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#999" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#F0F0F0',
  },
  transactionItem: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  transactionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#D4EDDA',
    borderRadius: 0, 
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#007BFF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
  cityProvinceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cityInput: {
    flex: 1,
    marginRight: 5,
  },
  provinceInput: {
    flex: 1,
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
});

export default TransactionsPage;
