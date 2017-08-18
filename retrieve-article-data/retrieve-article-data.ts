import { IHttpContext } from "../shared/IContext";
import axios from "axios";
import * as jQuery from "jquery";
import { JSDOM } from "jsdom";

export async function run(context: IHttpContext) {
    context.log("retrieve-article-data function processed a request");
    const { window } = new JSDOM("");

    var $ = require("jquery")(window) as JQueryStatic;
    var preStrip = $("<div/>").html(context.req.rawBody);
    var html = preStrip
        .find(".last-update,.fyre,style,script,.layout-detail-page__footer,.teaser__byline")
        .remove()
        .end()
        .html();

    let watsonDataRequest = axios.post(
        "https://gateway.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2017-02-27",
        {
            html,
            language: "en",
            return_analyzed_text: true,
            features: {
                metadata: {},
                keywords: {
                    limit: 5
                }
            }
        },
        {
            headers: {
                "Content-Type": "application/json"
            },
            auth: {
                username: process.env.WATSON_USERNAME,
                password: process.env.WATSON_PASSWORD
            }
        }
    );

    try {
        let watson = await watsonDataRequest;

        const paragraphs = watson.data.analyzed_text.split("\n").map(paragraphContent => {
            return {
                paragraphContent
            };
        });

        const keywords = watson.data.keywords.map(keyword => keyword.text);

        context.res = {
            message: "success",
            success: true,
            result: {
                title: watson.data.metadata.title,
                keywords,
                text: watson.data.analyzed_text,
                paragraphs,
                pubDate: watson.data.metadata.publication_date
            }
        };
    } catch (error) {
        context.res = {
            success: false,
            errorMessage: "An internal server error ocurred while parsing the article",
            errorCode: 500
        };
    }
}
