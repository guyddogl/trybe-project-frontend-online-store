import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import Detalhes from './pages/Detalhes';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main className="container-fluid">
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/cart" component={ ShoppingCart } />
            <Route exact path="/chekout" component={ Checkout } />
            <Route exact path="/detalhes/:id" component={ Detalhes } />
          </Switch>
          <Footer />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
