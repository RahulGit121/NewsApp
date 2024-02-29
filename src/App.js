import './App.css';
import Navbar from './Components/Navbar';
// import News from './Components/News';
import NewsFunc from './Components/NewsFunc';
import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

const App =() =>{

  const [progress, setProgress] = useState(0);

      return (
        <div>

          <Router>
            <Navbar />
            
              <LoadingBar
                color='#ff0018'
                progress={progress}
              />
    
            <Routes>
              <Route exact path="/" element={<NewsFunc setProgress={setProgress} key='home' category="general" />} />
              <Route exact path="/general" element={<NewsFunc setProgress={setProgress} key='general' category="general" />} />
              <Route exact path="/business" element={<NewsFunc setProgress={setProgress} key='business' category="business" />} />
              <Route exact path="/entertainment" element={<NewsFunc setProgress={setProgress} key='entertainment' category="entertainment" />} />
              <Route exact path="/health" element={<NewsFunc setProgress={setProgress} key='health' category="health" />} />
              <Route exact path="/science" element={<NewsFunc setProgress={setProgress} key='science' category="science" />} />
              <Route exact path="/sports" element={<NewsFunc setProgress={setProgress} key='sports' category="sports" />} />
              <Route exact path="/technology" element={<NewsFunc setProgress={setProgress} key='technology' category="technology" />} />
            </Routes>
          </Router>
        </div>
      )

    }
  export default App;


