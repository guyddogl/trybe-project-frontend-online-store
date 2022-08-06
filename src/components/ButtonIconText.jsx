import React from 'react';
import PropTypes from 'prop-types';

class ButtonIconText extends React.Component {
  render() {
    const { icon, text, classStyle } = this.props;
    return (
      <button
        type="button"
        className={ `btn btn-${classStyle} my-1 mx-1` }
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
};

export default ButtonIconText;
