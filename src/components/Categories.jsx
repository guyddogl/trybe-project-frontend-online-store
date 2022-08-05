import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    const { handleCategory } = this.props;
    const { categories } = this.state;
    return (
      <ul>
        {categories.map((category) => (
          <li
            data-testid="category"
            key={ category.id }
          >
            <button type="button" onClick={ () => handleCategory(category.id) }>
              {category.name}
            </button>
          </li>))}
      </ul>
    );
  }
}

Categories.propTypes = {
  handleCategory: PropTypes.func.isRequired,
};

export default Categories;
