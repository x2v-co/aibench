import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useSEO } from '@/hooks/useSEO';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  useSEO({
    title: 'Search - AIBench',
    description: 'Search for AI tools by name, category, or tags',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Advanced Search</h1>

          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="search-input" className="text-sm font-medium">
                    Search Tools
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="search-input"
                      name="search"
                      placeholder="Enter tool name, description, or tags..."
                      className="flex-1"
                    />
                    <Button type="submit" className="gap-2">
                      <Search className="h-4 w-4" />
                      {t('actions.search')}
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Use the main page for filtering by category, sorting by rating, and browsing featured tools.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
