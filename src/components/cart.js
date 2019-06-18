import React, { Component } from "react";
import "./../styles/cart.scss";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isHovered: true,
    }
    this.handleDrawer = this.handleDrawer.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleDrawer() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }
  handleMouseOver(e) {
    let priceEl = e.target.parentElement;
    let cartContainer = (priceEl.parentElement).parentElement;
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
    }));
    this.state.isHovered ? (cartContainer.className="cart-container cart-container-mouseover") : (cartContainer.className="cart-container");
  }
  handleClick(e) {
    var elem = document.getElementById("remove-item-btn");
    // elem.removeEventListener("onMouseEnter", this.handleMouseOver, false);
    this.props.handleRemove(e.target.dataset.txt);
  }
  handleCheckout(total) {
    total == 0.00 ? alert("Please enter some product to cart..") : alert("Your Total is : $" + total);
  }

  render() {
    let { open, isHovered } = this.state;
    let product = this.props.products;
    console.log("product", product);
    let drawerState = open ? 'cart-drawer-open' : 'cart-drawer-closed';
    let itemCount = product.length;
    let total = product.map((element, index) => {
                  return(element.quantity * element.price);
                })
                .reduce((a, b) => a + b, 0)
                .toFixed(2)
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
              { 
                product.map((products, i) => {
                  return(
                    <div key={i} className="cart-container" id="cart-container">
                      <hr className="cart-hr" />  
                      <div className="product-container">
                        <div className="image-section">
                          <img className="cart-image" src={products.image} alt="product" />
                        </div>
                        <div className="product-info">
                          <span className="cart-title">{products.title}</span>
                          <span className="cart-info">{products.availableSizes[0]} | </span>
                          <span className="cart-info">{products.style}</span><br />
                          <span className="cart-info">Quantity: {products.quantity}</span>
                        </div>
                        <div className="price-remove">
                          <div 
                            className="remove-item-btn" 
                            data-txt={products.id}
                            id="remove-item-btn"
                            onClick={(e) => this.handleClick(e)}
                            onMouseEnter={(e) => this.handleMouseOver(e)} 
                            onMouseLeave={(e) => this.handleMouseOver(e)}
                          >
                            X 
                          </div>
                          <span className="cart-price">${products.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
              <div className="cart-footer">
                <div className="subtotal">SUBTOTAL</div>
                <div className="total">$  {total}</div>
                <div className="checkout-btn" onClick={() => this.handleCheckout(total)}>CHECKOUT</div>
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

export default Cart;
