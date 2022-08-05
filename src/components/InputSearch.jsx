import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSearch extends Component {
  render() {
    const { search, handleOnChange, handleSearch } = this.props;
    return (
      <div>
        <div>
          <label htmlFor="search-products">
            <input
              type="text"
              name="search"
              value={ search }
              id="search-products"
              onChange={ handleOnChange }
              data-testid="query-input"
            />
          </label>
          <button
            type="button"
            onClick={ handleSearch }
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </div>

      </div>
    );
  }
}

InputSearch.propTypes = {
  search: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default InputSearch;
