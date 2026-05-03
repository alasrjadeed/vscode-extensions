import * as vscode from 'vscode';
import { logger } from '../utils/logger';

export class SnippetManager {
    private snippets: Map<string, string> = new Map();

    constructor() {
        this.loadSnippets();
    }

    private loadSnippets() {
        this.snippets.set('ts-react-component', this.getReactComponent());
        this.snippets.set('ts-node-server', this.getNodeServer());
        this.snippets.set('py-django-model', this.getDjangoModel());
        this.snippets.set('py-fastapi-route', this.getFastAPIRoute());
        logger.info('Snippets loaded');
    }

    async insertSnippet(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            throw new Error('No active editor');
        }

        const snippetKeys = Array.from(this.snippets.keys());
        const selected = await vscode.window.showQuickPick(snippetKeys, {
            placeHolder: 'Select a code snippet to insert'
        });

        if (selected) {
            const snippet = this.snippets.get(selected);
            const position = editor.selection.start;
            await editor.edit(editBuilder => {
                editBuilder.insert(position, snippet || '');
            });
            logger.info(`Inserted snippet: ${selected}`);
        }
    }

    private getReactComponent(): string {
        return `import React, { useState } from 'react';

interface Props {
  title: string;
}

export const MyComponent: React.FC<Props> = ({ title }) => {
  const [state, setState] = useState<string>('');

  return (
    <div className="component">
      <h1>{title}</h1>
    </div>
  );
};`;
    }

    private getNodeServer(): string {
        return `import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`;
    }

    private getDjangoModel(): string {
        return `from django.db import models

class MyModel(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name`;
    }

    private getFastAPIRoute(): string {
        return `from fastapi import FastAPI

app = FastAPI()

@app.post("/items/")
async def create_item(name: str):
    return {"status": "success", "name": name}`;
    }
}
