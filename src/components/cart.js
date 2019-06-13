import React, { Component } from "react";
import "./../styles/cart.css";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  handleDrawer() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  render() {
    let { open } = this.state;
    let product = this.props.products;
    // console.log("product", product);
    let drawerState = 'cart-drawer-closed';
    if(open) {
      drawerState = 'cart-drawer-open';
    }
    return (
      <div>
        <div className="open">
          <img className="cart-icon" src="./Icons/cart.png" onClick={this.handleDrawer} />
        </div>
        <span>
          <div id="cart-drawer" className={drawerState}>
            <span className="closebtn" onClick={this.handleDrawer}> X </span>
            <div className="cart-product">
              { product.map((products, i) => {
                  return(
                    <div key={i} className="product-detail">
                      <hr className="cart-hr" />
                      <div className="product-container">
                        <div className="image-section">
                          <img className="cart-image" src="./products/product2.jpg" alt="product" />
                        </div>
                        <div className="product-info">
                          <span className="cart-title">{products.title}</span>
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
