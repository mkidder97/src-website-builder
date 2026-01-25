import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useChatbot } from '@/hooks/use-chatbot';
import { mainTopics, chatFlows } from '@/lib/chatbot-flows';
import { ChatQuoteForm } from './ChatQuoteForm';
import { ChatStormForm } from './ChatStormForm';
import { useSampleReportsModal } from '@/components/SampleReportsModal';
import { ExternalLink } from 'lucide-react';

export function ChatMessages() {
  const { currentFlow, currentStep, messages, addMessage, setFlow, setStep, setServiceInterest } = useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { open: openSampleReportsModal, close: closeChatbot } = useSampleReportsModal();
  const { close } = useChatbot();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentStep, currentFlow]);

  // Get current step data
  const getCurrentStepData = () => {
    if (currentStep === 'main' || !currentFlow) {
      return null;
    }
    const flow = chatFlows[currentFlow];
    if (!flow) return null;
    return flow.steps[currentStep];
  };

  const stepData = getCurrentStepData();

  const handleTopicSelect = (topicId: string) => {
    const topic = mainTopics.find((t) => t.id === topicId);
    if (topic) {
      addMessage({ type: 'user', content: topic.label });
      setFlow(topicId);
      setServiceInterest(topic.label);
    }
  };

  const handleOptionSelect = (option: { id: string; label: string; action: string; target?: string; icon?: string }) => {
    addMessage({ type: 'user', content: option.label });

    switch (option.action) {
      case 'next-step':
        if (option.target === 'main') {
          setStep('main');
          setFlow('');
        } else if (option.target === 'open-sample-modal') {
          close();
          openSampleReportsModal();
        } else if (option.target) {
          setStep(option.target);
        }
        break;
      case 'navigate':
        if (option.target) {
          close();
          navigate(option.target);
        }
        break;
      case 'external-link':
        if (option.target) {
          window.open(option.target, '_blank');
        }
        break;
      case 'call':
        if (option.target) {
          window.location.href = option.target;
        }
        break;
      case 'form':
        // Form rendering is handled in step content
        if (option.target) {
          setStep(`form-${option.target}`);
        }
        break;
    }
  };

  // Format markdown-like text safely using React components (no dangerouslySetInnerHTML)
  const formatMessage = (text: string) => {
    return text.split('\n').map((line, lineIndex) => {
      // Parse the line into segments for bold and italic
      const segments: React.ReactNode[] = [];
      let remaining = line;
      let segmentIndex = 0;

      while (remaining.length > 0) {
        // Check for bold first (**text**)
        const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
        if (boldMatch) {
          segments.push(<strong key={`${lineIndex}-${segmentIndex++}`}>{boldMatch[1]}</strong>);
          remaining = remaining.slice(boldMatch[0].length);
          continue;
        }

        // Check for italic (*text*)
        const italicMatch = remaining.match(/^\*(.+?)\*/);
        if (italicMatch) {
          segments.push(<em key={`${lineIndex}-${segmentIndex++}`}>{italicMatch[1]}</em>);
          remaining = remaining.slice(italicMatch[0].length);
          continue;
        }

        // Find the next special character or end of string
        const nextBold = remaining.indexOf('**');
        const nextItalic = remaining.indexOf('*');
        let nextSpecial = remaining.length;
        
        if (nextBold !== -1 && nextBold < nextSpecial) nextSpecial = nextBold;
        if (nextItalic !== -1 && nextItalic < nextSpecial) nextSpecial = nextItalic;

        // Add plain text up to the next special character
        if (nextSpecial > 0) {
          segments.push(<span key={`${lineIndex}-${segmentIndex++}`}>{remaining.slice(0, nextSpecial)}</span>);
          remaining = remaining.slice(nextSpecial);
        } else {
          // Fallback: just add the remaining text to avoid infinite loop
          segments.push(<span key={`${lineIndex}-${segmentIndex++}`}>{remaining}</span>);
          break;
        }
      }

      return (
        <span key={lineIndex} className="block">
          {segments}
        </span>
      );
    });
  };

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Welcome message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary rounded-xl p-4"
      >
        <p className="text-foreground">👋 Hi! How can we help you today?</p>
      </motion.div>

      {/* Conversation history */}
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 ${
            msg.type === 'user'
              ? 'bg-accent/20 text-foreground ml-8'
              : 'bg-secondary text-foreground mr-4'
          }`}
        >
          {formatMessage(msg.content)}
        </motion.div>
      ))}

      {/* Main topics (when at root) */}
      {currentStep === 'main' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-2"
        >
          <p className="text-sm text-muted-foreground mb-3">Select a topic:</p>
          {mainTopics.map((topic, index) => (
            <motion.button
              key={topic.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => handleTopicSelect(topic.id)}
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-secondary hover:border-accent/50 transition-all text-left group"
            >
              <span className="text-xl">{topic.icon}</span>
              <span className="text-foreground group-hover:text-accent transition-colors">
                {topic.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Current step content */}
      {stepData && currentStep !== 'main' && !currentStep.startsWith('form-') && (
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Bot message */}
          <div className="bg-secondary rounded-xl p-4 mr-4">
            <div className="text-foreground space-y-1">{formatMessage(stepData.message)}</div>
            
            {/* Links */}
            {stepData.links && stepData.links.length > 0 && (
              <div className="mt-4 space-y-2">
                {stepData.links.map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    onClick={() => close()}
                    className="flex items-center gap-2 text-accent hover:underline text-sm"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Options */}
          {stepData.options && stepData.options.length > 0 && (
            <div className="space-y-2">
              {stepData.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group ${
                    option.id === 'back'
                      ? 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
                      : 'border-border bg-card hover:bg-secondary hover:border-accent/50'
                  }`}
                >
                  {option.icon && <span className="text-lg">{option.icon}</span>}
                  <span className="group-hover:text-accent transition-colors">{option.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Quote Form */}
      {currentStep === 'form-quote' && <ChatQuoteForm />}

      {/* Storm Emergency Form */}
      {currentStep === 'form-storm' && <ChatStormForm />}
    </div>
  );
}
