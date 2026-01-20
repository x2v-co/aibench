import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { SiGithub, SiGoogle } from "react-icons/si";
import { Mail, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailAuth = async (type: 'login' | 'signup') => {
    setLoading(true);
    try {
      const { error } = type === 'login' 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;

      toast.success(type === 'login' ? '登录成功' : '注册成功，请检查邮箱验证');
      if (type === 'login') onClose();
    } catch (error: any) {
      toast.error(error.message || '操作失败');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'github' | 'google') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || '第三方登录失败');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">欢迎回来</DialogTitle>
          <DialogDescription className="text-center">
            登录以收藏您最喜爱的 AI 工具
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="signup">注册</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="邮箱地址"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="密码"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="login" className="mt-0">
              <Button 
                className="w-full bg-brand-blue hover:bg-brand-blue/90" 
                disabled={loading}
                onClick={() => handleEmailAuth('login')}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                立即登录
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <Button 
                className="w-full bg-brand-orange hover:bg-brand-orange/90" 
                disabled={loading}
                onClick={() => handleEmailAuth('signup')}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                创建账号
              </Button>
            </TabsContent>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">或者通过以下方式</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => handleOAuth('github')}>
                <SiGithub className="mr-2 h-4 w-4" /> GitHub
              </Button>
              <Button variant="outline" onClick={() => handleOAuth('google')}>
                <SiGoogle className="mr-2 h-4 w-4 text-red-500" /> Google
              </Button>
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
