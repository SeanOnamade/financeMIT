import './index.css';
// import logo from './logo.svg';
import './App.css';
import Portfolio from './pages/Portfolio';
import Newsfeed from './pages/Newsfeed';
import Convo from './pages/Convo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Newsfeed />
      <Portfolio />
      <Convo />
      <Footer />
    </div>
  );
}

export default App;
