import React, { useEffect, useState } from 'react';
import {ActivityDashboard} from '../../features/activities/dashboard/ActivityDashboard';


import axios from 'axios'
import { Icon, List, ListHeader, Container } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import { Activity } from '../models/activities';

function App() {
const [activities, setActivities] = useState<Activity[]>([]);

useEffect(() => {
  axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    setActivities(response.data);
  })

}, [])

  return (
    <>
      <NavBar></NavBar>
      
        <Container style={{marginTop: "7em"}}>
           <ActivityDashboard activities={activities}></ActivityDashboard>
          
        

    
        </Container>
   
    </>
  );
}

export default App;
