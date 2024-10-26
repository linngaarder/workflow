import { logout } from "./logout";

globalThis.localStorage = { removeItem: jest.fn() };

describe("logout", () => {
  it("Removes token and profile from local storage", () => {
    logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(localStorage.removeItem).toHaveBeenCalledWith("profile");
  });
});
