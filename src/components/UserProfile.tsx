import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { authApi } from '@/services/api';
import { toast } from "sonner";
import { User, Mail, Shield, Save, Loader2 } from "lucide-react";

export const UserProfile: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');

  const handleUpdate = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await authApi.updateProfile({
        id: user.id,
        username,
        avatar_url: avatarUrl,
      });
      await refreshProfile();
      toast.success('个人资料已更新');
    } catch (error: any) {
      toast.error(error.message || '更新失败');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-8 text-center">请先登录</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-6 mb-8">
        <Avatar className="h-24 w-24 border-2 border-brand-blue">
          <AvatarImage src={profile?.avatar_url} />
          <AvatarFallback className="text-2xl">{profile?.username?.[0] || user.email?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{profile?.username || '未设置昵称'}</h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Mail className="h-4 w-4" /> {user.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-brand-blue" />
              账户信息
            </CardTitle>
            <CardDescription>管理您的个人公开信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">用户名</label>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="输入您的昵称"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">头像 URL</label>
              <Input 
                value={avatarUrl} 
                onChange={(e) => setAvatarUrl(e.target.value)} 
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <Button 
              className="w-full md:w-auto bg-brand-blue" 
              onClick={handleUpdate}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              保存更改
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-brand-orange" />
              账号安全
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <p className="text-muted-foreground mb-4">您的账号受多重身份验证保护。</p>
              <Button variant="outline" className="w-full" disabled>
                重置密码
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
