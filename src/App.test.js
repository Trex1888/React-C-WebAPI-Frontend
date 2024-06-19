import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render out objects", async () => {
  render(<App />);
  const contacts = [
    { name: "Bob", age: 17, email: "bob@bob.com" },
    { name: "Red", age: 63, email: "red@red.com" },
  ];

  contacts.forEach((contact) => {
    expect(screen.getByText(contact.name)).toBeInTheDocument();
    expect(screen.getByText(contact.age)).toBeInTheDocument();
    expect(screen.getByText(contact.email)).toBeInTheDocument();
  });
});
