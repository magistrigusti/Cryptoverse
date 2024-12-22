import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar } from './components';

const App = () => {
  return (
    <div className="app">
      <div className="navar">
        <Navbar />
      </div>

      <div className="main">
        Main
      </div>

      <div className="footer">
        Footer
      </div>
    </div>
  )
}

export default App;