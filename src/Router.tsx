import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { userStore } from "./store";

export default function Router() {
  const [session] = userStore((state) => [state.session]);
  if (!session) return <Login />;

  return <Home />;
}
