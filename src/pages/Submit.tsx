import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/sonner';

const Submit: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useSEO({
    title: 'Submit Tool - AIBench',
    description: 'Submit your AI tool to be featured on AIBench',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Add Web3Forms access key
    formData.append('access_key', '916265fd-8bdb-4dde-b31d-9863627e14c0');

    // Add subject for better email organization
    formData.append('subject', `New Tool Submission: ${formData.get('tool-name')}`);

    // Add custom redirect (optional)
    formData.append('redirect', 'https://aibench.top/#/');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Submission Successful!', {
          description: 'Thank you! Your tool submission will be reviewed soon.',
        });
        e.currentTarget.reset();
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      toast.error('Submission Failed', {
        description: error instanceof Error ? error.message : 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('actions.back')}
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Submit Your AI Tool</h1>
            <p className="text-muted-foreground">
              Help others discover your AI tool. Submit it for review and inclusion in our directory.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field for spam protection */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="space-y-2">
                  <Label htmlFor="tool-name">Tool Name *</Label>
                  <Input id="tool-name" name="tool-name" placeholder="e.g., ChatGPT" required disabled={isSubmitting} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-url">Website URL *</Label>
                  <Input id="tool-url" name="tool-url" type="url" placeholder="https://example.com" required disabled={isSubmitting} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-icon">Icon URL *</Label>
                  <Input id="tool-icon" name="tool-icon" type="url" placeholder="https://example.com/icon.png" required disabled={isSubmitting} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-category">Category *</Label>
                  <select
                    id="tool-category"
                    name="tool-category"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    <option value="Text Writing">Text Writing</option>
                    <option value="Image Generation">Image Generation</option>
                    <option value="Coding Development">Coding Development</option>
                    <option value="Video Creation">Video Creation</option>
                    <option value="Audio & Speech">Audio & Speech</option>
                    <option value="Productivity">Productivity</option>
                    <option value="AI Agents">AI Agents</option>
                    <option value="AI Search">AI Search</option>
                    <option value="Development Platform">Development Platform</option>
                    <option value="AI Design">AI Design</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-description">Short Description *</Label>
                  <Input
                    id="tool-description"
                    name="tool-description"
                    placeholder="A brief description of your tool (max 150 characters)"
                    maxLength={150}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-long-description">Detailed Description</Label>
                  <Textarea
                    id="tool-long-description"
                    name="tool-long-description"
                    placeholder="Tell us more about your tool, its features, and what makes it unique..."
                    rows={5}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-tags">Tags (comma separated)</Label>
                  <Input
                    id="tool-tags"
                    name="tool-tags"
                    placeholder="e.g., writing, AI, productivity"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-pricing">Pricing Model *</Label>
                  <select
                    id="tool-pricing"
                    name="tool-pricing"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                    <option value="Freemium">Freemium</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Your Email *</Label>
                  <Input
                    id="contact-email"
                    name="contact-email"
                    type="email"
                    placeholder="For verification purposes"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full md:w-auto gap-2" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit for Review
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Submit;
