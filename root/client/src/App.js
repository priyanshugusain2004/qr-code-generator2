import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/qrcode', { data });
      setQrCode(response.data.qrImageData);
    } catch (error) {
      console.error('Error generating QR Code:', error);
    }
  };

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={data} 
          onChange={(e) => setData(e.target.value)} 
          placeholder="Enter data"
          required
        />
        <button type="submit">Generate QR Code</button>
      </form>
      {qrCode && (
        <div>
          <h2>Generated QR Code:</h2>
          <img src={qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default App;
