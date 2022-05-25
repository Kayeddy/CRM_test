import { React, useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';


import './Nav.scss';

const Nav = () => {

    const [active, setActive] = useState('Contacts');


  return (
    <div className='app__navigation'>
        <ul>
            {
                [{name: 'Contacts', icon: <RiIcons.RiContactsFill /> }, {name: 'Tasks', icon: <FaIcons.FaTasks />}, {name: 'Comments', icon: <FaIcons.FaComments /> }].map((listItem, index) => (
                    <li key={index} onClick = { () => setActive(listItem.name)}>
                        <a href="#"> 
                            <span className= { active === listItem.name ? 'navigation__icon-active' : 'app__navigation-icon' }>
                                { listItem.icon }
                            </span>

                            <span className= { active === listItem.name ? 'navigation__list-item-active' : 'app__navigation-list-item' }>
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