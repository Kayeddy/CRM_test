import React from 'react';

import './Contacts.scss';

const Contacts = () => {
  return (
    <div className='app__contacts'>
        <h2 className='p-text'> Client list </h2>

        <div className='app__contacts-info-section'>

          <div className='app__contacts-panel'>
            {
              [{ name: 'Mike', age: 24 }, { name: 'Andrew', age: 21 }, { name: 'Carlos', age: 28 }].map( (item, index) => (
                <div key={index} className= 'app__contact-detailed-info'>
                    <h4> This client's name is { item.name } </h4>
                    <p> His age is: { item.age } </p>
                </div>
              ))
            }
          </div>
          
        </div>
    </div>
  )
}

export default Contacts