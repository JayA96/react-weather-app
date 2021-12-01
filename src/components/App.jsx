import React from 'react';
import Header from './Header';
import Container from './Container'
import Footer from './Footer';
import '../styles.css';
require('dotenv').config();

function App() {

  return (
    <div>
      <Header />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
