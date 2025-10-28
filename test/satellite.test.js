const request = require("request");
const { getTable } = require("../src/satellite");

jest.mock("request");
jest.mock("fs");

jest.mock("cheerio", () => ({
  load: jest.fn().mockReturnValue({
    find: jest.fn().mockReturnThis(),
    text: jest.fn().mockReturnValue("dummy"),
    eq: jest.fn().mockReturnThis(),
    attr: jest.fn().mockReturnValue("dummy.png"),
  }),
}));

jest.mock("../src/utils", () => ({
  get_options: jest.fn(),
  post_options: jest.fn(),
  image_options: jest.fn(),
  getTimestamp: jest.fn().mockReturnValue(1000),
  md5: jest.fn().mockReturnValue("fakeid"),
}));

describe("getTable", () => {
  const mockConfig = {
    target: "123",
    pages: 1,
    root: "./",
    counter: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should handle failed request gracefully", () => {
    request.mockImplementation((opts, cb) => cb("Error", null));

    expect(() => getTable(mockConfig)).not.toThrow();
  });

 
});
