import React, { Component } from 'react';

class ShoppingCart extends Component {
  state = {
    cart: (!JSON.parse(localStorage.getItem('cart'))
      ? []
      : JSON.parse(localStorage.getItem('cart'))),
  }

  render() {
    const { cart } = this.state;
    console.log(cart);
    return (
      <div>
        {cart.length > 0
          ? cart.map(({ title, price }) => (
            <div key={ title }>
              <p data-testid="shopping-cart-product-quantity"> 1 </p>
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p>{price}</p>
            </div>
          ))
          : (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>)}
      </div>

    );
  }
}

export default ShoppingCart;
