import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundries'
import './App.css';
import Scroll from '../components/Scroll'

function App() {
  // Hooks, useState is returning a piece of state[0] and a function to change it.[1]
  const [robots, setRobots] = useState([])
  const [searchfield, setSearchfield] = useState('')

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {setRobots(users)});
  }, [])



  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
}

  // const {robots, searchfield } = state;
  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase())
  })

  if (!robots.length) {
    return <h1 className='tc'>Loading</h1>
  } else {
    return (
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots}/>
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
