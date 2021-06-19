import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activities'

interface Props {
    selectedActivity: Activity | undefined;
    formClose: () =>void;
    submitForm: (activity:Activity)=> void;
 
    
}

export default function ActivityForm({formClose, selectedActivity, submitForm }: Props) {
   
    const [activity, setActivity] = useState(selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
      date: '',
      city: '',
      venue: ''
      
      })
    const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        const {name, value} = event.target;
        const updated = {...activity, [name]: value}
       
        setActivity(updated);
      
        console.log(updated);
      }


    return (
    
            <Segment clearing>
                <Form onSubmit={()=> submitForm(activity)} autoComplete = 'off'>
                    <Form.Input placeholder='Title' name='title' onChange={handleInput} value={activity?.title} />
                    <Form.TextArea placeholder='Description'  name='description' onChange={handleInput}  value={activity?.description}/>
                    <Form.Input placeholder='Category' onChange={handleInput} name='category' value={activity?.category} />
                    <Form.Input placeholder='Date' onChange={handleInput} name='date' value={activity?.date}/>
                    <Form.Input placeholder='City' onChange={handleInput} name='city' value={activity?.city}/>
                    <Form.Input placeholder='Venue' onChange={handleInput} name='venue' value={activity?.venue}/>
                    <Button floated='right' positive type='submit'  content='Submit'></Button>
                    <Button onClick={formClose} floated='right' positive type='button' content='Cancel'></Button>
                </Form>
            </Segment>

    )
}
