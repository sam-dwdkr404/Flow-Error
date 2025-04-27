import React, { useState } from 'react';
import './App.css';

function App() {
  const [chatActive, setChatActive] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I am FLOWERROR, your Water Issues Assistant. Please choose an option or type your issue under "Others".' },
  ]);
  const [userQuery, setUserQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    if (option === 'others') {
      setChatMessages([
        ...chatMessages,
        { type: 'bot', message: 'Please describe your issue in detail.' }
      ]);
    } else {
      // Predefined responses for Leakage, Contamination, and Shortage
      let response = '';
      if (option === 'leakage') {
        response = 'For leakage issues, please turn off your main water valve and report it to us immediately!';
      } else if (option === 'contamination') {
        response = 'If you notice contamination, avoid drinking the water and use bottled water until further notice.';
      } else if (option === 'shortage') {
        response = 'In case of water shortage, try to conserve water and report the situation so we can assist faster.';
      }
      setChatMessages([
        ...chatMessages,
        { type: 'bot', message: response }
      ]);
    }
  };

  const handleUserInput = (input) => {
    if (!input.trim()) return;
    setChatMessages([
      ...chatMessages,
      { type: 'user', message: input },
    ]);
    generateDynamicResponse(input);
    setUserQuery('');
  };

  const generateDynamicResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('leak') || lowerQuery.includes('leakage')) {
      setChatMessages(prev => [
        ...prev,
        { type: 'bot', message: 'For leakage, please shut off the water valve and we will dispatch our team shortly!' },
      ]);
    } else if (lowerQuery.includes('contamination')) {
      setChatMessages(prev => [
        ...prev,
        { type: 'bot', message: 'If water appears contaminated, avoid using it and we will send a team for inspection.' },
      ]);
    } else if (lowerQuery.includes('shortage')) {
      setChatMessages(prev => [
        ...prev,
        { type: 'bot', message: 'Water shortage reported. We recommend conserving usage until the supply is restored.' },
      ]);
    } else {
      // For other issues
      setChatMessages(prev => [
        ...prev,
        { type: 'bot', message: 'Thank you for reporting. We will check the issue and get back to you.' },
        { type: 'bot', message: 'Please share your contact number for follow-up.' },
        { type: 'bot', message: 'In case of emergency, kindly call our customer care at 123-456-7890.' }
      ]);
    }
  };

  return (
    <div className="App">
      <h1>FLOWERROR - Water Issues Reporting App</h1>

      {chatActive && (
        <div className="chatbox">
          {chatMessages.map((msg, index) => (
            <div key={index} className={msg.type}>
              <p>{msg.message}</p>
            </div>
          ))}

          {selectedOption === '' && (
            <div className="options">
              <button onClick={() => handleSelectOption('leakage')}>Leakage</button>
              <button onClick={() => handleSelectOption('contamination')}>Contamination</button>
              <button onClick={() => handleSelectOption('shortage')}>Shortage</button>
              <button onClick={() => handleSelectOption('others')}>Others</button>
            </div>
          )}

          {(selectedOption === 'others' || selectedOption !== '') && (
            <div className="user-input">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Type your query..."
              />
              <button onClick={() => handleUserInput(userQuery)}>Send</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
