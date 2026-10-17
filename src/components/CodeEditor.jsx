import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import { RingLoader } from "react-spinners";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import LimitModal from "./LimitModal";
import AuthModal from "./AuthModal";
import EmptyCodeModal from "./EmptyCodeModal";

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
      backgroundColor: "var(--surface)",
      borderColor: "var(--border)",
      color: "var(--text)",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#9333ea",
      },
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "var(--text)",
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--surface)",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#9333ea" : "var(--surface)",
      color: state.isFocused ? "#fff" : "var(--text)",
      cursor: "pointer",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "var(--muted)",
    }),

    input: (provided) => ({
      ...provided,
      color: "var(--text)",
    }),
  };

  const [code, setCode] = useState(`// Exampele Code \n console.log("Hello, World!");`);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [freeUsed, setFreeUsed] = useState(
    Number(localStorage.getItem("freeReviews") || 0),
  );
  const [showLimit, setShowLimit] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);

  const { user } = useAuth();
  const { theme } = useTheme();

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
      {/* CHANGED: stacks on mobile, side by side from md up; style prop removed */}
      <div className="main flex flex-col md:flex-row justify-between !p-3 md:!p-5 gap-3 md:gap-5 md:h-[calc(100vh_-_90px)]">
        {/* CHANGED: full width and 60vh tall on mobile */}
        <div className="left panel w-full md:w-[50%] h-[60vh] md:h-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
          {/* Top Bar */}
          {/* CHANGED: smaller padding on mobile, gap added */}
          <div className="tab !mt-3 md:!mt-5 !px-3 md:!px-5 !mb-3 w-full flex items-center justify-between gap-2">
            {/* CHANGED: dropdown fills free space on mobile */}
            <div className="flex-1 min-w-0 md:flex-none md:w-[250px]">
              <Select
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                styles={customStyles}
              />
            </div>

            {/* CHANGED: shrink-0 so the Review button keeps its size */}
            <div className="flex items-center gap-2 shrink-0">
              {/* <button className="btnNormal bg-purple-600 hover:bg-purple-700 transition-all duration-300">
                Fix Code
              </button> */}
              <button
                onClick={() => {
                  if (code.trim() === "") {
                    setShowEmpty(true);
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
          {/* CHANGED: smaller padding on mobile */}
          {!user && (
            <p className="text-xs text-zinc-400 !px-3 md:!px-5 !mb-2">
              {freeUsed < FREE_LIMIT ?
                `${FREE_LIMIT - freeUsed} of ${FREE_LIMIT} free reviews left. After that you need to log in.`
              : "You have used all free reviews. Log in to continue."}
            </p>
          )}

          {/* Monaco Editor */}
          <Editor
            height="100%"
            theme={theme === "dark" ? "vs-dark" : "light"}
            language={selectedOption.value}
            value={code}
            onChange={(e) => {
              setCode(e ?? "");
            }}
            options={{ fontSize: 15, minimap: { enabled: false } }}
          />
        </div>
        {/* CHANGED: full width and 60vh tall on mobile, rounded corners added */}
        <div className="left panel border border-zinc-800 !p-[10px] bg-zinc-900 w-full md:w-[50%] h-[60vh] md:h-[100%] rounded-xl flex flex-col overflow-hidden">
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
                  <span className="text-purple-400 font-medium">Review</span>.
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
      {showEmpty && <EmptyCodeModal onClose={() => setShowEmpty(false)} />}
    </>
  );
};

export default CodeEditor;