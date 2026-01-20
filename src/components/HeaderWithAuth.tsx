import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ROUTE_PATHS } from '@/constants/routes';
import { Search, PlusCircle, LogOut, User, Settings, Bookmark } from "lucide-react";

export const Header: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTE_PATHS.HOME);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to={ROUTE_PATHS.HOME} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-blue flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">
              AI <span className="text-brand-blue">Directory</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <NavLink 
              to={ROUTE_PATHS.HOME} 
              className={({ isActive }) => 
                `transition-colors hover:text-brand-blue ${isActive ? 'text-brand-blue' : 'text-muted-foreground'}`
              }
            >
              发现工具
            </NavLink>
            <NavLink 
              to={ROUTE_PATHS.ABOUT} 
              className={({ isActive }) => 
                `transition-colors hover:text-brand-blue ${isActive ? 'text-brand-blue' : 'text-muted-foreground'}`
              }
            >
              关于我们
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link to={ROUTE_PATHS.SEARCH} className="p-2 text-muted-foreground hover:text-brand-blue transition-colors">
            <Search className="h-5 w-5" />
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to={ROUTE_PATHS.SUBMIT} className="hidden sm:block">
                <Button variant="outline" size="sm" className="gap-2 border-brand-blue text-brand-blue hover:bg-brand-blue/5">
                  <PlusCircle className="h-4 w-4" />
                  提交工具
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border border-brand-blue/20">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>{profile?.username?.[0] || user.email?.[0]}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.username || '用户'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(ROUTE_PATHS.COLLECTIONS)}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>我的收藏</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>个人资料</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>偏好设置</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>退出登录</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button 
              className="bg-brand-blue hover:bg-brand-blue/90" 
              onClick={() => setIsAuthModalOpen(true)}
            >
              登录 / 注册
            </Button>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};
