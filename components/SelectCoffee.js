import React from 'react'
import Coffee from './Coffee'

class SelectCoffee extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		const { coffees } = this.props
		var searchWord = this.props.searchWord
		let filterResults = coffees.filter((coffee) => {
			return coffee.type.toLowerCase().includes(searchWord.toLowerCase())
		})

		return (
			<div className="selectcoffee">
				{filterResults.map((coffee, index) => {
					return (
						<Coffee key={index} coffee={coffee} {...this.props} />
					)
				})}
			</div>
		)
	}
}

export default SelectCoffee
