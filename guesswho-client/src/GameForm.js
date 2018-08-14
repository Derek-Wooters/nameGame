import React, { Component } from 'react';

class GameForm extends Component {
    constructor(props) {
        super(props);
        this.state = { inputValue: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.getGameBoard();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleSubmit}>New Game</button>
            </div>
        )
    }
}

export default GameForm;