import React from "react";
import { GridColumn, Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  editMode: boolean;
  submitting: boolean;
  selectActivity: (id: string) => void;
  cancelSelection: () => void;
  formOpen: (id? : string) => void;
  formClose: () => void;
  submitForm: (activity:Activity) => void;
  deleteActivity: (id: string) => void;
  
}
export const ActivityDashboard = ({ activities, selectedActivity, selectActivity, cancelSelection, formOpen, formClose, editMode, submitting,submitForm, deleteActivity}: Props) => {
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivityList activities={activities}  selectActivity={selectActivity} deleteActivity={deleteActivity} editMode={editMode} submitting={submitting} ></ActivityList>
        </Grid.Column>
        <GridColumn width="6">
          {selectedActivity && !editMode && (
            <ActivityDetails activity={selectedActivity} cancelSelection={cancelSelection} formOpen={formOpen}  ></ActivityDetails>
          )}
          {editMode &&
          <ActivityForm selectedActivity={selectedActivity}  formClose={formClose} submitForm={submitForm} submitting={submitting}></ActivityForm>}
        </GridColumn>
      </Grid>
    </>
  );
};
