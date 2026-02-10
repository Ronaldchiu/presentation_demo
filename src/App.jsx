import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, MousePointer2, Zap, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import lionLogo from './assets/images/background.png';
import titleImage from './assets/images/title.png';
import './App.css';

const SLIDES = [
  {
    id: 1,
    type: 'title',
    title: "Agent应用调研",
    department: "招商局狮子山人工智能实验室",
    presenter: "姓名",
    date: "2025年x月x日",
    items: []
  },
  {
    id: 2,
    type: 'content',
    title: "调研背景与目标",
    subtitle: "Background & Objectives",
    items: [
      { id: '2-1', text: "分析当前大语言模型 Agent 的技术趋势", icon: Zap },
      { id: '2-2', text: "评估 Agent 在业务场景中的落地可行性", icon: Layers },
      { id: '2-3', text: "制定实验室未来一年的研发路线图", icon: CheckCircle2 }
    ]
  },
  {
    id: 3,
    type: 'content',
    title: "核心技术架构",
    subtitle: "Core Architecture",
    items: [
      { id: '3-1', text: "感知层：多模态信息输入与处理", icon: Presentation },
      { id: '3-2', text: "决策层：基于逻辑推理的行动规划", icon: MousePointer2 },
      { id: '3-3', text: "执行层：工具调用与环境交互闭环", icon: ArrowRight }
    ]
  }
];

function App() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);

  const handleNext = useCallback(() => {
    const slide = SLIDES[currentSlideIndex];
    if (currentStep < slide.items.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setCurrentStep(-1);
    }
  }, [currentSlideIndex, currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > -1) {
      setCurrentStep(prev => prev - 1);
    } else if (currentSlideIndex > 0) {
      const prevSlideIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevSlideIndex);
      setCurrentStep(SLIDES[prevSlideIndex].items.length - 1);
    }
  }, [currentSlideIndex, currentStep]);

  useEffect(() => {
    // Aggressively remove the glow-causing element if it appears
    const removeGlow = () => {
      const glow = document.getElementById('preact-border-shadow-host');
      if (glow) glow.remove();
    };

    removeGlow();
    const observer = new MutationObserver(removeGlow);
    observer.observe(document.documentElement, { childList: true, subtree: true });

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          handlePrev();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [handleNext, handlePrev]);

  const currentSlide = SLIDES[currentSlideIndex];

  return (
    <div className="app-container" onClick={handleNext}>
      <div className="progress-bar" style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }} />

      {/* Template Background Elements */}
      <div className="ppt-template">
        <div className="top-bar" />
        <img src={titleImage} alt="header title" className="top-right-title" />
        <img src={lionLogo} alt="lion background" className="lion-logo" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlideIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="slide-wrapper"
        >
          {currentSlide.type === 'title' ? (
            <div className="title-slide-content">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="main-title"
              >
                {currentSlide.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="meta-info"
              >
                <div className="meta-line">DEPARTMENT: {currentSlide.department}</div>
                <div className="meta-line">PRESENTER: {currentSlide.presenter}</div>
                <div className="meta-line">DATE: {currentSlide.date}</div>
              </motion.div>
            </div>
          ) : (
            <div className="regular-slide">
              <div className="slide-header-regular">
                <h2 className="slide-title-regular">{currentSlide.title}</h2>
                <p style={{ color: '#666', marginTop: '4px' }}>{currentSlide.subtitle}</p>
              </div>

              <div className="slide-content-regular">
                {currentSlide.items.map((item, index) => (
                  <AnimatePresence key={item.id}>
                    {index <= currentStep && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="content-item"
                      >
                        <item.icon size={40} color="#004a8d" />
                        <span>{item.text}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
