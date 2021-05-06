import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./User";

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

  let fakeUser = {
    email: "maxstep99@gmail.com",
    password: "1111q",
    userId: "123",
    isAdmin: false,
  };

  const fakeProfile = {
      userId: "123",
      name: "Roma",
      birthdate: new Date("2021-04-27"),
      gender: "male",
      city: "Kyiv"
  }


  
  it("renders user data", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([fakeProfile])
      })
    );
    
    await act(async () => {
      render(<User email={fakeUser.email} password={fakeUser.password} userId={fakeUser.userId} isAdmin={fakeUser.isAdmin} changeUser={()=>{}}/>, container);
    });

    expect(container.querySelector("span").textContent).toBe(fakeUser.email);
    expect(container.querySelector("input[name='password']").value).toBe(fakeUser.password);
    expect(container.querySelector(".btn-outline-success").textContent).toBe("Set user to admin");
  
    expect(container.querySelector("tbody input[name='name']").value).toContain(fakeProfile.name);
    expect(container.querySelector("tbody select").textContent).toContain(fakeProfile.gender);
    expect(new Date(container.querySelector(".react-datepicker-wrapper input").value)).toStrictEqual(fakeProfile.birthdate);
    expect(container.querySelector("tbody input[name='city']").value).toContain(fakeProfile.city);

    global.fetch.mockRestore();
  });



  it("renders user without profiles", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    );
    
    await act(async () => {
      render(<User email={fakeUser.email} password={fakeUser.password} userId={fakeUser.userId} isAdmin={fakeUser.isAdmin} changeUser={()=>{}}/>, container);
    });

    expect(container.querySelector("span").textContent).toBe(fakeUser.email);
    expect(container.querySelector("input[name='password']").value).toBe(fakeUser.password);
    expect(container.querySelector(".btn-outline-success").textContent).toBe("Set user to admin");
  
    expect(container.querySelector("tbody").textContent).toContain("This user haven't profiles yet.");

    global.fetch.mockRestore();
  });



  it("changes password", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([])
      })
    );
    
    await act(async () => {
      render(<User email={fakeUser.email} password={fakeUser.password} userId={fakeUser.userId} isAdmin={fakeUser.isAdmin} changeUserClick={()=>{}}/>, container);
    });

    act(() => {
      document.querySelector(".btn-outline-info").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    expect(container.querySelector(".btn-outline-info").textContent).toContain("Save");
    
    const newPassword = "11122w";

    await act(async () => {
      document.querySelector("input[name='password']").value = newPassword;
      container.querySelector(".btn-outline-info").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    expect(container.querySelector(".btn-outline-info").textContent).toContain("Change password");
    expect(container.querySelector("input[name='password']").value).toContain(newPassword);

    global.fetch.mockRestore();
  })



  it("sets user to admin", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([fakeProfile])
      })
    );
    
    await act(async () => {
      render(<User email={fakeUser.email} password={fakeUser.password} userId={fakeUser.userId} isAdmin={fakeUser.isAdmin} changeUserClick={()=>{}}/>, container);
    });

    act(() => {
      document.querySelector(".btn-outline-success").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    expect(container.querySelector(".btn-outline-success").textContent).toContain("Admin");

    global.fetch.mockRestore();
  })

  

  it("delete profile", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([fakeProfile])
      })
    );

    await act(async () => {
      render(<User email={fakeUser.email} password={fakeUser.password} userId={fakeUser.userId} isAdmin={fakeUser.isAdmin} changeUserClick={()=>{}}/>, container);
    });
    
    await act( async() => {
      document.querySelector(".btn-danger").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    expect(container.querySelector("tbody").textContent).toContain("This user haven't profiles yet.")

    global.fetch.mockRestore();
  })



  it("edit profile", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([fakeProfile])
      })
    );

    await act(async () => {
      render(<User email={fakeUser.email} password={fakeUser.password} userId={fakeUser.userId} isAdmin={fakeUser.isAdmin} changeUser={()=>{}}/>, container);
    });
    
    act(() => {
      document.querySelector(".btn-info").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    expect(container.querySelectorAll("tbody .btn-success")).toHaveLength(1);

    const newName = "Max";

    act(() => {
      document.querySelector("input[name='name']").value = newName;
    })

    expect(container.querySelector("input[name='name']").value).toContain(newName);

    await act(async () => {
      container.querySelector(".btn-success").dispatchEvent(new MouseEvent("click", { bubbles: true }));
    })

    expect(container.querySelectorAll("tbody .btn-success")).toHaveLength(0);
    expect(container.querySelector("input[name='name']").value).toContain(newName);

    global.fetch.mockRestore();
  })