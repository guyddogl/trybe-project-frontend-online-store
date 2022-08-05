import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSearch extends Component {
  render() {
    const { search, handleOnChange, handleSearch } = this.props;
    return (
      <div className="col-12 col-md-5 my-2">
        <div className="input-group">
          <span className="input-group-text">
            <i className="fa-solid fa-search" />
          </span>
          <input
            type="text"
            name="search"
            value={ search }
            id="search-products"
            onChange={ handleOnChange }
            data-testid="query-input"
            className="form-control"
            placeholder="Pesquisar produtos"
          />
          <button
            type="button"
            className="btn btn-dark"
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
