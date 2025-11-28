import React, { useState } from 'react';
import { A4Theme, DocumentState, AIProcessOptions } from '../types';
import { THEMES } from '../constants';
import { Wand2, LayoutTemplate, Printer, BookOpen, Eraser } from './icons';

interface ControlsProps {
    data: DocumentState;
    setData: React.Dispatch<React.SetStateAction<DocumentState>>;
    currentTheme: A4Theme;
    setTheme: React.Dispatch<React.SetStateAction<A4Theme>>;
    onAIRequest: (options: AIProcessOptions) => Promise<void>;
    isProcessing: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
    data,
    setData,
    currentTheme,
    setTheme,
    onAIRequest,
    isProcessing
}) => {
    const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');

    const handlePrint = () => {
        // Delay print slightly to ensure DOM is ready if there were state changes
        setTimeout(() => {
             window.print();
        }, 100);
    };

    return (
        <div className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm w-full max-w-md">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
                <h1 className="text-xl font-serif font-bold text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-800" />
                    <span className="text-purple-900">水木观畴教育</span>
                    <span className="text-xs text-gray-400 font-normal self-end mb-1">排版助手</span>
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('content')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'content' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    内容与智能编辑
                </button>
                <button
                    onClick={() => setActiveTab('design')}
                    className={`flex-1 py-3 text-sm font-medium ${activeTab === 'design' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    排版与主题
                </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {activeTab === 'content' && (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">资料标题</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                                    placeholder="例如：线性代数复习笔记"
                                />
                            </div>
                            
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-700">正文内容 (Markdown)</label>
                                    <button 
                                        onClick={() => setData({...data, content: ''})}
                                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                                    >
                                        <Eraser className="w-3 h-3" /> 清空
                                    </button>
                                </div>
                                <textarea
                                    value={data.content}
                                    onChange={(e) => setData({ ...data, content: e.target.value })}
                                    className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition resize-none"
                                    placeholder="# 章节标题..."
                                />
                                <p className="text-xs text-gray-400 mt-1">支持基础 Markdown 语法。</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <Wand2 className="w-4 h-4 text-purple-600" /> AI 智能助手
                            </h3>
                            
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => onAIRequest({ type: 'structure', content: data.content })}
                                    disabled={isProcessing || !data.content}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition disabled:opacity-50 text-sm font-medium"
                                >
                                    一键智能排版
                                </button>
                                <button
                                    onClick={() => onAIRequest({ type: 'summarize', content: data.content })}
                                    disabled={isProcessing || !data.content}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition disabled:opacity-50 text-sm font-medium"
                                >
                                    生成摘要
                                </button>
                                <button
                                    onClick={() => onAIRequest({ type: 'quiz', content: data.content })}
                                    disabled={isProcessing || !data.content}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition disabled:opacity-50 text-sm font-medium"
                                >
                                    出题 (选择题)
                                </button>
                                <button
                                    onClick={() => onAIRequest({ type: 'polish', content: data.content })}
                                    disabled={isProcessing || !data.content}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition disabled:opacity-50 text-sm font-medium"
                                >
                                    提取核心考点
                                </button>
                            </div>
                            {isProcessing && (
                                <div className="mt-3 text-center text-sm text-purple-600 animate-pulse">
                                    AI 正在思考中 (生成中文内容)...
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'design' && (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                                <LayoutTemplate className="w-4 h-4" /> 主题风格
                            </label>
                            <div className="space-y-3">
                                {THEMES.map((theme) => (
                                    <div
                                        key={theme.id}
                                        onClick={() => setTheme(theme)}
                                        className={`cursor-pointer p-3 rounded-lg border-2 transition relative overflow-hidden group ${
                                            currentTheme.id === theme.id 
                                                ? 'border-purple-500 bg-purple-50' 
                                                : 'border-gray-200 hover:border-purple-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-semibold text-gray-900">{theme.name}</span>
                                            {currentTheme.id === theme.id && (
                                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                            )}
                                        </div>
                                        <div className="flex gap-2 text-xs text-gray-500">
                                            <span className="bg-white px-2 py-1 rounded border border-gray-200">{theme.layoutType}</span>
                                            <span className="bg-white px-2 py-1 rounded border border-gray-200" style={{color: theme.primaryColor}}>配色</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-2">排版建议</label>
                            <div className="text-xs text-gray-500 leading-relaxed">
                                内容将自动流式排版。为了在 A4 纸上获得最佳效果：
                                <ul className="list-disc ml-4 mt-1 space-y-1">
                                    <li>保持段落简练。</li>
                                    <li>使用标题 (#) 划分知识点。</li>
                                    <li>内容较多时建议使用“双栏”布局。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Action */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition shadow-lg"
                >
                    <Printer className="w-4 h-4" /> 导出 / 打印 PDF
                </button>
                 <p className="text-[10px] text-gray-400 text-center mt-2">
                    在打印窗口中选择 "另存为 PDF" (Save as PDF)
                </p>
            </div>
        </div>
    );
};