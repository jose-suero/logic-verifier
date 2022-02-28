export class Argument {
    name: string;
    value: string | number | boolean = '';
    readonly id: string;

    constructor(name: string) {
        const rand = Math.round(Math.random() * 1000000);
        this.id = new Date().getTime().toString() + rand.toString();
        this.name = name;
    }
}