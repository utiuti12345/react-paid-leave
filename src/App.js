import React from 'react';
import logo from './logo.svg';
import './App.css';
import ControlledOpenSelect from './components/common/ControlledOpenSelect';
import DatePickers from './components/common/DatePickers';
import PaidLeave from "./components/paidleave/PaidLeave";

function App() {
  return (
    <div className="App">
      <PaidLeave/>
    </div>
  );
}

export default App;
