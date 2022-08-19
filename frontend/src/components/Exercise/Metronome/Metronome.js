import s from "./Metronome.module.scss";
import React, { Component } from "react";
import Timer from "./Timer.js";
class Metronome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      tempo: props.exercise.tempo,
      timeSignature: props.exercise.timeSignature,
      isRunning: true
    };
    this.metronome = new Timer(this.playClick, 60000 / this.state.tempo, {
      immediate: true
    });
    this.addClicks();
  }
  componentWillReceiveProps (nextProps) {
    // console.log(prevProps);
    // console.log(this.props);
    // if (this.props.exercise._id.$oid !== prevProps.exercise._id.$oid) {
    //   this.fetchData(this.props);
    // }
    // console.log(this.state.tempo);

    this.setState({ timeSignature: nextProps.timeSignature});
    this.setState(
      { tempo: nextProps.exercise.tempo },
      () => this.updateMetronome()
    );
    console.log(this.state.tempo);

  }
  // fetchData = (nextProps) => {
  //   this.setState({ timeSignature: nextProps.timeSignature});
  //   this.setState(
  //     { tempo: nextProps.exercise.tempo },
  //     () => this.updateMetronome()
  //   );
  //   console.log(this.state.tempo);
  // };
  addClicks = async () => {
    const importRes1 = await import("../../../assets/metronome/logic_click1.mp3"); // make sure the path is correct
    this.click1 = new Audio(importRes1.default);
    const importRes2 = await import("../../../assets/metronome/logic_click2.mp3"); // make sure the path is correct
    this.click2 = new Audio(importRes2.default);
  };
  playClick = () => {
    if (this.state.count === this.state.timeSignature) {
      this.setState({ count: 0 });
    }
    if (this.state.count === 0) {
      this.click1.play();
      this.click1.currentTime = 0;
    } else {
      this.click2.play();
      this.click2.currentTime = 0;
    }
    this.setState({ count: this.state.count + 1 });
  };

  handleBpmIncreaseBpm = () => {
    if(!this.state.isRunning) {
      var jsonData = {
        'user': this.props.exercise._id.$oid,
        'tempo': this.state.tempo
      };
      this.setState(
        { tempo: this.state.tempo + 1 },
        () => {
          const url = '/increase-tempo';
          this.updateMetronome();
          fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
          }).then(() => {
            console.log('bpm updated')
          })
        }
      );
    }
  };
  updateMetronome = () => {
    this.metronome.timeInterval = 60000 / this.state.tempo;
  };
  handleBpmDecreaseBpm = () => {
    if(!this.state.isRunning) {
      var jsonData = {
        'user': this.props.exercise._id.$oid,
        'tempo': this.state.tempo
      };
      this.setState(
        { tempo: this.state.tempo - 1 },
        () => {
          this.updateMetronome();
          fetch('/increase-tempo', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(jsonData)
          }).then(() => {
            console.log('bpm updated')
          })
        }
      );  
    }

  };
  handleStartStop = () => {
    if (this.state.isRunning) {
      this.metronome.start();
    } else {
      this.metronome.stop();
    }
    this.setState({ isRunning: !this.state.isRunning });
    this.setState({ count: 0 });
  };
  getStartStopBtnClassName = () => {
    return this.state.isRunning
      ? s.btn + ' ' + s.startStop + ' ' + s.enabledBtn
      : s.btn + ' ' + s.startStop + ' ' + s.disabledBtn;
  };

  getMetronomeClassName = () => {
    return this.state.isRunning
      ? s.metronome + ' ' + s.metronomeExternalCircleDisabled
      : s.metronome + ' ' + s.metronomeExternalCircleEnabled;
  };
  getBpmValue = () => {
    return !this.state.isRunning ? this.state.tempo : 'OFF';
  };
  getIncreaseSign = () => {
    return this.state.isRunning
    ? ''
    : '+';
  };
  getDecreaseSign = () => {
    return this.state.isRunning
    ? ''
    : '-';
  };
  render() { 
    return (
      <div>
        <div className={this.getMetronomeClassName()}>
          <div className="btn increaseBtn" onClick={this.handleBpmIncreaseBpm}>
            {this.getIncreaseSign()}
          </div>
          <div
            className={this.getStartStopBtnClassName()}
            value={this.getBpmValue()}
            onClick={this.handleStartStop}
          >
            {this.state.tempo}
          </div>
          <div className="btn decreaseBtn" onClick={this.handleBpmDecreaseBpm}>
            {this.getDecreaseSign()}
          </div>
        </div>
      </div>
    );
  }
}

export default Metronome;
