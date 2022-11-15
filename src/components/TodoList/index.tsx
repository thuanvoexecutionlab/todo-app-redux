import React, { useState } from "react";
import { Col, Row, Input, Button, Select, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Todo from "../Todo";
import { addTodo, selectTodoList } from "../../features/todo/todoSlice";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [todoPriority, setTodoPriority] = useState("Medium");
  const dispatch = useAppDispatch();
  const todoList = useAppSelector(selectTodoList);
  const handleAddTodo = () => {
    dispatch(
      addTodo({
        id: uuidv4(),
        name: todoName,
        completed: false,
        priority: todoPriority,
      })
    );
    // Reset the input field
    setTodoName("");
  };
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {todoList.map((todo) => (
          <Todo id={todo.id} key={todo.id} name={todo.name} priority={todo.priority} />
        ))}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
          <Select
            onChange={(value) => setTodoPriority(value)}
            defaultValue={todoPriority}>
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button onClick={handleAddTodo} type="primary">
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
