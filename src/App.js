import React, { Component } from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import axios from 'axios';
import Header from './Components/Header';
import Books from './Components/Books';
import SearchInput from './Components/SearchInput';
import './App.css';

class App extends Component {
//Build constructor to set the state, set books as empty array, define initial state title to search from API
  constructor(){
    super();
    this.state = {
      books: [],
      text: 'Harry Potter'
    }
  }

//Always call API as its own function while mounting component
  componentWillMount(){
    this.getBooks();
  }
//call the getBooks function as axios request method
  getBooks(){
    axios.request({
      method: 'get',
      url:'https://www.googleapis.com/books/v1/volumes?q='+this.state.text
    }).then((response) => {
        this.setState({books: response.data.items}, () => {
          console.log(this.state);
        });
      }).catch((error) => {
        console.log(error);
      });
  }

  handleChange(text){
    this.setState({text: text}, this.getBooks());
  }

  render() {
    return (
      <div className="App">
       <Header />
       <Grid>
         <Row>
           <Col xs={12} md={12} lg={12}>
             <SearchInput onChange={this.handleChange.bind(this)} value={this.state.text} />
             <Books books={this.state.books} />
           </Col>
         </Row>
       </Grid>
      </div>
    );
  }
}

export default App;
