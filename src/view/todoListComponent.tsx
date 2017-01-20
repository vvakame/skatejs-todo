import * as skate from "skatejs";

import TodoManager from "../model/todoManager";
import Todo from "../model/todo";

import TodoItemComponent from "./todoItemComponent";

interface TodoListProps {
    manager: TodoManager;
    list?: Todo[];
}

export default class TodoListComponent extends skate.Component<TodoListProps> {
    static get props(): skate.ComponentProps<TodoListComponent, TodoListProps> {
        return {
            manager: {
                set(elem, data) {
                    if (data.newValue) {
                        data.newValue.addOnChangeListener(elem.onListChangeListener);
                    }
                }
            },
            list: skate.prop.array<Todo>(),
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
        const todoComponentList = this.list.map(todo => {
            return <TodoItemComponent manager={this.manager} item={todo} />;
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
