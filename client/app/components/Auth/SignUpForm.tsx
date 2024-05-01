"use client";
import api from "@/app/utils/api";
import { TOAST } from "@/app/utils/enums";
import { notifyUser } from "@/app/utils/toast";
import {
  EnvelopeClosedIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { Button, Container, Flex, Link, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.target as any);
      const email = formData.get("email");
      const password = formData.get("password");
      const name = formData.get("name");

      const resp = await api.post("/user", {});

      router.replace("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      notifyUser("Something went wrong", TOAST.ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex flexGrow={"1"} align={"center"}>
      <Container size={"1"}>
        <form onSubmit={handleSubmit}>
          <Flex direction={"column"} gap="4">
            <TextField.Root
              required
              minLength={2}
              name="name"
              type="text"
              placeholder="Your name"
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root name="email" type="email" placeholder="Email">
              <TextField.Slot>
                <EnvelopeClosedIcon />
              </TextField.Slot>
            </TextField.Root>
            <TextField.Root
              name="password"
              minLength={8}
              type="password"
              placeholder="Password"
            >
              <TextField.Slot>
                <LockClosedIcon height={"8"} width={"8"} />
              </TextField.Slot>
            </TextField.Root>
            <Button loading={loading} type="submit">
              Sign up
            </Button>
          </Flex>
          <Flex direction={"row"} justify={"center"} align={"center"} pt={"4"}>
            <Button color="gray" variant="outline" highContrast size="1">
              <Link href={"/login"}>Login</Link>
            </Button>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
}
