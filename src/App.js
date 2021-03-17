import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Favourite, Header, Nomatch, Search } from './components';

function App() {
  return (
    <div className="wrapper">
      <Header/>
      <Switch>
        <Route exact path="/" component={Search}/>
        <Route path="/favourite" component={Favourite}/>
        <Route path="*" component={Nomatch}/>
      </Switch>
    </div>
  );
}

export default App;
