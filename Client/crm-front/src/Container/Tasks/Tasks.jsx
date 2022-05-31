import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { TaskModal } from '../../Components';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion } from 'framer-motion';




import './Tasks.scss';

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

  const handleNotifications = async( type, message ) => {
      const MySwal = withReactContent(Swal)

      await MySwal.fire({
        title: <strong> { type === 'notice' ? 'Heads up!' : type === 'success' ? 'Nice!' : 'Oops...' } </strong>,
        html: <i> { message } </i>,
        icon: type === 'notice' ? 'info' : type === 'success' ? 'success' : 'error'
    });
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
      Axios.put(`http://localhost:3001/editTask/${selectedTask._id}`, task).then(res => handleNotifications('success', 'Task edited succesfully')).catch(e => handleNotifications('error', `Couldn't edit task \n ${e}`));
    }
    else if (operationType === 'create')
    {
      Axios.post('http://localhost:3001/createTask', task).then(res => handleNotifications('success', 'Task created succesfully')).catch(e => handleNotifications('error', `Couldn't create task \n ${e}`));
    }
    else
    {
      Axios.delete(`http://localhost:3001/deleteTask/${taskData._id}`, task).then(res => handleNotifications('success', 'Task deleted succesfully')).catch(e => handleNotifications('error', `Couldn't delete task \n ${e}`));
    }


  }

  const showContactDetails = async(contact) => {
    const MySwal = withReactContent(Swal)

      await MySwal.fire({
        title: <strong> Contact details </strong>,
        html: 
          <i>
            <b> First name: </b> { contact.first_name } 
            <br></br>
            <br></br>
            <b> Middle name: </b> { contact.middle_name } 
            <br></br>
            <br></br>
            <b> Last name: </b> { contact.last_name } 
            <br></br>
            <br></br>
            <b> Email: </b> { contact.email } 
            <br></br>
            <br></br>
            <b> phone number: </b> { contact.phone_number } 
            <br></br>
            <br></br>
            <b> Birthdate: </b> { contact.birth_date } 
            <br></br>
            <br></br>
            <b> Address: </b> { contact.address } 
            <br></br>
            <br></br>
            <b> Type of contact: </b> { contact.type_of_contact } 
            <br></br>
            <br></br>
            <b> Origin: </b> { contact.origin } 
          </i>,
    });
  }

  return (
    <motion.div className='app__tasks'
      whileInView={{ y: [-100, 0], opacity: [0, 1] }}
      transition= {{ duration: 0.5 }}
    >

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

                      <div className='task__information' onClick= { () => showContactDetails(item) } style= {{ cursor: 'pointer' }}>
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
                                  <AiIcons.AiFillEdit onClick={() => { setSelectedTask(task); setSelectedContact(item); setEditMode(true); }} /> <MdIcons.MdDelete  onClick={() => { manageTask(task, 'delete') }} />
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
    
    </motion.div>
  )
}

export default Tasks