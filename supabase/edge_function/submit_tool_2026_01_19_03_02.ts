import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
}

interface ToolSubmission {
  name: string
  description: string
  long_description?: string
  website_url: string
  icon_url?: string
  category_id: string
  pricing_type: string
  tags?: string[]
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user from JWT
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (req.method === 'POST') {
      const submission: ToolSubmission = await req.json()

      // Validate required fields
      if (!submission.name || !submission.description || !submission.website_url || !submission.category_id) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Validate URL format
      try {
        new URL(submission.website_url)
      } catch {
        return new Response(
          JSON.stringify({ error: 'Invalid website URL' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Insert tool submission
      const { data, error } = await supabaseClient
        .from('tool_submissions')
        .insert({
          name: submission.name,
          description: submission.description,
          long_description: submission.long_description,
          website_url: submission.website_url,
          icon_url: submission.icon_url,
          category_id: submission.category_id,
          pricing_type: submission.pricing_type,
          tags: submission.tags || [],
          submitted_by: user.id,
          status: 'pending'
        })
        .select()
        .single()

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to submit tool' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Tool submitted successfully',
          submission: data 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // GET method - fetch user's submissions
    if (req.method === 'GET') {
      const { data, error } = await supabaseClient
        .from('tool_submissions')
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .eq('submitted_by', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch submissions' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ submissions: data }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})