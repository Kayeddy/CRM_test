import { React, useState } from 'react';
import './TaskModal.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/src/stylesheets/datepicker.scss";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const TaskModal = ({ modalType, closeModal, saveChanges, data}) => {

  const [taskRequired, setTaskRequired] = useState(false);
  const [pickedDate, setPickedDate] = useState(new Date())

  const changeRequired = (option) => {
    option ? setTaskRequired(true) : setTaskRequired(false);
  }

  return (

    <div className='app__taskModal'> 

      <div className='app__taskModal-content'>

        <div className='app__taskModal-header'>
          <h1 className='p-text'> Task information </h1>
        </div>

        <div className='app__taskModal-body'>

          <form  div className='app__taskModal-form app__flex'>
              
              <div className='app__flex'>
                <input type="text" className='p-text task__input-field' placeholder='Task title' name= 'title' value={ data.title}/>
              </div>

              <div className='app__flex'>
                <input type="text" className='p-text task__input-field' placeholder='Responsible' name= 'responsible' value={ data.responsible} />
              </div>

              <div className='app__flex taskModal__date-section'>
                <p className='p-text'> Current end date is: </p>
                <p className='p-text'> { data.end_date } </p>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Basic example"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
              </div>

              <fieldset>
                  <legend className='p-text'> Is this task required? </legend>
                  <div>
                  <label>
                    <input
                      type="radio"
                      value="Yes"
                      checked={ taskRequired === true }
                      onChange={() => changeRequired(true)}
                    />
                    Yes
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="radio"
                      value="No"
                      checked={ taskRequired === false }
                      onChange={() => changeRequired(false)}
                    />
                    No
                  </label>
                </div>

              </fieldset>
              
          </form>

        </div>

        <div className='app__taskModal-footer'>
          
          <button className='app_taskModal-cancel-btn' onClick={() => closeModal(false)}>
            Cancel
          </button>

          <button className='app__taskModal-save-btn' onClick={() => { closeModal(false) }}>
            Save
          </button>

        </div>

      </div>
    </div>
  )
}

export default TaskModal;