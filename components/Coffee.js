import React from 'react'

const Coffee = ({coffee, addCoffeeToOrder}) => (
	<div
		className="item"
		onClick={() => addCoffeeToOrder(coffee.id, coffee.type)}
	>
		<img
			alt="coffee image"
			className="itemimage"
			src={coffee.image}
		/>
		<div className="itemdetails">
			<div className="itemtitle">{coffee.type}</div>
			<div className="itemdescription">{coffee.description}</div>
		</div>
	</div>
)

export default Coffee
