import { Route } from 'react-router-dom';
import './App.css';
import { Favourite, Header, Search } from './components';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Route exact path="/" component={Search}/>
      <Route exact path="/favourite" component={Favourite}/>
    </div>
  );
}

export default App;
