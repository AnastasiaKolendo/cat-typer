import React, { Component } from "react";


export default class Statistics extends Component {

      render() {
        return (
            <div className="statistics">
                <div className="score"> Score: {this.props.score}</div>
                <div className="errors"> Errors: {this.props.errors}</div>
                <div className="speed"> Speed: {this.props.speed} CPM</div>
            </div>
        )
    }
}