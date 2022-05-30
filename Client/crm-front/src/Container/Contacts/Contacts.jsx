import { React, useState, useEffect} from 'react';
import Axios from 'axios';
import { ContactModal } from '../../Components';



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
      console.log(res.data);
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
      type_of_contact: contactData.contact_type !== '' ? contactData.type_of_contact : selectedContact.type_of_contact, 
      origin: contactData.contact_origin !== '' ? contactData.origin : selectedContact.origin 
    };

    if(operationType === 'edit')
    {
      Axios.put(`http://localhost:3001/editContact/${selectedContact._id}`, contact).then(res => console.log(res + ' Contact edition succesful')).catch(e => console.log(e));
    }
    else if (operationType === 'create')
    {
      Axios.post('http://localhost:3001/createContact', contact).then(res => console.log(res + ' Contact created'));
    }
    else
    {
      Axios.delete(`http://localhost:3001/deleteContact/${contactData._id}`, contact).then(res => console.log(res + ' Contact deleted succesfully')).catch(e => console.log(e));
    }

  }

  const searchContacts = (e) => {
    const { name, value } = e.target;

    setFilteredContactList(contactList.filter((contact) => { 
      return contact.first_name.toLowerCase().includes(value.toLowerCase());
    }));

  }

  return (
    <div className='app__contacts'>

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
                            <div className='contact__information'>
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
        
    </div>
  )
}

export default Contacts