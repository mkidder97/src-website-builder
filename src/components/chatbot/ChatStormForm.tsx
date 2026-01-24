import { useState } from 'react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChatbot } from '@/hooks/use-chatbot';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, CheckCircle, Phone, ArrowLeft, AlertTriangle } from 'lucide-react';
import { coveredStates } from '@/lib/chatbot-flows';

const formSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  phone: z.string().trim().min(1, 'Phone is required').max(30),
  email: z.string().trim().email('Invalid email').max(255),
  propertiesAffected: z.string().optional(),
  state: z.string().optional(),
  description: z.string().trim().max(1000).optional(),
});

export function ChatStormForm() {
  const { setStep, close } = useChatbot();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertiesAffected: '',
    state: '',
    description: '',
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
        phone: formData.phone,
        is_storm_emergency: true,
        properties_affected: formData.propertiesAffected ? parseInt(formData.propertiesAffected, 10) : null,
        location_state: formData.state || null,
        damage_description: formData.description || null,
        service_interest: 'Storm Emergency',
        conversation_flow: 'storm-emergency',
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: '🌪️ Emergency Request Received!',
        description: "We'll contact you within 2 hours during business hours.",
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again or call us directly.',
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
        className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="font-semibold text-foreground">Emergency Request Received!</h3>
        <p className="text-sm text-muted-foreground">
          We'll contact you within 2 hours during business hours, or first thing next morning for
          after-hours requests.
        </p>
        <div className="pt-2">
          <a
            href="tel:+17273620116"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now: (727) 362-0116
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 space-y-4"
    >
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h3 className="font-semibold text-foreground">Storm Emergency Request</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        We mobilize within 24-48 hours. For immediate assistance, call{' '}
        <a href="tel:+17273620116" className="text-destructive font-medium">
          (727) 362-0116
        </a>
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label htmlFor="storm-name" className="text-xs">
            Name *
          </Label>
          <Input
            id="storm-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`h-9 ${errors.name ? 'border-destructive' : ''}`}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="storm-phone" className="text-xs">
              Phone *
            </Label>
            <Input
              id="storm-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`h-9 ${errors.phone ? 'border-destructive' : ''}`}
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="storm-email" className="text-xs">
              Email *
            </Label>
            <Input
              id="storm-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`h-9 ${errors.email ? 'border-destructive' : ''}`}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="storm-properties" className="text-xs">
              Properties Affected
            </Label>
            <Input
              id="storm-properties"
              type="number"
              min="1"
              value={formData.propertiesAffected}
              onChange={(e) => setFormData({ ...formData, propertiesAffected: e.target.value })}
              className="h-9"
            />
          </div>
          <div>
            <Label htmlFor="storm-state" className="text-xs">
              State
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) => setFormData({ ...formData, state: value })}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {coveredStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
                <SelectItem value="Other">Other State</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="storm-description" className="text-xs">
            Brief Description of Damage
          </Label>
          <Textarea
            id="storm-description"
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the damage or situation..."
            className="resize-none"
          />
        </div>

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
          <Button
            type="submit"
            variant="destructive"
            size="sm"
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              'Sending...'
            ) : (
              <>
                Submit Emergency
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
