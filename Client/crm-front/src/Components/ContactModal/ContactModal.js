import { React, useState } from 'react';
import './ContactModal.scss';


const ContactModal = ({ modalType, closeCreate, closeEdit, contactDetails, data }) => {

  const [pickedDate, setPickedDate] = useState(new Date());
  const [formData, setFormData] = useState({first_name: '', middle_name: '', last_name: '', email: '', phone_number: '', birth_date: pickedDate, address: '', contact_type: '', contact_origin: '' });

  const handleDataInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

  }


  return (

    <div className='app__contactModal'> 

      <div className='app__contactModal-content'>

        {
          modalType === 'edit'? 
          <>
            <div className='app__contactModal-header'>
              <h1 className='p-text'> Edit Contact </h1>
            </div>

            <div className='app__contactModal-body'>

              <form  div className='app__contactModal-form app__flex'>
                  
                  <div className='app__flex'>
                    <p className='p-text'> First name </p>
                    <input type="text" className='p-text contact__input-field' placeholder= { data.first_name } name= 'first_name' onChange= {handleDataInput} />
                  </div>

                  <div className='app__flex'>
                    <p className='p-text'> Middle name </p>
                    <input type="text" className='p-text contact__input-field' placeholder= { data.middle_name } name= 'middle_name' onChange= {handleDataInput} />
                  </div>

                  <div className='app__flex'>
                    <p className='p-text'> Last name </p>
                    <input type="text" className='p-text contact__input-field' placeholder= { data.last_name } name= 'last_name' onChange= {handleDataInput} />
                  </div>

                  <div className='app__flex'>
                    <p className='p-text'> Email </p>
                    <input type="text" className='p-text contact__input-field' placeholder= { data.email } name= 'email' onChange= {handleDataInput} />
                  </div>

                  <div className='app__flex'>
                    <p className='p-text'> Phone number </p>
                    <input type="tel" className='p-text contact__input-field' placeholder= { data.phone_number } name= 'phone_number' onChange= {handleDataInput} />
                  </div>

                  <div className='app__flex contactModal__date-section'>
                    <p className='p-text'> Select a new Birthdate </p>
                    <input type= 'date' name='birth_date' placeholder="dd-mm-yyyy" className='contactModal__calendar' onChange={ date => setPickedDate(new Date(date.target.value).toISOString()) } />
                  </div>

                  <div className='app__flex'>
                    <p className='p-text'> Address </p>
                    <input type="text" className='p-text contact__input-field' placeholder= { data.address } name= 'address' onChange= {handleDataInput} />
                  </div>

                  <div className='app__flex contactModal__contactType-section'>
                    <label for="clientType" className='p-text'> Type of Contact </label>

                    <select name="contact_type" onChange= {handleDataInput}>
                      <option value="none" selected disabled hidden></option>
                      <option value="Client"> Client </option>
                      <option value="Co-worker"> Co-worker </option>
                      <option value="Admin"> Admin </option>
                    </select>
                  </div>

                  <div className='app__flex contactModal__contactOrigin-section'>
                    <label for="contactOrigin" className='p-text'> Origin </label>

                    <select name="contact_origin" onChange= {handleDataInput}>
                      <option value="none" selected disabled hidden></option>
                      <option value="Landing page"> Landing page </option>
                      <option value="Social media"> Social media </option>
                      <option value="Other sources"> Other sources </option>
                    </select>
                  </div>
                  
              </form>

            </div>

            <div className='app__contactModal-footer'>
              
              <button className='app_contactModal-cancel-btn' onClick={() => closeEdit(false)}>
                Cancel
              </button>

              <button className='app__contactModal-save-btn' onClick={() => { console.info(formData) }}>
                Save
              </button>

            </div>
          </>
          :
          <>
            <div className='app__contactModal-header'>
              <h1 className='p-text'> Edit Contact </h1>
            </div>

            <div className='app__contactModal-body'>

              <form  div className='app__contactModal-form app__flex'>
                  
                  <div className='app__flex'>
                  <p className='p-text'> First name </p>
                    <input type="text" className='p-text contact__input-field' placeholder= 'First name' name= 'first_name' onChange= {handleDataInput} required/>
                  </div>

                  <div className='app__flex'>
                  <p className='p-text'> Middle name </p>
                    <input type="text" className='p-text contact__input-field' placeholder= 'Middle name' name= 'middle_name' onChange= {handleDataInput} required/>
                  </div>

                  <div className='app__flex'>
                  <p className='p-text'> Last name </p>
                    <input type="text" className='p-text contact__input-field' placeholder= 'Last name' name= 'last_name' onChange= {handleDataInput} required/>
                  </div>

                  <div className='app__flex'>
                  <p className='p-text'> Email </p>
                    <input type="text" className='p-text contact__input-field' placeholder= 'Email' name= 'email' onChange= {handleDataInput} required/>
                  </div>

                  <div className='app__flex'>
                  <p className='p-text'> Phone number </p>
                    <input type="tel" className='p-text contact__input-field' placeholder= 'Phone' name= 'phone_number' onChange= {handleDataInput} required/>
                  </div>

                  <div className='app__flex contactModal__date-section'>
                    <p className='p-text'> Select a new Birthdate </p>
                    <input type= 'date' name='birth_date' placeholder="dd-mm-yyyy" className='contactModal__calendar' onChange={ date => setPickedDate(new Date(date.target.value).toISOString()) } required/>
                  </div>

                  <div className='app__flex'>
                  <p className='p-text'> Address </p>
                    <input type="text" className='p-text contact__input-field' placeholder= 'Address' name= 'address' onChange= {handleDataInput} required/>
                  </div>

                  <div className='app__flex contactModal__contactType-section'>
                    <label for="clientType" className='p-text'> Type of Contact </label>

                    <select name="contact_type" onChange= {handleDataInput} required>
                      <option value="none" selected disabled hidden></option>
                      <option value="Client"> Client </option>
                      <option value="Co-worker"> Co-worker </option>
                      <option value="Admin"> Admin </option>
                    </select>
                  </div>

                  <div className='app__flex contactModal__contactOrigin-section'>
                    <label for="contactOrigin" className='p-text'> Origin </label>

                    <select name="contact_origin" onChange= {handleDataInput} required>
                      <option value="none" selected disabled hidden></option>
                      <option value="Landing page"> Landing page </option>
                      <option value="Social media"> Social media </option>
                      <option value="Other sources"> Other sources </option>
                    </select>
                  </div>
                  
              </form>

            </div>

            <div className='app__contactModal-footer'>
              
              <button className='app_contactModal-cancel-btn' onClick={() => closeCreate(false)}>
                Cancel
              </button>

              <button className='app__contactModal-save-btn' onClick={() => { contactDetails(formData, 'create'); closeCreate(false)}}>
                Create
              </button>

            </div>
          </>
        }
        

      </div>
    </div>
  )
}

export default ContactModal;