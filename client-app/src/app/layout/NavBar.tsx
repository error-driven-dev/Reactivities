import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface Props {
    formOpen: () =>void;
}

export const NavBar = ({formOpen}: Props) => {
    return (
        <>
            <Menu inverted fixed='top' >
                <Container>
                    <Menu.Item header>
                        <img src='/assets/logo.png' alt="logo" style={{marginRight:'10px'}}></img>
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name="Activities"></Menu.Item>
                    <Menu.Item>
                    <Button onClick={formOpen} positive content='Create Activity'></Button>
                    </Menu.Item>
                </Container>

               
            </Menu>
        </>
    )
}
