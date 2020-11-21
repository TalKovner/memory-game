import React from 'react';
import MemoryCard from './components/MemoryCard';
import Confetti from './components/Confetti'
import './style/App.css';
import data from './data';

window.screen.orientation.lock('portrait')

let cardsData = shuffle(data);

class App extends React.Component {
	constructor() {
		super();
		this.openCards = []
		this.foundedCount = 0
		this.flip = this.flip.bind(this);
		this.state = {
			memoryCards: cardsData.map(dataObj => <MemoryCard
				image={dataObj.img}
				id={dataObj.id} 
				brotherId={dataObj.brotherId}
				flipCard={this.flip}
				key={dataObj.id}
			/>),
			throwConfetti: false,
			data: shuffle(data),
			foundedCards: []
		}
		this.restart = this.restart.bind(this)
	}

	flip(flipper, restart, markAsFound, id, brotherId, isFound) {
		if (!isFound) {
			flipper()

			this.openCards.push({ id, restart, flipper, brotherId, markAsFound, isFound });
	
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
			console.log(card)
			this.setState((prevState) => ({ foundedCards: [...prevState.foundedCards, card] }));
			console.log(this.state.foundedCards)
		});

		this.foundedCount += 2;

		if (this.foundedCount === data.length) {
			this.setState({ throwConfetti: true })
		}
	}

	restart() {
		this.state.foundedCards.forEach(card => card.restart() || card.flipper())
		this.openCards.forEach(card => card.restart() || card.flipper())
		this.openCards = [];
		this.setState({ foundedCards: [] })
		cardsData = shuffle(data);
		this.setState({
			memoryCards: cardsData.map(
				dataObj => <MemoryCard
					image={dataObj.img}
					id={dataObj.id} 
					brotherId={dataObj.brotherId}
					flipCard={this.flip}
					key={dataObj.id}
				/>
			),
			throwConfetti: false,
		});
	}

	closeOpenCards() {
		this.openCards.forEach(card => {
			setTimeout(card.flipper, 800)
		});
	}

	render() {
		// const memoryCards = data.map(dataObj => <MemoryCard
		// 	image={dataObj.img}
		// 	id={dataObj.id} 
		// 	brotherId={dataObj.brotherId}
		// 	flipCard={this.flip}
		// 	key={dataObj.id}
		// />);
		return (
			<>
				{ this.state.throwConfetti ? <Confetti /> : null }
				<div className='card-container'>
					{ this.state.memoryCards }
				</div>
				<button onClick={() => this.restart()} className="replay-btn"><span class="material-icons">replay</span></button>
			</>
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
