# EmailOctopus Newsletter Setup Guide

## Overview

AIBench uses EmailOctopus embedded form for newsletter subscriptions. This approach avoids CORS issues and works directly from the browser without requiring a backend.

## Why EmailOctopus Embedded Form?

- ✅ **No CORS issues**: Uses traditional HTML form POST
- ✅ **No backend needed**: Direct submission to EmailOctopus
- ✅ **Simple integration**: Standard HTML form
- ✅ **Full-featured**: Email templates, analytics, automation
- ✅ **Free tier**: 2,500 subscribers, 10,000 emails/month

## Setup Steps

### Step 1: Create EmailOctopus Account

1. Go to https://emailoctopus.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email List

1. In EmailOctopus dashboard, go to **Lists**
2. Click **Create a new list**
3. Fill in:
   - **List name**: AIBench Newsletter
   - **Description**: Subscribers to AIBench newsletter
   - **From name**: AIBench
   - **From email**: service@x2v.co (or your verified email)
4. Click **Create list**
5. Copy the **List ID** from the URL
   - URL format: `https://emailoctopus.com/lists/{LIST_ID}`

### Step 3: Get Embedded Form URL

Your embedded form URL will be:
```
https://emailoctopus.com/lists/{LIST_ID}/members/embedded/1.3s/add
```

Replace `{LIST_ID}` with your actual List ID.

**Example:**
```
https://emailoctopus.com/lists/de852cd8-0666-11f1-85cc-572c43f6374b/members/embedded/1.3s/add
```

### Step 4: Update Footer Component (Already Configured)

The form is already configured in `src/components/Footer.tsx`:

```tsx
<form
  method="post"
  action="https://emailoctopus.com/lists/YOUR_LIST_ID/members/embedded/1.3s/add"
  // ...
>
  <input type="email" name="email_address" required />
  <input type="hidden" name="successRedirectUrl" value="https://aibench.top/#/?subscribed=true" />
  <button type="submit">Subscribe</button>
</form>
```

**To update for your list:**
1. Open `src/components/Footer.tsx`
2. Find the form `action` URL
3. Replace the List ID with yours

### Step 5: Verify Email Address

Before sending emails, verify your sender email:

1. Go to your list → **Settings** → **Sending details**
2. Confirm **From email** (`service@x2v.co`)
3. EmailOctopus will send verification email
4. Click the verification link

### Step 6: Test

1. Start development server:
   ```bash
   pnpm dev
   ```

2. Scroll to footer and test subscription
3. After submitting, you'll be redirected back with success message
4. Check EmailOctopus dashboard for new subscriber

## How It Works

### Submission Flow

1. **User enters email** → Form validates email format (HTML5)
2. **Clicks submit** → Traditional POST to EmailOctopus
3. **EmailOctopus processes** → Adds subscriber to list
4. **Redirects back** → Returns to your site with `?subscribed=true`
5. **Success message** → Toast notification displayed
6. **Confirmation email** → EmailOctopus sends to subscriber

### No CORS Issues

Traditional HTML form submission doesn't trigger CORS preflight:
- ✅ No `fetch()` or `XMLHttpRequest`
- ✅ No custom headers
- ✅ Standard `POST` form submission
- ✅ Works from any domain

### Success Detection

When EmailOctopus redirects back, the URL includes `?subscribed=true`:

```typescript
// src/pages/Index.tsx
useEffect(() => {
  if (searchParams.get('subscribed') === 'true') {
    toast.success('订阅成功！');
    // Clean up URL
    searchParams.delete('subscribed');
    setSearchParams(searchParams, { replace: true });
  }
}, [searchParams]);
```

## Sending Newsletters

Once you have subscribers:

1. Go to EmailOctopus dashboard
2. Click **Campaigns** → **Create campaign**
3. Choose your list (AIBench Newsletter)
4. Design your email
5. Send or schedule

## Features Available

### EmailOctopus Dashboard

- 📊 **Analytics**: Open rates, click rates, subscriber growth
- 📝 **Email Editor**: Drag-and-drop or HTML editor
- 🎯 **Segmentation**: Tag and segment subscribers
- 🔄 **Automation**: Welcome emails, drip campaigns
- 📱 **Templates**: Pre-built email templates

### Compliance

EmailOctopus automatically handles:
- ✅ Unsubscribe links in every email
- ✅ GDPR compliance
- ✅ CAN-SPAM compliance
- ✅ Double opt-in confirmation emails

## Cost Estimates

| Subscribers | Monthly Cost | Yearly Cost |
|------------|--------------|-------------|
| 0-2,500    | FREE         | FREE        |
| 5,000      | $8/month     | $96/year    |
| 10,000     | $16/month    | $192/year   |
| 25,000     | $38/month    | $456/year   |

## Troubleshooting

### Issue: Form submission not working

**Solution:**
- Check that List ID in form action URL is correct
- Verify the form has `method="post"` attribute
- Check browser console for errors

### Issue: Not receiving confirmation emails

**Solution:**
- Verify sender email in EmailOctopus settings
- Check spam folder
- Ensure EmailOctopus account is not suspended

### Issue: Subscribers not appearing in dashboard

**Solution:**
- Wait a few seconds and refresh the page
- Check that form is submitting to correct List ID
- Verify EmailOctopus account status

## Security Notes

- ✅ No API keys exposed in frontend
- ✅ EmailOctopus handles spam prevention
- ✅ Rate limiting built-in
- ✅ No sensitive data transmitted

## Alternative: API Integration (Not Recommended)

If you need API integration (not recommended due to CORS):

1. Create a backend proxy (Vercel/Netlify Functions)
2. Proxy requests from frontend to EmailOctopus API
3. Keep API key secret on server

**Why embedded form is better:**
- Simpler implementation
- No backend required
- No CORS issues
- Built-in spam protection

## Files Modified

- `src/components/Footer.tsx` - Embedded form implementation
- `src/pages/Index.tsx` - Success message detection
- `src/i18n/locales/*/footer.json` - Translations (8 languages)

## Support

- EmailOctopus Docs: https://emailoctopus.com/api-documentation
- Embedded Forms Guide: https://emailoctopus.com/blog/embedded-forms
- AIBench Support: service@x2v.co
