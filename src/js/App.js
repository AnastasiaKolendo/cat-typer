import React, { Component } from "react";
import ReactHowler from "react-howler";
import axios from "axios";
import Statistics from "./Statistics";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Calculator from "./Calculator";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.sources = ["https://www.kessels.com/CatSounds/kitten4.wav", "https://www.kessels.com/CatSounds/kitten3.wav", 'https://www.kessels.com/CatSounds/cat14.wav', 'https://www.kessels.com/CatSounds/cat11.wav',
  'https://www.kessels.com/CatSounds/cat9.wav', 'https://www.kessels.com/CatSounds/cat10.wav'];
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
      timeElapsed: 0,
      errorMessage: "",
      redundentKeys: ['Tab', "Shift", "Alt", "Meta", "Control", "Fn", "Backspace", "ArrowUp", "ArrowLeft", "ArrowDown",
      "ArrowRight", "Escape", "CapsLock"]
    };
  }

  include = (num) => {
    return this.state.pressedKeys.includes(num);
  };

  calculateTime = () => {
    setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    let newTimeElapsed = this.state.timeElapsed + 1;
    console.log(newTimeElapsed, 'time')
    this.setState({ timeElapsed: newTimeElapsed });
    this.calculateSpeed();
  };

  calculateSpeed = () => {
    let newSpeed =
      Math.round(this.state.typedText.length / this.state.timeElapsed) * 60;
    this.setState({ speed: newSpeed });
  };

  handleClick = async () => {
    try {
      let data = await axios.get(
        "https://en.wikipedia.org/w/api.php?" +
          new URLSearchParams({
            origin: "*",
            action: "query",
            titles: this.state.title,
            format: "json",
            prop: "extracts|categories",
            exintro: true,
            explaintext: true,
          })
      );

      this.setState({
        isPage: true,
        score: 0,
        errors: 0,
        currentLetterIndx: 0,
        text: "",
        typedText: "",
        timeElapsed: 0,
        score: 0,
        errors: 0,
        speed: 0
      });

      let page = Object.values(data.data.query.pages)[0];
      let pagesCategories = page.categories;
      let found = false;

      if (pagesCategories) {
        pagesCategories.forEach((category) => {
          if (category.title === "Category:All article disambiguation pages") {
            this.setState({
              isPage: false,
              errorMessage:
                "Sorry this title is ambiguous. Please be more specific",
            });
            found = true;
          }
        });
      }

      if (!found) {
        if (page.extract && this.state.isPage) {
          this.setState({
            text: page.extract,
          });
        } else {
          this.setState({
            isPage: false,
            errorMessage: "Sorry the article wasn't found. Try again",
          });
        }
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

  compareTexts = (typedText) => {
    if (this.state.text[this.state.currentLetterIndx] === '') {
      if (typedText[typedText.length - 1] === "\n") {
        let newIndex = this.state.currentLetterIndx + 1;
        this.setState({
          currentLetterIndx: newIndex,
        });
      } else {
        let newScore = this.state.score - 1;
        let newErrors = this.state.errors + 1;
        this.setState({ score: newScore, playing: true, errors: newErrors });
      }
    } else {
      const regex = /^\s*([ 0-9a-zA-Z><?@+'`"\~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\)]*)\s*$/;
      if (regex.test(this.state.text[this.state.currentLetterIndx])) {
        if (
          typedText[typedText.length - 1] !==
          this.state.text[this.state.currentLetterIndx]
        ) {
          let newScore = this.state.score - 1;
          let newErrors = this.state.errors + 1;
          this.setState({ score: newScore, playing: true, errors: newErrors });
        } else {
          let newIndex = this.state.currentLetterIndx + 1;
          let newScore = this.state.score + 1;
          this.setState({ score: newScore, currentLetterIndx: newIndex });
        }
      } else {
        let newIndex = this.state.currentLetterIndx + 1;
        this.setState({
          currentLetterIndx: newIndex,
        });
      }
    }
  };

  handleKeyPress = (event) => {
    let newPressedKeys = this.state.pressedKeys;

    if (!this.state.redundentKeys.includes(event.key)) {
      let newTypedText = this.state.typedText;

      if (event.key === "Enter") {
        newPressedKeys.push("\n");
        newTypedText += "\n";
      } else {
        newPressedKeys.push(event.key);
        newTypedText += event.key;
      }

      this.setState({ typedText: newTypedText, pressedKeys: newPressedKeys });
      this.compareTexts(newTypedText);

      if (this._ref) {
        let fraction = this.state.currentLetterIndx / this.state.text.length;
        this._ref.scrollTop = this._ref.scrollHeight * fraction;
      }
    } else {
      newPressedKeys.push(event.key);
    }
    event.preventDefault();
  };

  changePlaying = () => {
    let index = (this.state.currentSrcIndex + 1) % this.sources.length
    this.setState({ playing: false, currentSrcIndex: index });
  };

  handleKeyUnpressed = (event) => {
    let newPressedKeys = this.state.pressedKeys;

    newPressedKeys = newPressedKeys.filter((key) => {
      return key !== event.key && key !== event.key.toUpperCase();
    });
    this.setState({ pressedKeys: newPressedKeys });
  };

  render() {
    return (
      <>
        <div className="container2">
          <div>
            <h3>Enter your wikipedia title: </h3>
            <input
              name="title"
              className="input-title"
              onChange={this.onChange}
              type="text"
              value={this.state.title}
              autoFocus
            />
            <button onClick={() => this.handleClick()} type="button">
              Enter
            </button>
            {!this.state.isPage ? (
              <h5 id="page-error">{this.state.errorMessage}</h5>
            ) : (
              ""
            )}
          </div>
          <div>
            <Statistics
              score={this.state.score}
              errors={this.state.errors}
              speed={this.state.speed}
            />
          </div>
        </div>
        <ReactHowler
          playing={this.state.playing}
          src={this.sources[this.state.currentSrcIndex]}
          volume={0.4}
          onEnd={this.changePlaying}
        />
        <div>{this.state.key}</div>
        <Calculator include={this.include}/>
        <div className="container">
          <PerfectScrollbar
            className="quoteDisplay"
            containerRef={(ref) => (this._ref = ref)}
          >
            <p>
              {this.state.text.slice(0, this.state.currentLetterIndx)}
              <mark>
                {this.state.text.slice(
                  this.state.currentLetterIndx,
                  this.state.currentLetterIndx + 1
                )}
              </mark>
              <span>
                {this.state.text.slice(this.state.currentLetterIndx + 1)}
              </span>
            </p>
          </PerfectScrollbar>
          <PerfectScrollbar
            className="quote-input"
            containerRef={(ref) => (this._ref = ref)}
            onKeyDown={this.handleKeyPress}
            tabIndex="0"
            onKeyUp={this.handleKeyUnpressed}
            onFocus={this.calculateTime}
          >
            <p><span>Start typing: </span>{this.state.typedText}</p>
          </PerfectScrollbar>
        </div>
      </>
    );
  }
}
