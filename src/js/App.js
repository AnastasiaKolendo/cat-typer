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
      typedText: '',
      title: "",
      currentLetterIndex: 0,
      playing: false,
      currentSrcIndex: 0,
      score: 0,
      errors: 0,
      speed: 0,
      timeElapsed: 0,
      errorMessage: null,
      redundentKeys: [
        "Tab",
        "Shift",
        "Alt",
        "Meta",
        "Control",
        "Fn",
        "Backspace",
        "ArrowUp",
        "ArrowLeft",
        "ArrowDown",
        "ArrowRight",
        "Escape",
        "CapsLock",
      ],
    };
  }

  include = (num) => {
    return this.state.pressedKeys.includes(num);
  };

  calculateTime = () => {
    setInterval(this.updateTimer, 1000);
  };

  updateTimer = () => {
    const newTimeElapsed = this.state.timeElapsed + 1;
    this.setState({ timeElapsed: newTimeElapsed });
    this.calculateSpeed();
  };

  calculateSpeed = () => {
    const newSpeed = Math.round(
      (this.state.typedText.length / this.state.timeElapsed) * 60
    );
    this.setState({ speed: newSpeed });
  };

  handleClick = async () => {
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
        typedText: '',
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

  compareTexts = (typedText) => {
    if (this.state.text[this.state.currentLetterIndex] === "") {
      if (typedText[typedText.length - 1] === "\n") {
        const newIndex = this.state.currentLetterIndex + 1;
        this.setState({
          currentLetterIndex: newIndex,
        });
      } else {
        const newScore = this.state.score - 1;
        const newErrors = this.state.errors + 1;
        this.setState({ score: newScore, playing: true, errors: newErrors });
      }
    } else {
      const regex = /^\s*([ 0-9a-zA-Z><?@+'`"\~^%&\*\[\]\{\}.!#|\\\"$';,:;=/\(\)]*)\s*$/;
      if (regex.test(this.state.text[this.state.currentLetterIndex])) {
        if (
          typedText[typedText.length - 1] !==
          this.state.text[this.state.currentLetterIndex]
        ) {
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
    }
  };

  handleEnterPress= (event) =>{
    if(event.key === 'Enter'){
      this.handleClick();
    }
  }

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

      if (this.quoteDisplaySpeed) {
        const fraction = this.state.currentLetterIndex / this.state.text.length;
        this.quoteDisplaySpeed.scrollTop = this.quoteDisplaySpeed.scrollHeight * fraction - 30;
      }

      if (this.typedText) {
        const fraction = this.state.currentLetterIndex / this.state.text.length;
        this.typedText.scrollTop = this.typedText.scrollHeight * fraction - 30;
      }
    } else {
      newPressedKeys.push(event.key);
      this.setState({ pressedKeys: newPressedKeys });
    }
    event.preventDefault();
  };

  changePlaying = () => {
    const index = (this.state.currentSrcIndex + 1) % this.sources.length;
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
            className="quoteDisplay"
            containerRef={(quoteDisplaySpeed) => (this.quoteDisplaySpeed = quoteDisplaySpeed)}
          >
            <p>
              {!this.state.text ? (
                <span className="start-typing">
                  Your text to type will go here...
                </span>
              ) : (
                <>
                  {this.state.text.slice(0, this.state.currentLetterIndex)}
                  <mark>
                    {this.state.text.slice(
                      this.state.currentLetterIndex,
                      this.state.currentLetterIndex + 1
                    )}
                  </mark>
                  <span>
                    {this.state.text.slice(this.state.currentLetterIndex + 1)}
                  </span>
                </>
              )}
            </p>
          </PerfectScrollbar>
          {this.state.text ? (
            <PerfectScrollbar
              className="quote-input"
              tabIndex="0"
              containerRef={(typedText) => (this.typedText = typedText)}
              onKeyDown={this.handleKeyPress}
              onKeyUp={this.handleKeyUnpressed}
              onFocus={this.calculateTime}
            >
              <p>
                {this.state.typedText.length === 0 ? (
                  <span>Start typing: </span>
                ) : (
                  <>{this.state.typedText}</>
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
