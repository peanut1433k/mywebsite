import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { editor } from "monaco-editor";
import { Button } from "@/components/ui/button";
import { Indent, Trash2, Copy, Download, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  onRun?: () => void;
}

const DEFAULT_CODE = `<!DOCTYPE html>
<html>
<head>
  <title>My HTML Practice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    h1 {
      color: #3B82F6;
    }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first HTML page created in the HTMLPractice editor.</p>
  
  <h2>What I've Learned:</h2>
  <ul>
    <li>Basic HTML structure</li>
    <li>Headings and paragraphs</li>
    <li>Lists and formatting</li>
  </ul>
  
  <p>Learn more on <a href="https://www.example.com">our website</a>.</p>
</body>
</html>`;

export default function CodeEditor({ initialValue = DEFAULT_CODE, onChange, onRun }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { toast } = useToast();
  const [errors, setErrors] = useState<{ line: number; message: string }[]>([]);

  useEffect(() => {
    if (editorRef.current) {
      monaco.languages.html.htmlDefaults.setOptions({
        format: {
          tabSize: 2,
          insertSpaces: true,
        },
      });

      const editorInstance = monaco.editor.create(editorRef.current, {
        value: initialValue,
        language: "html",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: "'Fira Code', monospace",
        lineNumbers: "on",
        roundedSelection: true,
        scrollbar: {
          useShadows: false,
          verticalHasArrows: true,
          horizontalHasArrows: true,
          vertical: "visible",
          horizontal: "visible",
          verticalScrollbarSize: 12,
          horizontalScrollbarSize: 12,
        },
      });

      monacoRef.current = editorInstance;

      editorInstance.onDidChangeModelContent(() => {
        if (onChange) {
          onChange(editorInstance.getValue());
        }
        validateCode(editorInstance.getValue());
      });

      return () => {
        editorInstance.dispose();
      };
    }
  }, [initialValue, onChange]);

  const validateCode = async (code: string) => {
    try {
      const res = await apiRequest("POST", "/api/validate", { html: code });
      const data = await res.json();
      setErrors(data.errors || []);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  const formatCode = () => {
    if (monacoRef.current) {
      monacoRef.current.getAction("editor.action.formatDocument").run();
      toast({
        title: "Code formatted",
        description: "Your HTML code has been formatted",
      });
    }
  };

  const clearEditor = () => {
    if (monacoRef.current) {
      monacoRef.current.setValue("");
      toast({
        title: "Editor cleared",
        description: "The editor has been cleared",
      });
    }
  };

  const copyCode = () => {
    if (monacoRef.current) {
      const code = monacoRef.current.getValue();
      navigator.clipboard.writeText(code);
      toast({
        title: "Code copied",
        description: "Your HTML code has been copied to clipboard",
      });
    }
  };

  const downloadCode = () => {
    if (monacoRef.current) {
      const code = monacoRef.current.getValue();
      const blob = new Blob([code], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "index.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Code downloaded",
        description: "Your HTML code has been downloaded as index.html",
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Code Editor</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={formatCode} 
            title="Format Code"
          >
            <Indent className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={clearEditor} 
            title="Clear Editor"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={copyCode} 
            title="Copy Code"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={downloadCode} 
            title="Download"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 p-3 text-white flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4 text-sm">index.html</div>
        </div>
        <div ref={editorRef} className="h-96"></div>
      </div>
      {errors.length > 0 ? (
        <div className="text-red-500 text-sm flex items-center">
          <i className="fas fa-exclamation-circle mr-2"></i>
          <span>{errors[0].message}</span>
        </div>
      ) : (
        <div className="text-green-500 text-sm flex items-center">
          <i className="fas fa-check-circle mr-2"></i>
          <span>No errors found!</span>
        </div>
      )}
    </div>
  );
}
