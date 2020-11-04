import React, { Component } from 'react';
import { func, number, oneOfType, string } from 'prop-types';
import './Paddle.css';


class Paddle extends Component {
  static propTypes = {
    x: oneOfType([string, number]).isRequired,
    y: oneOfType([string, number]).isRequired,
    onKeyDown: func,
  }

  static defaultProps = {
    onKeyDown: Function.prototype,
  }

  render() {
    return (
      <input
        type="button"
        role="button"
        tabIndex={0}
        onKeyDown={this.props.onKeyDown}
        className="Paddle"
        style={{
          width: '15px',
          height: '150px',
          position: 'absolute',
          backgroundColor: '#ffffff',
          opacity: '0.7',
        top: `${this.props.y}px`,
        left: `${this.props.x}px`,

        }}
      />
    );
  }
}

export default Paddle;
