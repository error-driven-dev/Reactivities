import React from 'react'
import { Button, Item,  Label,  Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities'


interface Props {
    activities: Activity[]
}

export default function ActivityList({activities} : Props) {
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
                            <Button floated='right' content='view' color='blue' />
                            <Label basic content={activity.category}></Label>
                        
                        </Item.Extra>
                    </Item.Content>

                </Item>))}
        </Item.Group>
    
    </Segment>
    )
}
