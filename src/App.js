import React from 'react';
import MemoryCard from './components/MemoryCard';
import Confetti from './components/Confetti'
import './style/App.css';
import data from './data';

class App extends React.Component {
	constructor() {
		super();
		this.openCards = []
		this.foundedCount = 0
		this.flip = this.flip.bind(this);
		this.state = {
			throwConfetti: false
		}
		shuffle(data);
	}

	flip(flipper, markAsFound, id, brotherId, isFound) {
		if (!isFound) {
			flipper()

			this.openCards.push({ id, flipper, brotherId, markAsFound, isFound });
	
			if (this.openCards.length === 2) {
				if (this.openCards[0].id === this.openCards[1].brotherId) {
					this.handleMatchCards()
				} else {
					this.closeOpenCards();
				}
	
				this.openCards = [];
			}
		}
	}

	handleMatchCards() {
		this.openCards.forEach(card => {
			card.markAsFound()
		});

		this.foundedCount += 2;

		if (this.foundedCount === data.length) {
			this.setState({ throwConfetti: true })
		}
	}

	closeOpenCards() {
		this.openCards.forEach(card => {
			setTimeout(card.flipper, 800)
		});
	}

	render() {
		const memoryCards = data.map(dataObj => <MemoryCard
			image={dataObj.img}
			id={dataObj.id} 
			brotherId={dataObj.brotherId}
			flipCard={this.flip}
			key={dataObj.id}
		/>);

		return (
			<div className='card-container'>
				{this.state.throwConfetti ? <Confetti /> : null}
				{ memoryCards }
			</div>
		)
	}
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }

export default App;