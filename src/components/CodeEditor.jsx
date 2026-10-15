import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";

const CodeEditor = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "scala", label: "Scala" },
    { value: "dart", label: "Dart" },
    { value: "r", label: "R" },
    { value: "sql", label: "SQL" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "json", label: "JSON" },
    { value: "xml", label: "XML" },
    { value: "yaml", label: "YAML" },
    { value: "markdown", label: "Markdown" },
    { value: "shell", label: "Shell Script" },
    { value: "powershell", label: "PowerShell" },
  ];

  const [selectOption, setSelectedOption] = useState(options[0]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#18181b",
      borderColor: "#3f3f46",
      color: "white",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#9333ea",
      },
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#18181b",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#9333ea" : "#18181b",
      color: "white",
      cursor: "pointer",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#a1a1aa",
    }),

    input: (provided) => ({
      ...provided,
      color: "white",
    }),
  };


  const ai = new GoogleGenAI({apiKey:"GEMINI_API_KEY"});



return (
    <>
      <div
        className="main flex  justify-between p-5 gap-5"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left panel w-[50%] h-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
          {/* Top Bar */}
          <div className="tab !mt-5 !px-5 !mb-3 w-full flex items-center justify-between mb-3">
            <div className="w-[250px]">
              <Select
                value={selectOption}
                onChange={setSelectedOption}
                options={options}
                styles={customStyles}
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="btnNormal bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                Fix Code
              </button>
              <button className="btnNormal bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                Review
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectOption.value}
            value="// some comment"
            options={{ fontSize: 15, minimap: { enabled: false } }}
          />
        </div>
        <div className="left panel border-b-[1px] !border-[#fff] !p-[10px] bg-zinc-900 w-[50%] h-[100%] flex flex-col">
          <div className="topTab flex items-center justify-between h-[60px] border-b border-t border-zinc-600">
            <div>
              <div className="flex items-center gap-2">
                <span className="ai-dot"></span>
                <p className="font-bold text-[17px]">Response</p>
              </div>
              <p className="text-xs text-zinc-400">AI Generated Code Review</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
            <p className="text-xl font-semibold text-zinc-200">🚀 Ready to Review</p>
            <p className="text-zinc-400">
              Select a language, write your code in the editor, and click{" "}
              <span className="text-purple-400 font-medium">Review</span> or{" "}
              <span className="text-purple-400 font-medium">Fix Code</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeEditor;