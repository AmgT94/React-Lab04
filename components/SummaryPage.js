import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from '../services/firebaseConfig';

const db = firebase.database();

const SummaryPage = () => {
  const [transactions, setTransactions] = useState([]);

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

  const getNumberOfTransactions = () => transactions.length;

  const getBalance = () => {
    return transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0).toFixed(2);
  };

  const getExtremeSpendingTransaction = (isHighest = true) => {
    if (transactions.length === 0) return null; 
    return transactions.reduce((extreme, transaction) => {
      const extremeAmount = parseFloat(extreme.amount);
      const currentAmount = parseFloat(transaction.amount);
      return isHighest ? (currentAmount > extremeAmount ? transaction : extreme) : (currentAmount < extremeAmount ? transaction : extreme);
    }, transactions[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>{getNumberOfTransactions()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Balance</Text>
        <Text style={styles.subtitle}>${getBalance()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>High Spending</Text>
        {renderExtremeTransaction(getExtremeSpendingTransaction(true))}
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Low Spending</Text>
        {renderExtremeTransaction(getExtremeSpendingTransaction(false))}
      </View>
    </View>
  );
};

const renderExtremeTransaction = (transaction) => {
  if (!transaction) {
    return <Text>No transactions available</Text>;
  }
  return (
    <View style={styles.transactionContainer}>
      <Text style={styles.transactionName}>{transaction.name}</Text>
      <Text style={styles.transactionAmount}>${transaction.amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  transactionName: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#FF5733',
    fontWeight: 'bold',
  },
});

export default SummaryPage;
