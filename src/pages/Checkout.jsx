import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Checkout extends Component {
  state = {
    cart: (!JSON.parse(localStorage.getItem('cart'))
      ? []
      : JSON.parse(localStorage.getItem('cart'))),
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payment: false,
    showMessage: false,
  }

  validateForm = ({ fullname, email, cpf, phone, cep, address } = this.state) => {
    const { payment } = this.state;
    const arrayInputs = [fullname, email, cpf, phone, cep, address];
    return arrayInputs.some((input) => input.length === 0 || !payment);
  }

  handleOnChange = ({ target }) => {
    const name = target.type === 'radio' ? 'payment' : target.name;
    const value = target.type === 'radio' ? target.checked : target.value;
    this.setState({ [name]: value });
  };

  completePurchase = () => {
    if (this.validateForm()) {
      return this.setState({ showMessage: true });
    }
    localStorage.setItem('cart', JSON.stringify([]));
    const { history } = this.props;
    return history.push('/');
  }

  render() {
    const {
      cart,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      showMessage,
    } = this.state;
    return (
      <>
        <Header cart={ cart } categories={ false } />
        <div>
          {cart.map(({ title, price, orderQuantity, id }) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p>{price}</p>
              <p data-testid="shopping-cart-product-quantity">
                { orderQuantity }
              </p>
            </div>
          )) }
        </div>
        {showMessage
          && <p data-testid="error-msg">Campos inválidos</p>}
        <form>
          <input
            type="text"
            name="fullname"
            value={ fullname }
            onChange={ this.handleOnChange }
            data-testid="checkout-fullname"
            placeholder="fullname"
          />
          <input
            type="email"
            name="email"
            value={ email }
            onChange={ this.handleOnChange }
            data-testid="checkout-email"
            placeholder="email"
          />
          <input
            type="text"
            name="cpf"
            value={ cpf }
            onChange={ this.handleOnChange }
            data-testid="checkout-cpf"
            placeholder="cpf"
          />
          <input
            type="text"
            name="phone"
            value={ phone }
            onChange={ this.handleOnChange }
            data-testid="checkout-phone"
            placeholder="phone"
          />
          <input
            type="text"
            name="cep"
            value={ cep }
            onChange={ this.handleOnChange }
            data-testid="checkout-cep"
            placeholder="cep"
          />
          <input
            type="text"
            name="address"
            value={ address }
            onChange={ this.handleOnChange }
            data-testid="checkout-address"
            placeholder="address"
          />
          <label htmlFor="boleto">
            <input
              type="radio"
              name="payment"
              id="boleto"
              value="boleto"
              onChange={ this.handleOnChange }
              data-testid="ticket-payment"
            />
            Boleto
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              name="payment"
              id="visa"
              value="visa"
              onChange={ this.handleOnChange }
              data-testid="visa-payment"
            />
            Visa
          </label>
          <label htmlFor="master">
            <input
              type="radio"
              name="payment"
              id="master"
              value="master"
              onChange={ this.handleOnChange }
              data-testid="master-payment"
            />
            Master
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              name="payment"
              id="elo"
              value="elo"
              onChange={ this.handleOnChange }
              data-testid="elo-payment"
            />
            Elo
          </label>
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.completePurchase }
          >
            Concluir Compra
          </button>
        </form>
      </>

    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
