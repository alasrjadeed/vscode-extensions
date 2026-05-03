class SnippetManager {
    constructor() {
        // Initialize snippets for different frameworks
        this.snippets = {
            react: [],
            node: [],
            django: [],
            fastapi: [],
        };
    }

    /**
     * Inserts a snippet into the appropriate framework snippet array.
     * @param {string} framework - The framework for which to insert the snippet.
     * @param {string} snippet - The code snippet to insert.
     */
    insertSnippet(framework, snippet) {
        if (this.snippets[framework]) {
            this.snippets[framework].push(snippet);
        } else {
            throw new Error(`Framework '${framework}' not supported.`);
        }
    }
}