import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { RingLoader } from "react-spinners";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useAuth } from "../context/AuthContext";
import LimitModal from "./LimitModal";
import AuthModal from "./AuthModal";

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

  const [selectedOption, setSelectedOption] = useState(options[0]);

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

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [freeUsed, setFreeUsed] = useState(
    Number(localStorage.getItem("freeReviews") || 0),
  );
  const [showLimit, setShowLimit] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const { user } = useAuth();

  const FREE_LIMIT = 3;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  async function reviewCode() {
    setLoading(true);
    setResponse("");
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

Code: ${code}
`,
      });
      setResponse(result.text);
    } catch (err) {
      console.error(err);
      setResponse("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

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
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                styles={customStyles}
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="btnNormal bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                Fix Code
              </button>
              <button
                onClick={() => {
                  if (code.trim() === "") {
                    alert("Please Enter the Code First");
                    return;
                  }

                  if (!user) {
                    if (freeUsed >= FREE_LIMIT) {
                      setShowLimit(true);
                      return;
                    }
                    localStorage.setItem("freeReviews", freeUsed + 1);
                    setFreeUsed(freeUsed + 1);
                  }

                  reviewCode();
                }}
                className="btnNormal bg-purple-600 hover:bg-purple-700 transition-all duration-300"
              >
                Review
              </button>
            </div>
          </div>

          {/* Free reviews counter */}
          {!user && (
            <p className="text-xs text-zinc-400 !px-5 !mb-2">
              {freeUsed < FREE_LIMIT ?
                `${FREE_LIMIT - freeUsed} of ${FREE_LIMIT} free reviews left. After that you need to log in.`
              : "You have used all free reviews. Log in to continue."}
            </p>
          )}

          {/* Monaco Editor */}
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedOption.value}
            value={code}
            onChange={(e) => {
              setCode(e ?? "");
            }}
            options={{ fontSize: 15, minimap: { enabled: false } }}
          />
        </div>
        <div className="left panel border-b-[1px] !border-[#fff] !p-[10px] bg-zinc-900 w-[50%] h-[100%] flex flex-col overflow-hidden">
          <div className="topTab flex items-center justify-between h-[60px] shrink-0 border-b border-t border-zinc-600">
            <div>
              <div className="flex items-center gap-2">
                <span className="ai-dot"></span>
                <p className="font-bold text-[17px]">Response</p>
              </div>
              <p className="text-xs text-zinc-400">AI Generated Code Review</p>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-3">
            {loading ?
              <div className="h-full flex items-center justify-center">
                <RingLoader color="#9333ea" />
              </div>
            : response ?
              <div className="review">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {response}
                </Markdown>
              </div>
            : <div className="h-full flex flex-col items-center justify-center text-center gap-2">
                <p className="text-xl font-semibold text-zinc-200">
                  🚀 Ready to Review
                </p>
                <p className="text-zinc-400">
                  Select a language, write your code in the editor, and click{" "}
                  <span className="text-purple-400 font-medium">Review</span> or{" "}
                  <span className="text-purple-400 font-medium">Fix Code</span>.
                </p>
              </div>
            }
          </div>
        </div>
      </div>

      {showLimit && (
        <LimitModal
          limit={FREE_LIMIT}
          onClose={() => setShowLimit(false)}
          onLogin={() => {
            setShowLimit(false);
            setShowAuth(true);
          }}
        />
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
};

export default CodeEditor;
