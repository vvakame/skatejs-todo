import * as skate from "skatejs";

import TodoManager from "../model/todoManager";
import Todo from "../model/todo";

import TodoEditComponent from "./todoEditComponent";
import TodoListComponent from "./todoListComponent";

interface TodoAppProps {
    manager: TodoManager;
}

export default class TodoAppComponent extends skate.Component<TodoAppProps> {
    static get props(): skate.ComponentProps<TodoAppComponent, TodoAppProps> {
        return {
            manager: {
                default: () => new TodoManager(),
            },
        };
    }

    manager: TodoManager;

    renderCallback() {
        return (
            <div>
                <h1>TODO List</h1>
                <TodoEditComponent manager={this.manager} />
                <hr />
                <TodoListComponent manager={this.manager} />
            </div>
        );
    }
}
customElements.define("todo-app", TodoAppComponent);
