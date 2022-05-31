import { React, useState } from 'react';
import './App.scss';
import { Navigation } from './Components'; 
import { Contacts, Tasks, Comments } from './Container';


function App() {

  const [currentUI, setCurrentUI] = useState('Contacts');
  const getCurrentUI = (ui) =>
  {
    setCurrentUI(ui);
  }

  return (
    <div className="app app__flex">

      <Navigation uiHandler = {getCurrentUI}/>

      {currentUI === 'Contacts' &&  <Contacts/>}
      {currentUI === 'Tasks' &&  <Tasks/>}
      {currentUI === 'Comments' &&  <Comments/>}

      
   
    </div>
  );

}

export default App;
