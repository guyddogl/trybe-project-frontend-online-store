import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <main className="container-fluid">
        <Header />
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/cart" component={ ShoppingCart } />
          <Route exact path="/chekout" component={ Checkout } />
        </Switch>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
