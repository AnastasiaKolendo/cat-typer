import React, { Component } from "react";
import ReactHowler from "react-howler";
import axios from "axios";
import Statistics from "./Statistics";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Keyboard from "./Keyboard";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.sources = [
      "https://www.kessels.com/CatSounds/kitten4.wav",
      "https://www.kessels.com/CatSounds/kitten3.wav",
      "https://www.kessels.com/CatSounds/cat14.wav",
      "https://www.kessels.com/CatSounds/cat11.wav",
      "https://www.kessels.com/CatSounds/cat9.wav",
      "https://www.kessels.com/CatSounds/cat10.wav",
    ];
    this.state = {
      pressedKeys: [],
      text: null,
      typedText: "",
      title: "",
      currentLetterIndex: 0,
      playing: false,
      currentSrcIndex: 0,
      score: 0,
      errors: 0,
      speed: 0,
      timeElapsed: 0,
      errorMessage: null,
    };
  }

  include = (charCode) => {
    return this.state.pressedKeys.includes(charCode);
  };

  startTimer = () => {
    this.stopTimer();
    this.timer = setInterval(this.updateTimer, 1000);
  };

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  };

  updateTimer = () => {
    const newTimeElapsed = this.state.timeElapsed + 1;
    this.setState({ timeElapsed: newTimeElapsed });
    this.calculateSpeed();
  };

  calculateSpeed = () => {
    console.log(this.state.currentLetterIndex, this.state.timeElapsed);
    const newSpeed = Math.round(
      (this.state.currentLetterIndex / this.state.timeElapsed) * 60
    );
    this.setState({ speed: newSpeed });
  };

  handleClick = async () => {
    this.stopTimer();
    try {
      const data = await axios.get(
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
        errorMessage: null,
        currentLetterIndex: 0,
        text: null,
        typedText: "",
        timeElapsed: 0,
        score: 0,
        errors: 0,
        speed: 0,
        playing: false,
        currentSrcIndex: 0,
      });

      const page = Object.values(data.data.query.pages)[0];
      const pagesCategories = page.categories;

      let isAmbiguous = false;

      if (pagesCategories) {
        pagesCategories.forEach((category) => {
          if (category.title === "Category:All article disambiguation pages") {
            this.setState({
              errorMessage:
                "Sorry this title is ambiguous. Please be more specific",
            });
            isAmbiguous = true;
          }
        });
      }

      if (!isAmbiguous) {
        if (page.extract) {
          this.setState({
            text: page.extract.trim(),
          });

          if (this.typedText) {
            this.typedText.focus();
          }
        } else {
          this.setState({
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

  compareTexts = (expectedChar) => {
    console.log(expectedChar, this.state.text[this.state.currentLetterIndex])
    const regex = /^\s*([ \n0-9a-zA-Z><?@+'`"\~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\)]*)\s*$/;
    if (regex.test(this.state.text[this.state.currentLetterIndex])) {
      if (expectedChar !== this.state.text[this.state.currentLetterIndex]) {
        const newScore = this.state.score - 1;
        const newErrors = this.state.errors + 1;
        this.setState({ score: newScore, playing: true, errors: newErrors });
      } else {
        const newIndex = this.state.currentLetterIndex + 1;
        const newScore = this.state.score + 1;
        this.setState({ score: newScore, currentLetterIndex: newIndex });
      }
    } else {
      const newIndex = this.state.currentLetterIndex + 1;
      this.setState({
        currentLetterIndex: newIndex,
      });
    }
  };

  handleEnterPress = (event) => {
    if (event.key === "Enter") {
      this.handleClick();
    }
  };

  handleKeyPress = (event) => {
    if (this.state.currentLetterIndex === 1) {
      this.startTimer();
    }
    if (this.state.currentLetterIndex < this.state.text.length) {
      let newTypedText = this.state.typedText;
      const typedChar = String.fromCharCode(event.charCode);
      newTypedText += typedChar;

      this.setState({ typedText: newTypedText });

      if (this.state.currentLetterIndex < this.state.text.length) {
        let expectedChar;
        if (event.key === "Enter") {
          expectedChar = "\n";
        } else {
          expectedChar = typedChar;
        }

        this.compareTexts(expectedChar);

        if (this.textToType) {
          const fraction =
            this.state.currentLetterIndex / this.state.text.length;
          this.textToType.scrollTop = Math.max(
            0,
            this.textToType.scrollHeight * fraction - 30
          );
        }

        if (this.typedText) {
          const fraction =
            this.state.currentLetterIndex / this.state.text.length;
          this.typedText.scrollTop =
            this.typedText.scrollHeight * fraction - 30;
        }
      }
      if (this.state.currentLetterIndex === this.state.text.length - 1) {
        this.stopTimer();
      }
    }

    event.preventDefault();
  };

  handleKeyDown = (event) => {
    if (this.state.currentLetterIndex < this.state.text.length) {
      let newPressedKeys = this.state.pressedKeys;
      newPressedKeys.push(event.keyCode);
      this.setState({ pressedKeys: newPressedKeys });
      if (event.key === "Tab") {
        event.preventDefault();
      }
    }
  };

  changePlaying = () => {
    const index = (this.state.currentSrcIndex + 1) % this.sources.length;
    this.setState({ playing: false, currentSrcIndex: index });
  };

  handleKeyUnpressed = (event) => {
    let newPressedKeys = this.state.pressedKeys;

    newPressedKeys = newPressedKeys.filter((key) => {
      return key !== event.keyCode && key !== event.key.toUpperCase();
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
              onKeyPress={this.handleEnterPress}
            />
            <button onClick={() => this.handleClick()} type="button">
              Enter/Start Again
            </button>
            {this.state.errorMessage ? (
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
        <Keyboard include={this.include} />
        <div className="container">
          <PerfectScrollbar
            className="text-to-type"
            containerRef={(textToType) => (this.textToType = textToType)}
          >
            <p>
              {!this.state.text ? (
                <span className="start-typing">
                  Your text to type will go here...
                </span>
              ) : (
                <span>
                  {this.state.text.slice(0, this.state.currentLetterIndex)}
                  <strong>
                    {this.state.text.slice(
                      this.state.currentLetterIndex,
                      this.state.currentLetterIndex + 1
                    )}
                  </strong>
                  {this.state.text.slice(this.state.currentLetterIndex + 1)}
                </span>
              )}
            </p>
          </PerfectScrollbar>
          {this.state.text ? (
            <PerfectScrollbar
              className="typed-text"
              tabIndex="0"
              containerRef={(typedText) => (this.typedText = typedText)}
              onKeyDown={this.handleKeyDown
              onKeyPress={this.handleKeyPress}
              onKeyUp={this.handleKeyUnpressed}
            >
              <p>
                {this.state.typedText.length === 0 ? (
                  <span>Start typing: </span>
                ) : (
                  <span>{this.state.typedText}</span>
                )}
              </p>
            </PerfectScrollbar>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}
