import * as vscode from 'vscode';
import { AIServices } from './services/aiServices';
import { CodeLinter } from './services/linter';
import { CodeFormatter } from './services/formatter';
import { BuildPipeline } from './services/pipeline';
import { SnippetManager } from './commands/snippets';
import { TestRunner } from './commands/testing';
import { logger } from './utils/logger';

let aiServices: AIServices;
let linter: CodeLinter;
let formatter: CodeFormatter;
let pipeline: BuildPipeline;
let snippets: SnippetManager;
let testRunner: TestRunner;

export function activate(context: vscode.ExtensionContext) {
    logger.info('VS Code AI Services Extension activated');

    aiServices = new AIServices(context);
    linter = new CodeLinter();
    formatter = new CodeFormatter();
    pipeline = new BuildPipeline(context);
    snippets = new SnippetManager();
    testRunner = new TestRunner();

    registerCommands(context);
    registerEventListeners(context);

    logger.info('All services initialized successfully');
}

function registerCommands(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.aiServices', async () => {
            try {
                const result = await aiServices.analyzeCode();
                vscode.window.showInformationMessage('AI Analysis: ' + result);
            } catch (error) {
                logger.error('AI analysis failed', error);
                vscode.window.showErrorMessage('AI analysis failed');
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.lintCode', async () => {
            try {
                const issues = await linter.lint();
                vscode.window.showInformationMessage(`Found ${issues.length} linting issues`);
            } catch (error) {
                logger.error('Linting failed', error);
                vscode.window.showErrorMessage('Linting failed');
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.formatCode', async () => {
            try {
                await formatter.format();
                vscode.window.showInformationMessage('Code formatted successfully');
            } catch (error) {
                logger.error('Formatting failed', error);
                vscode.window.showErrorMessage('Formatting failed');
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.insertSnippet', async () => {
            try {
                await snippets.insertSnippet();
            } catch (error) {
                logger.error('Snippet insertion failed', error);
                vscode.window.showErrorMessage('Snippet insertion failed');
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.runTests', async () => {
            try {
                const results = await testRunner.runTests();
                vscode.window.showInformationMessage(`Tests completed: ${results}`);
            } catch (error) {
                logger.error('Test execution failed', error);
                vscode.window.showErrorMessage('Test execution failed');
            }
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.deployPipeline', async () => {
            try {
                await pipeline.triggerBuild();
                vscode.window.showInformationMessage('Build pipeline triggered');
            } catch (error) {
                logger.error('Pipeline trigger failed', error);
                vscode.window.showErrorMessage('Pipeline trigger failed');
            }
        })
    );
}

function registerEventListeners(context: vscode.ExtensionContext) {
    vscode.workspace.onDidSaveTextDocument(async (doc) => {
        const config = vscode.workspace.getConfiguration('aiServices');
        if (config.get('autoFormat')) {
            try {
                await formatter.format();
            } catch (error) {
                logger.error('Auto-format on save failed', error);
            }
        }
    });

    vscode.workspace.onDidChangeTextDocument(async (event) => {
        const config = vscode.workspace.getConfiguration('aiServices');
        if (config.get('lintingEnabled')) {
            try {
                await linter.lintDocument(event.document);
            } catch (error) {
                logger.error('Linting on change failed', error);
            }
        }
    });
}

export function deactivate() {
    logger.info('VS Code AI Services Extension deactivated');
}
