import * as vscode from 'vscode';
import { logger } from '../utils/logger';

export class CodeFormatter {
    async format(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            throw new Error('No active editor');
        }

        const language = editor.document.languageId;
        logger.info(`Formatting ${language} code`);

        await vscode.commands.executeCommand('editor.action.formatDocument');
    }
}
