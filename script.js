require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.43.0/min/vs' } });
require(['vs/editor/editor.main'], function() {
    const editorElement = document.getElementById('editor');

    // Create editor instance
    const editor = monaco.editor.create(editorElement, {
        value: "-- discord.gg/WYt9ysVc",
        language: 'lua',
        theme: 'vs-dark',
        fontSize: 16,
        fontFamily: 'JetBrains Mono',
        automaticLayout: true
    });

    // Ensure the editor is ready before accessing its API
    editor.onDidLayoutChange(() => {
        editor.layout(); // Refresh layout
        editor.focus();  // Focus the editor to enable cursor
    });

    // Fix for WebView2 cursor rendering issue
    setTimeout(() => {
        editor.layout(); // Re-layout to fix cursor alignment
        editor.focus();  // Focus to ensure cursor visibility
    }, 200);

    // Lua autocomplete suggestions
    monaco.languages.registerCompletionItemProvider('lua', {
        provideCompletionItems: () => {
            const suggestions = [
                { label: 'script', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'script' },
                { label: 'game', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'game' },
                { label: 'LocalPlayer', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'LocalPlayer' },
                { label: 'Players', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Players' },
                { label: 'Parent', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Parent' },
                { label: 'Workspace', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Workspace' },
                { label: 'Humanoid', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Humanoid' },
                { label: 'CFrame', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'CFrame' },
                { label: 'Vector3', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Vector3' },
                { label: 'Instance', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Instance' },
                { label: 'FindFirstChild', kind: monaco.languages.CompletionItemKind.Function, insertText: 'FindFirstChild()' },
                { label: 'SetPrimaryPartCFrame', kind: monaco.languages.CompletionItemKind.Function, insertText: 'SetPrimaryPartCFrame()' },
                { label: 'GetService', kind: monaco.languages.CompletionItemKind.Function, insertText: 'GetService()' },
                { label: 'Wait', kind: monaco.languages.CompletionItemKind.Function, insertText: 'Wait()' },
                { label: 'print', kind: monaco.languages.CompletionItemKind.Function, insertText: 'print()' },
                { label: 'Instance.new', kind: monaco.languages.CompletionItemKind.Function, insertText: 'Instance.new()' },
                { label: 'TweenService', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'TweenService' },
                { label: 'Debris', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Debris' },
                { label: 'ReplicatedStorage', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'ReplicatedStorage' },
                { label: 'Sound', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Sound' },
                { label: 'Color3', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'Color3' },
                { label: 'part', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'part' },
                { label: 'BrickColor', kind: monaco.languages.CompletionItemKind.Variable, insertText: 'BrickColor' },
            ];
            return { suggestions };
        }
    });

    // Lua syntax highlighting
    monaco.languages.setMonarchTokensProvider('lua', {
        tokenizer: {
            root: [
                [/\b(script|game|LocalPlayer|Players|Parent|Workspace|Humanoid|CFrame|Vector3|Instance|FindFirstChild|SetPrimaryPartCFrame|GetService|Wait|print|Instance\.new|TweenService|Debris|ReplicatedStorage|Sound|Color3|part|BrickColor)\b/, 'keyword'],
                [/".*?"/, 'string'],
                [/[{}()[\]]/, '@brackets'],
                [/[+-/*=<>!~]/, 'operator']
            ]
        }
    });

    // Example: Get and set editor values
    window.getEditorValue = () => editor.getValue();
    window.setEditorValue = (value) => editor.setValue(value);

    // Focus the editor to activate cursor
    editor.focus();
});
