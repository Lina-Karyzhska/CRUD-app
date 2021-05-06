import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import UsersList from "./UsersList";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const mockUsers = [
    {
    email: "maxstep99@gmail.com",
    password: "1111q",
    _id: "123",
    isAdmin: false,
  },
  {
    email: "name@gmail.com",
    password: "1111q",
    _id: "113",
    isAdmin: false,
  }
]

const filteredMockUsers = [];

const onDelete = (id) => {
    mockUsers.forEach(user => {
        if (user._id != id) {
            filteredMockUsers.push(user)
        }
    })
}

it("delete user", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    );

    await act(async () => {
      render(<UsersList users={mockUsers} deleteUserClick={onDelete}/>, container);
    });

    expect(container.querySelectorAll(".card-header")).toHaveLength(2);

    act(() => {
        container.querySelector(".btn-outline-danger").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    await act(async () => {
      render(<UsersList users={filteredMockUsers} deleteUserClick={onDelete}/>, container);
    });

    expect(container.querySelectorAll(".card-header")).toHaveLength(1);
})