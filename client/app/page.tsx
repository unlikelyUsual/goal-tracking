import LoginForm from "./components/Auth/LoginForm";
import Dashboard from "./dashboard/page";
import { getUser } from "./utils/isVerified";

export default async function HomePage() {
  const user: any = await getUser();
  if (!user || user == null || !user?.data) {
    return <LoginForm />;
  }
  return <Dashboard />;
}
