# EmailOctopus Newsletter Setup Guide (Vercel Function)

## Overview

AIBench uses a Vercel Serverless Function as a proxy to call EmailOctopus API. This completely avoids CORS issues and keeps API keys secure on the server.

## Architecture

```
Frontend → /api/subscribe → EmailOctopus API
```

**Benefits:**
- ✅ No CORS issues
- ✅ API keys secure on server
- ✅ Works from any domain
- ✅ Full error handling
- ✅ Duplicate subscription detection

## Setup Steps

### Step 1: Get EmailOctopus Credentials

1. Go to https://emailoctopus.com
2. Sign up and verify your email
3. Get API Key: Settings → API → Copy API Key
4. Create List: Lists → Create new list → Copy List ID from URL

### Step 2: Configure Environment Variables

#### Local Development

Create `.env.local`:
```bash
EMAILOCTOPUS_API_KEY=eo_abf46a21bfed5f217ea56859dac0d4133713542b9c57e33221c20aeda44dfc89
EMAILOCTOPUS_LIST_ID=de852cd8-0666-11f1-85cc-572c43f6374b
```

#### Vercel Production

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add two variables:
   ```
   EMAILOCTOPUS_API_KEY = eo_abf46a21bfed5f217ea56859dac0d4133713542b9c57e33221c20aeda44dfc89
   EMAILOCTOPUS_LIST_ID = de852cd8-0666-11f1-85cc-572c43f6374b
   ```
3. Redeploy

### Step 3: Test Locally

```bash
# Start dev server
pnpm dev

# Test subscription in browser
# Scroll to footer and subscribe
```

### Step 4: Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel will auto-deploy
# Or manually: vercel --prod
```

## How It Works

### Frontend (Footer.tsx)

```typescript
const handleSubscribe = async (e) => {
  e.preventDefault();

  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  // Show success/error toast
};
```

### Backend (api/subscribe.js)

```javascript
export default async function handler(req, res) {
  const { email } = req.body;

  // Call EmailOctopus API with server-side credentials
  const response = await fetch(
    `https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`,
    {
      method: 'POST',
      body: JSON.stringify({
        api_key: API_KEY,
        email_address: email,
        status: 'SUBSCRIBED'
      })
    }
  );

  return res.json({ success: true });
}
```

## API Endpoint

### POST /api/subscribe

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "subscribed",
  "data": {
    "id": "...",
    "email": "user@example.com"
  }
}
```

**Already Subscribed:**
```json
{
  "success": true,
  "message": "already_subscribed",
  "alreadySubscribed": true
}
```

**Error Response:**
```json
{
  "error": "Invalid email address"
}
```

## Testing

### Test API Endpoint

```bash
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test in Browser

1. Open http://localhost:3000
2. Scroll to footer
3. Enter email and subscribe
4. Check browser console for errors
5. Verify in EmailOctopus dashboard

## Troubleshooting

### Issue: 500 Internal Server Error

**Solution:**
- Check environment variables are set
- Verify API key is correct
- Check Vercel function logs

### Issue: API key not found

**Solution:**
```bash
# Local: Create .env.local
echo "EMAILOCTOPUS_API_KEY=your_key" > .env.local
echo "EMAILOCTOPUS_LIST_ID=your_list_id" >> .env.local

# Vercel: Add in dashboard
```

### Issue: CORS error still appears

**Solution:**
- Ensure you're calling `/api/subscribe` not EmailOctopus directly
- Check network tab to verify request goes to your domain

## Security

- ✅ API keys stored server-side only
- ✅ Never exposed to frontend
- ✅ Rate limiting via Vercel
- ✅ Input validation
- ✅ Error handling

## Cost

**Vercel:**
- Free tier: 100GB bandwidth, 100 serverless function invocations/day
- Pro: $20/month for more

**EmailOctopus:**
- Free: 2,500 subscribers, 10,000 emails/month
- Paid: $8/month for 5,000 subscribers

## Files

- `api/subscribe.js` - Serverless function
- `src/components/Footer.tsx` - Frontend form
- `vercel.json` - Vercel configuration
- `.env.local` - Local environment variables (gitignored)
- `.env.example` - Environment variable template

## Support

- Vercel Docs: https://vercel.com/docs/functions
- EmailOctopus API: https://emailoctopus.com/api-documentation
- AIBench: service@x2v.co
