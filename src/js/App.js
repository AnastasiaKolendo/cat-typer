import React, { Component } from "react";
import ReactHowler from "react-howler";
import axios from "axios";
import Statistics from './Statistics'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.sources = ['https://www.kessels.com/CatSounds/kitten4.wav']
    this.state = {
      pressedKeys: [],
      text: "",
      typedText: "",
      title: "",
      currentLetterIndx: 0,
      playing: false,
      isPage: true,
      currentSrcIndex: 0,
      score: 0, 
      errors: 0,
      speed: 0,
      timeElapsed: 0
    };
  }

  include = (num) => {
    return this.state.pressedKeys.includes(num);
  };

  calculateTime = () => {
    return setInterval(this.updateTimer, 1000);
  }
  
   updateTimer = () => {
    let newTimeElapsed = this.state.timeElapsed + 1;
    this.setState({timeElapsed: newTimeElapsed})
    this.calculateSpeed();
    return this.state.timeElapsed;
   }

  calculateSpeed = () => {
    let newSpeed = Math.round(this.state.typedText.length / this.state.timeElapsed) * 60;
    this.setState({speed: newSpeed})
  }

  handleClick = async () => {
    try {
      let data = await axios.get(
        "https://en.wikipedia.org/w/api.php?" +
          new URLSearchParams({
            origin: '*',
            action: "query",
            titles: this.state.title,
            format: "json",
            prop: "extracts",
            exintro: true,
            explaintext: true,
          })
      );

      console.log(data, 'page')
      let page = Object.values(data.data.query.pages)[0].extract;
      if(page){
        this.setState({ isPage: true, score: 0, errors: 0, text: page, currentLetterIndx: 0 });
      } else {
        this.setState({ isPage: false, text: ''})
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  compareTexts = (typedText, text) => {
    const regex = /^\s*([0-9a-zA-Z><?@+'`"~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\)]*)\s*$/;

    if (regex.test(text[this.state.currentLetterIndx])) {
      if (
        typedText[typedText.length - 1] !== text[this.state.currentLetterIndx]
      ) {
        let newScore = this.state.score - 1;
        let newErrors = this.state.errors + 1
        this.setState({ score: newScore, playing: true, errors: newErrors});
      } else {
        let newIndex = this.state.currentLetterIndx + 1;
        let newScore = this.state.score + 1;
        this.setState({ score: newScore,
          currentLetterIndx: newIndex,
        });
      }
    } else {
      let newIndex = this.state.currentLetterIndx + 1;
      this.setState({
        currentLetterIndx: newIndex
      });
    }
  };

  handleKeyPress = (event) => {
    if (
      event.key !== "Shift" &&
      event.key !== "Alt" &&
      event.key !== "Command" &&
      event.key !== "Alt" &&
      event.key !== "Ctrl" &&
      event.key !== "Fn" &&
      event.key !== "Backspace" && 
      event.key !== 'onKeyDown' &&
      event.key !== 'onKeyPress' &&
      event.key !== 'onKeyUp'
    ) {
      let newPressedKeys = this.state.pressedKeys;
      newPressedKeys.push(event.key);
      let newTypedText = this.state.typedText;
      newTypedText += event.key;
      this.setState({ typedText: newTypedText, pressedKeys: newPressedKeys });
      this.compareTexts(newTypedText, this.state.text);
    }
    event.preventDefault();
  };

  changePlaying = () => {
    this.setState({playing: false})
  }

  handleKeyUnpressed = (event) => {
    let newPressedKeys = this.state.pressedKeys;

    newPressedKeys = newPressedKeys.filter((key) => {
      return key !== event.key && key !== event.key.toUpperCase();
    });
    this.setState({ pressedKeys: newPressedKeys});
  };

  render() {
    return (
      <>
        <div>
          <h3>Enter your wikipedia title: </h3>
          <input
            name="title"
            className=""
            onChange={this.onChange}
            type="text"
            value={this.state.title}
            autoFocus
          />
          <button onClick={() => this.handleClick()} type="button">
            Enter
          </button>
          {!this.state.isPage ? <div id="page-error" >Sorry, this page doesn't exist. Try again</div> : ''}
        </div>
          <ReactHowler
            playing={this.state.playing}
            src={this.sources[this.state.currentSrcIndex]}
            volume={0.4}
            onEnd={this.changePlaying}
          />
        <div>{this.state.key}</div>
        <div >
          <Statistics score={this.state.score} errors={this.state.errors} speed={this.state.speed} />
        </div>
        <div className="keyboard-base">
          <div
            className="key"
            className={this.include("~") ? "change_red" : "change_white"}
          >
            ~
          </div>
          <div
            className="key"
            className={this.include("1") ? "change_red" : "change_white"}
          >
            1
          </div>
          <div
            className="key"
            className={this.include("2") ? "change_red" : "change_white"}
          >
            2
          </div>
          <div
            className="key"
            className={this.include("3") ? "change_red" : "change_white"}
          >
            3
          </div>
          <div
            className="key"
            className={this.include("4") ? "change_red" : "change_white"}
          >
            4
          </div>
          <div
            className="key"
            className={this.include("5") ? "change_red" : "change_white"}
          >
            5
          </div>
          <div
            className="key"
            className={this.include("6") ? "change_red" : "change_white"}
          >
            6
          </div>
          <div
            className="key"
            className={this.include("7") ? "change_red" : "change_white"}
          >
            7
          </div>
          <div
            className="key"
            className={this.include("8") ? "change_red" : "change_white"}
          >
            8
          </div>
          <div
            className="key"
            className={this.include("9") ? "change_red" : "change_white"}
          >
            9
          </div>
          <div
            className="key"
            className={this.include("0") ? "change_red" : "change_white"}
          >
            0
          </div>
          <div
            className="key"
            className={this.include("-") ? "change_red" : "change_white"}
          >
            -
          </div>
          <div
            className="key"
            className={this.include("+") ? "change_red" : "change_white"}
          >
            +
          </div>
          <div className="key delete">Delete</div>
          <div className="key tab">Tab</div>
          <div
            className="key"
            className={this.include("Q") || this.include("q") ? "change_red" : "change_white"}
          >
            Q
          </div>
          <div
            className="key"
            className={this.include("W") || this.include("w") ? "change_red" : "change_white"}
          >
            w
          </div>
          <div
            className="key"
            className={this.include("E") || this.include("e") ? "change_red" : "change_white"}
          >
            E
          </div>
          <div
            className="key"
            className={this.include("R") || this.include("r") ? "change_red" : "change_white"}
          >
            R
          </div>
          <div
            className="key"
            className={this.include("T") || this.include("t") ? "change_red" : "change_white"}
          >
            T
          </div>
          <div
            className="key"
            className={this.include("Y") || this.include("y") ? "change_red" : "change_white"}
          >
            Y
          </div>
          <div
            className="key"
            className={this.include("U") || this.include("u") ? "change_red" : "change_white"}
          >
            U
          </div>
          <div
            className="key"
            className={this.include("I") || this.include("i") ? "change_red" : "change_white"}
          >
            I
          </div>
          <div
            className="key"
            className={this.include("0") || this.include("o") ? "change_red" : "change_white"}
          >
            O
          </div>
          <div
            className="key"
            className={this.include("P") || this.include("p") ? "change_red" : "change_white"}
          >
            P
          </div>
          <div
            className="key"
            className={this.include("[") ? "change_red" : "change_white"}
          >
            [
          </div>
          <div
            className="key"
            className={this.include("]") ? "change_red" : "change_white"}
          >
            ]
          </div>
          <div
            className="key backslash"
            className={this.include("''") ? "change_red" : "change_white"}
          >
            \
          </div>
          <div className="key capslock">CapsLock</div>
          <div
            className="key"
            className={this.include("A") || this.include("a") ? "change_red" : "change_white"}
          >
            A
          </div>
          <div
            className="key"
            className={this.include("B") || this.include("b") ? "change_red" : "change_white"}
          >
            S
          </div>
          <div
            className="key"
            className={this.include("D") || this.include("d") ? "change_red" : "change_white"}
          >
            D
          </div>
          <div
            className="key"
            className={this.include("F") || this.include("f") ? "change_red" : "change_white"}
          >
            F
          </div>
          <div
            className="key"
            className={this.include("G") ? "change_red" : "change_white"}
          >
            G
          </div>
          <div
            className="key"
            className={this.include("H") || this.include("h") ? "change_red" : "change_white"}
          >
            H
          </div>
          <div
            className="key"
            className={this.include("J") || this.include("j") ? "change_red" : "change_white"}
          >
            J
          </div>
          <div
            className="key"
            className={this.include("K") || this.include("k") ? "change_red" : "change_white"}
          >
            K
          </div>
          <div
            className="key"
            className={this.include("L") || this.include("l") ? "change_red" : "change_white"}
          >
            L
          </div>
          <div
            className="key"
            className={this.include(";") ? "change_red" : "change_white"}
          >
            ;
          </div>
          <div
            className="key"
            className={this.include("'") ? "change_red" : "change_white"}
          >
            '
          </div>
          <div className="key return">Return</div>
          <div className="key leftshift">Shift</div>
          <div
            className="key"
            className={this.include("Z") || this.include("z") ? "change_red" : "change_white"}
          >
            Z
          </div>
          <div
            className="key"
            className={this.include("X") || this.include("x") ? "change_red" : "change_white"}
          >
            X
          </div>
          <div
            className="key"
            className={this.include("C") || this.include("c") ? "change_red" : "change_white"}
          >
            C
          </div>
          <div
            className="key"
            className={this.include("V") || this.include("v") ? "change_red" : "change_white"}
          >
            V
          </div>
          <div
            className="key"
            className={this.include("B") || this.include("b")? "change_red" : "change_white"}
          >
            B
          </div>
          <div
            className="key"
            className={this.include("N") || this.include("n") ? "change_red" : "change_white"}
          >
            N
          </div>
          <div
            className="key"
            className={this.include("M") || this.include("m") ? "change_red" : "change_white"}
          >
            M
          </div>
          <div
            className="key"
            className={this.include(",") ? "change_red" : "change_white"}
          >
            ,
          </div>
          <div
            className="key"
            className={this.include(".") ? "change_red" : "change_white"}
          >
            .
          </div>
          <div
            className="key"
            className={this.include("/") ? "change_red" : "change_white"}
          >
            /
          </div>
          <div className="key rightshift">Shift</div>
          <div className="key leftctrl">Ctrl</div>
          <div className="key">Alt</div>
          <div className="key command">Command</div>
          <div className="key space">Space</div>
          <div className="key command">command</div>
          <div className="key">Alt</div>
          <div className="key">Ctrl</div>
          <div className="key">Fn</div>
        </div>
        <div className="container">
          <div className="container" id="quoteDisplay">
            <p>
              {this.state.text.slice(0, this.state.currentLetterIndx)}<mark>{this.state.text.slice(this.state.currentLetterIndx, this.state.currentLetterIndx + 1)}</mark>
              <span>{this.state.text.slice(this.state.currentLetterIndx + 1)}</span>
            </p>
          </div>
          <div
            className="game-board"
            className="quote-input"
            onKeyDown={this.handleKeyPress}
            tabIndex="0"
            onKeyUp={this.handleKeyUnpressed} 
            onFocus={this.calculateTime}
          >
            Start typing: {this.state.typedText}
          </div>
        </div>
      </>
    );
  }
}
