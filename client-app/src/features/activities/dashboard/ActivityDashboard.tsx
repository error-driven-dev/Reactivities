import React from 'react'
import { GridColumn, Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities'
import ActivityList from './ActivityList'


interface Props {
    activities: Activity[];
}
export const ActivityDashboard = ({activities}: Props) => {
    return (
        <>
            <Grid>
                <Grid.Column width='10'>
         <ActivityList activities={activities}></ActivityList>
                    
                </Grid.Column>
            </Grid>
        </>
    )
}
