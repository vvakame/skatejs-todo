import * as skate from "skatejs";

import TodoManager from "../model/todoManager";
import Todo from "../model/todo";

import TodoItemComponent from "./todoItemComponent";

export default class TodoListComponent extends skate.Component implements skate.OnRenderCallback {
    static get props() {
        return {
            manager: {
                set(elem: TodoListComponent, data: { name: string; newValue: TodoManager; }) {
                    data.newValue.addOnChangeListener(elem.onListChangeListener)
                }
            },
            list: skate.prop.array(),
        };
    }

    manager: TodoManager;
    list: Todo[] = [];

    constructor() {
        super();
        this.onListChangeListener = this.onListChangeListener.bind(this);
    }

    disconnectedCallback() {
        this.manager.removeOnChangeListener(this.onListChangeListener);
        super.disconnectedCallback();
    }

    onListChangeListener(list: Todo[]) {
        this.list = list;
    }

    clear() {
        this.manager.clear();
    }

    renderCallback() {
        const anyProps: any = {};
        const todoComponentList = this.list.map(todo => {
            return <TodoItemComponent manager={this.manager} item={todo} {...anyProps} />;
        });
        return (
            <div>
                <div>{todoComponentList}</div>
                <button onClick={e => this.clear()}>Clear</button>
            </div>
        );
    }
}
customElements.define("todo-list", TodoListComponent);
