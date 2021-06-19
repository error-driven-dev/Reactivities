import React from "react";
import { GridColumn, Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  selectActivity: (id: string) => void;
  cancelSelection: () => void;
  formOpen: (id? : string) => void;
  formClose: () => void;
  submitForm: (activity:Activity) => void;

  
}
export const ActivityDashboard = ({ activities, selectedActivity, selectActivity, cancelSelection, formOpen, formClose, editMode, submitForm}: Props) => {
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivityList activities={activities}  selectActivity={selectActivity} ></ActivityList>
        </Grid.Column>
        <GridColumn width="6">
          {selectedActivity && !editMode && (
            <ActivityDetails activity={selectedActivity} cancelSelection={cancelSelection} formOpen={formOpen}  ></ActivityDetails>
          )}
          {editMode &&
          <ActivityForm selectedActivity={selectedActivity}  formClose={formClose} submitForm={submitForm}></ActivityForm>}
        </GridColumn>
      </Grid>
    </>
  );
};
