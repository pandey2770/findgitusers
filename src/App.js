import React, { Component } from 'react';
import axios from 'axios';
import debounce from 'debounce';
import './App.css';

class App extends Component {
  state = {
    userData: [],
  }

  componentWillMount() {
    this.searchUsersDebounced = debounce(this.searchUsers, 200);
  }

  updateUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
    this.searchUsersDebounced()
  }

  searchUsers = (event) => {
    const { userName } = this.state;
    if (userName) {
      axios.get(`https://api.github.com/search/users?q=${userName}&sort=followers&order=desc`)
        .then(({data}) => {
          this.setState({
            userData: data.items,
          });
        });
    }
  }

  render() {
    const { userName, userData } = this.state;
    return (
      <div className="App">
        <div className="App-header">
          <h2>Git Users Search</h2>
        </div>
        <div className="App-intro">
          <span>Enter user name</span>
          <input className='input' value={userName} onChange={this.updateUserName}/>
        </div>
        <div>
          {userData.map(user => 
            <div className='user-style' key={user.login}>
              <div className='height'><img className='img-style' src={user.avatar_url} /></div>
              <div className='height'>{user.login}</div>
              <div className='height'>{user.html_url}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
