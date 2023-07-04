import GenricLayout from "../../layouts/GenricLayout";
import LoginView from "./Login.view";
import { LoginContext } from "./utils/context";

const cards = [
  {
    title: "Store your IDs securely",
  },
  {
    title: "Share your IDs convinently",
  },
  {
    title: "Keep your IDs protected",
  },
];

export default function LoginContainer() {
  return (
    <GenricLayout>
      <LoginContext.Provider value={{ cards }}>
        <LoginView />
      </LoginContext.Provider>
    </GenricLayout>
  );
}
