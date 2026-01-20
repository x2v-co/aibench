import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
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

    const url = new URL(req.url)
    const toolId = url.searchParams.get('tool_id')

    if (req.method === 'POST') {
      // Add to favorites
      if (!toolId) {
        return new Response(
          JSON.stringify({ error: 'tool_id is required' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const { data, error } = await supabaseClient
        .from('favorites')
        .insert({
          user_id: user.id,
          tool_id: toolId
        })
        .select()
        .single()

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          return new Response(
            JSON.stringify({ error: 'Tool already in favorites' }),
            { 
              status: 409, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to add favorite' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Added to favorites',
          favorite: data 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (req.method === 'DELETE') {
      // Remove from favorites
      if (!toolId) {
        return new Response(
          JSON.stringify({ error: 'tool_id is required' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const { error } = await supabaseClient
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId)

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to remove favorite' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Removed from favorites' 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (req.method === 'GET') {
      // Get user's favorites
      const { data, error } = await supabaseClient
        .from('favorites')
        .select(`
          *,
          tools (
            id,
            name,
            description,
            icon_url,
            website_url,
            pricing_type,
            tags,
            rating,
            visit_count,
            categories (
              name,
              slug
            )
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch favorites' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ favorites: data }),
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