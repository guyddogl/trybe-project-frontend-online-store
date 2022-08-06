import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputSearch extends Component {
  render() {
    const { search, handleOnChange, handleSearch, isLoading } = this.props;
    const caracteresInputSize = 3;
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
          {isLoading ? (
            <button className="btn btn-dark" type="button" disabled>
              <span className="mx-2 spinner-border spinner-border-sm" />
              Pesquisando...
            </button>)
            : (
              <button
                type="button"
                className="btn btn-dark"
                style={ { width: '160px' } }
                onClick={ handleSearch }
                data-testid="query-button"
                disabled={ search.length < caracteresInputSize }
              >
                Pesquisar
              </button>
            )}
        </div>
      </div>
    );
  }
}

InputSearch.propTypes = {
  search: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default InputSearch;
