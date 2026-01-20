import React, { useState, useEffect } from 'react';
import { Heart, ExternalLink, Share2, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { favoritesApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface QuickActionsDBProps {
  toolId: string;
  toolName: string;
  toolUrl: string;
}

export const QuickActionsDB: React.FC<QuickActionsDBProps> = ({
  toolId,
  toolName,
  toolUrl,
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) {
        setIsCheckingStatus(false);
        return;
      }
      try {
        const favorites = await favoritesApi.getUserFavorites(user.id);
        setIsFavorited(favorites.some((f: any) => f.tool_id === toolId));
      } catch (error) {
        console.error('获取收藏状态失败:', error);
      } finally {
        setIsCheckingStatus(false);
      }
    };

    checkFavoriteStatus();
  }, [user, toolId]);

  const handleToggleFavorite = async () => {
    if (!user) {
      toast({
        title: '请先登录',
        description: '登录后即可收藏您喜爱的工具',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const newState = await favoritesApi.toggleFavorite(user.id, toolId, isFavorited);
      setIsFavorited(newState);
      toast({
        title: newState ? '收藏成功' : '已取消收藏',
        description: newState ? `已将 ${toolName} 添加到您的收藏夹` : `已从收藏夹移除 ${toolName}`,
      });
    } catch (error) {
      toast({
        title: '操作失败',
        description: '无法更新收藏状态，请稍后再试',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisit = () => {
    window.open(toolUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async () => {
    const shareData = {
      title: toolName,
      text: `来看看这个超赞的AI工具：${toolName}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: '链接已复制',
          description: '工具链接已复制到您的剪贴板',
        });
      }
    } catch (error) {
      console.error('分享失败:', error);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggleFavorite}
              disabled={isLoading || isCheckingStatus}
              className={cn(
                'transition-all duration-200',
                isFavorited 
                  ? 'text-brand-orange border-brand-orange bg-brand-orange/5 hover:bg-brand-orange/10' 
                  : 'hover:text-brand-orange hover:border-brand-orange/50'
              )}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart className={cn('h-4 w-4', isFavorited && 'fill-current')} />
              )}
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
              onClick={handleShare}
              className="hover:text-brand-blue hover:border-brand-blue/50"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>分享工具</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleVisit}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white gap-2 px-6"
            >
              <span>访问工具</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>前往官方网站</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
