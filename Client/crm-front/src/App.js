import logo from './logo.svg';
import './App.scss';
import { Navigation } from './Components'; 
import { Contacts, Tasks, Comments } from './Container';


function App() {

  return (
    <div className="app app__flex">

      <Navigation />
      <Contacts />
      <Tasks /> 
      <Comments />

    </div>
  );

}

export default App;
