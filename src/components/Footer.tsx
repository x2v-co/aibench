import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import { SiGithub, SiX, SiFacebook } from 'react-icons/si';
import { Cpu, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/sonner';

export const Footer: React.FC = () => {
  const { t } = useTranslation('footer');
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error(t('sections.newsletter.errors.invalidEmail') || 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.alreadySubscribed) {
          toast.info(t('sections.newsletter.errors.alreadySubscribed') || 'You are already subscribed!');
        } else {
          toast.success(t('sections.newsletter.success') || 'Successfully subscribed! Check your email for confirmation.');
        }
        setEmail('');
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(t('sections.newsletter.errors.failed') || 'Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="py-12 border-t bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-blue">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">AI<span className="text-brand-blue">Hub</span></span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="transition-colors text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <SiX className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <SiGithub className="w-5 h-5" />
              </a>
              <a href="#" className="transition-colors text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                <SiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('sections.products.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to={ROUTE_PATHS.HOME} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.products.allTools')}</Link>
              </li>
              <li>
                <Link to={ROUTE_PATHS.SEARCH} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.products.advancedSearch')}</Link>
              </li>
              <li>
                <Link to={ROUTE_PATHS.COLLECTIONS} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.products.collections')}</Link>
              </li>
              <li>
                <Link to={ROUTE_PATHS.SUBMIT} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.products.submitTool')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('sections.help.title')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to={ROUTE_PATHS.ABOUT} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.help.aboutUs')}</Link>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.help.userGuide')}</a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.help.privacyPolicy')}</a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">{t('sections.help.termsOfService')}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">{t('sections.newsletter.title')}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{t('sections.newsletter.description')}</p>

            <form className="flex gap-2" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('sections.newsletter.placeholder')}
                className="w-full px-3 py-2 text-sm transition-all border rounded-md bg-muted/50 border-border focus:outline-none focus:ring-1 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="hidden sm:inline">{t('sections.newsletter.subscribing') || 'Subscribing...'}</span>
                  </>
                ) : (
                  t('sections.newsletter.button')
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t md:flex-row">
          <p className="text-xs text-muted-foreground">
            {t('copyright', { year: currentYear })}
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">{t('credits.era')}</span>
            <span className="text-xs text-muted-foreground">{t('credits.powered')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
