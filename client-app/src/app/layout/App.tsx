import { useEffect, useState } from "react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuidv4 } from "uuid";
import { Container } from "semantic-ui-react";
import { NavBar } from "./NavBar";
import { Activity } from "../models/activities";
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
const {activityStore} = useStore();




  useEffect(() => {
    //actSttore will be populated with the data when called
    activityStore.loadActivites()
  }, [activityStore]);





   
 if(activityStore.loadingInitial) return <LoadingComponents inverted={true} content='Lodading app...'/>
  return (
    <>
      <NavBar ></NavBar>

      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
      
        ></ActivityDashboard>
      </Container>
    </>
  );
}

export default observer(App);
