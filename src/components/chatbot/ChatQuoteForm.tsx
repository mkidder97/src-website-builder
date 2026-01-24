import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChatbot } from '@/hooks/use-chatbot';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, CheckCircle, Calculator, Monitor, ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email').max(255),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(200).optional(),
  portfolioSize: z.string().optional(),
});

export function ChatQuoteForm() {
  const { serviceInterest, setStep, close } = useChatbot();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    portfolioSize: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from('chatbot_leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        portfolio_size: formData.portfolioSize || null,
        service_interest: serviceInterest,
        conversation_flow: 'quote-request',
        is_storm_emergency: false,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: 'Quote Request Received!',
        description: "We'll get back to you within 1 business day.",
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary rounded-xl p-6 text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-semibold text-foreground">Thanks, {formData.name}!</h3>
        <p className="text-sm text-muted-foreground">
          Someone from our team will reach out within 1 business day.
        </p>
        <p className="text-sm text-muted-foreground">In the meantime, feel free to explore:</p>
        <div className="flex flex-col gap-2">
          <Link
            to="/savings-calculator"
            onClick={() => close()}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-card border border-border hover:bg-secondary transition-colors text-sm"
          >
            <Calculator className="w-4 h-4 text-accent" />
            Savings Calculator
          </Link>
          <Link
            to="/roof-controller"
            onClick={() => close()}
            className="flex items-center justify-center gap-2 p-3 rounded-lg bg-card border border-border hover:bg-secondary transition-colors text-sm"
          >
            <Monitor className="w-4 h-4 text-accent" />
            Roof Controller Demo
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-secondary rounded-xl p-4 space-y-4"
    >
      <div>
        <h3 className="font-semibold text-foreground">Request a Quote</h3>
        <p className="text-sm text-muted-foreground mt-1">
          We just need a few details to send you a custom quote.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="chat-name" className="text-xs">
            Name *
          </Label>
          <Input
            id="chat-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`h-9 ${errors.name ? 'border-destructive' : ''}`}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor="chat-email" className="text-xs">
            Email *
          </Label>
          <Input
            id="chat-email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`h-9 ${errors.email ? 'border-destructive' : ''}`}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="chat-phone" className="text-xs">
              Phone
            </Label>
            <Input
              id="chat-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-9"
            />
          </div>
          <div>
            <Label htmlFor="chat-company" className="text-xs">
              Company
            </Label>
            <Input
              id="chat-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="h-9"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="chat-portfolio" className="text-xs">
            Portfolio Size
          </Label>
          <Select
            value={formData.portfolioSize}
            onValueChange={(value) => setFormData({ ...formData, portfolioSize: value })}
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-10">1-10 properties</SelectItem>
              <SelectItem value="10-50">10-50 properties</SelectItem>
              <SelectItem value="50-100">50-100 properties</SelectItem>
              <SelectItem value="100+">100+ properties</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {serviceInterest && (
          <div className="text-xs text-muted-foreground bg-accent/10 rounded-lg p-2">
            Service interest: <span className="text-accent">{serviceInterest}</span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setStep('main')}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <Button type="submit" variant="cta" size="sm" disabled={loading} className="flex-1">
            {loading ? (
              'Sending...'
            ) : (
              <>
                Submit
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
