"use client";

import { runAi } from "@/actions/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import template from "@/utils/template";
import { Loader2Icon, ArrowLeft, CopyIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import toast from "react-hot-toast";
import Link from "next/link";

// Define the Template interface
export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category: string;
  aiPrompt: string;
  form: Form[];
}

// Define the Form interface
export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ref
  const editorRef = useRef<Editor | null>(null);

  useEffect(() => {
    if (content && editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      editorInstance.setMarkdown(content);
    }
  }, [content]);

  const handleCopy = async () => {
    const editorInstance = editorRef.current?.getInstance();
    const c = editorInstance.getMarkdown();

    try {
      await navigator.clipboard.writeText(c);
      toast.success("Content copied to clipboard.");
    } catch (error) {
      toast.error("An error has occurred. Please try again");
      console.log(error);
    }
  };

  // Unwrap the params object using React.use()
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;

  // Find the template based on the slug
  const t = template.find((item) => item.slug === slug) as Template;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await runAi(t.aiPrompt + query);
      // Ensure `data` is a valid string before setting it
      if (data !== undefined) {
        setContent(data);
      } else {
        setContent("No content generated.");
      }
    } catch (error) {
      setContent("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between mx-5 my-3">
        <Link href={"/dashboard"}>
          <Button>
            <ArrowLeft /> <span className="ml-2">Back</span>
          </Button>
        </Link>
        <Button onClick={handleCopy}>
          <CopyIcon /> <span className="ml-2">Copy</span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
        {/* Template Info Section */}
        <div className="col-span-1 bg-slate-100 dark:bg-slate-900 rounded-md border p-5">
          <div className="flex flex-col gap-3">
            <Image src={t.icon} alt={t.name} width={50} height={50} />
            <h2 className="font-medium text-lg">{t.name}</h2>
            <p className="text-gray-500">{t.desc}</p>
          </div>
          {/* Form Section */}
          <form className="col-span-2 mt-6" onSubmit={handleSubmit}>
            {t.form.map((item, index) => (
              <div key={index} className="my-2 flex flex-col gap-2 mb-7">
                {/* Label */}
                <label className="font-bold pb-5">{item.label}</label>

                {/* Input or Textarea */}
                {item.field === "input" ? (
                  <Input
                    placeholder={`Enter ${item.name}`}
                    required={item.required}
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                ) : (
                  <Textarea
                    placeholder={`Enter ${item.name}`}
                    required={item.required}
                    name={item.name}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="w-full py-6" disabled={loading}>
              {loading ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Generate Content"
              )}
            </Button>
          </form>
        </div>
        <div className="col-span-2">
          <Editor
            ref={editorRef}
            initialValue="Generated content will appear here."
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            // onChange={() => {
            //   if (editorRef.current) {
            //     setContent(editorRef.current.getInstance().getMarkdown());
            //   }
            // }}
          />
        </div>
      </div>
    </div>
  );
}

export default SlugPage;
