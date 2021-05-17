import { TableEntity } from "@azure/data-tables";
import { UserWithSecurityAttrs } from "./User";

export interface UserAsTableEntity extends TableEntity<Omit<UserWithSecurityAttrs, "securityAnswers">> {
    securityAnswers: string
}

export function UserToTableEntity(user: UserWithSecurityAttrs): UserAsTableEntity {
    return {
        ...user,
        securityAnswers: JSON.stringify(user.securityAnswers),
        partitionKey: user.username,
        rowKey: user.username
    };
}

export function UserFromTableEntity(user: UserAsTableEntity): UserWithSecurityAttrs {
    return {
        username: user.username,
        passwordHash: user.passwordHash,
        securityAnswers: JSON.parse(user.securityAnswers)
    }
}

export { UserWithSecurityAttrs }