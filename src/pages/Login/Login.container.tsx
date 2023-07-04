import React from "react";
import GenricLayout from "../../layouts/GenricLayout";
import { random1, random2, random3 } from "../../utils/assets";
import LoginView from "./Login.view";
import LoginModal from "./components/LoginModal";
import { LoginContext } from "./utils/context";

const cards = [
  {
    title: "Store your IDs securely",
    img: random1,
  },
  {
    title: "Share your IDs convinently",
    img: random2,
  },
  {
    title: "Keep your IDs protected",
    img: random3,
  },
];

export default function LoginContainer() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <GenricLayout>
      <LoginContext.Provider value={{ cards, setIsOpen }}>
        <LoginView />
        {isOpen ? (
          <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        ) : null}
      </LoginContext.Provider>
    </GenricLayout>
  );
}
