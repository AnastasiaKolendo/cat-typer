import React, { Component } from "react";


export default class Calculator extends Component {

    render(){
        return (
        <div className="keyboard-base">
          <div
            className="key"
            className={this.props.include("~") || this.props.include("`") ? "change_red" : "change_white"}
          >
            ~
          </div>
          <div
            className="key"
            className={this.props.include("1") ? "change_red" : "change_white"}
          >
            1
          </div>
          <div
            className="key"
            className={this.props.include("2") ? "change_red" : "change_white"}
          >
            2
          </div>
          <div
            className="key"
            className={this.props.include("3") ? "change_red" : "change_white"}
          >
            3
          </div>
          <div
            className="key"
            className={this.props.include("4") ? "change_red" : "change_white"}
          >
            4
          </div>
          <div
            className="key"
            className={this.props.include("5") ? "change_red" : "change_white"}
          >
            5
          </div>
          <div
            className="key"
            className={this.props.include("6") ? "change_red" : "change_white"}
          >
            6
          </div>
          <div
            className="key"
            className={this.props.include("7") ? "change_red" : "change_white"}
          >
            7
          </div>
          <div
            className="key"
            className={this.props.include("8") ? "change_red" : "change_white"}
          >
            8
          </div>
          <div
            className="key"
            className={this.props.include("9") ? "change_red" : "change_white"}
          >
            9
          </div>
          <div
            className="key"
            className={this.props.include("0") ? "change_red" : "change_white"}
          >
            0
          </div>
          <div
            className="key"
            className={this.props.include("-") || this.props.include("_") ? "change_red" : "change_white"}
          >
            -
          </div>
          <div
            className="key"
            className={this.props.include("+") || this.props.include("=") ? "change_red" : "change_white"}
          >
            +
          </div>
          <div className="key" className={this.props.include("Backspace") ? "delete change_red" : "delete change_white"}>Delete</div>
          <div className="key" className={this.props.include("Tab") ? "tab change_red" : "tab change_white"}>Tab</div>
          <div
            className="key"
            className={this.props.include("Q") || this.props.include("q") ? "change_red" : "change_white"}
          >
            Q
          </div>
          <div
            className="key"
            className={this.props.include("W") || this.props.include("w") ? "change_red" : "change_white"}
          >
            w
          </div>
          <div
            className="key"
            className={this.props.include("E") || this.props.include("e") ? "change_red" : "change_white"}
          >
            E
          </div>
          <div
            className="key"
            className={this.props.include("R") || this.props.include("r") ? "change_red" : "change_white"}
          >
            R
          </div>
          <div
            className="key"
            className={this.props.include("T") || this.props.include("t") ? "change_red" : "change_white"}
          >
            T
          </div>
          <div
            className="key"
            className={this.props.include("Y") || this.props.include("y") ? "change_red" : "change_white"}
          >
            Y
          </div>
          <div
            className="key"
            className={this.props.include("U") || this.props.include("u") ? "change_red" : "change_white"}
          >
            U
          </div>
          <div
            className="key"
            className={this.props.include("I") || this.props.include("i") ? "change_red" : "change_white"}
          >
            I
          </div>
          <div
            className="key"
            className={this.props.include("O") || this.props.include("o") ? "change_red" : "change_white"}
          >
            O
          </div>
          <div
            className="key"
            className={this.props.include("P") || this.props.include("p") ? "change_red" : "change_white"}
          >
            P
          </div>
          <div
            className="key"
            className={this.props.include("[") || this.props.include("{") ? "change_red" : "change_white"}
          >
            [
          </div>
          <div
            className="key"
            className={this.props.include("]") || this.props.include("}") ? "change_red" : "change_white"}
          >
            ]
          </div>
          <div
            className="key backslash"
            className={this.props.include("'\'") || this.props.include("|") ? "change_red" : "change_white"}
          >
            \
          </div>
          <div className="key" className={this.props.include("CapsLock") ? "capslock change_red" : "capslock change_white"}>CapsLock</div>
          <div
            className="key"
            className={this.props.include("A") || this.props.include("a") ? "change_red" : "change_white"}
          >
            A
          </div>
          <div
            className="key"
            className={this.props.include("S") || this.props.include("s") ? "change_red" : "change_white"}
          >
            S
          </div>
          <div
            className="key"
            className={this.props.include("D") || this.props.include("d") ? "change_red" : "change_white"}
          >
            D
          </div>
          <div
            className="key"
            className={this.props.include("F") || this.props.include("f") ? "change_red" : "change_white"}
          >
            F
          </div>
          <div
            className="key"
            className={this.props.include("G") || this.props.include("g") ? "change_red" : "change_white"}
          >
            G
          </div>
          <div
            className="key"
            className={this.props.include("H") || this.props.include("h") ? "change_red" : "change_white"}
          >
            H
          </div>
          <div
            className="key"
            className={this.props.include("J") || this.props.include("j") ? "change_red" : "change_white"}
          >
            J
          </div>
          <div
            className="key"
            className={this.props.include("K") || this.props.include("k") ? "change_red" : "change_white"}
          >
            K
          </div>
          <div
            className="key"
            className={this.props.include("L") || this.props.include("l") ? "change_red" : "change_white"}
          >
            L
          </div>
          <div
            className="key"
            className={this.props.include(";") || this.props.include(":") ? "change_red" : "change_white"}
          >
            ;
          </div>
          <div
            className="key"
            className={this.props.include("'") || this.props.include('"') ? "change_red" : "change_white"}
          >
            '
          </div>
          <div className="key" className={this.props.include("Enter") ? "return change_red" : "return change_white"}>Return</div>
          <div className="key" className={this.props.include("Shift") ? "leftshift change_red" : "leftshift change_white"}>Shift</div>
          <div
            className="key"
            className={this.props.include("Z") || this.props.include("z") ? "change_red" : "change_white"}
          >
            Z
          </div>
          <div
            className="key"
            className={this.props.include("X") || this.props.include("x") ? "change_red" : "change_white"}
          >
            X
          </div>
          <div
            className="key"
            className={this.props.include("C") || this.props.include("c") ? "change_red" : "change_white"}
          >
            C
          </div>
          <div
            className="key"
            className={this.props.include("V") || this.props.include("v") ? "change_red" : "change_white"}
          >
            V
          </div>
          <div
            className="key"
            className={this.props.include("B") || this.props.include("b")? "change_red" : "change_white"}
          >
            B
          </div>
          <div
            className="key"
            className={this.props.include("N") || this.props.include("n") ? "change_red" : "change_white"}
          >
            N
          </div>
          <div
            className="key"
            className={this.props.include("M") || this.props.include("m") ? "change_red" : "change_white"}
          >
            M
          </div>
          <div
            className="key"
            className={this.props.include(",") || this.props.include("<") ? "change_red" : "change_white"}
          >
            ,
          </div>
          <div
            className="key"
            className={this.props.include(".") || this.props.include(">") ? "change_red" : "change_white"}
          >
            .
          </div>
          <div
            className="key"
            className={this.props.include("/") ? "change_red" : "change_white"}
          >
            /
          </div>
          <div className="key" className={this.props.include("Shift") ? "rightshift change_red" : "rightshift change_white"}>Shift</div>
          <div className="key" className={this.props.include("Control") ? "leftctrl change_red" : "leftctrl change_white"}>Ctrl</div>
          <div className="key" className={this.props.include("Alt") ? "change_red" : "change_white"}>Alt</div>
          <div className="key" className={this.props.include("Meta") ? "command change_red" : "command change_white"}>Command</div>
          <div className="key" className={this.props.include(" ") ? "space change_red" : "space change_white"}>Space</div>
          <div className="key" className={this.props.include("Meta") ? "command change_red" : "command change_white"}>Command</div>
          <div className="key" className={this.props.include("Alt") ? "change_red" : "change_white"}>Alt</div>
          <div className="key" className={this.props.include("Control") ? "rightctrl change_red" : "rightctrl change_white"}>Ctrl</div>
          <div className="key">Fn</div>
        </div>
        
        )
    }
}