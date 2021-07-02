import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const { selectedActivity, formClose, createOrEditActivity, loading } =
    activityStore;
  const [activity, setActivity] = useState(
    selectedActivity ?? {
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: "",
    }
  );
  const handleInput = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const updated = { ...activity, [name]: value };

    setActivity(updated);

    console.log(updated);
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => createOrEditActivity(activity)} autoComplete="off">
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
          onClick={formClose}
          floated="right"
          positive
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
});
