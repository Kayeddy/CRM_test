import { React, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './TaskModal.scss';


const TaskModal = ({ modalType, closeCreate, closeEdit, taskDetails, data}) => {

  const [formData, setFormData] = useState({title: '', end_date: '', summary_required: ''});

  const handleDataInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  }


  const manageSubmission = () => {
    if (formData.title !== '' && formData.end_date !== '' && formData.summary_required !== '') {
      taskDetails(formData, 'create') 
      closeCreate(false) 
    }
     
    else {
      handleNotifications('notice', 'Please fill out the form completely before you can continue');
    }
  }

  const handleNotifications = async( type, message ) => {
      const MySwal = withReactContent(Swal)

      await MySwal.fire({
        title: <strong> { type === 'notice' ? 'Heads up!' : type === 'success' ? 'Nice!' : 'Oops...' } </strong>,
        html: <i> { message } </i>,
        icon: type === 'notice' ? 'info' : type === 'success' ? 'success' : 'error'
    });
  }
  
  return (

    <div className='app__taskModal'> 

      <div className='app__taskModal-content'>

        {
          modalType === 'edit'? 
          <>
            <div className='app__taskModal-header'>
              <h1 className='p-text'> Edit task </h1>
            </div>

            <div className='app__taskModal-body'>

              <form  div className='app__taskModal-form app__flex'>
                  
                  <div className='app__flex'>
                    <p className='p-text'> Task title </p>
                    <input type="text" className='p-text task__input-field' placeholder='Task title' name= 'title' defaultValue= {data.title} onChange= {handleDataInput}/>
                  </div>

                  <div className='app__flex taskModal__date-section'>
                    <p className='p-text'> Current end date is: </p>
                    <p className='p-text'> { data.end_date } </p>
                    <br /> 
                    <p className='p-text'> Select a new date </p>
                    <input type= 'date' placeholder="dd-mm-yyyy" className='taskModal__calendar' name= 'end_date' onChange={ handleDataInput } />

                  </div>

                  <fieldset>
                      <legend className='p-text'> Is this task required? </legend>
                      <div>
                      <label>
                        <input
                          type="radio"
                          name= "summary_required"
                          value= {true}
                          onChange={ handleDataInput}
                        />
                        Yes
                      </label>
                    </div>

                    <div>
                      <label>
                        <input
                          type="radio"
                          name= "summary_required"
                          value= {false}
                          onChange={ handleDataInput}
                        />
                        No
                      </label>
                    </div>

                  </fieldset>
                  
              </form>

            </div>

            <div className='app__taskModal-footer'>
              
              <button className='app_taskModal-cancel-btn' onClick={() => closeEdit(false)}>
                Cancel
              </button>

              <button className='app__taskModal-save-btn' onClick={() => { taskDetails(formData, 'edit'); closeEdit(false) }}>
                Save
              </button>

            </div>
          </>
          :
          <>
            <div className='app__taskModal-header'>
              <h1 className='p-text'> Create task </h1>
            </div>

            <div className='app__taskModal-body'>

              <form  div className='app__taskModal-form app__flex'>
                  
                  <div className='app__flex'>
                    <input type="text" className='p-text task__input-field' placeholder='Task title' name= 'title' onChange= {handleDataInput}/>
                  </div>

                  <div className='app__flex taskModal__date-section'>
                    <p className='p-text'> Select end date </p>
                    <input type= 'date' placeholder="dd-mm-yyyy" className='taskModal__calendar' name= 'end_date' onChange={ handleDataInput }/>

                  </div>

                  <fieldset>
                      <legend className='p-text'> Is a summary of this task required? </legend>
                      <div>
                      <label>
                        <input
                          type="radio"
                          name= "summary_required"
                          value= {true}
                          onChange={ handleDataInput}
                        />
                        Yes
                      </label>
                    </div>

                    <div>
                      <label>
                        <input
                          type="radio"
                          name= "summary_required"
                          value= {false}
                          onChange={handleDataInput}
                        />
                        No
                      </label>
                    </div>

                  </fieldset>
                  
              </form>

            </div>

            <div className='app__taskModal-footer'>
              
              <button className='app_taskModal-cancel-btn' onClick={() => closeCreate(false)}>
                Cancel
              </button>

              <button className='app__taskModal-save-btn' onClick={ manageSubmission } >
                Create
              </button>

            </div>
          </>
        }
        

      </div>
    </div>
  )
}

export default TaskModal;