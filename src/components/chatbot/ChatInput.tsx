import { Phone } from 'lucide-react';

export function ChatInput() {
  return (
    <div className="border-t border-border p-4 bg-secondary/30">
      <p className="text-center text-sm text-muted-foreground">
        Need to talk to someone?{' '}
        <a
          href="tel:+17273620116"
          className="inline-flex items-center gap-1 text-accent hover:underline font-medium"
        >
          <Phone className="w-3 h-3" />
          (727) 362-0116
        </a>
      </p>
    </div>
  );
}
