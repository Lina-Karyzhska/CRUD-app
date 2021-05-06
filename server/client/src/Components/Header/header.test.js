import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./Header";

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

it("exit", async () => {
    const onChange = jest.fn();
    await act(async () => {
      render(
          <Router>
              <Header onChange={onChange} />
          </Router>,
          container);
    });

    act(() => {
        container.querySelector(".btn-outline-light").dispatchEvent(new MouseEvent("click", {bubbles: true}))
    })
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(container.querySelectorAll(".btn-outline-light")).toHaveLength(0)
})