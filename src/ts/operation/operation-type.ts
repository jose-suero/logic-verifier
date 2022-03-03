import { OperationTypeId } from "./operation-type-id";

export type OperationType = {
    name: string;
    id: OperationTypeId;
    evalFn: (leftOperand: string | boolean | number, rightOperand: string | boolean | number) => boolean;
    default: boolean;
};
