import axios from 'axios'

export const addSubscription = (subscription) =>
    axios.post('http://localhost:3000/api/customers', subscription)
