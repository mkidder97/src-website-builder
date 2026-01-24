import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChatbot } from '@/hooks/use-chatbot';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export function ChatWidget() {
  const { isOpen, open, close, reset } = useChatbot();
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    close();
    // Reset conversation after closing
    setTimeout(() => reset(), 300);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={open}
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-accent text-accent-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">Need Help?</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={handleClose}
            />

            {/* Chat container */}
            <motion.div
              ref={containerRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-50 
                inset-4 lg:inset-auto 
                lg:bottom-6 lg:right-6 
                lg:w-[400px] lg:h-[600px] lg:max-h-[80vh]
                flex flex-col
                bg-card rounded-2xl shadow-2xl border border-border overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-accent text-accent-foreground">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">SRC Assistant</span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-full hover:bg-accent-foreground/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages area */}
              <ChatMessages />

              {/* Input area */}
              <ChatInput />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
