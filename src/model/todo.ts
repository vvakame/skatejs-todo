export interface TodoRaw {
    text: string;
    done?: boolean;
    dueDate: Date;
}

export default class Todo {
    readonly text: string;
    readonly done: boolean;
    readonly dueDate: Date;

    constructor(v: TodoRaw) {
        this.text = v.text;
        this.done = !!v.done;
        this.dueDate = v.dueDate;
    }

    get delayed(): boolean {
        return this.dueDate.getTime() < Date.now();
    }
}
