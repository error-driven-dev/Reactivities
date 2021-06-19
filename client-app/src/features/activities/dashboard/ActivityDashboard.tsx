import React from 'react'
import { GridColumn, Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities'


interface Props {
    activities: Activity[];
}
export const ActivityDashboard = ({activities}: Props) => {
    return (
        <>
            <Grid>
                <Grid.Column width='10'>
                <List>
            {activities.map((activity) => (
              <List.Item key={activity.id} >{activity.title}</List.Item>
            ))}
          </List>
                    
                </Grid.Column>
            </Grid>
        </>
    )
}
