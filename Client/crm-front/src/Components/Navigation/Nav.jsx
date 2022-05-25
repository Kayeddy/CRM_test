import { React, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

import './Nav.scss';

const Nav = () => {
  return (
    <div className='app__navigation'>
        <ul>
            {
                [{name: 'Contacts', icon: <AiIcons.AiFillHome /> }, {name: 'Tasks', icon: <FaIcons.FaTasks />}, {name: 'Comments', icon: <FaIcons.FaComments /> }].map((listItem) => (
                    <li key={listItem}>
                        <a href=""> 
                            <span className='app__navigation-icon'>
                                { listItem.icon }
                            </span>

                            <span className='app__navigation-list-item'>
                                 { listItem.name } 
                            </span>
                        </a>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default Nav