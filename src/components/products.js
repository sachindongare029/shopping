import React from 'react';
import './../styles/products.scss';

const Products = (props) => {
	let { products } = props;
	return(
		products.map((products, i) => {
		let price = products.price.toFixed(2);
		return (
			<div className="product-details" key={i} >
				{ products.isFreeShipping && products.isFreeShipping === true
					? (<div className="known-shipping">
							<label className="label">Free Shipping</label>
						</div>)
					: (<div className="unknown-shipping"></div>)
				}
				<div className="image">
					<img src={products.image} alt="product" />
				</div>
				<div className="title">
					{products.title}<br />
					<hr />
				</div>
				<div className="price">
					<span className="currency">{products.currencyFormat}</span><span className="actual-price">{price}</span>
				</div>
				<div className="buy">
					<button type="button" className="btn btn-warning" onClick={() => props.handleCart(products)} >Add to cart</button>
				</div>
			</div>
		);
	})
	);		
}

export default Products;