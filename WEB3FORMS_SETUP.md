# Web3Forms Setup Guide

## 获取 Access Key

1. 访问 https://web3forms.com
2. 输入您的邮箱地址：`service@x2v.co`
3. 点击 "Create Access Key"
4. 复制生成的 Access Key

## 配置步骤

将获取到的 Access Key 替换到以下文件中：

**文件位置：** `src/pages/Submit.tsx`

**第 35 行：**
```typescript
formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
```

替换为：
```typescript
formData.append('access_key', '你获取的Access Key');
```

## 功能说明

提交表单后，您将收到包含以下信息的邮件：
- Tool Name (工具名称)
- Website URL (网站地址)
- Icon URL (图标地址)
- Category (分类)
- Short Description (简短描述)
- Detailed Description (详细描述)
- Tags (标签)
- Pricing Model (定价模式)
- Contact Email (联系邮箱)

## 防垃圾邮件

已集成 honeypot 字段进行基础防护。如需更强防护，可以在 Web3Forms 后台启用 reCAPTCHA。

## 提交流程

1. 用户填写表单
2. 点击提交后显示加载状态
3. 成功提交后显示 toast 提示
4. 2秒后自动跳转回首页
5. 您的邮箱将收到提交的详细信息
