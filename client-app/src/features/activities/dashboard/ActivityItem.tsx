import { Link } from "react-router-dom";
import { Item, Button, Segment, Icon } from "semantic-ui-react";
import { Activity } from "../../../app/models/activities";

interface Props {
  activity: Activity;
}

export default function ActivityItem({ activity }: Props) {

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by:</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
          <span><Icon name='clock'></Icon> {activity.date}
          <Icon name='marker' /> {activity.venue}
          </span>
      </Segment>
      <Segment secondary>
          Attendees List
      </Segment>
      <Segment clearing>
          <span>{activity.description}</span>
          <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content='view'></Button>
      </Segment>
    </Segment.Group>
  );
}
