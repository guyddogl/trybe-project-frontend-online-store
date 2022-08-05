import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class ProductsList extends Component {
  state = {
    search: '',
    products: [],
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSearch = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery(undefined, search);
    const { results } = response;
    this.setState({
      products: results,
    });
  };

  render() {
    const { search, products } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="search-products">
            <input
              type="text"
              name="search"
              value={ search }
              id="search-products"
              onChange={ this.handleOnChange }
              data-testid="query-input"
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSearch }
            data-testid="query-button"
          >
            Pesquisar
          </button>
        </div>
        {products.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : products.map((product) => {
            const { title, thumbnail, price, id } = product;
            return (
              <div key={ id } data-testid="product">
                <img src={ thumbnail } alt={ title } />
                <p>{ title }</p>
                <p>{`R$: ${price}`}</p>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProductsList;
