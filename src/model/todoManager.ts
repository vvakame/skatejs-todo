import Todo, { TodoRaw } from "./todo";

type OnChangeListener = (todoList: Todo[]) => void;

export default class TodoManager {
    private list: Todo[] = [];
    private onChangeListeners: OnChangeListener[] = [];

    addOnChangeListener(listener: OnChangeListener) {
        this.onChangeListeners.push(listener);
        listener(this.list);
    }

    removeOnChangeListener(listener: OnChangeListener) {
        this.onChangeListeners = this.onChangeListeners.filter(l => l !== listener);
    }

    add(todo: TodoRaw) {
        this.list = [new Todo(todo), ...this.list];
        this.sort();
        this.notify();
    }

    complete(todo: Todo) {
        this.list = this.list.filter(v => v !== todo).concat([new Todo({...todo, done: true})]);
        this.sort();
        this.notify();
    }

    private notify() {
        this.onChangeListeners.forEach(listener => listener(this.list));
    }

    private sort() {
        // priority
        //   1. not yet > done
        //   2. due date 
        this.list.sort((a, b) => {
            if (a.done && !b.done) {
                return 1;
            } else if (!a.done && b.done) {
                return -1;
            } else {
                return a.dueDate.getTime() - b.dueDate.getTime();
            }
        });
    }

    clear() {
        this.list = this.list.filter(todo => !todo.done);
        this.notify();
    }

    delete(idx: number): void;
    delete(todo: Todo): void;
    delete(v: number | Todo): void {
        if (typeof v === "number") {
            this.list.splice(v, 1)[0];
        } else {
            this.list.filter(todo => v !== todo);
        }
        this.notify();
    }
}
