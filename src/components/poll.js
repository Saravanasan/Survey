import React, { Component } from 'react';
import axios from 'axios'
import Pusher from 'pusher-js';
let _this = null;
export default class Poll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: '',
            btn_disabled: true
        }
    }
    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value,
        });
    }
    timer = () => {
        this.setState({
            btn_disabled: false
        })
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
                    btn_disabled: true
                })
                clearInterval(x);
                alert('Poll Expired');
                document.getElementById("timer").innerHTML = "Poll Expired";
            }
        })
      }


    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.selectedOption === ''){
            alert('Select an option')
        }else{
            axios.post('http://localhost:7000/polls', { option: this.state.selectedOption })
            .then((data) => {
                console.log(`Voted ${this.state.selectedOption}`)
            })
        }
        
    }

    componentDidMount = () => {
        _this = this
        var pusher = new Pusher('ae4e4ae9c1f3e842a401', {
            cluster: 'ap2',
          });
          var channel = pusher.subscribe('timer')
          channel.bind('start', function(data) {
              _this.timer()
          })
        }


    render() {
        return (
            <div>
                <h1 style={{fontWeight: "bold", textAlign:"center", backgroundColor:"#2F4F4F", color:"white"}} >SURVEY</h1>
                <form onSubmit={this.onSubmit}>
                    <div style={{fontWeight: "bold", margin: "10px"}}>
                        <h6>Q.Which age group does corona affect the most?</h6>
                    </div>
                    <div className="radio" style={{backgroundColor:"#E6E6FA"}}>
                        <label>
                            <input type="radio" value="0-17"
                                style={{ margin: '10px' }}
                                checked={this.state.selectedOption === '0-17'}
                                onChange={this.handleOptionChange}
                                className="radio-btn"/> 
                            A. 0-17
                        </label>
                    </div>

                    <div style={{paddingTop:"10px"}}>
                    <div className="radio" style={{backgroundColor:"#FFB6C1"}}>
                        <label>
                            <input type="radio" value="18-35"
                                style={{ margin: '10px' }}
                                checked={this.state.selectedOption === '18-35'}
                                onChange={this.handleOptionChange}
                                className="radio-btn"/>
                            B. 18-35
                        </label>
                    </div>
                    </div>
                    
                    <div style={{paddingTop:"10px"}}>
                    <div className="radio" style={{backgroundColor:"#FFA07A"}}>
                        <label>
                            <input type="radio" value="36-58"
                                style={{ margin: '10px' }}
                                checked={this.state.selectedOption === '36-58'}
                                onChange={this.handleOptionChange}
                                className="radio-btn"/>
                            C. 36-58
                    </label>
                    </div>
                    </div>
                    
                    <div style={{paddingTop:"10px"}}>
                    <div className="radio" style={{backgroundColor:"#F08080"}}>
                        <label>
                            <input type="radio" value="59-70"
                                style={{ margin: '10px' }}
                                checked={this.state.selectedOption === '59-70'}
                                onChange={this.handleOptionChange}
                                className="radio-btn" />
                            D. 59-70
                    </label>
                    </div>
                    </div>

                    <div style={{paddingTop:"10px"}}>
                    <div className="radio" style={{backgroundColor:"#CD5C5C"}}>
                        <label>
                            <input type="radio" value="71 and above"
                                style={{ margin: '10px' }}
                                checked={this.state.selectedOption === '71 and above'}
                                onChange={this.handleOptionChange}
                                className="radio-btn" />
                            E. 71 and above
                    </label>
                    </div>
                    </div>

                    <div style={{paddingTop:"10px"}}>
                    <div className="form-group" style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <input type="submit" value="SUBMIT" className="btn btn-primary" style={{ color: "white", backgroundColor:"#800000" }} disabled={this.state.btn_disabled}/>
                    </div>
                    </div>

                </form>

                <div className="timer" style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "10px"}}>
                <p id='timer'> </p>
                </div>
            
            </div>

        )
    }
}