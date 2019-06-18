import React from 'react';
import { connect } from 'react-redux';
import {sortOption} from './../actions';
import './../styles/sortFilter.scss';

const SortFilter = (props) => {
	return (
		<div className="product">
			<div className="product-header">
				<div className="dropdown">
					Order by
				  <select onChange={(e) => handleChange(e)}>
				    <option value="All">Select</option>
				    <option value="LTH">Lowest To Highest</option>
				    <option value="HTL">Highest To Lowest</option>
					</select>
				</div>
			</div>
		</div>
	);
	function handleChange(event) {
	  let name = event.target.value;
	  props.sortOption(name);
	  props.handleSort(name);
	}
}

const mapDispatchToProps = dispatch => ({
  sortOption: value => {
  	dispatch(sortOption(value))	
  }
})

export default connect( null, mapDispatchToProps)(SortFilter)