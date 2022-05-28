import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { TaskModal } from '../../Components';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

import './Tasks.scss' 

const Tasks = () => {

  const [taskList, setTaskList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState([])

  useEffect(() => {

    Axios.get('http://localhost:3001/getTasks').then(res => {
      setTaskList(res.data);
      console.log(res.data);
    });

  }, [])

  const saveChanges = () => {

  }

  return (
    <div className='app__tasks'>

      {
        editMode ? 
        <TaskModal closeModal= { setEditMode } saveChanges= { saveChanges } data = { selectedContact } />

        : 
        <>
            <h2 className='p-text'> Tasks </h2>
        <div className='app__tasks-info-section'>

        <div className='app__tasks-panel'>
          {
              taskList.map( (item, index) => (
                <div key={index} className= 'app__task-detailed-info'>
                  <h4> { item.title } <span className='app__task-icons'> <AiIcons.AiFillEdit onClick={() => { setSelectedContact(item); setEditMode(true); }}/> <MdIcons.MdDelete /></span>  </h4>
                  <p> Responsible: { item.responsible } </p>
                  <p> end_date: { item.end_date } </p>
                  <p> requires summary: { JSON.stringify(item.summary_required) === 'true' ? 'Yes' : 'No'} </p>
                </div>
              ))
            }
        </div>

        <div>
          <button className='app__task-add-btn'>
              new task
          </button>
        </div>
   
      </div>
        </>
      
      }
    
    </div>
  )
}

export default Tasks