import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
}

interface RatingData {
  tool_id: string
  rating: number
  review?: string
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

    const url = new URL(req.url)
    const toolId = url.searchParams.get('tool_id')

    if (req.method === 'POST' || req.method === 'PUT') {
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

      const ratingData: RatingData = await req.json()

      // Validate rating
      if (!ratingData.rating || ratingData.rating < 1 || ratingData.rating > 5) {
        return new Response(
          JSON.stringify({ error: 'Rating must be between 1 and 5' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      if (!ratingData.tool_id) {
        return new Response(
          JSON.stringify({ error: 'tool_id is required' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Upsert rating (insert or update)
      const { data, error } = await supabaseClient
        .from('ratings')
        .upsert({
          user_id: user.id,
          tool_id: ratingData.tool_id,
          rating: ratingData.rating,
          review: ratingData.review || null,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to save rating' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Rating saved successfully',
          rating: data 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (req.method === 'GET') {
      // Get ratings for a tool
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
        .from('ratings')
        .select(`
          *,
          profiles (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('tool_id', toolId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch ratings' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Calculate rating statistics
      const ratings = data || []
      const totalRatings = ratings.length
      const averageRating = totalRatings > 0 
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings 
        : 0

      const ratingDistribution = {
        5: ratings.filter(r => r.rating === 5).length,
        4: ratings.filter(r => r.rating === 4).length,
        3: ratings.filter(r => r.rating === 3).length,
        2: ratings.filter(r => r.rating === 2).length,
        1: ratings.filter(r => r.rating === 1).length,
      }

      return new Response(
        JSON.stringify({ 
          ratings: data,
          statistics: {
            total_ratings: totalRatings,
            average_rating: Math.round(averageRating * 10) / 10,
            rating_distribution: ratingDistribution
          }
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    if (req.method === 'DELETE') {
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
        .from('ratings')
        .delete()
        .eq('user_id', user.id)
        .eq('tool_id', toolId)

      if (error) {
        console.error('Database error:', error)
        return new Response(
          JSON.stringify({ error: 'Failed to delete rating' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Rating deleted successfully' 
        }),
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