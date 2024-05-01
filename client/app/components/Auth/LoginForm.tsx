"use client";
import api from "@/app/utils/api";
import { TOAST } from "@/app/utils/enums";
import { notifyUser } from "@/app/utils/toast";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Button, Container, Flex, Link, TextField } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

const LoginForm = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (data: any) => {
      return api.post("/login", data);
    },
    onSuccess(data, variables, context) {
      localStorage.setItem("token", data.data.data.token);
      router.refresh();
      router.replace("/dashboard");
      router.refresh();
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target as any);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      loginMutation.mutate({ email, password });
    } catch (err) {
      console.error(err);
      notifyUser("Something went wrong", TOAST.ERROR);
    }
  };

  return (
    <Flex flexGrow={"1"} align={"center"}>
      <Container size={"1"}>
        <form onSubmit={handleSubmit}>
          <Flex direction={"column"} gap="4">
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
            <Button loading={loginMutation.isPending} type="submit">
              Log in
            </Button>
          </Flex>
          <Flex direction={"row"} justify={"center"} align={"center"} pt={"4"}>
            <Button color="gray" variant="outline" highContrast size="1">
              <Link href={"/signup"}>Create Account</Link>
            </Button>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
};

export default LoginForm;
