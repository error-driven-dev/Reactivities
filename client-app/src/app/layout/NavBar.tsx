import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Container, Button } from 'semantic-ui-react'



export const NavBar = () => {

 
    return (
        <>
            <Menu inverted fixed='top' >
                <Container>
                    <Menu.Item header as={NavLink} exact to='/'>
                        <img src='/assets/logo.png' alt="logo" style={{marginRight:'10px'}}></img>
                        Reactivities
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/activities'  name="Activities"></Menu.Item>
                    <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'></Button>
                    </Menu.Item>
                </Container>

               
            </Menu>
        </>
    )
}
