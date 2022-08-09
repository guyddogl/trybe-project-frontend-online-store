import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class ShoppingCart extends Component {
  state = {
    cart: (!JSON.parse(localStorage.getItem('cart'))
      ? []
      : JSON.parse(localStorage.getItem('cart'))),
  }

  componentDidUpdate = () => {
    const { cart } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  increaseProductQuantity = (idProduct, operation) => {
    const { cart } = this.state;
    const index = cart.indexOf(cart.find(({ id }) => id === idProduct));
    if (operation === 'increase'
    && cart[index].orderQuantity < cart[index].available_quantity) {
      cart[index].orderQuantity += 1;
      const cartUpdate = cart;
      return this.setState({ cart: cartUpdate });
    }
    if (operation === 'decrease' && cart[index].orderQuantity > 1) {
      cart[index].orderQuantity -= 1;
      const cartUpdate = cart;
      return this.setState({ cart: cartUpdate });
    }
  }

  removeProduct = (id) => {
    const { cart } = this.state;
    const cartUpdate = cart.filter((item) => item.id !== id);
    this.setState({ cart: cartUpdate });
  }

  render() {
    const { cart } = this.state;
    return (
      <div>
        <Header cart={ cart } />
        {cart.length > 0
          ? cart.map(({ title, price, orderQuantity, id }) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p>{price}</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.increaseProductQuantity(id, 'decrease') }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                { orderQuantity }
              </p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.increaseProductQuantity(id, 'increase') }
                disabled={ this.increaseButtonDisabled }
              >
                +
              </button>
              <button
                type="button"
                data-testid="remove-product"
                onClick={ () => this.removeProduct(id) }
              >
                Remove
              </button>
            </div>
          ))
          : (
            <p
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </p>)}
        <Link to="/checkout">
          <button type="button" data-testid="checkout-products">Finalize a compra</button>
        </Link>
      </div>

    );
  }
}

export default ShoppingCart;
