import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import InputSearch from '../components/InputSearch';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    search: '',
    products: [],
  }

  handleCategory = async (paramID) => {
    const response = await getProductsFromCategoryAndQuery(paramID);
    const { results } = response;
    this.setState({
      products: results,
    });
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
    const { products, search } = this.state;
    return (
      <div>
        <Link to="/cart">
          <button type="submit" data-testid="shopping-cart-button">Carrinho</button>
        </Link>
        <Categories handleCategory={ this.handleCategory } />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <InputSearch
          search={ search }
          handleOnChange={ this.handleOnChange }
          handleSearch={ this.handleSearch }
        />
        {products.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : products
            .map((element) => (<ProductCard
              product={ element }
              key={ element.id }
            />))}
      </div>
    );
  }
}

export default Home;
