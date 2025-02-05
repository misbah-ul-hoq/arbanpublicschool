"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { data } from "../../../public/data";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_KEY as string,
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatPromptForm = () => {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<{ prompt: string; response: string }[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const fullPrompt = `${data}\n\nUser: ${prompt}`;
    setChats([...chats, { prompt, response: "" }]);
    try {
      const result = await model.generateContent(fullPrompt);
      console.log(result.response.text());
      if (prompt.trim()) {
        setChats([...chats, { prompt, response: result.response.text() }]);
        setPrompt("");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-5rem)] max-w-xl flex-col justify-end px-4 py-6 lg:max-w-3xl">
      <div className="flex-grow overflow-y-auto">
        {chats.map((chat, index) => (
          <div key={index} className="">
            <div className="chat chat-end">
              <div className="chat-bubble bg-base-300 text-base-content">
                {chat.prompt}
              </div>
            </div>
            <div className="chat chat-start">
              <div className="avatar chat-image">
                <div className="w-8 rounded-full">
                  <Image
                    src={`/icons/bard.svg`}
                    alt=""
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <div className="chat-bubble space-y-2 bg-base-300 text-base-content">
                {index === chats.length - 1 && loading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  <ReactMarkdown>
                    {chat.response || "I'm sorry, I don't understand."}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bottom-0 left-0 right-0 z-10 mx-auto mt-6 w-full max-w-xl self-end justify-self-end rounded-lg bg-base-100 px-3"
      >
        {chats.length < 1 && (
          <h2 className="mb-4 text-center text-2xl font-bold">
            What can I help with?
          </h2>
        )}

        <div className="mb-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="textarea textarea-bordered w-full shadow-lg"
            placeholder="Ask me anything..."
            rows={3}
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className="absolute bottom-10 right-6"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <FaArrowCircleUp size={35} />
          )}
        </button>
      </form>

      <strong className="text-center text-xs">
        Generative AI is experimental. It may make mistakes.
      </strong>
    </div>
  );
};

export default ChatPromptForm;
