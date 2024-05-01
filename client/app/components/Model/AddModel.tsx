"use client";
import api from "@/app/utils/api";
import { TOAST } from "@/app/utils/enums";
import { notifyUser } from "@/app/utils/toast";
import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { DayPicker } from "react-day-picker";
import Center from "../Layout/Center";

export default function CreateGoalDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const create = useMutation({
    mutationFn: (data: any) => {
      return api.post(`/goal`, data);
    },
    onSuccess(data, variables, context) {
      router.push("/dashboard");
    },
  });

  const [start, setStart] = useState<Date | undefined>();
  const [end, setEnd] = useState<Date | undefined>();

  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as any);
    const title = formData.get("title") as string;

    if (!start && !end) {
      notifyUser("Please select start and end", TOAST.ERROR);
      return;
    }

    create.mutate({
      title,
      minTimeline: start,
      maxTimeline: end,
      startDate: new Date(),
      tasks: [],
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content size={"4"}>
        <Dialog.Title>
          <Center> Enter you goal</Center>
        </Dialog.Title>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <TextField.Root
              maxLength={30}
              minLength={3}
              name="title"
              placeholder=""
            ></TextField.Root>
            <Center>
              <DayPicker
                mode="single"
                selected={start}
                onSelect={setStart}
                disabled={[{ from: new Date(0), to: new Date() }]}
              />
            </Center>
            <Center>
              <DayPicker
                mode="single"
                selected={end}
                onSelect={setEnd}
                disabled={[{ from: new Date(0), to: new Date() }]}
              />
            </Center>

            <Button loading={create.isPending} type="submit">
              Create Goal
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
