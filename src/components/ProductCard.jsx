import React from 'react';
import PropTypes from 'prop-types';
import ButtonIconText from './ButtonIconText';

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;
    const maxCaracteres = 47;
    return (
      <div className="col ms-2 my-3">
        <div
          className="card shadow-sm"
          data-testid="product"
          style={ { width: '18rem', height: '33rem' } }
        >
          <img
            src={ thumbnail.replace(/I.jpg/g, 'W.jpg') }
            alt={ title }
            className="bd-placeholder-img card-img-top"
          />
          <div className="card-body">
            <p
              className="card-text"
              style={ { height: '48px' } }
            >
              { `${title.substr(0, maxCaracteres)}...` }

            </p>
            <p className="card-text">{`R$${price}`}</p>
            <div className="row p-2 text-center">
              <ButtonIconText
                classStyle="secondary"
                icon="fa-solid fa-circle-info"
                text="See Details"
              />
              <ButtonIconText
                classStyle="success"
                icon="fa-solid fa-cart-plus"
                text="Add To Cart"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
