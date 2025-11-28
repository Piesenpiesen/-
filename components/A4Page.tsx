import React from 'react';
import ReactMarkdown from 'react-markdown';
import { A4Theme, DocumentState, Question } from '../types';
import { GraduationCap, BookOpen, Quote, CheckCircle2, Star, Bookmark, PenTool } from './icons';

interface A4PageProps {
    data: DocumentState;
    theme: A4Theme;
}

export const A4Page: React.FC<A4PageProps> = ({ data, theme }) => {
    
    // --- Design Elements & Backgrounds ---
    const BackgroundPattern = () => {
        if (theme.id === 'modern-clean') {
            return (
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden z-0">
                    <svg width="100%" height="100%">
                        <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-gray-900"/>
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                    </svg>
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-100 to-transparent -mr-32 -mt-32 rounded-full mix-blend-multiply" />
                </div>
            );
        }
        if (theme.id === 'study-cornell') {
            return (
                <div className="absolute inset-0 pointer-events-none z-0">
                     {/* Grid Background */}
                    <div className="absolute inset-0 opacity-[0.05]" 
                         style={{ backgroundImage: `linear-gradient(${theme.primaryColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.primaryColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}>
                    </div>
                </div>
            );
        }
        // Classic Academic
        return (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-purple-50 mix-blend-multiply"></div>
                {/* Border Frame */}
                <div className="absolute top-6 bottom-6 left-6 right-6 border-2 border-double opacity-30 pointer-events-none" style={{ borderColor: theme.primaryColor }}></div>
                {/* Watermark Icon */}
                <div className="absolute bottom-10 right-10 opacity-[0.03] transform rotate-[-15deg]">
                    <GraduationCap size={300} color={theme.primaryColor} />
                </div>
            </div>
        );
    };

    // --- Header Designs ---
    const PageHeader = () => {
        // Modern Theme Header
        if (theme.id === 'modern-clean') {
            return (
                <div className="mb-10 relative z-10">
                    <div className="flex justify-between items-start border-b-4 border-black pb-4 mb-6">
                        <div>
                             <h1 className="text-5xl font-black tracking-tighter leading-none mb-2 text-gray-900">
                                {data.title || "Untitled"}
                            </h1>
                            <div className="text-sm font-bold tracking-widest uppercase text-gray-500">
                                {new Date().getFullYear()} 考研复习资料
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black tracking-tight" style={{ color: theme.primaryColor }}>
                                水木观畴<span className="text-gray-300">教育</span>
                            </div>
                            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mt-1">
                                SHUIMU GUANCHOU EDUCATION
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // Cornell Theme Header
        if (theme.id === 'study-cornell') {
            return (
                <div className="mb-8 border-b-2 pb-4 flex justify-between items-end relative z-10" style={{ borderColor: theme.primaryColor }}>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                             <div className="w-2 h-6 rounded-sm" style={{ backgroundColor: theme.primaryColor }}></div>
                             <span className="font-bold text-lg tracking-wide" style={{ color: theme.primaryColor }}>水木观畴教育</span>
                        </div>
                        <h1 className={`text-3xl font-bold ${theme.fontFamilyHeading} text-gray-900`}>
                            {data.title || "课堂笔记"}
                        </h1>
                    </div>
                    <div className="text-right">
                        <div className="inline-block border rounded px-3 py-1 text-xs font-mono text-gray-400 bg-white shadow-sm">
                            日期: ______ / ______
                        </div>
                    </div>
                </div>
            );
        }

        // Classic Academic Header (Default)
        return (
            <div className="mb-10 text-center relative z-10">
                <div className="border-b mb-6 pb-4" style={{ borderColor: theme.primaryColor }}>
                    <div className="flex justify-between items-center px-4">
                        <div className="flex flex-col items-start">
                             {/* Clean branding without extra English text above */}
                             <span className="text-2xl font-black tracking-widest font-serif" style={{ color: theme.primaryColor }}>水木观畴教育</span>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-300 mx-4"></div>
                        <div className="flex-1 text-right">
                             <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Graduate Entrance Exam Material</span>
                        </div>
                    </div>
                </div>
                
                <h1 className={`text-4xl font-bold mb-4 ${theme.fontFamilyHeading}`} style={{ color: theme.primaryColor }}>
                    {data.title || "未命名文档"}
                </h1>
                
                {/* Removed Core Points Subtitle Block */}
            </div>
        );
    };

    // --- Content Renderers ---
    const HeadingRenderer = ({ level, children }: any) => {
        const Tag = `h${level}` as React.ElementType;
        
        if (theme.id === 'modern-clean') {
             const sizes: Record<number, string> = {
                1: 'text-3xl font-black mb-6 mt-8',
                2: 'text-2xl font-bold mt-8 mb-4 flex items-center gap-3 pb-2 border-b-2 border-gray-100',
                3: 'text-lg font-bold mt-5 mb-2 text-gray-700',
            };
            return (
                <Tag className={`${theme.fontFamilyHeading} ${sizes[level] || 'font-bold'}`}>
                    {level === 2 && <span className="text-brand-500 text-3xl leading-none">/</span>}
                    {children}
                </Tag>
            );
        }

        if (theme.id === 'study-cornell') {
             const sizes: Record<number, string> = {
                1: 'text-2xl font-bold mb-4 mt-6',
                2: 'text-lg font-bold mt-6 mb-3 text-white px-3 py-1 inline-block rounded shadow-sm',
                3: 'text-base font-semibold mt-4 mb-2 text-gray-700 border-l-4 pl-2',
            };
            return (
                <Tag 
                    className={`${theme.fontFamilyHeading} ${sizes[level] || ''}`}
                    style={level === 2 ? { backgroundColor: theme.primaryColor } : level === 3 ? { borderColor: theme.primaryColor } : {}}
                >
                    {children}
                </Tag>
            );
        }

        // Classic
        const sizes: Record<number, string> = {
            1: 'text-3xl mb-6 mt-8 border-b pb-2',
            2: 'text-xl font-bold mt-8 mb-4 flex items-center gap-2',
            3: 'text-lg font-bold mt-5 mb-2 pl-4 border-l-2',
        };
        
        return (
            <Tag 
                className={`${theme.fontFamilyHeading} ${sizes[level] || ''}`} 
                style={level === 2 ? { color: theme.primaryColor } : level === 3 ? { borderColor: theme.primaryColor } : {}}
            >
                {level === 2 && <Star size={14} fill={theme.primaryColor} />}
                {children}
            </Tag>
        );
    };

    const ListRenderer = ({ children, ordered }: { children: React.ReactNode, ordered?: boolean }) => {
        if (ordered) {
            return <ol className="list-decimal list-outside ml-5 my-4 space-y-2 marker:font-bold marker:text-gray-500">{children}</ol>;
        }
        // Custom bullets for unordered lists
        return (
            <ul className="my-4 space-y-2">
                {React.Children.map(children, (child) => {
                    // Check if child is valid and extract content, simple check
                    if (React.isValidElement(child)) {
                        return (
                            <li className="flex items-start gap-2.5">
                                <span className="mt-2 min-w-[5px] h-[5px] rotate-45" style={{ backgroundColor: theme.primaryColor }}></span>
                                <span className="flex-1">{(child.props as any).children}</span>
                            </li>
                        );
                    }
                    return child;
                })}
            </ul>
        );
    };

    // --- Main Layout Logic ---
    const getBaseStyles = () => {
        let classes = `${theme.fontFamilyBody} text-gray-800 leading-relaxed text-justify `;
        if (theme.id === 'modern-clean') classes += 'text-sm '; 
        else classes += 'text-[15px] ';

        switch (theme.layoutType) {
            case 'two-column':
                return classes + 'columns-2 gap-10 [column-fill:balance]';
            case 'cornell':
                return classes;
            default:
                return classes + 'max-w-none';
        }
    };

    const CornellLayout = ({ children }: { children: React.ReactNode }) => (
        <div className="grid grid-cols-[1fr_2.5fr] gap-8 h-full relative z-10">
            {/* Left Column (Cue Column) */}
            <div className="border-r-2 border-dashed pr-6 h-full" style={{ borderColor: theme.secondaryColor === '#ffffff' ? '#e5e7eb' : theme.primaryColor + '40' }}>
                <div className="sticky top-0 space-y-8">
                    {/* Key Points Card */}
                    <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: theme.primaryColor }}></div>
                        <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${theme.fontFamilyHeading}`} style={{ color: theme.primaryColor }}>
                            <Bookmark className="w-3 h-3" />
                            核心考点
                        </h3>
                        <ul className="space-y-3">
                            {data.generatedKeyPoints.length > 0 ? data.generatedKeyPoints.map((point, idx) => (
                                <li key={idx} className="text-xs leading-snug text-gray-600 flex gap-2">
                                    <span className="font-bold opacity-50">{idx + 1}.</span>
                                    {point}
                                </li>
                            )) : <li className="text-xs text-gray-400 italic">暂无考点...</li>}
                        </ul>
                    </div>

                    {/* Summary Card */}
                    {data.generatedSummary && (
                         <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                             <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 ${theme.fontFamilyHeading}`} style={{ color: theme.primaryColor }}>摘要</h3>
                             <p className="text-xs text-gray-600 leading-relaxed font-serif italic">{data.generatedSummary}</p>
                         </div>
                    )}
                </div>
            </div>
            {/* Right Column (Notes Column) */}
            <div>
                {children}
            </div>
        </div>
    );

    const StandardContent: React.FC = () => (
        <div className="prose prose-slate max-w-none print:prose-base relative z-10">
            {/* Top Summary for Non-Cornell */}
            {theme.layoutType !== 'cornell' && data.generatedSummary && (
                <div className="mb-8 relative pl-6 py-2 bg-gray-50 rounded-r-lg border-l-4" style={{ borderColor: theme.primaryColor }}>
                    <div className="flex gap-2 mb-1">
                        <Quote className="w-4 h-4 transform rotate-180 opacity-40" style={{ color: theme.primaryColor }} />
                    </div>
                    <p className="text-sm text-gray-600 font-serif italic m-0 leading-relaxed opacity-90">
                        {data.generatedSummary}
                    </p>
                </div>
            )}

            {/* Markdown Body */}
            <div className={getBaseStyles()}>
                <ReactMarkdown
                    components={{
                        h1: (props) => <HeadingRenderer level={1} {...props} />,
                        h2: (props) => <HeadingRenderer level={2} {...props} />,
                        h3: (props) => <HeadingRenderer level={3} {...props} />,
                        strong: ({children}) => (
                            <strong className="font-bold mx-0.5 px-1 rounded-sm" style={{ 
                                color: theme.id === 'modern-clean' ? theme.primaryColor : 'inherit',
                                backgroundColor: theme.id === 'modern-clean' ? 'rgba(0,0,0,0.05)' : 'transparent',
                                borderBottom: theme.id === 'academic-classic' ? `2px solid ${theme.primaryColor}30` : 'none'
                            }}>
                                {children}
                            </strong>
                        ),
                        ul: ({children}) => <ListRenderer>{children}</ListRenderer>,
                        ol: ({children}) => <ListRenderer ordered>{children}</ListRenderer>,
                        blockquote: ({children}) => (
                            <div className="relative my-6 pl-8 py-2">
                                <Quote className="absolute left-0 top-0 w-6 h-6 opacity-20" style={{ color: theme.primaryColor }} />
                                <blockquote className="text-gray-500 italic border-l-2 pl-4 text-sm" style={{borderColor: theme.primaryColor + '40'}}>
                                    {children}
                                </blockquote>
                            </div>
                        ),
                        hr: () => <hr className="my-8 border-gray-200 border-dashed" />,
                        // Style code blocks if any
                        code: ({children}) => <code className="bg-gray-100 text-gray-700 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                    }}
                >
                    {data.content}
                </ReactMarkdown>
            </div>

            {/* Quiz Section - Card Style */}
            {data.generatedQuiz.length > 0 && (
                <div className="mt-10 break-inside-avoid">
                    <div className="relative p-6 rounded-2xl bg-white border border-gray-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
                        {/* Decorative header for quiz */}
                        <div className="absolute top-0 left-0 w-full h-1" style={{ background: `repeating-linear-gradient(45deg, ${theme.primaryColor}, ${theme.primaryColor} 10px, white 10px, white 20px)` }}></div>
                        
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-700">
                                <CheckCircle2 className="w-5 h-5" style={{ color: theme.primaryColor }} />
                            </div>
                            <div>
                                <h2 className={`text-lg font-bold ${theme.fontFamilyHeading}`}>课后自测</h2>
                                <p className="text-xs text-gray-400 uppercase tracking-wider">Quiz Section</p>
                            </div>
                        </div>

                        <div className={`grid ${theme.layoutType === 'two-column' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
                            {data.generatedQuiz.map((q, idx) => (
                                <div key={idx} className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors break-inside-avoid">
                                    <div className="flex gap-2 mb-3">
                                        <span className="font-bold text-gray-300 text-xl leading-none font-serif italic">0{idx + 1}</span>
                                        <p className="font-semibold text-sm text-gray-800 pt-1">{q.question}</p>
                                    </div>
                                    <div className="space-y-2 pl-7">
                                        {q.options.map((opt, oIdx) => (
                                            <div key={oIdx} className="flex items-center gap-2 text-xs text-gray-600 group/opt cursor-pointer">
                                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] transition-colors
                                                    ${oIdx === q.correctAnswer 
                                                        ? 'bg-gray-800 border-gray-800 text-white' 
                                                        : 'border-gray-300 group-hover/opt:border-gray-400'}`}>
                                                    {String.fromCharCode(65 + oIdx)}
                                                </div>
                                                <span className={oIdx === q.correctAnswer ? 'text-gray-900 font-medium' : ''}>{opt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="a4-page relative p-[20mm] bg-white text-gray-900 shadow-xl overflow-hidden print:shadow-none">
            <BackgroundPattern />
            
            {theme.layoutType === 'cornell' ? (
                 <>
                    <PageHeader />
                    <CornellLayout>
                         <StandardContent />
                    </CornellLayout>
                 </>
            ) : (
                <>
                    <PageHeader />
                    <StandardContent />
                </>
            )}
            
            {/* Clean Footer */}
            <div className="absolute bottom-[10mm] left-[20mm] right-[20mm] border-t pt-2 flex justify-between items-center text-[10px] text-gray-300 font-sans z-10">
                 {/* Empty left side for cleanliness */}
                <div></div> 
                <div className="font-mono opacity-30 tracking-widest">- PAGE 1 -</div>
            </div>
        </div>
    );
};