import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.bindings.signalRMessages = [{
        target: "newMessage",
        arguments: [ req.body ]
    }];

    context.res = {
        status: 201
    };
};

export default httpTrigger;