import './index.css';
// import logo from './logo.svg';
import './App.css';
import Portfolio from './pages/Portfolio';
import Newsfeed from './pages/Newsfeed';
import Convo from './pages/Convo';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import React, { useEffect, useRef } from 'react';

function App() {
  useEffect(() => {
    const nightSky = document.querySelector('#nightSky');
    if (nightSky) {
      nightSky.setAttribute('layers', '4');
      nightSky.setAttribute('density', '7');
      nightSky.setAttribute('velocity-x', '20');
      nightSky.setAttribute('velocity-y', '20');
      nightSky.setAttribute('star-color', '#FFF');
      nightSky.setAttribute('background-color', 'transparent');
    }
  }, []);

  const portfolioRef = useRef(null);
  const convoRef = useRef(null);
  const newsFeedRef = useRef(null);

  return (
    <div className="App max-w-7xl mx-auto p-5"> 
      <night-sky id="nightSky"></night-sky>
      {/* can remove the max-w-5xl and mx-auto parts! They just narrow the page */}
      <Navbar portfolioRef = {portfolioRef} convoRef = {convoRef} newsFeedRef = {newsFeedRef} />
      <section id="portfolio" ref={portfolioRef}>
        <Portfolio />
      </section>
      <section id="convo" ref={convoRef}>
        <Convo />
      </section>
      <section id="newsfeed" ref={newsFeedRef}>
      <Newsfeed />
      </section>
      <Footer />
    </div>
  );
}

export default App;
