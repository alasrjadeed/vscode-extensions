// src/extension.ts

// Import necessary modules and services
import { AIServices } from './services/AIServices';
import { CodeLinter } from './services/CodeLinter';
import { CodeFormatter } from './services/CodeFormatter';
import { BuildPipeline } from './services/BuildPipeline';
import { SnippetManager } from './services/SnippetManager';
import { TestRunner } from './services/TestRunner';
import * as vscode from 'vscode';

// This method is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {
    // Initialize services
    const aiServices = new AIServices();
    const codeLinter = new CodeLinter();
    const codeFormatter = new CodeFormatter();
    const buildPipeline = new BuildPipeline();
    const snippetManager = new SnippetManager();
    const testRunner = new TestRunner();

    // Register commands for AI analysis, linting, formatting, snippets, testing, and deployment
    context.subscriptions.push(
        vscode.commands.registerCommand('extension.analyzeCode', () => aiServices.analyzeCode()),
        vscode.commands.registerCommand('extension.lintCode', () => codeLinter.lintCode()),
        vscode.commands.registerCommand('extension.formatCode', () => codeFormatter.formatCode()),
        vscode.commands.registerCommand('extension.buildProject', () => buildPipeline.build()),
        vscode.commands.registerCommand('extension.insertSnippet', () => snippetManager.insertSnippet()),
        vscode.commands.registerCommand('extension.runTests', () => testRunner.runTests()),
        vscode.commands.registerCommand('extension.deploy', () => buildPipeline.deploy()),
    );
}

// This method is called when your extension is deactivated
export function deactivate() {
    // Clean up resources if necessary
}
