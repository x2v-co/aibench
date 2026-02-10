// Debug endpoint to check environment variables
export async function onRequestGet(context) {
  const { env } = context;

  return new Response(
    JSON.stringify({
      hasAPIKey: !!env.EMAILOCTOPUS_API_KEY,
      hasListID: !!env.EMAILOCTOPUS_LIST_ID,
      apiKeyLength: env.EMAILOCTOPUS_API_KEY?.length || 0,
      listIdLength: env.EMAILOCTOPUS_LIST_ID?.length || 0,
      allEnvKeys: Object.keys(env),
      timestamp: new Date().toISOString()
    }, null, 2),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
}
