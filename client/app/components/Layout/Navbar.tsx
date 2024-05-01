"use client";
import api from "@/app/utils/api";
import { Avatar, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import LogoutButton from "../Auth/Logout";

const Navbar = () => {
  const user = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get(`/user`);
      return res.data.data.user;
    },
  });

  const isLoggedIn = Boolean(user.data?._id);

  return (
    <Flex p="4" justify={isLoggedIn ? "between" : "center"}>
      <Flex gap="4" align="start">
        <Link href="/">
          <Heading>
            <strong>Tracker</strong>
          </Heading>
        </Link>
      </Flex>

      {isLoggedIn && (
        <>
          <Flex gap="4" align={"center"}>
            <Flex gap="2" align={"center"}>
              <Avatar size="1" fallback={user.data.name[0] ?? "Z"} />
              <Text>{user.data.name}</Text>
            </Flex>
            <Separator orientation="vertical" />
            <LogoutButton />
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
