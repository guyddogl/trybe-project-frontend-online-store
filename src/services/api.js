export async function getCategories() {
  try {
    const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
    const result = await fetch(URL);
    const data = await result.json();
    return data;
  } catch (error) {
    return 'You must provide an url';
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';
  if (categoryId) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }
  try {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  } catch (error) {
    return 'You must provide an url';
  }
}
