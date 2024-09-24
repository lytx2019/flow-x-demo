import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('flow-x.code-review', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

            // 这里可以替换为具体的建议逻辑
            const suggestion = `建议：优化 ${selectedText}`;

            const accept = await vscode.window.showInformationMessage(suggestion, '接受', '取消');
            if (accept === '接受') {
                // 更新代码逻辑
                await editor.edit(editBuilder => {
                    editBuilder.replace(selection, `优化后的代码`);
                });

                // 显示 Diff
                const oldText = selectedText;
                const newText = `优化后的代码`;
                const diff = `变更：\n- ${oldText}\n+ ${newText}`;
                vscode.window.showInformationMessage(diff);
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
