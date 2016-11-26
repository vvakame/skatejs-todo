import "tslib";
import "skatejs-web-components";

(window as any).__extends = function(d: any, b: any) {
    Object.setPrototypeOf(d, b);
    var __: any = function() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

import "./view/todoAppComponent";
