import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import { SiGithub, SiX, SiFacebook } from 'react-icons/si';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
              全球领先的 AI 工具导航平台，致力于为用户发现最具创新性的智能解决方案。开启您的 AI 探索之旅。
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
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">产品服务</h3>
            <ul className="space-y-3">
              <li>
                <Link to={ROUTE_PATHS.HOME} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">所有工具</Link>
              </li>
              <li>
                <Link to={ROUTE_PATHS.SEARCH} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">高级搜索</Link>
              </li>
              <li>
                <Link to={ROUTE_PATHS.COLLECTIONS} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">精选合集</Link>
              </li>
              <li>
                <Link to={ROUTE_PATHS.SUBMIT} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">提交工具</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">帮助中心</h3>
            <ul className="space-y-3">
              <li>
                <Link to={ROUTE_PATHS.ABOUT} className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">关于我们</Link>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">使用指南</a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">隐私政策</a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors text-muted-foreground hover:text-brand-blue">服务条款</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">订阅通讯</h3>
            <p className="mb-4 text-sm text-muted-foreground">获取最新的 AI 工具发布通知和行业动态。</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="w-full px-3 py-2 text-sm transition-all border rounded-md bg-muted/50 border-border focus:outline-none focus:ring-1 focus:ring-brand-blue"
              />
              <button 
                type="submit" 
                className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-md bg-brand-blue hover:bg-brand-blue/90"
              >
                订阅
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 mt-12 border-t md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} AI Hub 导航平台. 保留所有权利。
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Designed for AI Era</span>
            <span className="text-xs text-muted-foreground">Powered by Next-Gen Tech</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
