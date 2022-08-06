import React, { Component } from 'react';
import Categories from '../components/Categories';
import InputSearch from '../components/InputSearch';
import ProductCard from '../components/ProductCard';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
  state = {
    search: '',
    products: [],
    loading: false,
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
    this.setState({ loading: true });
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery(undefined, search);
    const { results } = response;
    this.setState({
      products: results,
    });
    this.setState({ loading: false });
  };

  render() {
    const { products, search, loading } = this.state;
    return (
      <>
        <Categories handleCategory={ this.handleCategory } />
        <section className="container">
          <div className="row justify-content-center mt-3">
            <InputSearch
              search={ search }
              handleOnChange={ this.handleOnChange }
              handleSearch={ this.handleSearch }
              loading={ loading }
            />
          </div>
        </section>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {products.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : products
            .map((element) => (<ProductCard
              product={ element }
              key={ element.id }
            />))}
      </>
    );
  }
}

export default Home;
