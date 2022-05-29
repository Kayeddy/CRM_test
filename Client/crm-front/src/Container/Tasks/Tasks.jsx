import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { TaskModal } from '../../Components';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

import './Tasks.scss' 

const Tasks = () => {

  const [taskList, setTaskList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [selectedContact, setSelectedTask] = useState([]);

  useEffect(() => {

    Axios.get('http://localhost:3001/getTasks').then(res => {
      setTaskList(res.data);
      console.log(res.data);
    });

  }, []);

  const saveChanges = () => {

  }

  const getModalType = () => {
    if(editMode)
      return 'edit';
    else if(createMode)
      return 'create';
  }

  return (
    <div className='app__tasks'>

      {
        editMode || createMode ? 
        <TaskModal closeEdit= { setEditMode } closeCreate = { setCreateMode } saveChanges= { saveChanges } data = { selectedContact } modalType = { getModalType() } />

        : 
        <>
          <h2 className='p-text'> Tasks </h2>
          <div className='app__tasks-info-section'>

            <div className='app__tasks-panel'>
              {
                  taskList.map( (item, index) => (
                    <div key={index} className= 'app__task-detailed-info'>
                      <div className='task__information'>
                        <h4> { item.title }   </h4>
                        <p> Responsible: { item.responsible } </p>
                        <p> End_date: { item.end_date } </p>
                        <p> Requires summary: { JSON.stringify(item.summary_required) === 'true' ? 'Yes' : 'No'} </p>
                      </div>

                      <div className='app__task-icons'>
                        <AiIcons.AiFillEdit onClick={() => { setSelectedTask(item); setEditMode(true); }}/> <MdIcons.MdDelete />
                      </div>

                    </div>
                  ))
                }
            </div>

            <div>
              <button className='app__task-add-btn' onClick={() => setCreateMode(true)}>
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