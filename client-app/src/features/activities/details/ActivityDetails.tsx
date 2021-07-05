import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";

import { useStore } from "../../../app/stores/store";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default observer(function ActivityDetails() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();
 
  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);

  if(loadingInitial || !activity) return <LoadingComponents  inverted={true} content='Loading activity...'></LoadingComponents>
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailsHeader activity={activity}></ActivityDetailsHeader>
        <ActivityDetailsInfo activity={activity}></ActivityDetailsInfo>
        <ActivityDetailsChat></ActivityDetailsChat>
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailsSidebar></ActivityDetailsSidebar>
      </Grid.Column>
    </Grid>
  );
});
