import { action, makeAutoObservable } from "mobx";

import agent from "../api/agent";
import { Activity } from "../models/activities";
import {v4 as uuid} from 'uuid';


export default class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivites = async () => {
    this.setLoadingInitial(true);
    //async code goes in the try catch
    try {
      const activities = await agent.Activities.list();
   
      activities.forEach((res => {
        res.date = res.date.split('T')[0];
        this.activities.push(res);
    
      }))
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id);
    console.log(this.selectedActivity);
  };
  cancelSelection = () => {
    this.selectedActivity = undefined;
  };

  formOpen = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelection();
    this.setEditMode(true);   
  };
  formClose = () => {
    this.setEditMode(false);
  };


  //USING ASYNC PROMISES, THEN FUNCTIONS MUST CALL OTHER IMPLEMENTED ACTION METHODS (AS IN 'IF' BLOCK) OR BE WRAPPED IN ACTION() OR RUNINACTION() (AS IN 'ELSE' BLOCK)
createOrEditActivity = (activity:Activity) => {
  this.setLoading(true);
 if(activity.id) {
   agent.Activities.update(activity).then(()=>{
     this.updateActivity(activity);
     this.selectActivity(activity.id);
    this.setLoading(false);
   }).catch((error)=>{
    console.log(error)
  })
 }else {
  activity.id = uuid();
  agent.Activities.create(activity).then(() => {
    action( (() => {
    this.activities = [...this.activities, activity];
    this.updateActivity(activity);
    this.selectActivity(activity.id);
   this.setLoading(false);
    })
    )
  }).catch((error)=>{
    console.log(error)
  })
}



};

updateActivity = (activity:Activity) => {
  this.activities = [...this.activities.filter(x=> x.id !== activity.id),activity];     
}

deleteActivity = (id:string) => {
  this.setLoading(true);
  agent.Activities.delete(id).then( ()=> {
    this.activities = [...this.activities.filter(x=> x.id !== id)]
  }).catch((error) =>{
    console.log(error);
  });
  if(this.selectedActivity?.id === id) this.cancelSelection();
this.setLoading(false);
};
 setLoading = (state: boolean) => {
   this.loading = state;
 }

 setEditMode = (state: boolean) => {
  this.editMode = state;
}
}
 




