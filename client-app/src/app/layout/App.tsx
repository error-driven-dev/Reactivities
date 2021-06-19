import React, { ChangeEvent, useEffect, useState } from 'react';
import {ActivityDashboard} from '../../features/activities/dashboard/ActivityDashboard';


import axios from 'axios'
import { Icon, List, ListHeader, Container, FormInput, InputOnChangeData } from 'semantic-ui-react';
import { NavBar } from './NavBar';
import { Activity } from '../models/activities';

function App() {
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
const [editMode, setEditMode] = useState(false)




useEffect(() => {
  axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
    setActivities(response.data);
  })

}, [])

const handleSelectActivity = (id : string) => {
  setSelectedActivity( activities.find(x=> x.id === id));
}
const handleCancelSelection= () => {
  setSelectedActivity(undefined);
}

const handleFormOpen =(id? : string) => {
  id ? handleSelectActivity(id) : handleCancelSelection();
  setEditMode(true);
}
const handleFormClose =() => {
  setEditMode(false);
}

const handleCreateOrEditActivity = (activity:Activity) => {

  activity.id ? setActivities([...activities.filter(x => x.id !== activity.id), activity]):
  setActivities([...activities, activity]);
  setEditMode(false);
  setSelectedActivity(activity);
}

  return (
    <>
      <NavBar formOpen={handleFormOpen}></NavBar>
      
        <Container style={{marginTop: "7em"}}>
           <ActivityDashboard activities={activities} selectedActivity={selectedActivity} selectActivity={handleSelectActivity} 
           cancelSelection={handleCancelSelection} formOpen={handleFormOpen} formClose={handleFormClose} editMode={editMode} submitForm={handleCreateOrEditActivity}></ActivityDashboard>
          
        

    
        </Container>
   
    </>
  );
}

export default App;
