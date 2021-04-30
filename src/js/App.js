import React, { Component } from "react";

const apiUrl = `https://api.diffbot.com/v3/article`;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      pressedKeys: [],
      url: ""
    };
  }

  include = (num) => {
    return this.state.pressedKeys.includes(num);
  };

  extractArticle

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleKeyPress = (event) => {
    console.log(this.state.pressedKeys, "pressed");
    let newPressedKeys = this.state.pressedKeys;
    newPressedKeys.push(event.key);
    this.setState({ pressedKeys: newPressedKeys });
  };

  handleKeyUnpressed = (event) => {
    let newPressedKeys = this.state.pressedKeys;

    newPressedKeys = newPressedKeys.filter((key) => {
      return key !== event.key;
    });
    this.setState({ pressedKeys: newPressedKeys });
  };

  render() {
    return (
      <>
        <div>
          <textarea
            name="url"
            className=""
            onChange={this.onChange}
            type="text"
            value={this.state.url}
            autoFocus
          >
            Enter your URL
          </textarea>
        </div>
        <div
          className="game-board"
          onKeyDown={this.handleKeyPress}
          tabIndex="0"
          onKeyUp={this.handleKeyUnpressed}
        >
          Enter
        </div>
        <div>{this.state.key}</div>
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
            className={this.include("Q") ? "change_red" : "change_white"}
          >
            Q
          </div>
          <div
            className="key"
            className={this.include("W") ? "change_red" : "change_white"}
          >
            w
          </div>
          <div
            className="key"
            className={this.include("E") ? "change_red" : "change_white"}
          >
            E
          </div>
          <div
            className="key"
            className={this.include("R") ? "change_red" : "change_white"}
          >
            R
          </div>
          <div
            className="key"
            className={this.include("T") ? "change_red" : "change_white"}
          >
            T
          </div>
          <div
            className="key"
            className={this.include("Y") ? "change_red" : "change_white"}
          >
            Y
          </div>
          <div
            className="key"
            className={this.include("U") ? "change_red" : "change_white"}
          >
            U
          </div>
          <div
            className="key"
            className={this.include("I") ? "change_red" : "change_white"}
          >
            I
          </div>
          <div
            className="key"
            className={this.include("0") ? "change_red" : "change_white"}
          >
            O
          </div>
          <div
            className="key"
            className={this.include("P") ? "change_red" : "change_white"}
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
            className={this.include("A") ? "change_red" : "change_white"}
          >
            A
          </div>
          <div
            className="key"
            className={this.include("B") ? "change_red" : "change_white"}
          >
            S
          </div>
          <div
            className="key"
            className={this.include("D") ? "change_red" : "change_white"}
          >
            D
          </div>
          <div
            className="key"
            className={this.include("F") ? "change_red" : "change_white"}
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
            className={this.include("H") ? "change_red" : "change_white"}
          >
            H
          </div>
          <div
            className="key"
            className={this.include("J") ? "change_red" : "change_white"}
          >
            J
          </div>
          <div
            className="key"
            className={this.include("K") ? "change_red" : "change_white"}
          >
            K
          </div>
          <div
            className="key"
            className={this.include("L") ? "change_red" : "change_white"}
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
            className={this.include("Z") ? "change_red" : "change_white"}
          >
            Z
          </div>
          <div
            className="key"
            className={this.include("X") ? "change_red" : "change_white"}
          >
            X
          </div>
          <div
            className="key"
            className={this.include("C") ? "change_red" : "change_white"}
          >
            C
          </div>
          <div
            className="key"
            className={this.include("V") ? "change_red" : "change_white"}
          >
            V
          </div>
          <div
            className="key"
            className={this.include("B") ? "change_red" : "change_white"}
          >
            B
          </div>
          <div
            className="key"
            className={this.include("N") ? "change_red" : "change_white"}
          >
            N
          </div>
          <div
            className="key"
            className={this.include("M") ? "change_red" : "change_white"}
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
          <div className="container" id="quoteDisplay"></div>
          <textarea
            name="answer"
            className="quote-input"
            onChange={this.onChange}
            type="text"
            value={this.state.answer}
            autoFocus
          />
        </div>
      </>
    );
  }
}
