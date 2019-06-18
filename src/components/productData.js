import React from 'react';
import SizeFilter from './sizeFilter.js';
import SortFilter from './sortFilter.js';
import Products from './products.js';
import Cart from './cart.js';
import forEach from 'lodash/forEach';
import './../styles/productData.scss';
import _ from 'lodash';

class ProductData extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			data: [],
			cart: [],
			cartProduct: [],
			raw: [],
			demo: [],
			images: [
				"./products/product1.jpg",
				"./products/product2.jpg",
				"./products/product3.jpg",
				"./products/product4.jpg",
				"./products/product5.jpg",
				"./products/product6.jpg",
				"./products/product7.jpg",
				"./products/product8.jpg",
				"./products/product9.jpg",
				"./products/product10.jpg",
				"./products/product11.jpg",
				"./products/product12.jpg",
				"./products/product13.jpg",
				"./products/product14.jpg",
				"./products/product15.jpg",
				"./products/product16.jpg",
			],
			sizeArray: [
			  { id: 1, name: 'XS', value: false },
			  { id: 2, name: 'S', value: false },
			  { id: 3, name: 'M', value: false },
			  { id: 4, name: 'ML', value: false },
			  { id: 5, name: 'L', value: false },
			  { id: 6, name: 'XL', value: false },
			  { id: 7, name: 'XXL', value: false }
			],
		}
		this.handleSize = this.handleSize.bind(this);
		this.handleSort = this.handleSort.bind(this);
		this.handleCart = this.handleCart.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	componentDidMount() {
		let { raw } = this.state;
		fetch(`https://react-shopping-cart-67954.firebaseio.com/products.json`)
    .then(response => response.json())
    .then(data =>	{
    	data.products.map((element, index) => {
				let addImage = {...element, image: this.state.images[index]};
				raw.push(addImage);
			})
      this.setState({
        products: raw,
        data: raw
      })
    })
	}
	
	handleSize(size) {
		let {products, sizeArray} = this.state;
		let sizeProduct = products;
		let filtredProducts = [];

		sizeArray.map((item, index) => {
      if (item.id === size.id) {
        return item.value = !size.value;
      } else {
        return item;
      }
    })

    filtredProducts = sizeArray.filter((v, i) => v.value === true && v).map(item => item.name)

    if (filtredProducts.length) {
      sizeProduct = sizeProduct.filter(function(value, key) {
        return filtredProducts.some(size => value.availableSizes.includes(size));
      })
    } else {
      sizeProduct = products;
    }

    this.setState({
      sizeArray: sizeArray,
      filterSize: filtredProducts,
      data: sizeProduct
    })
	}

	handleSort(name) {
		let sortArray = this.state.data;
    if (name === 'All') {
      return (sortArray);
    } else if (name === 'LTH') {
	      sortArray.sort(function(a, b){
	      return a.price - b.price;
    	})
    } else if (name === 'HTL') {
      	sortArray.sort((a,b) => {
        return b.price - a.price;
      })
    }
		this.setState({
			data: sortArray
		});
	}

	handleCart(product) {
		let { cart, cartProduct, demo } = this.state;
		cartProduct.push({...product, quantity: 1});
		cartProduct.forEach((element) => {
			if(element.id === 12) {
				demo.push(element);
			}
			// console.log("element.id", element.id);
		})
		// console.log("demo product", demo);

		this.setState({
			cart: cartProduct
		});
	}

	handleRemove(productId) {
		let { cart } = this.state;
		_.remove(cart, function(n) {
		  return (n.id == productId);
		});
	}

	render() {
		let {data, sizeArray, cart, products} = this.state;
		return (
			<div>
				<div className="main">
					<Cart 
						products= {cart}
						handleRemove = {this.handleRemove} 
					/>
					<div className="size-product-section">
						<div className="size-section">
							<SizeFilter 
								products={data} 
								handleSize = {this.handleSize} 
								sizeArray= {sizeArray}
							/>
						</div>
						<div className="product-section">
							<div className="sujjections-count">
								<label className="suggetion">{data.length} Product(s) found.</label>
							</div>
							<SortFilter 
								products={data} 
								handleSort = {this.handleSort} 
							/>
							<div className="product-body">
								<Products 
									products={data}
									handleCart = {this.handleCart} 
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductData;