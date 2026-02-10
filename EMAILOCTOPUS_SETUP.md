# EmailOctopus Newsletter Setup Guide (Cloudflare Pages)

## Overview

AIBench uses Cloudflare Pages Functions as a proxy to call EmailOctopus API. This completely avoids CORS issues and keeps API keys secure on the edge.

## Architecture

```
Frontend → /api/subscribe (Cloudflare Function) → EmailOctopus API
```

**Benefits:**
- ✅ No CORS issues
- ✅ API keys secure on Cloudflare edge
- ✅ Works from any domain
- ✅ Lightning fast (edge computing)
- ✅ Full error handling
- ✅ Duplicate subscription detection
- ✅ Free on Cloudflare Pages

## Setup Steps

### Step 1: Get EmailOctopus Credentials

Already configured:
- **API Key**: `eo_abf46a21bfed5f217ea56859dac0d4133713542b9c57e33221c20aeda44dfc89`
- **List ID**: `de852cd8-0666-11f1-85cc-572c43f6374b`

### Step 2: Configure Environment Variables

#### Cloudflare Pages Dashboard

1. Go to Cloudflare Dashboard → Pages → Your Project
2. Settings → Environment Variables
3. Add two variables (for Production and Preview):

**Production:**
```
EMAILOCTOPUS_API_KEY = eo_abf46a21bfed5f217ea56859dac0d4133713542b9c57e33221c20aeda44dfc89
EMAILOCTOPUS_LIST_ID = de852cd8-0666-11f1-85cc-572c43f6374b
```

**Preview (Optional, same values):**
```
EMAILOCTOPUS_API_KEY = eo_abf46a21bfed5f217ea56859dac0d4133713542b9c57e33221c20aeda44dfc89
EMAILOCTOPUS_LIST_ID = de852cd8-0666-11f1-85cc-572c43f6374b
```

4. Click **Save and Deploy**

#### Local Development (.dev.vars)

Create `.dev.vars` file in project root:
```bash
EMAILOCTOPUS_API_KEY=eo_abf46a21bfed5f217ea56859dac0d4133713542b9c57e33221c20aeda44dfc89
EMAILOCTOPUS_LIST_ID=de852cd8-0666-11f1-85cc-572c43f6374b
```

**Important:** `.dev.vars` is already in `.gitignore`

### Step 3: Test Locally

#### Install Wrangler (Cloudflare CLI)
```bash
npm install -g wrangler
```

#### Run Local Development Server
```bash
# Build frontend
pnpm build

# Serve with Cloudflare Pages locally
npx wrangler pages dev dist
```

This will:
- Serve your built site
- Run Cloudflare Functions locally
- Available at http://localhost:8788

#### Test Subscription
1. Open http://localhost:8788
2. Scroll to footer
3. Enter email and subscribe
4. Check console (should have NO CORS errors)
5. Verify in EmailOctopus dashboard

### Step 4: Deploy to Cloudflare Pages

#### Automatic Deployment (Recommended)

1. Push to GitHub:
   ```bash
   git push origin main
   ```

2. Cloudflare Pages will automatically:
   - Detect the push
   - Build the project
   - Deploy with Functions

#### Manual Deployment

```bash
# Build
pnpm build

# Deploy
npx wrangler pages deploy dist
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

### Backend (functions/api/subscribe.js)

```javascript
export async function onRequestPost(context) {
  const { request, env } = context;
  const { email } = await request.json();

  // Call EmailOctopus API with edge-side credentials
  const response = await fetch(
    `https://emailoctopus.com/api/1.6/lists/${env.LIST_ID}/contacts`,
    {
      method: 'POST',
      body: JSON.stringify({
        api_key: env.API_KEY,
        email_address: email,
        status: 'SUBSCRIBED'
      })
    }
  );

  return new Response(JSON.stringify({ success: true }));
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

### Local Testing with Wrangler

```bash
# 1. Build project
pnpm build

# 2. Create .dev.vars with credentials
echo "EMAILOCTOPUS_API_KEY=eo_abf46a21bfed5f217ea56859dac0d4133713542b9c57e33221c20aeda44dfc89" > .dev.vars
echo "EMAILOCTOPUS_LIST_ID=de852cd8-0666-11f1-85cc-572c43f6374b" >> .dev.vars

# 3. Run Pages dev server
npx wrangler pages dev dist

# 4. Test at http://localhost:8788
```

### Test API Endpoint Directly

```bash
curl -X POST http://localhost:8788/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Production Testing

After deployment:
```bash
curl -X POST https://your-site.pages.dev/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Troubleshooting

### Issue: Function not found (404)

**Solution:**
- Ensure `functions/api/subscribe.js` exists
- Check file structure: `functions/api/subscribe.js` (not `api/subscribe.js`)
- Redeploy after adding the function

### Issue: Environment variables not found

**Solution:**
1. Local: Create `.dev.vars` file
2. Production: Add in Cloudflare Dashboard → Pages → Settings → Environment Variables
3. Click "Save and Deploy" to apply changes

### Issue: CORS error still appears

**Solution:**
- Function includes CORS headers (`Access-Control-Allow-Origin: *`)
- Check Network tab to verify request goes to `/api/subscribe`
- Clear browser cache

### Issue: "Internal server error"

**Solution:**
- Check Cloudflare Pages logs in dashboard
- Verify environment variables are set correctly
- Check EmailOctopus API key is valid

## Cloudflare Pages Configuration

### Build Settings

In Cloudflare Pages dashboard:

**Framework preset:** None (or Vite)
**Build command:** `pnpm install && pnpm build`
**Build output directory:** `dist`
**Root directory:** `/`

### Environment Variables

Add in Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `EMAILOCTOPUS_API_KEY` | `eo_abf46a21...` |
| `EMAILOCTOPUS_LIST_ID` | `de852cd8-...` |

## Security

- ✅ API keys stored on Cloudflare edge (never in frontend)
- ✅ CORS headers properly configured
- ✅ Rate limiting via Cloudflare
- ✅ Input validation
- ✅ Error handling

## Cost

**Cloudflare Pages:**
- ✅ **100% FREE** for unlimited requests
- ✅ 500 builds/month on free plan
- ✅ Unlimited bandwidth
- ✅ Edge functions included

**EmailOctopus:**
- Free: 2,500 subscribers, 10,000 emails/month
- Paid: $8/month for 5,000 subscribers

## File Structure

```
aibench/
├── functions/
│   └── api/
│       └── subscribe.js      # Cloudflare Function
├── src/
│   └── components/
│       └── Footer.tsx         # Subscription form
├── .dev.vars                  # Local env vars (gitignored)
├── wrangler.toml              # Cloudflare config
└── .gitignore                 # Includes .dev.vars
```

## Advantages over Vercel

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| Free tier functions | 100/day | ✅ Unlimited |
| Edge computing | ✅ Yes | ✅ Yes |
| Setup complexity | Medium | Easy |
| Cold starts | ~100ms | ~0ms (Workers) |
| Cost at scale | $$$ | $ (much cheaper) |

## Support

- Cloudflare Pages Docs: https://developers.cloudflare.com/pages/functions/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/
- EmailOctopus API: https://emailoctopus.com/api-documentation
- AIBench: service@x2v.co

## Quick Start Checklist

- [ ] Create `.dev.vars` with credentials
- [ ] Install Wrangler: `npm i -g wrangler`
- [ ] Build: `pnpm build`
- [ ] Test locally: `npx wrangler pages dev dist`
- [ ] Open http://localhost:8788 and test subscription
- [ ] Add environment variables in Cloudflare Dashboard
- [ ] Deploy: `git push origin main`
- [ ] Test production deployment
- [ ] Verify in EmailOctopus dashboard
