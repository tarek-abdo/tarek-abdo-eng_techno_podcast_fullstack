import type { Episode } from "./types";

export const DEFAULT_REVALIDATE_SECONDS = 60;

export type PodcastSourceItem = {
  _id?: string;
  id?: string;
  title?: string;
  name?: string;
  host?: string;
  members?: string;
  guests?: string;
  description?: string;
  summary?: string;
  imageUrl?: string;
  thumbnail?: string;
  image?: string;
  audioUrl?: string;
  audio?: string;
  file?: string;
  createdAt?: string;
  published_at?: string;
};

export function toSlug(text: string): string {
  return (text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function fetchPodcasts(options?: { revalidateSeconds?: number }): Promise<Episode[]> {
  const revalidate = options?.revalidateSeconds ?? DEFAULT_REVALIDATE_SECONDS;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/podcasts`, {
      next: { revalidate },
    });
    if (!res.ok) return [];
    const data: PodcastSourceItem[] = await res.json();
    return (data || []).map((item) => ({
      _id: item._id ?? item.id ?? undefined,
      title: item.title ?? item.name ?? "",
      host: item.host ?? item.members ?? item.guests ?? "",
      description: item.description ?? item.summary ?? "",
      imageUrl: item.imageUrl ?? item.thumbnail ?? item.image ?? "",
      audioUrl: item.audioUrl ?? item.audio ?? item.file ?? "",
      createdAt: item.createdAt ?? item.published_at ?? undefined,
      date: item.createdAt ?? item.published_at ?? "",
    }));
  } catch {
    return [];
  }
}

export async function fetchEpisodeByParam(param: string): Promise<Episode | null> {
  const episodes = await fetchPodcasts();
  return episodes.find((e) => e._id === param || toSlug(e.title) === param) ?? null;
}

export async function fetchEpisodeParams(): Promise<{ id: string }[]> {
  const episodes = await fetchPodcasts();
  return episodes.map((e) => ({ id: e._id ?? toSlug(e.title) }));
}
