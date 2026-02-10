# EmailOctopus Newsletter Setup Guide

## Overview

AIBench uses EmailOctopus for newsletter subscriptions. This guide will help you set up the newsletter functionality.

## Why EmailOctopus?

- ✅ **Free tier**: 2,500 subscribers, 10,000 emails/month
- ✅ **No backend needed**: Direct API calls from frontend
- ✅ **Simple integration**: REST API
- ✅ **Full-featured**: Email templates, analytics, automation
- ✅ **Affordable**: $8/month for 5,000 subscribers

## Setup Steps

### Step 1: Create EmailOctopus Account

1. Go to https://emailoctopus.com
2. Sign up for a free account
3. Verify your email address

### Step 2: Get API Key

1. Log in to EmailOctopus dashboard
2. Click your name (top right) → **Settings**
3. Navigate to **API** tab
4. Copy your API Key

### Step 3: Create Email List

1. In EmailOctopus dashboard, go to **Lists**
2. Click **Create a new list**
3. Fill in:
   - **List name**: AIBench Newsletter
   - **Description**: Subscribers to AIBench newsletter
   - **From name**: AIBench
   - **From email**: service@x2v.co (or your verified email)
4. Click **Create list**
5. Copy the **List ID** from the URL or list settings
   - URL format: `https://emailoctopus.com/lists/{LIST_ID}`

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   VITE_EMAILOCTOPUS_API_KEY=your_api_key_here
   VITE_EMAILOCTOPUS_LIST_ID=your_list_id_here
   ```

3. **Never commit `.env.local`** - it's already in `.gitignore`

### Step 5: Test the Integration

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Scroll to the footer and try subscribing with your email
3. Check EmailOctopus dashboard to see the new subscriber
4. Check your email for the confirmation message

## How It Works

### Frontend Flow

1. User enters email in footer form
2. Form validates email format
3. Makes POST request to EmailOctopus API:
   ```javascript
   POST https://emailoctopus.com/api/1.6/lists/{LIST_ID}/contacts
   Body: {
     api_key: "YOUR_API_KEY",
     email_address: "user@example.com",
     status: "SUBSCRIBED"
   }
   ```
4. Shows success/error toast message
5. For successful subscriptions, EmailOctopus sends confirmation email

### Error Handling

The implementation handles:
- ✅ Invalid email format
- ✅ Duplicate subscriptions (already subscribed)
- ✅ Network errors
- ✅ API errors
- ✅ Multi-language error messages

### Security Considerations

**Important**: The API Key and List ID are exposed in the frontend bundle. This is acceptable for EmailOctopus because:

1. EmailOctopus API Keys are designed for public use
2. The key can only add subscribers to your lists
3. It cannot delete subscribers or access sensitive data
4. Rate limiting is built-in

However, **DO NOT use this pattern** with services that have sensitive API keys (like Resend, SendGrid, etc.)

## Sending Newsletters

Once you have subscribers:

1. Go to EmailOctopus dashboard
2. Click **Campaigns** → **Create campaign**
3. Choose your list (AIBench Newsletter)
4. Design your email using their editor
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
- ✅ Confirmation emails (double opt-in)

## Monitoring

### Check Subscription Stats

```bash
# Get list stats
curl "https://emailoctopus.com/api/1.6/lists/{LIST_ID}?api_key={API_KEY}"
```

### Common Issues

**Issue**: "Invalid API key"
- Check that your API key is correct
- Make sure there are no extra spaces

**Issue**: "List not found"
- Verify the List ID is correct
- Check that the list hasn't been deleted

**Issue**: "Already subscribed" message
- This is normal - EmailOctopus prevents duplicate subscriptions
- User will be informed they're already subscribed

## Cost Estimates

Based on subscriber count:

| Subscribers | Monthly Cost | Yearly Cost |
|------------|--------------|-------------|
| 0-2,500    | FREE         | FREE        |
| 5,000      | $8/month     | $96/year    |
| 10,000     | $16/month    | $192/year   |
| 25,000     | $38/month    | $456/year   |

## Alternative Services

If you need different features:

- **Mailchimp**: More features, higher cost (500 free subscribers)
- **ConvertKit**: Creator-focused (1,000 free subscribers)
- **Buttondown**: Minimalist, $9/month for 1,000 subscribers

## Support

- EmailOctopus Docs: https://emailoctopus.com/api-documentation
- AIBench Support: service@x2v.co

## Files Modified

This implementation modified:
- `src/components/Footer.tsx` - Added subscription form logic
- `src/i18n/locales/*/footer.json` - Added translation keys (8 languages)
- `.env.example` - Environment variable template
- `EMAILOCTOPUS_SETUP.md` - This guide

## Next Steps

1. ✅ Set up EmailOctopus account
2. ✅ Get API key and create list
3. ✅ Configure `.env.local`
4. ✅ Test subscription
5. 📧 Send your first newsletter!
