import React from 'react';

import './Contacts.scss';

import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';


const Contacts = () => {
  return (
    <div className='app__contacts'>
        <h2 className='p-text'> Client list </h2>

        <div className='app__contacts-info-section'>

          <div className='app__contacts-panel'>
            {
              [{ name: 'Mike Wolfenstein', age: 24 }, { name: 'Andrew Serrano', age: 21 }, { name: 'Carlos Windsenberg', age: 28 }].map( (item, index) => (
                <div key={index} className= 'app__contact-detailed-info'>
                    <h4 className=''> { item.name } <span className='app__contact-icons'> <AiIcons.AiFillEdit /> <MdIcons.MdDelete /></span>  </h4>
                    <p className=''> Age : { item.age } </p>
                </div>
              ))
            }
          </div>
          
        </div>
    </div>
  )
}

export default Contacts