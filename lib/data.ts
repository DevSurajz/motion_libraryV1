export type Item = { tag: string; name: string; slug: string; s: number; k: number; n: number; nw: boolean };

export const CATEGORIES: [string, string, string[]][] = [
  ["Immersive website prompts", "Templates", ["Lumière", "Halcyon", "Komorebi", "Pharos", "Aurum Peak", "Atelier Noir", "Meridian", "Solstice", "Verdant", "Obsidian"]],
  ["3D scene prompts", "3D Scenes", ["Glass Halo", "Terra Nova", "Nebula Drift", "Prism Garden", "Moonwell", "Drift Glass", "Helios", "Tidal Orb", "Stillwater", "Echo Field"]],
  ["Interactive gradient prompts", "Gradients", ["Vivid Sunset", "Aurora Veil", "Peach Fuzz", "Violet Hour", "Cyan Rain", "Ember Silk", "Opal Tide", "Dusk Bloom", "Neon Haze", "Pearl Mist"]],
  ["Interactive section prompts", "Sections", ["Marquee Hero", "Split Reveal", "Bento Grid", "Spotlight Cards", "Sticky Story", "Orbit Logos", "Pinned Showreel", "Magnetic CTA", "Scroll Ticker", "Depth Footer"]],
  ["Animated background prompts", "Backgrounds", ["Night Flowers", "Silk Waves", "Starfield", "Liquid Chrome", "Soft Grain", "Mesh Tide", "Dither Rain", "Light Leak", "Terrain Lines", "Ink Cloud"]],
];

export const slugify = (name: string) =>
  name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]+/g, "-");

export const LIBRARY: Item[] = CATEGORIES.flatMap(([, tag, names], c) =>
  names.map((name, i) => ({
    tag, name, slug: slugify(name),
    s: c * 13 + i * 7 + 3, k: (i + c * 2) % 5, n: 48 + ((c * 31 + i * 53) % 380), nw: i == 1 && c % 2 == 0,
  })),
);

export const TOOLS: [string, string][] = [
  ["Text Animations", "Layout"], ["Custom Cursors", "Layout"], ["ASCII Studio", "3D"], ["Particle Forms", "3D"],
  ["Holographic Cloth", "3D"], ["Orb Studio", "3D"], ["Dither Art", "Background"], ["Shader Backgrounds", "Background"], ["Liquid Colour", "Background"],
];
export const TOOL_KINDS = [3, 0, 4, 3, 2, 1, 4, 2, 0];

export const FAQ: [string, string][] = [
  ["Is there anything free?", "Yes. The Free plan includes a rotating set of prompts from every category, so you can ship a real site before you pay."],
  ["How do I use a prompt?", "Press Copy prompt, paste it into Claude, ChatGPT, Cursor, Lovable, v0 or Bolt, and send. Each prompt describes the layout, motion and code structure."],
  ["Will it work with my stack?", "Prompts target React, Next.js and plain HTML. Tell your AI which one you use and it adapts the output."],
  ["I don’t see my industry.", "Start from the closest template and describe your business in one sentence. The prompt is written to be edited."],
  ["Can I change the design?", "Everything is a variable: colours, type, easing and layout. Tune scenes live, then copy the updated prompt."],
  ["Can I use it for client work?", "Yes. Pro and Studio include a commercial licence for client projects."],
];

export const TIERS: [string, string, string, string[]][] = [
  ["Free", "$0", "Try the library", ["12 rotating prompts", "All categories", "Community support"]],
  ["Pro", "$19", "per month", ["Unlimited prompts", "All AI design tools", "Client licence"]],
  ["Studio", "$49", "per month", ["Everything in Pro", "5 seats", "Priority support"]],
];

export const promptFor = (i: Item) =>
  `Build a cinematic, dark-mode ${i.tag.toLowerCase()} experience called “${i.name}”.\n\nBackground #060606, text #f4f4f2, one iridescent accent (violet → cyan → peach) used only for glows and hover states.\nHeadlines in Instrument Serif with italic emphasis; UI in Inter.\nAdd a real-time canvas visual, smooth scrolling, masked line-by-line headline reveals and a custom cursor.\nPause animation off-screen, respect prefers-reduced-motion, keep Lighthouse at 95+.`;
