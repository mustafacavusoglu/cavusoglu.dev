// Browser games under /games/<slug>/ (built into public/games by scripts/build-games.sh).
const games = [
  {
    slug: "kasap",
    name: "Avcı Kasap",
    desc: "3D hunting and butcher-shop tycoon. Hunt, pack, sell, grow your town.",
    tag: "Mobile · touch",
  },
  {
    slug: "yorunge",
    name: "Yörünge",
    desc: "One-tap endless space hopper. Jump from planet to planet.",
    tag: "Mobile · one tap",
  },
  {
    slug: "nebula",
    name: "Nebula Front",
    desc: "3D space shooter with levels, a hangar and ship upgrades.",
    tag: "Touch · mouse · keys",
  },
  {
    slug: "hayatta-kal",
    name: "Hayatta Kal",
    desc: "Wilderness survival: gather, craft, keep the fire burning through the night. Solo or 2-4 player co-op.",
    tag: "Landscape · touch · keys",
  },
  {
    slug: "sessiz-film",
    name: "Sessiz Film",
    desc: "IMDb Top 250 films with the vowels gone. Play solo or race 2-5 friends in a room; first to guess wins.",
    tag: "Mobile · solo or 2-5 online",
  },
]

/** Screenshot cards; each opens the game. Progress is saved in the player's browser. */
export function GameGrid() {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-3 sm:gap-4">
      {games.map((g) => (
        <a
          key={g.slug}
          href={`/games/${g.slug}/`}
          className="group flex gap-4 border-t border-line-soft py-4 first:border-0 first:pt-0 sm:flex-col sm:gap-0 sm:border-0 sm:py-0"
        >
          <img
            src={`/games/thumbs/${g.slug}.jpg`}
            alt={`${g.name} screenshot`}
            width={600}
            height={800}
            loading="lazy"
            className="aspect-[3/4] w-[84px] shrink-0 rounded-lg border border-line object-cover transition group-hover:border-ink group-hover:shadow-md sm:w-full"
          />
          <div className="min-w-0">
            <div className="font-mono text-[15px] font-medium group-hover:text-accent sm:mt-3">{g.name}</div>
            <div className="mt-1 text-sm leading-relaxed text-body">{g.desc}</div>
            <div className="mt-1.5 font-mono text-xs text-muted">{g.tag}</div>
          </div>
        </a>
      ))}
    </div>
  )
}
