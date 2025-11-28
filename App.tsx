import React, { useState, useEffect } from 'react';
import { Controls } from './components/Controls';
import { A4Page } from './components/A4Page';
import { DocumentState, A4Theme, AIProcessOptions } from './types';
import { THEMES, INITIAL_CONTENT } from './constants';
import { restructureContent, generateSummary, generateKeyPoints, generateQuiz } from './services/geminiService';

const App: React.FC = () => {
    const [theme, setTheme] = useState<A4Theme>(THEMES[0]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [data, setData] = useState<DocumentState>({
        title: '2025考研政治核心考点：马克思主义基本原理',
        content: INITIAL_CONTENT,
        generatedSummary: '',
        generatedKeyPoints: [],
        generatedQuiz: [],
        lastUpdated: Date.now()
    });

    // Handle AI Actions
    const handleAIRequest = async (options: AIProcessOptions) => {
        setIsProcessing(true);
        try {
            switch (options.type) {
                case 'structure': {
                    const structured = await restructureContent(options.content);
                    setData(prev => ({ ...prev, content: structured }));
                    break;
                }
                case 'summarize': {
                    const summary = await generateSummary(options.content);
                    setData(prev => ({ ...prev, generatedSummary: summary }));
                    break;
                }
                case 'polish': {
                    const points = await generateKeyPoints(options.content);
                    setData(prev => ({ ...prev, generatedKeyPoints: points }));
                    break;
                }
                case 'quiz': {
                    const quiz = await generateQuiz(options.content);
                    setData(prev => ({ ...prev, generatedQuiz: quiz }));
                    break;
                }
            }
        } catch (error) {
            alert("AI 处理失败，请检查您的 API Key。");
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-gray-100 font-sans">
            {/* Left Sidebar: Controls - Hidden when printing */}
            <div className="w-[450px] flex-shrink-0 h-full no-print z-10 relative">
                <Controls 
                    data={data}
                    setData={setData}
                    currentTheme={theme}
                    setTheme={setTheme}
                    onAIRequest={handleAIRequest}
                    isProcessing={isProcessing}
                />
            </div>

            {/* Right Area: Preview Canvas */}
            <div className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-gray-200 p-8 flex justify-center items-start print:p-0 print:bg-white print:overflow-visible print:block">
                <div className="print:w-full">
                    {/* Scale Wrapper for smaller screens */}
                    <div className="origin-top transition-transform duration-300 print:transform-none">
                        <A4Page data={data} theme={theme} />
                    </div>
                </div>
            </div>
            
            {/* API Key Warning Overlay (Dev only, simple check) */}
            {!process.env.API_KEY && (
                 <div className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg max-w-sm no-print z-50">
                    <p className="font-bold">缺少 API Key</p>
                    <p className="text-sm">AI 功能无法使用。请确保在环境中设置了 <code>process.env.API_KEY</code>。</p>
                </div>
            )}
        </div>
    );
};

export default App;
