import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { TaskModal } from '../../Components';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';



import './Tasks.scss' 

const Tasks = () => {

  const [taskList, setTaskList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);


  useEffect(() => {

    Axios.get('http://localhost:3001/getContacts').then(res => {
      setContactList(res.data);
    });

    Axios.get(`http://localhost:3001/getTasks`).then(res => {
      setTaskList(res.data);
    });
    

  }, []);

  const fetchcontactTasks = () => {
  
  }

  const getModalType = () => {
    if(editMode)
      return 'edit';
    else if(createMode)
      return 'create';
  }

  const manageTask = (taskData, operationType) => {

    const task = {
      title: taskData.title, 
      responsible: `${selectedContact.first_name} ${selectedContact.last_name}`, 
      responsible_id: selectedContact._id, 
      end_date: taskData.end_date !== '' ? taskData.end_date : selectedTask.end_date, 
      summary_required: taskData.summary_required !== '' ? taskData.summary_required : selectedTask.summary_required,
    };

    if(operationType === 'edit')
    {
      Axios.put(`http://localhost:3001/editTask/${selectedTask._id}`, task).then(res => console.log(res + ' Task edition succesful')).catch(e => console.log(e));
    }
    else if (operationType === 'create')
    {
      Axios.post('http://localhost:3001/createTask', task).then(res => console.log(res + ' Task created'));
    }
    else
    {
      Axios.delete(`http://localhost:3001/deleteTask/${selectedTask._id}`, task).then(res => console.log(res + ' Task deleted succesfully')).catch(e => console.log(e));
    }


  }

  return (
    <div className='app__tasks'>

      {
        editMode || createMode ? 
        <TaskModal closeEdit= { setEditMode } 
        closeCreate = { setCreateMode } 
        data = { selectedTask } 
        modalType = { getModalType() } 
        taskDetails = { manageTask } />

        : 
        <>
          <h2 className='p-text'> Tasks </h2>
          <div className='app__tasks-info-section'>

            <div className='app__tasks-panel'>
              {
                  contactList.map( (item, index) => (
                    <div key={index} className= 'app__task-detailed-info'>

                      <div className='task__information'>
                        <h4> <b> Responsible: </b> { `${item.first_name} ${item.last_name}` }   </h4>
                      </div>

                      <div className='app__contact-individual-task'>
                        <div className= 'task__add-btn-container'>
                          <button className='app__task-add-btn' onClick={() => { setCreateMode(true); setSelectedContact(item) }}>
                            <IoIcons.IoIosAddCircle />
                          </button>
                        </div>
                          {

                            taskList.map((task, index) => (

                              task.responsible_id === item._id ? 
                              <div className= 'contact__task-details' key = {`task-${index}`}>
                                    
                                <h4> { task.title }   </h4>
                                <p> End_date: { task.end_date } </p>
                                <p> Requires summary: { JSON.stringify(task.summary_required) === 'true' ? 'Yes' : 'No'} </p>

                                <div className='app__task-icons'>
                                  <AiIcons.AiFillEdit onClick={() => { setSelectedTask(task); setSelectedContact(item); setEditMode(true); }} /> <MdIcons.MdDelete  onClick={() => { manageTask(item, 'delete') }} />
                                </div>

                              </div>

                              : null
                            ))
                             
                          }
                 
                      </div>

                    </div>
                  ))
                }
            </div>

          </div>
        </>
      
      }
    
    </div>
  )
}

export default Tasks