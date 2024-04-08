import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionDetail = ({ route, navigation }) => {
  const { transaction } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: "Transaction Detail" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.amount}>${transaction.amount}</Text>
        <Text style={styles.label}>{transaction.name}</Text>
        <Text style={styles.location}>{transaction.location}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Transaction Date</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  infoContainer: {
    backgroundColor: '#007BFF',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  amount: {
    fontSize: 24,
    marginBottom: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  dateLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666666',
  },
});

export default TransactionDetail;
