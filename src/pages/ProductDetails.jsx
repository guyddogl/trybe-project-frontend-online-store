import React from 'react';
import PropTypes from 'prop-types';
import { getProductsByID } from '../services/api';
import Header from '../components/Header';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    this.state = {
      cart: (!JSON.parse(localStorage.getItem('cart'))
        ? []
        : JSON.parse(localStorage.getItem('cart'))),
      productName: '',
      productPrice: '',
      productThumbnail: '',
      details: [],
      product: {},
      email: '',
      rated: '',
      textarea: '',
      showMessage: false,
      avaliations: (!JSON.parse(localStorage.getItem(id))
        ? []
        : JSON.parse(localStorage.getItem(id))),
    };
  }

  componentDidUpdate = () => {
    const { cart, avaliations, product: { id } } = this.state;
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem(id, JSON.stringify(avaliations));
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getProductsByID(id);
    const { title, price, thumbnail, attributes } = data;
    this.setState({
      product: data,
      productName: title,
      productPrice: price,
      productThumbnail: thumbnail,
      details: attributes,
    });
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  validateForm = ({ email, rated } = this.state) => {
    const arrayInputs = [email, rated];
    return arrayInputs.some((input) => input.length === 0);
  }

  handleSaveForm = () => {
    const { email, rated, textarea } = this.state;
    if (this.validateForm()) {
      return this.setState({ showMessage: true });
    }
    this.setState({ showMessage: false });
    const avaliation = {
      email,
      rated,
      textarea,
    };
    this.setState((before) => ({ avaliations: [...before.avaliations, avaliation] }));
    this.setState({
      email: '',
      rated: '',
      textarea: '',
    });
  }

  handlerAddToCart = (product) => {
    const { cart } = this.state;
    if (cart.some(({ id }) => id === product.id)) {
      const index = cart.indexOf(cart.find(({ id }) => id === product.id));
      cart[index].orderQuantity += 1;
      const cartUpdate = cart;
      this.setState({ cart: cartUpdate });
      return;
    }
    const orderQuantity = 'orderQuantity';
    product[orderQuantity] = 1;
    this.setState((before) => ({ cart: [...before.cart, product] }));
  }

  render() {
    const {
      email,
      showMessage,
      avaliations,
      textarea, productName, productPrice, productThumbnail, details, cart, product,
    } = this.state;
    return (
      <div>
        <Header cart={ cart } />
        <h2>
          <span data-testid="product-detail-name">{productName}</span>
          {' '}
          -
          {' '}
          <span data-testid="product-detail-price">{productPrice}</span>
        </h2>
        <img
          src={ productThumbnail }
          alt={ productName }
          data-testid="product-detail-image"
        />
        <div>
          <h4>Especificações Técnicas</h4>
          <ul>
            {details.map((productDetail) => (
              <li key={ productDetail.id + productDetail.value_id }>
                {`${productDetail.name} 
                ${productDetail.value_name === null ? '' : productDetail.value_name}`}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => this.handlerAddToCart(product) }
        >
          Carrinho
        </button>
        <form>
          <input
            name="email"
            type="email"
            placeholder="email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ this.handleOnChange }
            required
          />
          <label htmlFor="1">
            <input
              type="radio"
              name="rated"
              id="1"
              value={ 1 }
              data-testid="1-rating"
              onChange={ this.handleOnChange }
            />
            <span>1</span>
          </label>
          <label htmlFor="2">
            <input
              type="radio"
              name="rated"
              id="2"
              value={ 2 }
              data-testid="2-rating"
              onChange={ this.handleOnChange }
            />
            <span>2</span>
          </label>
          <label htmlFor="3">
            <input
              type="radio"
              name="rated"
              id="3"
              value={ 3 }
              data-testid="3-rating"
              onChange={ this.handleOnChange }
            />
            <span>3</span>
          </label>
          <label htmlFor="4">
            <input
              type="radio"
              name="rated"
              id="4"
              value={ 4 }
              data-testid="4-rating"
              onChange={ this.handleOnChange }
            />
            <span>4</span>
          </label>
          <label htmlFor="5">
            <input
              type="radio"
              name="rated"
              id="5"
              value={ 5 }
              data-testid="5-rating"
              onChange={ this.handleOnChange }
            />
            <span>5</span>
          </label>
          <textarea
            value={ textarea }
            name="textarea"
            cols="30"
            rows="10"
            placeholder="Mensagem(opcional)"
            data-testid="product-detail-evaluation"
            onChange={ this.handleOnChange }
          />
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleSaveForm }
          >
            Enviar
          </button>
        </form>
        {showMessage
          && <p data-testid="error-msg">Campos inválidos</p>}
        <ul>
          {avaliations.map((element, index) => (
            <li key={ index }>
              <p data-testid="review-card-email">{ element.email }</p>
              <p data-testid="review-card-rating">{ element.rated }</p>
              <p data-testid="review-card-evaluation">{ element.textarea }</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
