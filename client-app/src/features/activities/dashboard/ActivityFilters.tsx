import React from 'react'
import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function ActivityFilters() {
    return (
        <>
        <Menu vertical size="large" style={{width:'100%', marginTop: '26px'}}>
            <Header icon='filter' attached color='teal' content="Filters"/>
                <Menu.Item content='All Activitied'></Menu.Item>
                <Menu.Item content='I am going'></Menu.Item>
                <Menu.Item content='I am hosting'></Menu.Item>
            
        </Menu>
        <Header />
            <Calendar></Calendar>
        
        </>
    )
}
