import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";

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

  return (
    <>
      <div
        className="main flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[80%] w-[50%]">
          <div className="mb-4 w-[250px]">
            <div className="tab">
              <Select
                value={selectOption}
                onChange={(e) => {
                  setSelectedOption(e);
                }}
                options={options}
                styles={customStyles}
              />
              <button className="btnNormal bg-zinc-900 min-w-[120px]">
                Review
              </button>
            </div>
          </div>

          <Editor
            height="100%"
            theme="vs-dark"
            language={selectOption.value}
            value="// some comment"
          />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
