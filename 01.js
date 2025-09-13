import React, { useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [mood, setMood] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [history, setHistory] = useState([]);

  const handleSubmit = async () => {
    const response = await axios.post('http://localhost:5000/analyze', { mood });
    const { sentiment, recommendation } = response.data;

    setSentiment(sentiment);
    setRecommendation(recommendation);
    setHistory([...history, { date: new Date().toLocaleDateString(), mood: sentiment }]);
  };

  return (
    <div className="App">
      <h1>Student Wellness Tracker</h1>

      <textarea
        rows="4"
        cols="50"
        placeholder="How are you feeling today?"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit Mood</button>

      {sentiment && <p><strong>Sentiment:</strong> {sentiment}</p>}
      {recommendation && <p><strong>Recommendation:</strong> {recommendation}</p>}

      <h2>Wellness Trends</h2>
      <LineChart width={600} height={300} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default App;
