import * as skate from "skatejs";

import TodoManager from "../model/todoManager";
import Todo from "../model/todo";

interface TodoEditProps {
    manager: TodoManager;
    text?: string;
    dueDate?: Date;
}

export default class TodoEditComponent extends skate.Component<TodoEditProps> {
    static get props(): skate.ComponentProps<TodoEditComponent, TodoEditProps> {
        return {
            manager: {},
            text: skate.prop.string(),
            dueDate: {
                default: () => {
                    return new Date(Date.now() + 1 * 24 * 60 * 1000);
                }
            },
        };
    }

    manager: TodoManager;
    text: string;
    dueDate: Date;

    add() {
        if (!this.text) {
            return;
        }
        this.manager.add({
            text: this.text,
            dueDate: this.dueDate,
        });
        this.text = "";
    }

    onTextChange(e: Event) {
        const el = e.target as HTMLInputElement;
        this.text = el.value;
    }

    onDueDateChange(e: Event) {
        const el = e.target as HTMLInputElement;
        this.dueDate = el.valueAsDate;
    }

    renderCallback() {
        return (
            <div>
                <input type="text" value={this.text} onChange={e => this.onTextChange(e)} />
                <input type="date" valueAsDate={this.dueDate} onChange={e => this.onDueDateChange(e)} />
                <button onClick={e => this.add()}>Add</button>
            </div>
        );
    }
}
customElements.define("todo-edit", TodoEditComponent);
