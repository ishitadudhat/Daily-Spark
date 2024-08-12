import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import './App.css'
import PropTypes from 'prop-types'
import AboutUs from './components/AboutUs'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'





export class App extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "us",
    category: "science"
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
    }
  }

  toggleDarkMode = () => {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode
    }))
  }

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }

  render() {

    const { isDarkMode } = this.state;
    const themeClass = isDarkMode ? 'dark-mode' : 'light-mode';

    return (
      <>
        <Router>
          <div className={`app ${themeClass}`}>
            <Navbar toggleMode={this.toggleDarkMode} />

            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
            />

            <Routes>
              <Route path='/' element={<News setProgress={this.setProgress} key="general" pageSize={6} country={"in"} category={"general"} />} />
              <Route path='/business' element={<News setProgress={this.setProgress} key="business" pageSize={6} country={"in"} category={"business"} />} />
              <Route path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" pageSize={6} country={"in"} category={"entertainment"} />} />
              <Route path='/health' element={<News setProgress={this.setProgress} key="health" pageSize={6} country={"in"} category={"health"} />} />
              <Route path='/science' element={<News setProgress={this.setProgress} key="science" pageSize={6} country={"in"} category={"science"} />} />
              <Route path='/sports' element={<News setProgress={this.setProgress} key="sports" pageSize={6} country={"in"} category={"sports"} />} />
              <Route path='/technology' element={<News setProgress={this.setProgress} key="technology" pageSize={6} country={"in"} category={"technology"} />} />
              <Route path='/AboutUs' element={<AboutUs />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}

export default App
