import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get('http://backend:3000/list')
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://backend:3000/create', { name, price });
      setItems([...items, response.data]);
      setName('');
      setPrice('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Simple CRUD App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" required />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;