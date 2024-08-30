import * as module from "./index"; // Adjust the import path as necessary
import api from "./api";
import apiEndPoint from "./endpoint";

describe("API and API Endpoint Module Exports", () => {
  test("should correctly export the api module", () => {
    expect(module.api).toBe(api);
  });

  test("should correctly export the apiEndPoint module", () => {
    expect(module.apiEndPoint).toBe(apiEndPoint);
  });
});
