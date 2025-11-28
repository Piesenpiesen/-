import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";

const getAIClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key is missing. Please set the API_KEY environment variable.");
    }
    return new GoogleGenAI({ apiKey });
};

export const restructureContent = async (text: string): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: text,
            config: {
                systemInstruction: `你是一位专业的中国考研教育资料编辑。你的任务是将用户输入的文本重写为结构清晰、逻辑严密的A4标准学习资料格式。

严格遵守以下规则：
1. **语言强制**：无论输入是什么语言，输出必须完全使用**简体中文**。如果输入包含英文术语，请保留术语并补充中文解释。
2. **结构化**：
   - 使用 Markdown 格式。
   - 只使用一个一级标题 (#) 作为文档标题。
   - 使用二级标题 (##) 区分主要章节。
   - 使用三级标题 (###) 区分知识点。
3. **重点标记**：自动识别核心概念和考点，并使用 **粗体** 进行标记。
4. **列表优化**：对于枚举类内容，必须使用无序列表 (-) 或有序列表 (1.) 进行整理。
5. **语气**：保持学术、专业、客观，适合考研复习。
6. **格式**：直接输出 Markdown 内容，不要包含 \`\`\`markdown 代码块标记。
7. **纠错**：修正原文中的语病或逻辑不清之处。`
            }
        });
        return response.text || text;
    } catch (error) {
        console.error("Gemini restructure error:", error);
        throw error;
    }
};

export const generateSummary = async (text: string): Promise<string> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: text,
            config: {
                systemInstruction: `你是一名考研资料助教。请为输入的文本撰写一个简明扼要的“摘要”（TL;DR）。
                
要求：
1. **语言必须是简体中文**。
2. 字数控制在100字以内。
3. 提炼核心思想，不要简单的罗列。
4. 语气平实、客观。`
            }
        });
        return response.text || "";
    } catch (error) {
        console.error("Gemini summary error:", error);
        return "";
    }
};

export const generateKeyPoints = async (text: string): Promise<string[]> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: text,
            config: {
                systemInstruction: `你是一名考研资料助教。请从文本中提取 3-5 个最关键的考点或核心概念。
                
要求：
1. 输出必须是 JSON 字符串数组格式。
2. 内容必须是**简体中文**。
3. 每个考点尽可能精炼。`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        });
        
        const json = response.text;
        if (!json) return [];
        return JSON.parse(json);
    } catch (error) {
        console.error("Gemini key points error:", error);
        return [];
    }
};

export const generateQuiz = async (text: string): Promise<Question[]> => {
    try {
        const ai = getAIClient();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: text,
            config: {
                systemInstruction: `你是一名考研命题专家。基于输入文本，设计 3 道高质量的单项选择题，用于学生自测。

要求：
1. 所有内容（问题、选项）必须是**简体中文**。
2. 题目要有一定的区分度，考察对核心知识点的理解。
3. 返回严格的 JSON 格式。`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING, description: "问题描述 (简体中文)" },
                            options: { 
                                type: Type.ARRAY,
                                items: { type: Type.STRING, description: "选项内容 (简体中文)" }
                            },
                            correctAnswer: { type: Type.INTEGER, description: "正确选项的索引 (0-3)" }
                        },
                        required: ["question", "options", "correctAnswer"]
                    }
                }
            }
        });

        const json = response.text;
        if (!json) return [];
        return JSON.parse(json);
    } catch (error) {
        console.error("Gemini quiz error:", error);
        return [];
    }
};