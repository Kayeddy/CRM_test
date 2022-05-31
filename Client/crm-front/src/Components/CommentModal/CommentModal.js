import { React, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './CommentModal.scss';


const CommentModal = ({ modalType, closeCreate, closeEdit, commentDetails, data}) => {

  const [formData, setFormData] = useState({delivery_date: new Date(), content: ''});
  const [formFilled, setFormFilled] = useState(false);

  const handleDataInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }


  const manageSubmission = () => {
    if (formData.content !== ''  ) {
      commentDetails(formData, 'create') 
      closeCreate(false) 
    }
     
    else {
      handleNotifications('notice', 'Please type a comment before posting');
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

    <div className='app__commentModal'> 

      <div className='app__commentModal-content'>

        {
          modalType === 'edit'? 
          <>
            <div className='app__commentModal-header'>
              <h1 className='p-text'> Edit comment </h1>
            </div>

            <div className='app__commentModal-body'>

              <form  div className='app__commentModal-form app__flex'>
                  
                  <div className='app__flex'>
                    <p className='p-text'> commentary </p>
                    <textarea type="text" className='p-text comment__input-field' placeholder='Type comment here...' name= 'content' defaultValue= {data.content} onChange= {handleDataInput}/>
                  </div>
                  
              </form>

            </div>

            <div className='app__commentModal-footer'>
              
              <button className='app_commentModal-cancel-btn' onClick={() => closeEdit(false)}>
                Cancel
              </button>

              <button className='app__commentModal-save-btn' onClick={() => { commentDetails(formData, 'edit'); closeEdit(false) }}>
                Update
              </button>

            </div>
          </>
          :
          <>
            <div className='app__commentModal-header'>
              <h1 className='p-text'> Create comment </h1>
            </div>

            <div className='app__commentModal-body'>

              <form  div className='app__commentModal-form app__flex'>
                  
                <div className='app__flex'>
                  <p className='p-text'> Message:  </p>
                  <textarea type="text" className='p-text comment__input-field' placeholder='Type comment here...' name= 'content'  onChange= {handleDataInput}/>
                </div>

              </form>

            </div>

            <div className='app__commentModal-footer'>
              
              <button className='app_commentModal-cancel-btn' onClick={() => closeCreate(false)}>
                Cancel
              </button>

              <button className='app__commentModal-save-btn' onClick={ manageSubmission } >
                Post
              </button>

            </div>
          </>
        }
        

      </div>
    </div>
  )
}

export default CommentModal;