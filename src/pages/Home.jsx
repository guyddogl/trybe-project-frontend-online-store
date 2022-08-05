import React, { Component } from 'react';
import Categories from '../components/Categories';

class Home extends Component {
  render() {
    return (
      <>
        <Categories />
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </>
    );
  }
}

export default Home;
