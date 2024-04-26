"use client";
import api from "@/app/utils/api";
import { Button } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: () => {
      return api.post("/logout");
    },
    onSuccess(data, variables, context) {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <Button onClick={() => logoutMutation.mutate()} variant="ghost">
      Logout
    </Button>
  );
};

export default LogoutButton;