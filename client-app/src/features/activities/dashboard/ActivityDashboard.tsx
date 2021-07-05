import { GridColumn, Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";

export const ActivityDashboard = observer(() => {
  const { activityStore } = useStore();
  const {activityRegistry, loadActivites} = activityStore;
  useEffect(() => {
if(activityRegistry.size <= 1){ loadActivites();
}
    
  }, [activityRegistry.size, loadActivites]);
  
  if(activityStore.loadingInitial) return <LoadingComponents inverted={true}  content='Loading app' />
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivityList></ActivityList>
        </Grid.Column>
        <GridColumn width="6">
        </GridColumn>
      </Grid>
    </>
  );
});
