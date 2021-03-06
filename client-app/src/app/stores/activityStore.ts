import { makeAutoObservable, runInAction } from "mobx";

import agent from "../api/agent";
import { Activity } from "../models/activities";



export default class ActivityStore {
  activityRegistry:  Map<string,Activity> = new Map<string,Activity>();

  selectedActivity: Activity | undefined = undefined;
  
  loading = false;
  loadingInitial = true;

  constructor() {
    makeAutoObservable(this);
  }

  loadActivites = async () => {
    this.setLoadingInitial(true);

    try {
      const activities = await agent.Activities.list();

      activities.forEach((res) => {
        this.setActivity(res);
 
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };
  get activitiesByDate(){
    return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date) - Date.parse(b.date));
  }
get groupedActivities(){
  //turns entire result object into array of arrays where value 1 is date and value 2 is array of activity objects
  return Object.entries(
    //returns activities object where activity is the key and activities are array
    this.activitiesByDate.reduce((activities, activity) =>{
    //gets date of current activity
    const date = activity.date;
    //gets activities key(date) exists copy all items into array and add new activity; if not create the key and add current activity array
    activities[date] = activities[date] ? [...activities[date],activity] : [activity];
    return activities;
    //as definition removes the implicit any error
  },{} as{[key:string]: Activity[]})
  )
}

  loadActivity = async(id:string) => {
    let activity = this.getActivity(id);
    console.log(id);
    if(activity) {
      this.selectActivity(activity.id);
      return activity;
    }else {
      this.loadingInitial = true;
      try{
    activity = await  agent.Activities.details(id);
    this.setActivity(activity);
    this.selectActivity(activity.id);
    this.setLoadingInitial(false);     
    return activity;
      } catch(error) {
        console.log(error);
        this.setLoadingInitial(false);     

      }
    }
    
  }
  private getActivity(id:string) {
    return this.activityRegistry.get(id);
  }
private setActivity(activity:Activity) {
  activity.date = activity.date.split("T")[0];
  this.activityRegistry.set(activity.id, activity);
}



  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);    
  };


  //USING ASYNC PROMISES, THEN FUNCTIONS MUST CALL OTHER IMPLEMENTED ACTION METHODS (AS IN 'IF' BLOCK) OR BE WRAPPED IN ACTION() OR RUNINACTION() (AS IN 'ELSE' BLOCK)
     createActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
  

  updateActivity = async (activity: Activity) => {
    this.setLoading(true);
    try{
    await agent.Activities.update(activity);
   runInAction( () => {
      this.activityRegistry.set(activity.id, activity);
      this.selectActivity(activity.id);
      this.setLoading(false);
    }) }
    catch (error) {
      console.log(error);
      runInAction( () => {
        this.setLoading(false);
      })
    }
  }

  deleteActivity = (id: string) => {
    this.setLoading(true);
    agent.Activities.delete(id)
      .then(() => {
        this.activityRegistry.delete(id); 
      })
      .catch((error) => {
        console.log(error);
      });
    this.setLoading(false);
  };
  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };
  setLoading = (state: boolean) => {
    this.loading = state;
  };

}
