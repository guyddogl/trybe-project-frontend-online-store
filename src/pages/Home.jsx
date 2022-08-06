import React, { Component } from 'react';
import Categories from '../components/Categories';
import InputSearch from '../components/InputSearch';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    search: '',
    products: [],
    isLoading: false,
  }

  setLoading = (bool) => {
    this.setState({ isLoading: bool });
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
    this.setLoading(true);
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery(undefined, search);
    const { results } = response;
    this.setState({
      products: results,
    });
    this.setLoading(false);
  };

  render() {
    const { products, search, isLoading } = this.state;
    return (
      <>
        <Categories handleCategory={ this.handleCategory } />
        <section className="container">
          <div className="row justify-content-center text-center mt-3">
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            <InputSearch
              search={ search }
              handleOnChange={ this.handleOnChange }
              handleSearch={ this.handleSearch }
              isLoading={ isLoading }
            />
          </div>
        </section>
        <section className="container mt-5 bg-light">
          <div
            className="row justify-content-center align-items-center g-3 p-2"
          >
            {products.length === 0
              ? <p>Nenhum produto foi encontrado</p>
              : products
                .map((element) => (<ProductCard
                  product={ element }
                  key={ element.id }
                />))}
          </div>
        </section>
      </>
    );
  }
}

export default Home;
