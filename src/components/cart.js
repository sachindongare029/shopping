import React, { Component } from "react";
import "./../styles/cart.scss";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isHovered: true
    }
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }

  handleDrawer() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }
  handleMouseOver(e) {
    let priceEl = e.target.parentElement;
    let productParent = priceEl.parentElement;
    // console.log("event", productParent);
    this.setState(prevState => ({
        isHovered: !prevState.isHovered
    }));
    this.state.isHovered ? (productParent.className="product-container product-container-mouseover") : (productParent.className="product-container");
  }

  render() {
    let { open, isHovered } = this.state;
    let product = this.props.products;
    let drawerState = open ? 'cart-drawer-open' : 'cart-drawer-closed';
    let itemCount = product.length;
    return (
      <div>
        <div className="open" onClick={this.handleDrawer} >
          <div className="item-count">
            <span> {itemCount} </span>
          </div>
          <img className="cart-icon" src="./Icons/cart.png"/>
        </div>
        <span>
          <div id="cart-drawer" className={drawerState}>
            <div className="closebtn" onClick={this.handleDrawer}> 
              <span> X </span>
            </div>
            <div className="cart-product">
              <div className="basket">
                <div className="item-count">
                  <span> {itemCount} </span>
                </div>
                <i className="fa fa-shopping-cart"></i>
                <span className="cart-text">Cart</span>
              </div>
              { product.map((products, i) => {
                  return(
                    <div key={i} className="cart-container">
                      <hr className="cart-hr" />
                      <div id="product-container" className="product-container">
                        <div className="image-section">
                          <img className="cart-image" src="./products/product2.jpg" alt="product" />
                        </div>
                        <div className="product-info">
                          <span className="cart-title">{products.title}</span>
                          <span className="cart-info">{products.availableSizes[0]} | </span>
                          <span className="cart-info">{products.style}</span><br />
                          <span className="cart-info">Quantity: {products.quantity}</span>
                        </div>
                        <div className="price-remove">
                          <div className="remove-item-btn" onMouseEnter={(e) => this.handleMouseOver(e)} onMouseLeave={(e) => this.handleMouseOver(e)}> X </div>
                          <span className="cart-price">${products.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </span>
      </div>
    );
  }
}

export default Cart;
