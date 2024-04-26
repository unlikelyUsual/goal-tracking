"use client";
import GoalList from "@/app/components/Dashboard/GoalList";
import { Container } from "@radix-ui/themes";

const Dashboard = () => {
  return (
    <Container p="4" size={"2"}>
      <GoalList />
    </Container>
  );
};

export default Dashboard;
