import React, { Component } from 'react';
import Header from '../components/Header';

class Detalhes extends Component {
  state = {
    cart: (!JSON.parse(localStorage.getItem('cart'))
      ? []
      : JSON.parse(localStorage.getItem('cart'))),
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Header cart={ cart } />
        <p>
          detalhes
        </p>
      </div>
    );
  }
}

export default Detalhes;
