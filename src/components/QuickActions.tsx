import { useState, useEffect } from 'react';
import { Heart, Share2, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface QuickActionsProps {
  toolId: string;
  toolName: string;
  toolUrl: string;
}

export function QuickActions({ toolId, toolName, toolUrl }: QuickActionsProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('ai_directory_favorites') || '[]');
    setIsFavorited(favorites.includes(toolId));
  }, [toolId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('ai_directory_favorites') || '[]');
    let newFavorites;
    if (isFavorited) {
      newFavorites = favorites.filter((id: string) => id !== toolId);
    } else {
      newFavorites = [...favorites, toolId];
    }
    localStorage.setItem('ai_directory_favorites', JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(toolUrl || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: toolName,
          text: `查看这个超棒的 AI 工具：${toolName}`,
          url: toolUrl,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      copyLink();
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full transition-all",
                isFavorited ? "text-red-500 border-red-200 bg-red-50" : "hover:text-red-500"
              )}
              onClick={toggleFavorite}
            >
              <Heart className={cn("w-4 h-4", isFavorited && "fill-current")} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isFavorited ? '取消收藏' : '加入收藏'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-brand-blue"
              onClick={copyLink}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <LinkIcon className="w-4 h-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? '已复制' : '复制链接'}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:text-brand-orange"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>分享工具</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
