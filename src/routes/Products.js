import React, { Component } from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

@connect(state => ({
  products: state.products,
}))
export default class ProductsRoute extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'products/fetchy',
    });
  }

  render()
  {
    const {products} = this.props;

    return (
      <ProductList products={products.products} />
    );


  }
}


// import React from 'react';
// import { connect } from 'dva';
// import ProductList from '../components/ProductList';
//
// const ProductsRoute = ( {dispatch, state}) => {
//   function handleDelete(id) {
//     dispatch({
//       type: 'products/delete',
//       payload: id,
//     });
//   }
//
//   return (
//     <div>
//       <h2>List of Products</h2>
//       <ProductList onDelete={handleDelete} products={state.products} />
//     </div>
//   );
// };
//
// // export default Products;
// export default connect(({ products }) => {
//   return ({state : products})
// })(ProductsRoute);
