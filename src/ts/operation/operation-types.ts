import { OperationType } from "./operation-type";

export const operationTypes: OperationType[] = [
    {
        name: 'Equal', id: 'eq', evalFn: (leftOperand: string | boolean | number, rightOperand: string | boolean | number): boolean => {
            return leftOperand === rightOperand;
        }, default: true
    },
    {
        name: 'Not Equal', id: 'ne', evalFn: (leftOperand: string | boolean | number, rightOperand: string | boolean | number): boolean => {
            return leftOperand !== rightOperand;
        }, default: false
    },
    {
        name: 'Greater Than', id: 'gt', evalFn: (leftOperand: string | boolean | number, rightOperand: string | boolean | number): boolean => {
            return leftOperand > rightOperand;
        }, default: false
    },
    {
        name: 'Greater Than or Equal', id: 'ge', evalFn: (leftOperand: string | boolean | number, rightOperand: string | boolean | number): boolean => {
            return leftOperand >= rightOperand;
        }, default: false
    },
    {
        name: 'Less Than', id: 'lt', evalFn: (leftOperand: string | boolean | number, rightOperand: string | boolean | number): boolean => {
            return leftOperand < rightOperand;
        }, default: false
    },
    {
        name: 'Less Than or Equal', id: 'le', evalFn: (leftOperand: string | boolean | number, rightOperand: string | boolean | number): boolean => {
            return leftOperand <= rightOperand;
        }, default: false
    }
];
