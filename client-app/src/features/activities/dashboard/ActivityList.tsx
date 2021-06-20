import React, { useState } from 'react'
import { SyntheticEvent } from 'react';
import { Button, Item,  Label,  Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities'


interface Props {
    activities: Activity[];
    editMode: boolean;
    submitting: boolean;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({activities, selectActivity, deleteActivity, editMode, submitting} : Props) {
const [target, setTarget] = useState('');

const handleActivityDelete = (e : SyntheticEvent<HTMLButtonElement>, id:string) => {
setTarget(e.currentTarget.name);
deleteActivity(id);
}
    return (
    <Segment>
        <Item.Group divided>
            {activities.map(activity =>
                (<Item key={activity.id}>
                    <Item.Content>
                        <Item.Header>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description className="ui header tiny">
                            {activity.description}
                             <p>{activity.city}, {activity.venue} </p>
                        
                        </Item.Description>
                        <Item.Extra>
                        
                            <Button name={activity.id} loading={submitting && target === activity.id} onClick={(e) => { handleActivityDelete(e, activity.id)}} disabled={editMode} floated='right' content='delete' color='red' />
                            <Button onClick={()=> selectActivity(activity.id)} disabled={editMode} floated='right' content='view' color='blue' />
                            <Label basic content={activity.category}></Label>
                        
                        </Item.Extra>
                    </Item.Content>

                </Item>))}
        </Item.Group>
    
    </Segment>
    )
}
