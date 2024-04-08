import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
  transactionsData: [
    { id: 1, name: 'Amazon', amount: "50.00", date: '2024-04-01', location: { city: 'New York', province: 'NY' } },
    { id: 2, name: 'Netflix', amount: "15.00", date: '2024-04-02', location: { city: 'Los Angeles', province: 'CA' } },
    { id: 3, name: 'Starbucks', amount: "7.50", date: '2024-04-03', location: { city: 'Chicago', province: 'IL' } },
    { id: 4, name: 'Uber', amount: "25.00", date: '2024-04-04', location: { city: 'Miami', province: 'FL' } },
    { id: 5, name: 'Apple', amount: "100.00", date: '2024-04-05', location: { city: 'Seattle', province: 'WA' } },
    { id: 6, name: 'Google', amount: "150.00", date: '2024-04-06', location: { city: 'San Francisco', province: 'CA' } },
    { id: 7, name: 'Microsoft', amount: "75.00", date: '2024-04-07', location: { city: 'Austin', province: 'TX' } },
    { id: 8, name: 'Walmart', amount: "30.00", date: '2024-04-08', location: { city: 'Denver', province: 'CO' } },
    { id: 9, name: 'Target', amount: "40.00", date: '2024-04-09', location: { city: 'Atlanta', province: 'GA' } },
    { id: 10, name: 'Best Buy', amount: "80.00", date: '2024-04-10', location: { city: 'Boston', province: 'MA' } }
  ]
};

const store = createStore(reducer, initialState);

export default store;
