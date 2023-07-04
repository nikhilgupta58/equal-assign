import { useLoginContext } from "./utils/context";

export default function LoginView() {
  const { count } = useLoginContext();
  return <p>Login View and count is {count}</p>;
}
