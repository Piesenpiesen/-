import { A4Theme } from './types';

export const THEMES: A4Theme[] = [
    {
        id: 'academic-classic',
        name: '经典学术 (紫色)',
        fontFamilyHeading: 'font-cjk',
        fontFamilyBody: 'font-cjk',
        // Corrected to a deep purple based on user intent "Purple". 
        // Original request RGB(101, 97, 7) is Olive. RGB(101, 7, 97) is Purple.
        primaryColor: '#650761', 
        secondaryColor: '#faf5ff', // Very light purple background for accents
        layoutType: 'standard',
        fontSizeScale: 1
    },
    {
        id: 'modern-clean',
        name: '现代极简 (黑体)',
        fontFamilyHeading: 'font-sans',
        fontFamilyBody: 'font-sans',
        primaryColor: '#111827', // Gray 900
        secondaryColor: '#ffffff',
        layoutType: 'two-column',
        fontSizeScale: 0.95
    },
    {
        id: 'study-cornell',
        name: '康奈尔笔记法',
        fontFamilyHeading: 'font-cjk',
        fontFamilyBody: 'font-sans',
        primaryColor: '#059669', // Emerald 600
        secondaryColor: '#ecfdf5',
        layoutType: 'cornell',
        fontSizeScale: 0.9
    }
];

export const INITIAL_CONTENT = `在这里粘贴您的原始学习资料...

# 马克思主义基本原理概论

## 一、物质与意识的辩证关系

### 1. 物质决定意识
物质是本原的，意识是派生的，物质决定意识。意识是物质世界长期发展的产物，是人脑的机能和属性，是客观世界的主观映象。

### 2. 意识对物质具有反作用
这种反作用就是意识的能动作用。正确的意识能够促进客观事物的发展，错误的意识则会阻碍客观事物的发展。

## 二、实践与认识

**实践**是认识的基础，对认识具有决定作用：
- 实践是认识的来源
- 实践是认识发展的动力
- 实践是检验认识真理性的唯一标准
- 实践是认识的目的

## 重点记忆
1. **世界观**：人们对整个世界的总体看法和根本观点。
2. **方法论**：人们认识世界、改造世界的根本方法。
3. **哲学**：系统化、理论化的世界观，也是方法论。`;