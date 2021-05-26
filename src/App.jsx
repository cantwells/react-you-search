import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Favourite, Header, Nomatch, Player, Search } from './components';

function App() {

  const { isAuthorized } = useSelector( ({login}) => login );

  if(isAuthorized) {
      return (
        <div className="wrapper">
          <Header/>
          <Switch>
            <Route exact path="/" component={Search}/>
            <Route exact path="/favourite" component={Favourite}/>
            <Route path="/video/:id" component={Player}/>
            <Route component={Nomatch}/>
          </Switch>
        </div>
      );
  }
  return <Redirect to="/login" /> 
}

export default App;
