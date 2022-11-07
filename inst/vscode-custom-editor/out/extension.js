"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const shinyuieditor_extension_1 = require("./shinyuieditor_extension");
function activate(context) {
    // Register our custom editor providers
    context.subscriptions.push(shinyuieditor_extension_1.ShinyUiEditorProvider.register(context));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map