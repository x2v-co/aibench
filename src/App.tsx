import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ToolDetail from "./pages/ToolDetail";
import Category from "./pages/Category";
import About from "./pages/About";
import Submit from "./pages/Submit";
import Collections from "./pages/Collections";
import Search from "./pages/Search";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tool/:id" element={<ToolDetail />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/search" element={<Search />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </HashRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
