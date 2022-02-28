import { Subject } from 'rxjs';

export class Operand {
    private _argumentName: string = '';
    argumentChanged$: Subject<string> = new Subject<string>();
    listeners: ((value: string) => void)[] = [];   
    
    get argumentName(): string {
        return this._argumentName;
    }

    set argumentName(value: string) {
        this._argumentName = value;
        this.argumentChanged$.next(this._argumentName);
    }
}