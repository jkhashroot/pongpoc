import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup } from 'reactstrap';
import { add, inc, multiply, negate, subtract } from 'ramda';
import Paddle from '../Paddle';
import PongBall from '../PongBall';
import Score from '../Score';
import { Loop } from '../utils/Loop';
import './Game.css';

const gameStartHeight = (window.innerHeight / 2) - 150;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ballY: Math.floor(Math.random() * 13),
      ballX: Math.floor(window.innerWidth / 2),


      // randomly choose the direction
      vx: 5 * (Math.random() < 0.5 ? 1 : -1), // accelleration
      vy: 5 * (Math.random() < 0.5 ? 1 : -1), // accelleration
      speed: 2 * (Math.random() < 0.5 ? 1 : -1),

      leftScore: 0,
      rightScore: 0,

      level: 'easy',
      leftPaddleTop: gameStartHeight,
      rightPaddleY: 0,
      isModalOpen: true,
    };
  }

  // componentDidMount() {
  //
  // }

    onKeyDown = (event) => {
      // if up arrow hit & top of paddle is below top header
      if (event.keyCode === 38 && event.target.getBoundingClientRect().top > 150) {
        this.setState(prevState => ({ leftPaddleTop: `${prevState.leftPaddleTop - 10}` }));
      } else if (event.keyCode === 40 && (event.target.getBoundingClientRect().top + 150) < window.innerHeight) {
        this.setState(prevState => ({ leftPaddleTop: `${add(prevState.leftPaddleTop, 10)}` }));
      }
    }

    onSubmit = (e) => {
      this.setState({ level: e.target.value });

      this.toggle();

      this.startGame();
    }

    startGame = () => {
      Loop((tick) => {
        if (this.state.level === 'easy') {
          this.easyAI(tick);
        } else if (this.state.level === 'intermediate') {
          this.intermediateAI();
        }


        this.setState({
          ballX: multiply(add(this.state.ballX, this.state.vx), tick),
          ballY: multiply(add(this.state.ballY, this.state.vy), tick),
        });

        // // if the ball is at the right side of the screen
        if (this.state.ballX > (add(this.boardBoundsRight, 50))) {
          this.setState({
            vx: negate(this.state.vx),
            leftScore: inc(this.state.leftScore),
          }); // reverse direction of ball
        }

        if (this.state.ballX > (subtract(this.boardBoundsRight, 50)) &&
        this.state.ballY > this.state.rightPaddleY &&
        this.state.ballY < add(this.state.rightPaddleY, 150)) {
          return this.setState({
            vx: negate(this.state.vx),
          });
        }

        // if ball is on the left side
        if (this.state.vx < 0 && this.state.ballX < -50) {
          this.setState({
            rightScore: inc(this.state.rightScore),
            vx: negate(this.state.vx),
          }); // reverse direction of ball
        } else
        // Hit left paddle!!
        if (this.state.vx < 0 && this.state.ballX === 20 && this.state.ballY > this.state.leftPaddleTop && this.state.ballY < this.state.leftPaddleTop + 150) {
          return this.setState({
            vx: negate(this.state.vx),
          });
        }

        // if the ball is at the bottom or top of the board
        if (this.state.ballY > window.innerHeight - 100) {
          this.setState({ vy: negate(this.state.vy) });
        } else if (this.state.ballY < 0) {
          this.setState({ vy: negate(this.state.vy) });
        }
        this.forceUpdate();
      });
    }

    toggle=() => {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }

      changeBackdrop=(e) => {
        let value = e.target.value;
        if (value !== 'static') {
          value = JSON.parse(value);
        }
        this.setState({ backdrop: value });
      }

    easyAI = (tick) => {
      if (this.state.rightPaddleY >= 0) {
        this.setState(prevState => ({
          // speed: negate(prevState.speed),
          rightPaddleY: multiply(add(prevState.rightPaddleY, this.state.speed), tick),
        }));
      }

      if (this.state.rightPaddleY < 0) {
        this.setState(prevState => ({
          speed: negate(prevState.speed),
          rightPaddleY: multiply(add(prevState.rightPaddleY, negate(this.state.speed)), tick),
        }));
      }
      if (this.state.rightPaddleY > (subtract(window.innerHeight, 120))) {
        this.setState(prevState => ({
          speed: negate(prevState.speed),
          rightPaddleY: multiply(add(prevState.rightPaddleY, negate(this.state.speed)), tick),
        }));
      }
    }

    intermediateAI = () => {
      // if paddle moving toward us & up
      if (this.state.vx > 0 && this.state.ballY < (window.innerHeight / 2) && this.state.rightPaddleY > 0) {
        this.setState(prevState => ({ rightPaddleY: `${subtract(prevState.rightPaddleY, 10)}` }));
      }
      if (this.state.vx > 0 && this.state.ballY > (subtract(window.innerHeight, 150) / 2) && add(this.state.rightPaddleY, 150) < subtract(window.innerHeight, 150)) {
        this.setState(prevState => ({ rightPaddleY: `${add(prevState.rightPaddleY, 10)}` }));
      }
    }

  boardBoundsRight = window.innerWidth;
  gameStartHeight = 600;

  render() {
    const {
      ballX, ballY, leftPaddleTop, leftScore, rightScore,
    } = this.state;
    return (
      <div className="Game">

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggle} className={this.props.className} backdrop>
          <ModalHeader toggle={this.toggle}>Choose a Level</ModalHeader>
          <ModalBody>
            <Form>

              <FormGroup tag="fieldset">
                <FormGroup check>
                  <Label check>
                    <Input type="radio" onChange={this.onSubmit} name="level" value="easy" />
                    Easy
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" onChange={this.onSubmit} name="level" value="intermediate" />
                    Intermediate
                  </Label>
                </FormGroup>
                <FormGroup check disabled>
                  <Label check>
                    <Input type="radio" onChange={this.onSubmit} name="level" value="hard" disabled />
                    Hard
                  </Label>
                </FormGroup>
              </FormGroup>
            </Form>
          </ModalBody>

        </Modal>
        <Score position="left" player="1" total={leftScore} />
        {(leftScore === 5 || rightScore === 5) ?
          (
            <div className="gameOver">
              <h1 style={{ display: 'flex' }}>Game over </h1>
              <h3>Refresh page to play again</h3>
            </div>
          )
        : <h1 className="gameOver" style={{ display: 'none' }}>Game over</h1> }
        <Score position="right" player="2" total={rightScore} />
        <Paddle x={5} y={leftPaddleTop} onKeyDown={event => this.onKeyDown(event)} position="left" />

        <div className="midpt" />

        <PongBall x={ballX} y={ballY} />
        <Paddle x={subtract(this.boardBoundsRight, 20)} y={this.state.rightPaddleY} position="right" />
      </div>
    );
  }
}
export default Game;
