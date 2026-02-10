import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSEO } from '@/hooks/useSEO';
import { motion } from 'framer-motion';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Submit: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  useSEO({
    title: 'Submit Tool - AIBench',
    description: 'Submit your AI tool to be featured on AIBench',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    alert('Thank you! Your submission will be reviewed.');
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
                <div className="space-y-2">
                  <Label htmlFor="tool-name">Tool Name *</Label>
                  <Input id="tool-name" placeholder="e.g., ChatGPT" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-url">Website URL *</Label>
                  <Input id="tool-url" type="url" placeholder="https://example.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-icon">Icon URL *</Label>
                  <Input id="tool-icon" type="url" placeholder="https://example.com/icon.png" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-category">Category *</Label>
                  <select
                    id="tool-category"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="1">Text Writing</option>
                    <option value="2">Image Generation</option>
                    <option value="3">Coding Development</option>
                    <option value="4">Video Creation</option>
                    <option value="5">Audio & Speech</option>
                    <option value="6">Productivity</option>
                    <option value="7">AI Agents</option>
                    <option value="8">AI Search</option>
                    <option value="9">Development Platform</option>
                    <option value="10">AI Design</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-description">Short Description *</Label>
                  <Input
                    id="tool-description"
                    placeholder="A brief description of your tool (max 150 characters)"
                    maxLength={150}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-long-description">Detailed Description</Label>
                  <Textarea
                    id="tool-long-description"
                    placeholder="Tell us more about your tool, its features, and what makes it unique..."
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-tags">Tags (comma separated)</Label>
                  <Input
                    id="tool-tags"
                    placeholder="e.g., writing, AI, productivity"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tool-pricing">Pricing Model *</Label>
                  <select
                    id="tool-pricing"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                    required
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
                    type="email"
                    placeholder="For verification purposes"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="w-full md:w-auto gap-2">
                    <Send className="h-4 w-4" />
                    Submit for Review
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
