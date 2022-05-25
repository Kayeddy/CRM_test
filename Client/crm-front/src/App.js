import logo from './logo.svg';
import './App.scss';
import { Navigation } from './Components'; 
import { Contacts, Tasks, Comments } from './Containers';

function App() {
  return (
    <div className="app app__flex">
      <Navigation />
      <Contacts />
    </div>
  );
}

export default App;
