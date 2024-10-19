// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import pluralize from "pluralize";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let plural = vscode.commands.registerCommand("singular-plural.plural", () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
			editor.edit(editBuilder => {
        editor.selections.forEach(selection => {
          const text = editor.document.getText(selection);
          const plural = pluralize.plural(text);
          editBuilder.replace(selection, plural);
        });
      });
    }
  });

  let singular = vscode.commands.registerCommand(
    "singular-plural.singular",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        editor.edit(editBuilder => {
					editor.selections.forEach(selection => {
						const text = editor.document.getText(selection);
						const plural = pluralize.singular(text);
						editBuilder.replace(selection, plural);
					});
				});
      }
    }
  );

  context.subscriptions.push(plural, singular);
}

// This method is called when your extension is deactivated
export function deactivate() {}
