import { Heart, Instagram, Play } from "lucide-react";
import { Button } from "./ui/button";

interface InstaPost {
  id: string;
  type: "image" | "reel";
  caption: string;
  likes: number;
  comments: number;
  bgGradient: string;
  badge: string;
  mediaDesc: string;
}

const mockPosts: InstaPost[] = [
  {
    id: "post1",
    type: "reel",
    caption: "Kashmir in snow right now! Safe driving in Gulmarg valley. 🏔️❄️",
    likes: 245,
    comments: 32,
    bgGradient: "from-cyan-200 to-sky-600",
    badge: "Gulmarg Snowfall ❄️",
    mediaDesc: "Reel: Driving through snow wall corridors in Gulmarg",
  },
  {
    id: "post2",
    type: "image",
    caption:
      "POV: Quiet pine forests and fresh mountain water streams. Join us on our outstation trips. 🌲",
    likes: 198,
    comments: 18,
    bgGradient: "from-emerald-200 to-emerald-700",
    badge: "Offbeat Yusmarg 🌲",
    mediaDesc: "Photo: Breathtaking view of Yusmarg pine slopes",
  },
  {
    id: "post3",
    type: "reel",
    caption:
      "'The best driver companions! Took beautiful photos and guided us honestly.' Thank you guests! 🚣",
    likes: 312,
    comments: 45,
    bgGradient: "from-amber-200 to-orange-700",
    badge: "Dal Lake Guest Review 🚣",
    mediaDesc: "Reel: Happy family taking a Shikara ride at sunset",
  },
];

export function InstagramGallery() {
  return (
    <div className="space-y-8">
      {/* Simulation Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {mockPosts.map((post) => (
          <a
            key={post.id}
            href="https://www.instagram.com/al_madaan"
            target="_blank"
            rel="noreferrer"
            className="group block surface-card overflow-hidden p-3 transition hover:-translate-y-1"
          >
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br flex flex-col justify-center items-center text-white text-center p-6 border border-border/40 select-none">
              {/* Overlay background based on post theme */}
              <div className={`absolute inset-0 bg-gradient-to-br ${post.bgGradient} opacity-90`} />

              {/* Illustrated decorative SVGs representing the media visually */}
              <div className="relative z-10 space-y-4">
                {post.type === "reel" ? (
                  <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mx-auto border border-white/30 backdrop-blur-sm group-hover:scale-110 transition duration-300">
                    <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                  </div>
                ) : (
                  <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mx-auto border border-white/30 backdrop-blur-sm group-hover:scale-110 transition duration-300">
                    <Instagram className="h-6 w-6 text-white" />
                  </div>
                )}

                <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-black/30 px-3 py-1 rounded-full border border-white/10">
                  {post.badge}
                </span>

                <p className="text-xs font-semibold text-white/80 max-w-[180px] mx-auto leading-relaxed">
                  {post.mediaDesc}
                </p>
              </div>

              {/* Instagram Hover Badge */}
              <div className="absolute inset-0 bg-primary/95 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 z-20">
                <Instagram className="h-10 w-10 text-white mb-2" />
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Heart className="h-4 w-4 fill-white" /> Follow @al_madaan
                </span>
                <span className="text-[10px] text-white/60 mt-1">Daily Kashmir visual updates</span>
              </div>
            </div>

            {/* Simulated Post Details */}
            <div className="p-3 space-y-2">
              <div className="flex items-center gap-1 text-xs text-accent-strong font-bold">
                <Heart className="h-3.5 w-3.5 fill-accent-strong" />
                <span>{post.likes} Likes</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {post.caption}
              </p>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center pt-2">
        <a
          href="https://www.instagram.com/al_madaan"
          target="_blank"
          rel="noreferrer"
          className="inline-block"
        >
          <Button variant="hero" size="lg" className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            Join Our 190+ Instagram Community
          </Button>
        </a>
      </div>
    </div>
  );
}
