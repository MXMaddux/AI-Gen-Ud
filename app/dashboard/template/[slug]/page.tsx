"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import template from "@/utils/template";
import Image from "next/image";
import React from "react";

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
  // Unwrap the params object using React.use()
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;

  // Find the template based on the slug
  const t = template.find((item) => item.slug === slug) as Template;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted!");
    // const formData = new FormData(e.currentTarget);

    // const data = Object.fromEntries(formData.entries());
    // console.log(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
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
                  onChange={handleChange}
                />
              ) : (
                <Textarea
                  placeholder={`Enter ${item.name}`}
                  required={item.required}
                  name={item.name}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full py-6">
            Generate Content
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SlugPage;
