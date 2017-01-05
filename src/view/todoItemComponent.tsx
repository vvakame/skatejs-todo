import * as skate from "skatejs";

import Todo from "../model/todo";
import TodoManager from "../model/todoManager";

interface TodoItemProps {
    manager: TodoManager;
    item: Todo;
}

export default class TodoItemComponent extends skate.Component<TodoItemProps> {
    static get props(): skate.ComponentProps<TodoItemComponent, TodoItemProps> {
        return {
            manager: {},
            item: {},
        };
    }

    manager: TodoManager;
    item: Todo;

    complete() {
        this.manager.complete(this.item);
    }

    renderCallback() {
        return (
            <div>
                <span>{`${this.item.done}`}</span>
                <span>{this.item.text}</span>
                <span>{this.item.dueDate.toLocaleString()}</span>
                <button onClick={e => this.complete()}>Done!</button>
            </div>
        );
    }
}
customElements.define("todo-item", TodoItemComponent);
