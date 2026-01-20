import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ratingsApi } from '@/services/api';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface RatingComponentProps {
  toolId: string;
}

export const RatingComponent: React.FC<RatingComponentProps> = ({ toolId }) => {
  const { user } = useAuth();
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('请先登录后发表评价');
      return;
    }
    if (score === 0) {
      toast.error('请选择评分');
      return;
    }

    setSubmitting(true);
    try {
      await ratingsApi.addRating(user.id, toolId, score, comment);
      toast.success('评价提交成功');
      setComment('');
      setScore(0);
    } catch (error: any) {
      toast.error(error.message || '评价失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 bg-muted/30 p-6 rounded-xl border">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-brand-blue" />
        发表评价
      </h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setScore(star)}
              className="transition-transform active:scale-90"
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  star <= score ? "fill-brand-orange text-brand-orange" : "text-muted-foreground"
                )}
              />
            </button>
          ))}
          <span className="ml-2 text-sm font-medium text-muted-foreground">
            {score > 0 ? `${score} 分` : '点击星星评分'}
          </span>
        </div>
        <Textarea
          placeholder="分享您的使用体验..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <Button 
          onClick={handleSubmit} 
          disabled={submitting} 
          className="w-full bg-brand-blue hover:bg-brand-blue/90"
        >
          {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          提交评价
        </Button>
      </div>
    </div>
  );
};

export const ReviewsList: React.FC<RatingComponentProps> = ({ toolId }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await ratingsApi.getToolRatings(toolId);
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [toolId]);

  if (loading) return <div className="py-8 text-center text-muted-foreground">加载评价中...</div>;

  return (
    <div className="space-y-6 mt-8">
      <h3 className="text-xl font-bold">用户评价 ({reviews.length})</h3>
      {reviews.length === 0 ? (
        <div className="py-12 text-center border rounded-xl border-dashed">
          <p className="text-muted-foreground">暂无评价，快来抢沙发吧！</p>
        </div>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="flex gap-4 border-b pb-6 last:border-0">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage src={review.profiles?.avatar_url} />
              <AvatarFallback>{review.profiles?.username?.[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{review.profiles?.username || '匿名用户'}</span>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(review.created_at), 'yyyy年MM月dd日', { locale: zhCN })}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn("h-3 w-3", i < review.score ? "fill-brand-orange text-brand-orange" : "text-muted-foreground")}
                  />
                ))}
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {review.comment || '该用户未填写文字评价。'}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
