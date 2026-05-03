import * as vscode from 'vscode';

enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

class Logger {
  private outputChannel: vscode.OutputChannel;
  private level: LogLevel = LogLevel.INFO;

  constructor() {
    this.outputChannel = vscode.window.createOutputChannel('AI Services Extension');
  }

  setLevel(level: LogLevel) {
    this.level = level;
  }

  debug(message: string, data?: any) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.outputChannel.appendLine(`[${LogLevel.DEBUG}] ${message}`);
      if (data) console.debug(data);
    }
  }

  info(message: string, data?: any) {
    if (this.shouldLog(LogLevel.INFO)) {
      this.outputChannel.appendLine(`[${LogLevel.INFO}] ${message}`);
      if (data) console.info(data);
    }
  }

  warn(message: string, data?: any) {
    if (this.shouldLog(LogLevel.WARN)) {
      this.outputChannel.appendLine(`[${LogLevel.WARN}] ${message}`);
      if (data) console.warn(data);
    }
  }

  error(message: string, error?: any) {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.outputChannel.appendLine(`[${LogLevel.ERROR}] ${message}`);
      if (error) console.error(error);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  show() {
    this.outputChannel.show();
  }
}

export const logger = new Logger();
