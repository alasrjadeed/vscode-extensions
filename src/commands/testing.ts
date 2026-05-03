import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from '../utils/logger';

const execAsync = promisify(exec);

export class TestRunner {
    private outputChannel: vscode.OutputChannel;

    constructor() {
        this.outputChannel = vscode.window.createOutputChannel('Test Results');
    }

    async runTests(): Promise<string> {
        this.outputChannel.show();
        this.outputChannel.clear();
        this.outputChannel.appendLine('[Tests] Starting test execution...');

        try {
            const result = await this.detectAndRunTests();
            logger.info('Tests completed');
            return result;
        } catch (error) {
            this.outputChannel.appendLine(`[Tests] Error: ${error}`);
            throw error;
        }
    }

    private async detectAndRunTests(): Promise<string> {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder open');
        }

        try {
            const { stdout } = await execAsync('npm list jest 2>/dev/null', {
                cwd: workspaceFolder.uri.fsPath
            });
            if (stdout.includes('jest')) {
                return this.runJestTests(workspaceFolder);
            }
        } catch (e) {
            // npm list failed, try pytest
        }

        try {
            await execAsync('which pytest', { cwd: workspaceFolder.uri.fsPath });
            return this.runPytestTests(workspaceFolder);
        } catch (e) {
            return 'No test framework detected';
        }
    }

    private async runJestTests(folder: vscode.WorkspaceFolder): Promise<string> {
        this.outputChannel.appendLine('[Tests] Running Jest tests...');
        const { stdout } = await execAsync('npm test', { cwd: folder.uri.fsPath });
        this.outputChannel.appendLine(stdout);
        return 'Jest tests completed';
    }

    private async runPytestTests(folder: vscode.WorkspaceFolder): Promise<string> {
        this.outputChannel.appendLine('[Tests] Running Pytest tests...');
        const { stdout } = await execAsync('pytest', { cwd: folder.uri.fsPath });
        this.outputChannel.appendLine(stdout);
        return 'Pytest tests completed';
    }
}
