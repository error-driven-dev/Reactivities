import { useEffect, useState } from "react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuidv4 } from "uuid";


import { Container } from "semantic-ui-react";
import { NavBar } from "./NavBar";
import { Activity } from "../models/activities";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    agent.Activities.list()
    .then(response => {
      response.forEach( res => {
        //modify date string to include only date portion -- 2 ways to do it
        //can also create a new wmply array of type activities and push each modified activity into the array, then set state with newly formed array
        res.date = res.date.substr(0, res.date.indexOf('T'));
        //res.date = res.date.split('T')[0];
      })
        setActivities(response);
        setLoading(false);
      });
  }, []);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };
  const handleCancelSelection = () => {
    setSelectedActivity(undefined);
  };

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelection();
    setEditMode(true);
  };
  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
setSubmitting(true)
    if(activity.id){
      agent.Activities.update(activity).then (() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })

      
    }else {
      activity.id = uuidv4();
      agent.Activities.create(activity).then( () => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      }).catch((err) => {
        console.log(err);
      })
  
    }

  };

  const handleDeleteActivity = (id: string) => {
setSubmitting(true);
agent.Activities.delete(id).then(()=> {
  setActivities([...activities.filter((x) => x.id !== id)]);
  setSubmitting(false);
})

   
  };
 if(loading) return <LoadingComponents inverted={true} content='Lodading app...'/>
  return (
    <>
      <NavBar formOpen={handleFormOpen}></NavBar>

      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelection={handleCancelSelection}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          editMode={editMode}
          submitForm={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        ></ActivityDashboard>
      </Container>
    </>
  );
}

export default App;
