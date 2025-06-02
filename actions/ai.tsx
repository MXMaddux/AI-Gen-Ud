"use server";

import { GoogleGenAI } from "@google/genai";
import db from "@/utils/db";
import Query from "@/models/query";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function runAi(text: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: text,
  });
  console.log("AI Raw Response:", response);
  return response.text;
}

export async function saveQuery(
  template: object,
  email: string,
  query: string,
  content: string
) {
  try {
    await db();

    const newQuery = new Query({
      template,
      email,
      query,
      content,
    });

    await newQuery.save();

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}

export async function getQueries(
  email: string,
  page: number,
  pageSize: number
) {
  try {
    await db();

    const skip = (page - 1) * pageSize;

    const totalQueries = await Query.countDocuments({ email });

    const queries = await Query.find({ email })
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean();

    return {
      queries,
      totalPages: Math.ceil(totalQueries / pageSize),
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
    };
  }
}
