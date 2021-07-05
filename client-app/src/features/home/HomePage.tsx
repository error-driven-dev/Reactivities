import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'


export default function HomePage() {
    return (
      <Segment inverted textAlign='center' vertical className='masthead'>
          <Container text>
              <Header as='h1' inverted>
                  <Image src='/assets/logo.png' size="massive" alt='logo' style={{marginBottom: 12}}></ Image>
                  REACTivities
              </Header>
              <Header as='h2' inverted content='Welcome to Reactivites'></Header>
              <Button as={Link} to="/activities" inverted size='huge' content="take me to activites"></Button>
          </Container>
      </Segment>
    ) 
}



