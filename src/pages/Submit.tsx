import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { toolCategories } from '@/data/tools';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';

const Submit: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-12"
            >
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold">提交成功！</h1>
              <p className="text-muted-foreground text-lg">
                感谢您的分享。我们的审核团队将在 24 小时内完成评估，
                审核通过后工具将正式上线。
              </p>
              <Button onClick={() => setIsSubmitted(false)} variant="outline">
                提交另一个工具
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">提交 AI 工具</h1>
                <p className="text-muted-foreground">
                  发现或创造了了不起的 AI 工具？在这里分享给全球用户。
                </p>
              </div>

              <Card className="border-none shadow-xl">
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>基本信息</CardTitle>
                    <CardDescription>请准确填写工具的相关详情以便审核。</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">工具名称</label>
                        <Input placeholder="例如: ChatGPT" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">官网链接</label>
                        <Input type="url" placeholder="https://..." required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">所属分类</label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="选择分类" />
                          </SelectTrigger>
                          <SelectContent>
                            {toolCategories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">付费模式</label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="选择模式" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">免费</SelectItem>
                            <SelectItem value="freemium">免费增值</SelectItem>
                            <SelectItem value="paid">付费</SelectItem>
                            <SelectItem value="usage">按量计费</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">一句话简介</label>
                      <Input placeholder="简短描述工具的核心功能 (建议 50 字以内)" required />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">详细描述 (可选)</label>
                      <Textarea 
                        placeholder="详细说明工具的使用场景、核心优势等..."
                        className="min-h-[120px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">图标 URL</label>
                      <div className="flex gap-4">
                        <Input placeholder="https://example.com/logo.png" />
                        <Button type="button" variant="secondary" className="shrink-0">
                          <Upload className="h-4 w-4 mr-2" /> 上传图片
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-800">
                        请确保提交的工具符合我们的收录标准。禁止提交任何违法、违规或侵犯版权的内容。
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-4 border-t pt-6">
                    <Button type="button" variant="ghost">取消</Button>
                    <Button 
                      type="submit" 
                      disabled={loading} 
                      className="bg-brand-blue hover:bg-brand-blue/90 px-8"
                    >
                      {loading ? '提交中...' : '提交审核'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

import { motion } from 'framer-motion';
export default Submit;