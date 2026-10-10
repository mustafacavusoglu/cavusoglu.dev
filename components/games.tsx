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
    tag: "Mobile · touch · keys",
  },
]

/** Screenshot cards; each opens the game. Progress is saved in the player's browser. */
export function GameGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {games.map((g) => (
        <a key={g.slug} href={`/games/${g.slug}/`} className="group flex flex-col">
          <img
            src={`/games/thumbs/${g.slug}.jpg`}
            alt={`${g.name} screenshot`}
            width={600}
            height={800}
            loading="lazy"
            className="aspect-[3/4] w-full rounded-lg border border-line object-cover transition group-hover:border-ink group-hover:shadow-md"
          />
          <div className="mt-3 font-mono text-[15px] font-medium group-hover:text-accent">{g.name}</div>
          <div className="mt-1 text-sm leading-relaxed text-body">{g.desc}</div>
          <div className="mt-1.5 font-mono text-xs text-muted">{g.tag}</div>
        </a>
      ))}
    </div>
  )
}
