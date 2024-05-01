"use client";
import { useQuery } from "@tanstack/react-query";
import LoginForm from "./components/Auth/LoginForm";
import Dashboard from "./dashboard/page";
import api from "./utils/api";

export default function HomePage() {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get(`/user`);
      return res.data.data.user;
    },
  });

  if (user.data == null || !user?.data?._id) {
    return <LoginForm />;
  }
  return <Dashboard />;
}
