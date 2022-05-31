import { React, useState, useEffect} from 'react';
import Axios from 'axios';
import { ContactModal } from '../../Components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion } from 'framer-motion';


import './Contacts.scss';

import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';


const Contacts = () => {

  const [contactList, setContactList] = useState([]);
  const[filteredContactList, setFilteredContactList] = useState(null);
  const [selectedContact, setSelectedContact] = useState([]);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  

  useEffect(() => {

    getContacts();

  }, []);


  const getModalType = () => {
    if(editMode)
      return 'edit';
    else if(createMode)
      return 'create';
  }

  const getContacts = () => {
    Axios.get('http://localhost:3001/getContacts').then(res => {
      setContactList(res.data);
    });
  }

  const handleNotifications = async( type, message ) => {
      const MySwal = withReactContent(Swal)

      await MySwal.fire({
        title: <strong> { type === 'notice' ? 'Heads up!' : type === 'success' ? 'Nice!' : 'Oops...' } </strong>,
        html: <i> { message } </i>,
        icon: type === 'notice' ? 'info' : type === 'success' ? 'success' : 'error'
    });
  }

  const manageContact = (contactData, operationType) => {

    const contact = {
      first_name: contactData.first_name !== '' ? contactData.first_name : selectedContact.first_name, 
      middle_name: contactData.middle_name !== '' ? contactData.middle_name : selectedContact.middle_name, 
      last_name: contactData.last_name !== '' ? contactData.last_name : selectedContact.last_name,
      email: contactData.email !== '' ? contactData.email : selectedContact.email, 
      phone_number: contactData.phone_number !== '' ? contactData.phone_number : selectedContact.phone_number, 
      birth_date: contactData.birth_date !== '' ? contactData.birth_date : selectedContact.birth_date, 
      address: contactData.address !== '' ? contactData.address : selectedContact.address, 
      type_of_contact: contactData.contact_type !== '' ? contactData.contact_type : selectedContact.type_of_contact, 
      origin: contactData.contact_origin !== '' ? contactData.contact_origin : selectedContact.origin 
    };

    if(operationType === 'edit')
    {
      Axios.put(`http://localhost:3001/editContact/${selectedContact._id}`, contact).then(res => handleNotifications('success', 'Contact was edited succesfully')).catch(e => handleNotifications('error', `Couldn't edit contact \n ${e}`));
    }
    else if (operationType === 'create')
    {
      Axios.post('http://localhost:3001/createContact', contact).then(res => handleNotifications('success', 'Contact was created succesfully')).catch(e => handleNotifications('error', `Couldn't create contact \n ${e}`));
    }
    else
    {
      Axios.delete(`http://localhost:3001/deleteContact/${contactData._id}`, contact).then(res => handleNotifications('success', 'Contact was deleted succesfully')).catch(e => handleNotifications('error', `Couldn't delete contact \n ${e}`));
    }

  }

  const searchContacts = (e) => {
    const { name, value } = e.target;

    setFilteredContactList(contactList.filter((contact) => { 
      return contact.first_name.toLowerCase().includes(value.toLowerCase());
    }));

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
    <motion.div className='app__contacts'
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition= {{ duration: 0.5 }}
    >

      {
         editMode || createMode ? 
         <ContactModal 
            closeEdit= { setEditMode } 
            closeCreate = { setCreateMode } 
            data = { selectedContact } 
            modalType = { getModalType() } 
            contactDetails = { manageContact }
          />

         :

         <>
          <h2 className='p-text'> Contact list </h2>

            <div className='app__contacts-info-section'>

              <div className= 'app__contact-input-field'>
              <input type="text" className='p-text contact__input-field' placeholder= 'Search...' onChange = { searchContacts }/>
              </div>

              <div className='app__contact-panel'>
                    {
                      filteredContactList === null ? 

                        contactList.map( (item, index) => (
                          <div key={item._id} className= 'app__contact-detailed-info'>
                            <div className='contact__information' onClick= { () => showContactDetails(item) } style= {{ cursor: 'pointer' }}>
                              <p> { `${item.first_name}  ${item.last_name}` } </p>
                              <p> { item.phone_number } </p>
                            </div>

                            <div className='app__contact-icons'>
                              <AiIcons.AiFillEdit onClick={() => { setSelectedContact(item); setEditMode(true); }} /> <MdIcons.MdDelete  onClick={() => { manageContact(item, 'delete') }} />
                            </div>

                          </div>
                        ))

                        :

                        filteredContactList.map( (item, index) => (
                          <div key={item._id} className= 'app__contact-detailed-info'>
                            <div className='contact__information'>
                              <p> { `${item.first_name}  ${item.last_name}` } </p>
                              <p> { item.phone_number } </p>
                            </div>

                            <div className='app__contact-icons'>
                              <AiIcons.AiFillEdit onClick={() => { setSelectedContact(item); setEditMode(true); }} /> <MdIcons.MdDelete  onClick={() => { manageContact(item, 'delete') }} />
                            </div>

                          </div>
                        ))

                      }
                  </div>

              <div>
                  <button className='app__contact-add-btn' onClick={() => setCreateMode(true)}>
                      Add contact
                  </button>
                </div>
              
            </div>
         </>
      }
        
    </motion.div>
  )
}

export default Contacts