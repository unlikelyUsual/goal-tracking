"use client";
import api from "@/app/utils/api";
import { TOAST } from "@/app/utils/enums";
import { notifyUser } from "@/app/utils/toast";
import { Box, Button, Dialog, Flex, Tabs, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import Center from "../Layout/Center";

const defaultSchedule = [1, 0, 0, 0, 0, 0, 0];

const defaultTimes = {
  never: null,
  "7am": 7,
  "12pm": 12,
  "4pm": 16,
  "8pm": 20,
};

export default function AddTask({
  goalId,
  children,
  data,
}: {
  goalId: string;
  children: React.ReactNode;
  data: any;
}) {
  const create = useMutation({
    mutationFn: (data: any) => {
      return api.post(`/task/${goalId}`, data);
    },
    onSuccess(data, variables, context) {
      notifyUser("Task Added", TOAST.SUCCESS);
      setIsOpen(false);
      router.refresh();
    },
    onError: ({ message }) => {
      notifyUser(message, TOAST.ERROR);
    },
  });

  const update = useMutation({
    mutationFn: (data: any) => {
      return api.put(`/task/${goalId}`, data);
    },
    onSuccess(data, variables, context) {
      notifyUser("Task updated", TOAST.SUCCESS);
      setIsOpen(false);
      router.refresh();
    },
    onError: ({ message }) => {
      notifyUser(message, TOAST.ERROR);
    },
  });

  const [open, setIsOpen] = useState(false);
  const [frequency, setFreq] = useState(data?.frequency ?? "custom");

  const [schedule, setSchedule] = useState(() =>
    data && data.customDays
      ? data?.customDays
          .toString()
          .split("")
          .map((item: any) => (item >= 1 ? 1 : 0))
      : defaultSchedule
  );

  const router = useRouter();

  const onOpenChange = (isOpen: boolean) => {
    if (create.isPending || update.isPending) {
      return;
    }
    setIsOpen(isOpen);
  };

  const toggleDays = (idx: number) => {
    setSchedule((prev: number[]) => {
      console.log(prev);
      for (let i = 0; i < prev.length; i++) {
        if (idx === i) {
          const wasEnabled = prev[i] === 1;
          prev[i] = wasEnabled ? 0 : 1;
        }
      }
      console.log(prev);
      return prev;
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as any);
    const title = formData.get("title") as string;
    const quantity = Number(formData.get("quantity"));

    const payload = {
      title,
      quantity,
      frequency,
      customDays: Number(schedule.join("")),
      reminders: [],
    };

    if (data) {
      update.mutate({
        ...payload,
        id: data._id,
      });
    } else {
      create.mutate(payload);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content minWidth={"20rem"}>
        <Dialog.Title>Enter the task</Dialog.Title>
        <form onSubmit={handleSubmit}>
          <Flex pt="2" direction="column" gap="2">
            <Flex gap="2">
              <TextField.Root
                className="grow"
                maxLength={30}
                minLength={3}
                name="title"
                placeholder="Enter task"
                defaultValue={data?.title}
              ></TextField.Root>
              <TextField.Root
                className="grow"
                max={9999}
                min={5}
                type="number"
                name="quantity"
                placeholder="how many times"
                defaultValue={data?.quantity}
              ></TextField.Root>
            </Flex>
            <Tabs.Root defaultValue={frequency} onChange={setFreq}>
              <Tabs.List justify={"center"}>
                <Tabs.Trigger value="weekly">Weekly</Tabs.Trigger>
                <Tabs.Trigger value="daily">Daily</Tabs.Trigger>
                <Tabs.Trigger value="custom">Custom</Tabs.Trigger>
              </Tabs.List>
              <Box pt="4">
                <Tabs.Content value="daily">
                  <Flex
                    direction={"column"}
                    minHeight={"5rem"}
                    align={"center"}
                    gap="4"
                    py="4"
                    px="9"
                    mx="auto"
                    maxWidth={"25rem"}
                  ></Flex>
                </Tabs.Content>
                <Tabs.Content value="weekly">
                  <Flex
                    direction={"column"}
                    minHeight={"5rem"}
                    align={"center"}
                    gap="4"
                    pt="1"
                  ></Flex>
                </Tabs.Content>
                <Tabs.Content value="custom">
                  <Flex
                    direction={"column"}
                    minHeight={"5rem"}
                    align={"center"}
                    gap="4"
                    py="4"
                    px="9"
                    mx="auto"
                    maxWidth={"25rem"}
                  >
                    <Center gap="2" align={"center"}>
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                        (d, idx) => (
                          <Button
                            type="button"
                            size={"1"}
                            key={idx}
                            variant={schedule[idx] >= 1 ? "solid" : "soft"}
                            onClick={() => toggleDays(idx)}
                          >
                            {d}
                          </Button>
                        )
                      )}
                    </Center>
                  </Flex>
                </Tabs.Content>
              </Box>
            </Tabs.Root>

            <Flex wrap={"wrap"} mt="2" gap="6" align={"center"}>
              {/* <Flex align={"center"} gap="2">
                Notify at
                <Select.Root
                  name="reminderTime"
                  defaultValue={data?.shouldRemind ? "7am" : "never"}
                >
                  <Select.Trigger />
                  <Select.Content>
                    {Object.keys(defaultTimes).map((k) => (
                      <Select.Item key={k} value={k}>
                        {k}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex> */}
              <Button
                style={{ flexGrow: 1 }}
                loading={create.isPending || update.isPending}
                type="submit"
              >
                {data ? "Update" : "Create"} Task
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
