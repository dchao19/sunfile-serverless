import { run } from "../retrieve-article-data";
import { mockRequestData } from "../../shared/mockRequestData";
import { IHttpContext } from "../../shared/IContext";
import axios from "axios";

describe("retrieve-article-data tests", async () => {
    test("should return the correct successful response", async () => {
        const response = await axios.post("http://localhost:7071/api/article/data");
        expect(response.data).toMatchSnapshot();
    });
});
