import * as skate from "skatejs";

import TodoManager from "../model/todoManager";
import Todo from "../model/todo";

import TodoEditComponent from "./todoEditComponent";
import TodoListComponent from "./todoListComponent";

export default class TodoAppComponent extends skate.Component implements skate.OnRenderCallback {
    static get props() {
        return {
            manager: {
                default: () => new TodoManager(),
            },
        };
    }

    manager: TodoManager;

    renderCallback() {
        const anyProps: any = {};
        return (
            <div>
                <h1>TODO List</h1>
                <TodoEditComponent manager={this.manager} {...anyProps} />
                <hr />
                <TodoListComponent manager={this.manager} {...anyProps} />
            </div>
        );
    }
}
customElements.define("todo-app", TodoAppComponent);
