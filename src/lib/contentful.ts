import { createClient, Entry } from 'contentful'

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || '',
})

// Type definitions for content models
export interface InsightFields {
  title: string
  slug: string
  excerpt: string
  content: any // Rich text field
  category: 'research' | 'market-views' | 'technology'
  author: Entry<AuthorFields>
  publishedDate: string
  featuredImage?: any
  tags: string[]
}

export interface AuthorFields {
  name: string
  title: string
  bio: string
  photo: any
  credentials: string[]
}

export interface StrategyFields {
  name: string
  slug: string
  description: any
  minimumInvestment: number
  targetReturn: string
  riskLevel: 'low' | 'medium' | 'high'
  highlights: string[]
}

// Fetch functions
export async function getInsights(limit = 10, category?: string) {
  try {
    const query: any = {
      content_type: 'insight',
      order: '-fields.publishedDate',
      limit,
    }
    
    if (category) {
      query['fields.category'] = category
    }
    
    const entries = await client.getEntries<InsightFields>(query)
    return entries.items
  } catch (error) {
    console.error('Error fetching insights:', error)
    return []
  }
}

export async function getInsightBySlug(slug: string) {
  try {
    const entries = await client.getEntries<InsightFields>({
      content_type: 'insight',
      'fields.slug': slug,
      limit: 1,
    })
    
    return entries.items[0] || null
  } catch (error) {
    console.error('Error fetching insight:', error)
    return null
  }
}

export async function getStrategies() {
  try {
    const entries = await client.getEntries<StrategyFields>({
      content_type: 'strategy',
      order: 'fields.minimumInvestment',
    })
    
    return entries.items
  } catch (error) {
    console.error('Error fetching strategies:', error)
    return []
  }
}

export async function getTeamMembers() {
  try {
    const entries = await client.getEntries<AuthorFields>({
      content_type: 'teamMember',
      order: 'fields.order',
    })
    
    return entries.items
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

// Preview API for draft content
export function getPreviewClient(previewToken: string) {
  return createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || '',
    accessToken: previewToken,
    host: 'preview.contentful.com',
  })
} 