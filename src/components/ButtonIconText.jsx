import React from 'react';
import PropTypes from 'prop-types';

class ButtonIconText extends React.Component {
  render() {
    const { icon, text, classStyle, handlerAddToCart, product } = this.props;
    return (
      <button
        data-testid="product-add-to-cart"
        type="button"
        className={ `btn btn-${classStyle} my-1 mx-1` }
        onClick={ () => handlerAddToCart(product) }
      >
        <i className={ `${icon} me-2` } />
        { text }
      </button>
    );
  }
}

ButtonIconText.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  classStyle: PropTypes.string.isRequired,
  product: PropTypes.shape({}).isRequired,
  handlerAddToCart: PropTypes.func.isRequired,
};

export default ButtonIconText;
