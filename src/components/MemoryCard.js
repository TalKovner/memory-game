import React from 'react';
import '../style/MemoryCard.css'
import back from '../pics/backCover.jpg';

class MemoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deg: 0,
            isFound: false
        }
        this.rotation = getRandomInt(-5, 5);
        this.flipper = this.flipper.bind(this);
        this.markAsFound = this.markAsFound.bind(this);
        this.restart = this.restart.bind(this);
    }



    flipper() {
        this.setState(prevState => {
            document.getElementById(this.props.id).style.transform = `rotateY(${Math.abs(prevState.deg - 180)}deg)`;
            return { deg: Math.abs(prevState.deg - 180) };
        });
    }

    markAsFound() {
        this.setState({ isFound: true })
    }

    restart() {
        this.setState({ isFound: false })
    }

    render() {
        return (
            <div className="flip-card" style={{transform: `rotate(${this.rotation}deg)`}} >
                <div id={this.props.id} className="flip-card-inner" onClick={() => this.props.flipCard(this.flipper, this.restart, this.markAsFound, this.props.id, this.props.brotherId, this.state.isFound)}>
                    <div className="flip-card-front">
                        <img src={back} alt="Avatar" />
                    </div>
                    <div className="flip-card-back">
                        <img src={this.props.image} alt="Avatar" />
                    </div>
                </div>
            </div>
        )
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default MemoryCard;
