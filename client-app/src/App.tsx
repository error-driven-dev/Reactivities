import React, { useEffect, useState } from 'react';

import './App.css';
import axios from 'axios'
import { Icon, List, ListHeader } from 'semantic-ui-react';

function App() {
const [activities, setActivities] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5000/api/activities').then(response => {
    setActivities(response.data);
  })

}, [])

  return (
    <div className="App">
    
      <ListHeader as="h2" >  <Icon name="users"></Icon> Reactivities</ListHeader>

  
        <List>
          {activities.map((activity: any) => (
            <li key={activity.id} >{activity.title}</li>
          ))}
        </List>
   
    </div>
  );
}

export default App;
