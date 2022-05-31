import { React, useState, useEffect } from 'react';
import Axios from 'axios';
import { CommentModal } from '../../Components';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { motion } from 'framer-motion';


import './Comments.scss';

const Comments = () => {
  const [commentList, setcommentList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState([]);
  const [selectedComment, setSelectedComment] = useState([]);


  useEffect(() => {

    Axios.get('http://localhost:3001/getContacts').then(res => {
      setContactList(res.data);
    });

    Axios.get(`http://localhost:3001/getComments`).then(res => {
      setcommentList(res.data);
    });
    

  }, []);

  const fetchcontactcomments = () => {
  
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
  const manageComment = (commentData, operationType) => {

    const comment = {
      content: commentData.content, 
      recipient: selectedContact._id,
      delivery_date: commentData.delivery_date,
    };
    

    if(operationType === 'edit')
    {
      Axios.put(`http://localhost:3001/editComment/${selectedComment._id}`, comment).then(res => handleNotifications('success', 'Comment updated')).catch(e => handleNotifications('error', `Couldn't update comment \n ${e}`));
    }
    else if (operationType === 'create')
    {
      Axios.post('http://localhost:3001/createComment', comment).then(res => handleNotifications('success', 'Comment created succesfully')).catch(e => handleNotifications('error', `Couldn't create comment \n ${e}`));
    }
    else
    {
      Axios.delete(`http://localhost:3001/deleteComment/${commentData._id}`, comment).then(res => handleNotifications('success', 'Comment deleted succesfully')).catch(e => handleNotifications('error', `Couldn't delete comment \n ${e}`));
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
            <b> Type of: </b> { contact.type_of_contact } 
            <br></br>
            <br></br>
            <b> Origin: </b> { contact.origin } 
          </i>,
    });
  }

  return (
    <motion.div
     className='app__comments'
     whileInView={{ x: [100, 0], opacity: [0, 1] }}
     transition= {{ duration: 0.5 }}
     >

      {
        editMode || createMode ? 
        <CommentModal closeEdit= { setEditMode } 
        closeCreate = { setCreateMode } 
        data = { selectedComment } 
        modalType = { getModalType() } 
        commentDetails = { manageComment } />

        : 
        <>
          <h2 className='p-text'> Comments </h2>
          <div className='app__comments-info-section'>

            <div className='app__comments-panel'>
              {
                  contactList.map( (item, index) => (
                    <div key={index} className= 'app__comment-detailed-info'>

                      <div className='comment__information' onClick= { () => showContactDetails(item) } style= {{ cursor: 'pointer' }}>
                        <h4> <b> Recipient: </b> { `${item.first_name} ${item.last_name}` }   </h4>
                      </div>

                      <div className='app__contact-individual-comment'>
                        <div className= 'comment__add-btn-container'>
                          <button className='app__comment-add-btn' onClick={() => { setCreateMode(true); setSelectedContact(item) }}>
                            <IoIcons.IoIosAddCircle />
                          </button>
                        </div>
                          {

                            commentList.map((comment, index) => (

                              comment.recipient === item._id ? 
                              <div className= 'contact__comment-details' key = {`comment-${index}`}>
                                    
                                <p> { comment.content} </p>
                                <p className= 'comment__delivery-date'> <b>Sent on:</b> { comment.delivery_date} </p>

                                <div className='app__comment-icons'>
                                  <AiIcons.AiFillEdit onClick={() => { setSelectedComment(comment); setSelectedContact(item); setEditMode(true); }} /> <MdIcons.MdDelete  onClick={() => { manageComment(comment, 'delete') }} />
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

export default Comments;