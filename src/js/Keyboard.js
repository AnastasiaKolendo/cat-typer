import React, { Component } from "react";


export default class Calculator extends Component {

    render(){
        return (
        <div className="keyboard-base">
          <div
            className="key"
            className={this.props.include(192) ? "change_red" : "change_white"}
          >
            ~
          </div>
          <div
            className="key"
            className={this.props.include(49) ? "change_red" : "change_white"}
          >
            1
          </div>
          <div
            className="key"
            className={this.props.include(50) ? "change_red" : "change_white"}
          >
            2
          </div>
          <div
            className="key"
            className={this.props.include(51) ? "change_red" : "change_white"}
          >
            3
          </div>
          <div
            className="key"
            className={this.props.include(52) ? "change_red" : "change_white"}
          >
            4
          </div>
          <div
            className="key"
            className={this.props.include(53) ? "change_red" : "change_white"}
          >
            5
          </div>
          <div
            className="key"
            className={this.props.include(54) ? "change_red" : "change_white"}
          >
            6
          </div>
          <div
            className="key"
            className={this.props.include(55) ? "change_red" : "change_white"}
          >
            7
          </div>
          <div
            className="key"
            className={this.props.include(56) ? "change_red" : "change_white"}
          >
            8
          </div>
          <div
            className="key"
            className={this.props.include(57) ? "change_red" : "change_white"}
          >
            9
          </div>
          <div
            className="key"
            className={this.props.include(48) ? "change_red" : "change_white"}
          >
            0
          </div>
          <div
            className="key"
            className={this.props.include(189) ? "change_red" : "change_white"}
          >
            -
          </div>
          <div
            className="key"
            className={this.props.include(187) ? "change_red" : "change_white"}
          >
            +
          </div>
          <div className="key" className={this.props.include(8) ? "delete change_red" : "delete change_white"}>Delete</div>
          <div className="key" className={this.props.include(9) ? "tab change_red" : "tab change_white"}>Tab</div>
          <div
            className="key"
            className={this.props.include(81) ? "change_red" : "change_white"}
          >
            Q
          </div>
          <div
            className="key"
            className={this.props.include(87) ? "change_red" : "change_white"}
          >
            w
          </div>
          <div
            className="key"
            className={this.props.include(69) ? "change_red" : "change_white"}
          >
            E
          </div>
          <div
            className="key"
            className={this.props.include(82) ? "change_red" : "change_white"}
          >
            R
          </div>
          <div
            className="key"
            className={this.props.include(84) ? "change_red" : "change_white"}
          >
            T
          </div>
          <div
            className="key"
            className={this.props.include(89) ? "change_red" : "change_white"}
          >
            Y
          </div>
          <div
            className="key"
            className={this.props.include(85) ? "change_red" : "change_white"}
          >
            U
          </div>
          <div
            className="key"
            className={this.props.include(73) ? "change_red" : "change_white"}
          >
            I
          </div>
          <div
            className="key"
            className={this.props.include(79) ? "change_red" : "change_white"}
          >
            O
          </div>
          <div
            className="key"
            className={this.props.include(80) ? "change_red" : "change_white"}
          >
            P
          </div>
          <div
            className="key"
            className={this.props.include(219) ? "change_red" : "change_white"}
          >
            [
          </div>
          <div
            className="key"
            className={this.props.include(221) ? "change_red" : "change_white"}
          >
            ]
          </div>
          <div
            className="key backslash"
            className={this.props.include(220) ? "change_red" : "change_white"}
          >
            \
          </div>
          <div className="key" className={this.props.include(20) ? "capslock change_red" : "capslock change_white"}>CapsLock</div>
          <div
            className="key"
            className={this.props.include(65) ? "change_red" : "change_white"}
          >
            A
          </div>
          <div
            className="key"
            className={this.props.include(83) ? "change_red" : "change_white"}
          >
            S
          </div>
          <div
            className="key"
            className={this.props.include(68) ? "change_red" : "change_white"}
          >
            D
          </div>
          <div
            className="key"
            className={this.props.include(70) ? "change_red" : "change_white"}
          >
            F
          </div>
          <div
            className="key"
            className={this.props.include(71) ? "change_red" : "change_white"}
          >
            G
          </div>
          <div
            className="key"
            className={this.props.include(72) ? "change_red" : "change_white"}
          >
            H
          </div>
          <div
            className="key"
            className={this.props.include(74) ? "change_red" : "change_white"}
          >
            J
          </div>
          <div
            className="key"
            className={this.props.include(75) ? "change_red" : "change_white"}
          >
            K
          </div>
          <div
            className="key"
            className={this.props.include(76) ? "change_red" : "change_white"}
          >
            L
          </div>
          <div
            className="key"
            className={this.props.include(186) ? "change_red" : "change_white"}
          >
            ;
          </div>
          <div
            className="key"
            className={this.props.include(222) ? "change_red" : "change_white"}
          >
            '
          </div>
          <div className="key" className={this.props.include(13) ? "return change_red" : "return change_white"}>Return</div>
          <div className="key" className={this.props.include(16) ? "leftshift change_red" : "leftshift change_white"}>Shift</div>
          <div
            className="key"
            className={this.props.include(90) ? "change_red" : "change_white"}
          >
            Z
          </div>
          <div
            className="key"
            className={this.props.include(88) ? "change_red" : "change_white"}
          >
            X
          </div>
          <div
            className="key"
            className={this.props.include(67) ? "change_red" : "change_white"}
          >
            C
          </div>
          <div
            className="key"
            className={this.props.include(86) ? "change_red" : "change_white"}
          >
            V
          </div>
          <div
            className="key"
            className={this.props.include(66)? "change_red" : "change_white"}
          >
            B
          </div>
          <div
            className="key"
            className={this.props.include(78) ? "change_red" : "change_white"}
          >
            N
          </div>
          <div
            className="key"
            className={this.props.include(77) ? "change_red" : "change_white"}
          >
            M
          </div>
          <div
            className="key"
            className={this.props.include(188) ? "change_red" : "change_white"}
          >
          ,
          </div>
          <div
            className="key"
            className={this.props.include(190) ? "change_red" : "change_white"}
          >
            .
          </div>
          <div
            className="key"
            className={this.props.include(191) ? "change_red" : "change_white"}
          >
            /
          </div>
          <div className="key" className={this.props.include(16) ? "rightshift change_red" : "rightshift change_white"}>Shift</div>
          <div className="key" className={this.props.include(17) ? "leftctrl change_red" : "leftctrl change_white"}>Ctrl</div>
          <div className="key" className={this.props.include(18) ? "change_red" : "change_white"}>Alt</div>
          <div className="key" className={this.props.include(91) ? "command change_red" : "command change_white"}>Command</div>
          <div className="key" className={this.props.include(32) ? "space change_red" : "space change_white"}>Space</div>
          <div className="key" className={this.props.include(93) ? "command change_red" : "command change_white"}>Command</div>
          <div className="key" className={this.props.include(18) ? "change_red" : "change_white"}>Alt</div>
          <div className="key" className={this.props.include(17) ? "rightctrl change_red" : "rightctrl change_white"}>Ctrl</div>
          <div className="key">Fn</div>
        </div>
        
        )
    }
}