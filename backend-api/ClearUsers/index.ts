import { AzureFunction, Context } from "@azure/functions"
import { TableClient } from "@azure/data-tables";
import { UserTableName, DefaultOperationOptions } from "../models/Settings";

const timerTrigger: AzureFunction = async function (context: Context, myTimer: any): Promise<void> {
    const tableClient = TableClient.fromConnectionString(
        process.env["StorageAccountConnectionString"], UserTableName);

    try {
        await tableClient.delete(DefaultOperationOptions)
    } catch (err) {
        if (err.details?.odataError?.code !== "ResourceNotFound") {
            throw err;
        }
    }
};

export default timerTrigger;
