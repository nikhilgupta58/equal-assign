import React from "react";
import GenricLayout from "../../layouts/GenricLayout";
import LoginView from "./Login.view";
import LoginModal from "./components/LoginModal";
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
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <GenricLayout>
      <LoginContext.Provider value={{ cards, setIsOpen }}>
        <LoginView />
        <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </LoginContext.Provider>
    </GenricLayout>
  );
}
