import React from 'react';
import PropTypes from 'prop-types';
import { getProductsByID } from '../services/api';
import Header from '../components/Header';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: (!JSON.parse(localStorage.getItem('cart'))
        ? []
        : JSON.parse(localStorage.getItem('cart'))),
      productName: '',
      productPrice: '',
      productThumbnail: '',
      details: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const data = await getProductsByID(id);
    const { title, price, thumbnail, attributes } = data;
    this.setState({
      productName: title,
      productPrice: price,
      productThumbnail: thumbnail,
      details: attributes,
    });
  }

  render() {
    const { productName, productPrice, productThumbnail, details, cart } = this.state;
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
