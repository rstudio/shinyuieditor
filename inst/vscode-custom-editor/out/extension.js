"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const catScratchEditor_1 = require("./catScratchEditor");
function activate(context) {
    // Register our custom editor providers
    context.subscriptions.push(catScratchEditor_1.CatScratchEditorProvider.register(context));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map