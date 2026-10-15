import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import Select from "react-select";

const CodeEditor = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(options[0]);

  return (
    <div
      className="main flex"
      style={{ height: "calc(100vh - 90px)" }}
    >
      <div className="left w-1/2 h-full p-4">
        <div className="mb-4 w-60">
          <Select
            value={selectedLanguage}
            onChange={setSelectedLanguage}
            options={options}
          />
        </div>

        <MonacoEditor
          height="80vh"
          theme="vs-dark"
          language={selectedLanguage.value}
          value="// some comment"
        />
      </div>
    </div>
  );
};

export default CodeEditor;