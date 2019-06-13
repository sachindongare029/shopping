import React from 'react';
import { connect } from 'react-redux';
import {sortOption} from './../actions';
import './../styles/sortFilter.css';

class SortFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortArray: []
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
    let name = event.target.value;
    this.props.sortOption(name);
    this.props.handleSort(name);
  }

	render() {
		return (
			<div className="product">
				<div className="product-header">
					<div className="dropdown">
						Order by
					  <select onChange={(e) => this.handleChange(e)}>
					    <option value="All">Select</option>
					    <option value="LTH">Lowest To Highest</option>
					    <option value="HTL">Highest To Lowest</option>
						</select>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
  sortOption: value => {
  	dispatch(sortOption(value))	
  }
})

export default connect( null, mapDispatchToProps)(SortFilter)