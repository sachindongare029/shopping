import React from 'react';
import './../styles/sizeFilter.css';

class SizeFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
		this.toggle = this.toggle.bind(this);
	}

	toggle(e, size) {
		this.props.handleSize(size);
	}

	render() {
		return (
			<div className="container-fluid">
				<h6>Sizes :</h6>
				<div className="size-parent">
					<div className="size-chart">
						{ this.props.sizeArray.map((size, i) => {
								return (
									<button 
										key={size.id} 
										id={size.name} 
										onClick={(e) => this.toggle(e, size)} 
										style={{background : size.value && '#1b1a20', color: size.value && 'white'}} 
										className="btn-unclicked"
									>
										{size.name}
									</button>
								)
							}) 
						}
					</div>
				</div>
			</div>
		);
	}
}

export default SizeFilter;