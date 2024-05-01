"use client";

import api from "@/app/utils/api";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Pencil1Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Button, Callout, Flex, Spinner, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import CreateGoalDialog from "../Model/AddModel";

const GoalList = () => {
  const goals = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await api.get(`/goals`);
      // console.log(res.data.data.goals);
      return res.data.data.goals;
    },
  });

  if (goals.isLoading) {
    return (
      <Flex justify="center">
        <Spinner size="3" />
      </Flex>
    );
  }

  if (goals.error) {
    return (
      <Callout.Root color="amber">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>
          Could not fetch your projects, try again later
        </Callout.Text>
      </Callout.Root>
    );
  }

  if (goals.data?.length <= 0) {
    return (
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>Create your first project</Callout.Text>
      </Callout.Root>
    );
  }

  const rows = goals?.data?.map((goal: any, idx: number) => (
    <Table.Row key={idx}>
      <Table.RowHeaderCell>
        <Link href={`goal/${goal._id}`}>{goal.title}</Link>
      </Table.RowHeaderCell>

      <Table.Cell>
        {goal.minTimeline ? new Date(goal.minTimeline).toDateString() : "-"}
      </Table.Cell>
      <Table.Cell>
        {goal.maxTimeline ? new Date(goal.maxTimeline).toDateString() : "-"}
      </Table.Cell>
      <Table.Cell>
        <Link href={`goals/${goal._id}`} color="grass">
          <Pencil1Icon width="18" height="18" />
        </Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Flex mb={"4"}>
        <CreateGoalDialog>
          <Button variant="outline" ml="3" size="1">
            <PlusIcon />
            Create Goal
          </Button>
        </CreateGoalDialog>
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Min Timeline</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Max Timeline</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );
};

export default GoalList;
