import { IHttpContext } from "../shared/IContext";
import { withAuthentication } from "../shared/auth/withAuth";

const auth0 = withAuthentication({});

export default auth0(async context => {
    context.res = {
        hello: "world!"
    };
    return;
});
