import React, { Component } from 'react';
import GameForm from './GameForm';
import * as apiCalls from './api';

function GameItem(props) {
    const isSelected = props.selected;
    const imgUrl = props.imgUrl;
    const firstName = props.firstName;
    const lastName = props.lastName;
    const onSelect = props.onSelect;
    const isCorrect = props.correct;

    return (
        <li>
            {isCorrect &&
                <span>
                <h3>You Found {firstName} {lastName} !</h3>
                <img src={imgUrl} alt="" />
                </span>
            }
            
            {!isSelected &&  
                <span
                    //TODO something for completed
                    style={{ textDecoration: isSelected ? 'line-through' : 'none' }}
                    onClick={onSelect}
                >
                    <img src={imgUrl} alt="" />
                </span>
            }
        </li>
    );
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: String,
            coworkers: []
        }
        this.getGameBoard = this.getGameBoard.bind(this);
    }

    componentDidMount() {
        this.getGameBoard();
    }

    async getGameBoard(val) {
        let board = await apiCalls.getBoard();
        let answer = board.answer;
        let coworkers = board.entries;
        this.setState({ answer: answer, coworkers: coworkers });
    }

    async selectCoworker(coworker) {
        let board = await apiCalls.updateGame(coworker, this.state.coworkers)
        let coworkers = board.entries;
        this.setState({ coworkers: coworkers });
    }

    render() {
        const answer = this.state.answer;
        const coworkers = this.state.coworkers.map((c) => (
            <GameItem
                key={c.id}
                {...c}
                onSelect={this.selectCoworker.bind(this, c)}
            />
        ));
        
        return (
            <div >
                <h1>Get to know your Coworkers!</h1>
                <h2>Find {answer}</h2>
                <ul className="flex-container">
                    {coworkers}
                </ul>
                <GameForm getGameBoard={this.getGameBoard} />
            </div>
        )
    }
}

export default Board;