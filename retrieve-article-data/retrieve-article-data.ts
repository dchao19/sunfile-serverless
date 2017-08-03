export async function run(context, request) {
    context.log("retrieve-article-data function processed a request");

    context.res = {
        hello: "world!"
    };

    context.done();
};