import React, { Component } from 'react';
import axios from 'axios';
import Output from './Components/Output';
import Text from './Components/Controls/Text';
import Length from './Components/Controls/Length';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parasNum: 3,
      parasLength: 'short',
      text: ''
    }
  }

  componentWillMount(){
    this.getSampleText();
  }

  getSampleText(){
    axios.get('https://cors-anywhere.herokuapp.com/https://loripsum.net/api/' + 
      this.state.parasNum + '/' + 
      this.state.parasLength + '/'
    )
      .then((response) => {
        this.setState({text: response.data}, function(){
          console.log(response.data);
          console.log(response.status);
          console.log(response.statusText);
          console.log(response.headers);
          console.log(response.config);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  changeParas(number){
    this.setState({parasNum: number}, this.getSampleText);
  }

  changeLength(size){
    this.setState({parasLength: size}, this.getSampleText);
  }

  render() {
    return (
      <div className="App">
        <section className="hero is-info m-b-lg">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Dummy-san
              </h1>
              <h2 className="subtitle">
                Simple Lorem Ipsum Generator
              </h2>
            </div>
          </div>
        </section>
        <div className="container">
          <div className="columns">
            <div className="column is-one-third">
              <form className="form-inline">
                <div className="field">
                  <label className="label">Number of Paragraphs:</label>
                  <Text value={this.state.parasNum} onChange={this.changeParas.bind(this)} />
                </div>
                <div className="field">
                  <label className="label">Paragraph Length:</label>
                  <Length value={this.state.parasLength} onChange={this.changeLength.bind(this)} />
                </div>
              </form>
            </div>
            <div className="column">
              <div className="box content">
                <Output value={this.state.text} />
              </div>
              {/* <Output value={this.state.text} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
