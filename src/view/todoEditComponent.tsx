import * as skate from "skatejs";

import TodoManager from "../model/todoManager";
import Todo from "../model/todo";

export default class TodoEditComponent extends skate.Component implements skate.OnRenderCallback {
    static get props() {
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
        const anyProps: any = {};
        return (
            <div>
                <input type="text" value={this.text} onChange={e => this.onTextChange(e)} {...anyProps} />
                <input type="date" valueAsDate={this.dueDate} onChange={e => this.onDueDateChange(e)} {...anyProps} />
                <button onClick={e => this.add()}>Add</button>
            </div>
        );
    }
}
customElements.define("todo-edit", TodoEditComponent);
