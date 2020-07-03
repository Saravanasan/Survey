import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs-2.3.2/canvasjs.react';
import Pusher from 'pusher-js';
import axios from 'axios';
let _this = null
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Admin extends Component {

  constructor() {
    super();
    this.state = {
      dataPoints: [
        { label: "0-17", y: 0 },
        { label: "18-35", y: 0 },
        { label: "36-58", y: 0 },
        { label: "59-70", y: 0 },
        { label: "71 and above", y:0  }
      ],
      btn_disabled: false
    }

  }
  onStartSurvey = () => {
    
    axios.post('http://localhost:7000/polls/timer', { timer: 'start' })
      .then((data) => {
        this.setState({
          btn_disabled: true
        })
        this.timer()
      })
  }
  timer = () => {
    var t = new Date()
    t.setSeconds(t.getSeconds() + 30)
    var x = setInterval(() => {
      var now = new Date().getTime()
      var distance = t.getTime() - now
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("timer").innerHTML = "Time Left : " + minutes + ":" + seconds;
      if (distance < 0) {
        this.setState({
          btn_disabled: false
        })
        clearInterval(x);
        document.getElementById("timer").innerHTML = "Survey Ended";
      }
    })
  }

  componentDidMount = () => {
    _this = this
    //Pusher.logToConsole = true;

    var pusher = new Pusher('ae4e4ae9c1f3e842a401', {
      cluster: 'ap2',

    });

    var channel = pusher.subscribe('poll');
    let dataPoints = this.state.dataPoints
    channel.bind('vote', function (data) {

      dataPoints = dataPoints.map(x => {
        if (x.label === data.option) {
          x.y += data.points;
          return x
        }
        else {
          return x
        }
      });
      _this.setState({
        dataPoints: dataPoints
      })
    });
  }

  render() {

    return (
      <div>
        <CanvasJSChart options={{
          title: {
            text: "Survey Results"
          },
          data: [{
            type: "column",
            dataPoints: this.state.dataPoints
          }]
        }}
          onRef={ref => this.chart = ref}
        />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: '10px'}}>
          <input type="submit" value="START SURVEY" className="btn btn-primary" disabled={this.state.btn_disabled} onClick={() => this.onStartSurvey()} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin:"10px"}}>
          <p id="timer"></p>
        </div>

      </div>
    );

  }
}