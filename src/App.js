import logo from './logo.svg';
import './App.css';
import GoogleAuthService from './lib/GoogleAuthService';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GoogleAuthService />
      </header>
    </div>
  );
}

export default App;