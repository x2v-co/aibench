import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 className="w-10 h-10 text-brand-blue" />
      </motion.div>
      <p className="text-muted-foreground animate-pulse text-sm">正在加载资源...</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="tech-card p-5 space-y-4">
      <div className="flex items-start gap-4">
        <Skeleton className="h-14 w-14 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "出错了，请稍后再试", onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-destructive/10 p-4 rounded-full mb-4">
        <AlertCircle className="w-10 h-10 text-destructive" />
      </div>
      <h3 className="text-lg font-semibold mb-2">操作失败</h3>
      <p className="text-muted-foreground mb-6 max-w-xs">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCcw className="w-4 h-4" />
          重试一下
        </Button>
      )}
    </div>
  );
}
