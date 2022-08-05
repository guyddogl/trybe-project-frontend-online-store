import React, { Component } from 'react';
import { getCategories } from '../services/api';

class Categories extends Component {
  state={
    categories: [],
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    return (
      <ul>
        {categories.map((category) => (
          <li
            data-testid="category"
            key={ category.id }
          >
            {category.name}
          </li>))}
      </ul>
    );
  }
}

export default Categories;
