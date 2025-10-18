/* eslint-disable no-useless-escape */
import React from "react";
import "./App.css";

class MyJSCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayValue: "0",
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  handleButtonClick(value) {
    // Handle button clicks for numbers
    if (this.state.displayValue === "0" && /[-+*\/]/.test(value)) {
      this.setState((prevState) => ({
        displayValue: prevState.displayValue + value,
      }));
      return;
    } else if (this.state.displayValue === "0" && value !== ".") {
      this.setState((prevState) => ({
        displayValue: prevState.displayValue.replace("0", value),
      }));
      return;
    } else if (/(?<=[-+*\/])[+*\/]{1}?$/.test(this.state.displayValue)) {
      this.setState((prevState) => ({
        displayValue: prevState.displayValue.slice(0, -1) + value,
      }));
      return;
    } else if (
      /(?<=[-+*\/])-$/.test(this.state.displayValue) &&
      /[-+*\/]/.test(value)
    ) {
      this.setState((prevState) => ({
        displayValue: prevState.displayValue.slice(0, -2) + value,
      }));
      return;
    } else if (
      /(?<=(?<=\.)[\d]+)\./.test(this.state.displayValue) ||
      /(?<=[-+*\/])\./.test(this.state.displayValue)
    ) {
      this.setState({
        displayValue: this.state.displayValue.slice(0, -1) + value,
      });
      return;
    } else if (
      (/(?<=[-+*\/])0$/.test(this.state.displayValue) && /\d/.test(value)) ||
      (/\.$/g.test(this.state.displayValue) && value === ".")
    ) {
      this.setState((prevState) => ({
        displayValue: prevState.displayValue.slice(0, -1) + value,
      }));
      return;
    } else {
      this.setState({
        displayValue: this.state.displayValue + value,
      });
      return;
    }
  }
  handleClear() {
    // Reset the calculator state
    this.setState({
      displayValue: "0",
    });
  }

  handleEquals() {
    // Evaluate the expression in the display value
    try {
      const result = eval(this.state.displayValue);
      this.setState({
        displayValue: String(result),
      });
    } catch {
      (error) => {
        this.setState({
          displayValue: "Error",
        });
        console.error("Error evaluating expression:", error);
      };
    }
  }
  
  handleKeyDown = (event) => {
    // handle keyboard input
    const { key } = event;
    if (event.key.startsWith("F")) return; // Ignore function keys
    if (/[0-9]/.test(key) || ["+", "-", "*", "/", "."].includes(key)) {
      this.handleButtonClick(key);
    } else if (key === "Enter") {
      this.handleEquals();
    } else if (key === "Backspace" || key === "Escape") {
      this.handleClear();
    }
  }

  componentDidMount() {
    // Add event listener for keyboard input
    document.onkeydown = this.handleKeyDown;
  }
  componentDidUpdate() {
    // Add event listener for keyboard input
    document.onkeydown = this.handleKeyDown;
  }
  

  componentWillUnmount() {
    // Clean up event listener
    document.onkeydown = null;
  } 

  render() {
    return (
      <div className="calculator-container">
        <h1>My JavaScript Calculator</h1>
        <div className="display-row">
          <input
            type="text"
            id="display"
            value={this.state.displayValue}
            readOnly
          />
          <button id="clear" onClick={this.handleClear}>
            C
          </button>
        </div>
        <div className="buttons">
          <button id="seven" onClick={() => this.handleButtonClick("7")}>
            7
          </button>
          <button id="eight" onClick={() => this.handleButtonClick("8")}>
            8
          </button>
          <button id="nine" onClick={() => this.handleButtonClick("9")}>
            9
          </button>
          <button
            id="divide"
            className="operator"
            onClick={() => this.handleButtonClick("/")}
          >
            /
          </button>

          <button id="four" onClick={() => this.handleButtonClick("4")}>
            4
          </button>
          <button id="five" onClick={() => this.handleButtonClick("5")}>
            5
          </button>
          <button id="six" onClick={() => this.handleButtonClick("6")}>
            6
          </button>
          <button
            id="multiply"
            className="operator"
            onClick={() => this.handleButtonClick("*")}
          >
            *
          </button>

          <button id="one" onClick={() => this.handleButtonClick("1")}>
            1
          </button>
          <button id="two" onClick={() => this.handleButtonClick("2")}>
            2
          </button>
          <button id="three" onClick={() => this.handleButtonClick("3")}>
            3
          </button>
          <button
            id="subtract"
            className="operator"
            onClick={() => this.handleButtonClick("-")}
          >
            -
          </button>

          <button id="zero" onClick={() => this.handleButtonClick("0")}>
            0
          </button>
          <button id="decimal" onClick={() => this.handleButtonClick(".")}>
            .
          </button>
          <button id="equals" onClick={this.handleEquals}>
            =
          </button>
          <button
            id="add"
            className="operator"
            onClick={() => this.handleButtonClick("+")}
          >
            +
          </button>
        </div>
        <p className="credit">Calculator by demind.dev</p>
      </div>
    );
  }
}

export default MyJSCalculator;
