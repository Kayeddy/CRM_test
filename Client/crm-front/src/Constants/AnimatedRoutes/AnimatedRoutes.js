import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Contacts, Tasks, Comments } from '../../Container';

import { AnimatePresence, motion } from 'framer-motion';

const AnimatedRoutes = () => {

  const location= useLocation();

  return (
    <AnimatePresence>

      <Routes location={ location } key={ location.pathname }>

        <Route path='/contacts' element= { <Contacts /> } />
        <Route path='/tasks' element= { <Tasks /> } />
        <Route path='/comments' element= { <Comments /> } />

      </Routes>
      
    </AnimatePresence>
 
  )
}

export default AnimatedRoutes;