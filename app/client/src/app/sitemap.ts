import type { MetadataRoute } from 'next'
import { fetchEpisodeParams } from '@/lib/data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com'
  const episodeParams = await fetchEpisodeParams()
  const now = new Date().toISOString()

  return [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'hourly' as const, priority: 1 },
    { url: `${baseUrl}/episodes`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.8 },
    ...episodeParams.map((p) => ({
      url: `${baseUrl}/episodes/${p.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}


