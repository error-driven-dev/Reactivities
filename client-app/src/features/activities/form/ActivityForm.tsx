import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { updateActivity, createActivity, loading, loadActivity } =
    activityStore;
  const [activity, setActivity] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  useEffect(() => {
    if (id) {
      loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, loadActivity]);
  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updated = { ...activity, [name]: value };

    setActivity(updated);
  };
  function handleSubmit() {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      updateActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  }
  //if(loadingInitial) return <LoadingComponents inverted={true} content='Loading activity...'></LoadingComponents>
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          name="title"
          onChange={handleInput}
          value={activity?.title}
        />
        <Form.TextArea
          placeholder="Description"
          name="description"
          onChange={handleInput}
          value={activity?.description}
        />
        <Form.Input
          placeholder="Category"
          onChange={handleInput}
          name="category"
          value={activity?.category}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          onChange={handleInput}
          name="date"
          value={activity?.date}
        />
        <Form.Input
          placeholder="City"
          onChange={handleInput}
          name="city"
          value={activity?.city}
        />
        <Form.Input
          placeholder="Venue"
          onChange={handleInput}
          name="venue"
          value={activity?.venue}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          as={Link}
          to="/activities"
          floated="right"
          positive
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
});
