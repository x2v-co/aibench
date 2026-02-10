export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // EmailOctopus API credentials
    const API_KEY = process.env.EMAILOCTOPUS_API_KEY;
    const LIST_ID = process.env.EMAILOCTOPUS_LIST_ID;

    if (!API_KEY || !LIST_ID) {
      console.error('Missing EmailOctopus configuration');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Call EmailOctopus API
    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: API_KEY,
          email_address: email,
          status: 'SUBSCRIBED',
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // Handle duplicate subscription
      if (data.error?.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
        return res.status(200).json({
          success: true,
          message: 'already_subscribed',
          alreadySubscribed: true
        });
      }

      console.error('EmailOctopus API error:', data);
      return res.status(response.status).json({
        error: data.error?.message || 'Subscription failed'
      });
    }

    // Success
    return res.status(200).json({
      success: true,
      message: 'subscribed',
      data: {
        id: data.id,
        email: data.email_address,
      }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
}
