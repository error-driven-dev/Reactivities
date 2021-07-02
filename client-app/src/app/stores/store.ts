import { useContext, createContext } from "react";
import ActivityStore from "./activityStore";

//defines the Store TYPE
interface Store {
    activityStore : ActivityStore
}

//impliments an instance of the store type
export const store: Store = {
    activityStore: new ActivityStore()
}

//makes the store into a context object called StoreContext which is accessed when using useStore; will be used as a component.provider to wrap app and provide this conext to all children
export const StoreContext = createContext(store);


//adds a wrapper to better read which context is being used via a custom hook
//used as the consumer and added to all children to access the elements in the StoreContext
export function useStore() {
    return useContext(StoreContext);
}







