import React from 'react';
import './App.css';
import CreateHome from './home/CreateHome';


const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Special Delivery <span role="img" aria-label="delivery-box">📦</span>
        </p>
        <CreateHome />
      </header>
    </div>
  );
}

export default App;
