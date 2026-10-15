import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <>
      <div
        className="main flex items-center justify-between"
        style={{ height: "calc(100vh - 90px)" }}
      >
        <div className="left h-[80%] w-[50%]">
          <Editor height="100%" theme="vs-dark" language="javascript" value="// some comment" />
        </div>
      </div>
    </>
  );
};

export default CodeEditor;
