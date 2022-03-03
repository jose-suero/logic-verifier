import { Argument } from "../argument";
import { Operand } from "./operand";
import { BehaviorSubject } from "rxjs";
import { operationTypes } from "./operation-types";
import { OperationTypeId } from "./operation-type-id";

export class Operation {
    leftOperand: Operand = new Operand();
    rightOperand: Operand = new Operand();
    private _type: OperationTypeId;
    argumentList: Argument[];
    private _result: boolean = false;
    resultChanged$: BehaviorSubject<boolean>;

    constructor(argumentList: Argument[]) {
        this.resultChanged$ = new BehaviorSubject<boolean>(false);
        const type = operationTypes.find(t => t.default)?.id;
        if (!type) {
            throw new Error('No default operation type found');
        }        
        this._type = type;
        
        this.leftOperand.argumentChanged$.subscribe(argumentName => this.operandArgumentChanged(this.leftOperand, argumentName));
        this.rightOperand.argumentChanged$.subscribe(argumentName => this.operandArgumentChanged(this.rightOperand, argumentName))
        this.argumentList = argumentList;
    }

    private operandArgumentChanged(operand: Operand, argumentName: string) {
        this.validate();
    }

    validate() {
        const leftOperandValue = this.argumentList.find(a => a.name === this.leftOperand.argumentName)?.value;
        const rightOperandValue = this.argumentList.find(a => a.name === this.rightOperand.argumentName)?.value;

        if (leftOperandValue === undefined || rightOperandValue === undefined) return (this.result = false);

        if (typeof leftOperandValue !== typeof rightOperandValue) return (this.result = false);

        const operationType = operationTypes.find(t => t.id === this._type);
        if (!operationType) {
            throw new Error('No operation type found');
        }

        return this.result = operationType.evalFn(leftOperandValue, rightOperandValue);
    }

    get result(): boolean {
        return this._result;
    }

    private set result(value: boolean) {
        this._result = value;
        this.emitResult();
    }

    private emitResult() {
        this.resultChanged$.next(this._result);
    }

    set type(value: OperationTypeId) {
        this._type = value;
        this.validate();
    }
}