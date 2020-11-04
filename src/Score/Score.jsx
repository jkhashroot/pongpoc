import React, { Component } from 'react';
import { number, oneOf, string } from 'prop-types';
import './Score.css';

class Score extends Component {
  static propTypes = {
    total: number,
    position: oneOf(['left', 'right']).isRequired,
    player: string.isRequired,
  }

  static defaultProps = {
    total: 0,
  }

  render() {
    return (
      <div className={this.props.position}>
        <h2>Player {this.props.player}</h2>
        <h2>{this.props.total}</h2>
      </div>
    );
  }
}

export default Score;
