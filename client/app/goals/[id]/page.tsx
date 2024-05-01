"use client";
import TaskList from "@/app/components/Dashboard/TaskList";
import { Container } from "@radix-ui/themes";

const Goal = () => {
  return (
    <Container p="4" size={"2"}>
      <TaskList />
    </Container>
  );
};

export default Goal;
