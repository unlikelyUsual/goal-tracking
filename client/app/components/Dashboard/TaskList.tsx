"use client";
import api from "@/app/utils/api";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  AlertDialog,
  Box,
  Button,
  Callout,
  Flex,
  Heading,
  IconButton,
  Section,
  Spinner,
  Table,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { useParams } from "next/navigation";
import AddTask from "../Model/AddTask";

const TaskList = () => {
  const param = useParams<{ id: string }>();
  const goal = useQuery({
    queryKey: ["goal", param.id],
    queryFn: async () => {
      const res = await api.get(`/goal/${param.id}`);
      return res.data.data.goal as any;
    },
  });

  if (goal.isLoading) {
    return (
      <Flex justify="center">
        <Spinner size="3" />
      </Flex>
    );
  }

  if (goal.error) {
    return (
      <Callout.Root color="amber">
        <Callout.Icon>
          <ExclamationTriangleIcon />
        </Callout.Icon>
        <Callout.Text>Could not fetch your tasks, try again later</Callout.Text>
      </Callout.Root>
    );
  }

  const rows = goal.data.tasks ? (
    goal.data?.tasks?.map((task: any, idx: number) => (
      <Table.Row key={idx}>
        <Table.RowHeaderCell>{task.title}</Table.RowHeaderCell>

        <Table.Cell>{task.quantity}</Table.Cell>
        <Table.Cell>{task.frequency}</Table.Cell>
        <Table.Cell>{task.reminders.length}</Table.Cell>
        <Table.Cell>
          <Flex gap="2" width="auto">
            <AddTask goalId={param.id} data={task}>
              <IconButton className="cursor-pointer">
                <Pencil1Icon width="18" height="18" />
              </IconButton>
            </AddTask>

            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <IconButton color="red">
                  <TrashIcon />
                </IconButton>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Task</AlertDialog.Title>
                <AlertDialog.Description size="2">
                  Are you sure?
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button variant="solid" color="red">
                      Delete Task
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Table.Cell>
      </Table.Row>
    ))
  ) : (
    <Callout.Root>
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>Create your first project</Callout.Text>
    </Callout.Root>
  );

  return (
    <>
      <Flex direction={"row"} justify={"between"}>
        <Button radius="full" variant="soft" mb="3">
          <Link href={`/dashboard`} className="cursor-pointer">
            Go Back
          </Link>
        </Button>
        <AddTask goalId={goal.data._id} data={null}>
          <Button variant="outline" size="1">
            <PlusIcon />
            Create Task
          </Button>
        </AddTask>
      </Flex>

      <Box
        py="8"
        style={{
          backgroundColor: "var(--gray-a2)",
          borderRadius: "var(--radius-3)",
        }}
        mb="5"
      >
        <Section size="2">
          <Heading align="center" color="teal">
            {goal.data.title ?? ""}
          </Heading>
        </Section>
      </Box>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Task</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Times</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>At What</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Reminders Set</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );
};

export default TaskList;
