import LoginView from "./Login.view";
import { LoginContext } from "./utils/context";

export default function LoginContainer() {
  return (
    <LoginContext.Provider value={{}}>
      <LoginView />
    </LoginContext.Provider>
  );
}
