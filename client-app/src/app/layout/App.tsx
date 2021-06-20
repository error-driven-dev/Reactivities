import { useEffect, useState } from "react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuidv4 } from "uuid";


import { Container } from "semantic-ui-react";
import { NavBar } from "./NavBar";
import { Activity } from "../models/activities";
import agent from "../api/agent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

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
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuidv4() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)]);
  };

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
        ></ActivityDashboard>
      </Container>
    </>
  );
}

export default App;
