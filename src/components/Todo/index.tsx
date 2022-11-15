import React, { useState } from "react";
import { Row, Tag, Checkbox } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { toggleTodo } from "../../features/todo/todoSlice";

interface TodoProps {
  id: string;
  name: string;
  priority: any;
}

interface priorityColors {
  [key: string]: string;
}

const priorityColorMapping: priorityColors = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ id, name, priority }: TodoProps) {
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();

  const toggleCheckbox = () => {
    setChecked(!checked);
    dispatch(toggleTodo({ id: id }));
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox checked={checked} onChange={toggleCheckbox}>
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[priority]}>{priority}</Tag>
    </Row>
  );
}
