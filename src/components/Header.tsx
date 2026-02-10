import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, PlusCircle, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ROUTE_PATHS } from '@/constants/routes';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { motion } from 'framer-motion';

export const Header = () => {
  const { t } = useTranslation('header');

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            AI<span className="text-brand-blue">Bench</span>
          </span>
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink
            to={ROUTE_PATHS.HOME}
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-colors hover:text-brand-blue ${
                isActive ? 'text-brand-blue' : 'text-muted-foreground'
              }`
            }
          >
            {t('navigation.home')}
          </NavLink>
          <NavLink
            to={ROUTE_PATHS.COLLECTIONS}
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-colors hover:text-brand-blue ${
                isActive ? 'text-brand-blue' : 'text-muted-foreground'
              }`
            }
          >
            {t('navigation.collections')}
          </NavLink>
          <NavLink
            to={ROUTE_PATHS.ABOUT}
            className={({ isActive }) =>
              `px-4 py-2 text-sm font-medium transition-colors hover:text-brand-blue ${
                isActive ? 'text-brand-blue' : 'text-muted-foreground'
              }`
            }
          >
            {t('navigation.about')}
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
          <div className="relative hidden lg:block w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('search.placeholder')}
              className="pl-10 h-9 bg-secondary/50 border-none focus-visible:ring-brand-blue"
            />
          </div>

          <Link to={ROUTE_PATHS.SUBMIT}>
            <Button variant="default" size="sm" className="bg-brand-blue hover:bg-blue-600 gap-2">
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('submit.button')}</span>
            </Button>
          </Link>

          <LanguageSwitcher />

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
