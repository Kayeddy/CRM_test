import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

import './Tasks.scss' 

const Tasks = () => {

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {

    Axios.get('http://localhost:3001/getTasks').then(res => {
      setTaskList(res.data);
      console.log(res.data);
    });

  }, [])
  
  return (
    <div className='app__tasks'>
        <h2 className='p-text'> Tasks </h2>

        <div className='app__tasks-info-section'>

          <div className='app__tasks-panel'>
            {
                taskList.map( (item, index) => (
                  <div key={index} className= 'app__task-detailed-info'>
                    <h4 className=''> { item.title } <span className='app__task-icons'> <AiIcons.AiFillEdit /> <MdIcons.MdDelete /></span>  </h4>
                    <p className=''> Responsible: { item.responsible } </p>
                    <p className=''> end_date: { item.end_date } </p>
                    <p className=''> requires summary: { JSON.stringify(item.summary_required) === 'true' ? 'Yes' : 'No'} </p>
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
    </div>
  )
}

export default Tasks