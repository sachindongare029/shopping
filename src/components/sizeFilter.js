import React from 'react';
import './../styles/sizeFilter.scss';

const SizeFilter = (props) => {
	return (
		<div className="container-fluid">
			<h6>Sizes :</h6>
			<div className="size-parent">
				<div className="size-chart">
					{ props.sizeArray.map((size, i) => {
							return (
								<button 
									key={size.id} 
									id={size.name} 
									onClick={(e) => props.handleSize(size)} 
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

export default SizeFilter;