import PodcastApp from "@/components/PodcastApp";
import { fetchPodcasts } from "@/lib/data";

// export const revalidate = 60; // ISR

export default async function Home() {
  const episodes = await fetchPodcasts();
  return (
    <div>
      <PodcastApp episodes={episodes} />
    </div>
  );
}
