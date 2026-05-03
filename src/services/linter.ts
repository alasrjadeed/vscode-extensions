import * as vscode from 'vscode';
import { logger } from '../utils/logger';

export class CodeLinter {
    private diagnosticCollection: vscode.DiagnosticCollection;

    constructor() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('ai-linter');
    }

    async lint(): Promise<any[]> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            throw new Error('No active editor');
        }
        return this.lintDocument(editor.document);
    }

    async lintDocument(document: vscode.TextDocument): Promise<any[]> {
        const language = document.languageId;
        logger.info(`Linting ${language} document`);

        const issues: any[] = [];
        this.diagnosticCollection.set(document.uri, []);
        return issues;
    }
}
