import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {Navbar, Homepage, Exchanges, Cryptocurrencies,
  CryptoDetails, News} from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="navar">
        <Navbar />
      </div>

      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" >
                <Homepage />
              </Route>

              <Route exact path="/exchanges">
                <Exchanges />
              </Route>

              <Route exact path="/cryptourrencies">
                <Cryptocurrencies />
              </Route>

              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>

              <Route exact path="/news">
                <News />
              </Route>
            </Routes>
          </div>
        </Layout>
      </div>

      <div className="footer">
        Footer
      </div>
    </div>
  );
}

export default App;
