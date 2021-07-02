import React from "react";
import { GridColumn, Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";

  

export  const   ActivityDashboard = observer( () => {
const {activityStore} = useStore();
const {selectedActivity, editMode} = activityStore;

  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivityList ></ActivityList>
        </Grid.Column>
        <GridColumn width="6">
          {selectedActivity && !editMode && (
            <ActivityDetails ></ActivityDetails>
          )}
          {editMode &&
          <ActivityForm ></ActivityForm>}
        </GridColumn>
      </Grid>
    </>
  );
});
