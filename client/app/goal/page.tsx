import { useQuery } from "@tanstack/react-query";

export default function GoalPage() {
  const {} = useQuery({
    queryKey: ["user"],
    queryFn: () => {},
  });
}
