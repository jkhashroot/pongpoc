import React, { Component } from 'react';
import { number } from 'prop-types';
import './PongBall.css';

class PongBall extends Component {
  static propTypes = {
    x: number.isRequired,
    y: number.isRequired,
  }


  render() {
    return (<div
      style={{
        width: '30px',
        height: '30px',
      top: `${this.props.y}px`,
      left: `${this.props.x}px`,
        position: 'absolute',
        backgroundColor: 'white',
      }}
      className="PongBall"
    />);
  }
}
export default PongBall;
