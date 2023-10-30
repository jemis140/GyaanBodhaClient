import axios from "axios";
import { getArticleSummary } from "./articleAPI"; // Replace with the correct path to your articleAPI.js

describe("getArticleSummary", () => {
  it("should make a POST request to the correct URL with the article URL and authorization token", async () => {
    const articleUrl = "https://fs.blog/the-impoverishment-of-attention/";
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplbWlzemFkYWZpeWEwMDBAZ21haWwuY29tIiwiZXhwIjoxNjk4MzQzODg5fQ.wzH-TdawK46_8dyau8ut-2nHodKNFRzFb1k3YedJwa8";

    await getArticleSummary(articleUrl);

    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/getarticlesummary",
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
  });

  it("should return the response data on a successful request", async () => {
    const articleUrl = "https://fs.blog/the-impoverishment-of-attention/";
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplbWlzemFkYWZpeWEwMDBAZ21haWwuY29tIiwiZXhwIjoxNjk4MzQzODg5fQ.wzH-TdawK46_8dyau8ut-2nHodKNFRzFb1k3YedJwa8";

    const responseData = { summary: "Mocked article summary" };

    const response = await getArticleSummary(articleUrl);

    expect(response).toEqual(responseData);
  });

  it("should handle errors and return a default response", async () => {
    const articleUrl = "";

    axios.post.mockRejectedValue(new Error("Internal Server Error")); // Match the error message

    const response = await getArticleSummary(articleUrl);

    expect(response).toEqual({
      status: 500,
      data: { error: "Internal Server Error" },
    });
  });
});
