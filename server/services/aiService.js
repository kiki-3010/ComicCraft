// AI Comic Craft Generator Service
// Generates intelligent suggestions for comic titles, character profiles, scene prompts, dialogues, and sound effects

const SCI_FI_TEMPLATES = [
  {
    genre: 'Cyberpunk',
    titles: ['Neon Syndicate: Zero Protocol', 'Cyber Core: Tokyo 2099', 'Ghost in the Motherboard'],
    descriptions: [
      'In a rainy mega-city ruled by megacorporations, a rogue cyborg hacker discovers an encrypted neural virus designed to purge the lower sectors.',
      'An augmented cyber-detective tracks a rogue combat synth through the fluorescent alleys of Neo-Kyoto.',
    ],
    scenes: [
      'Rain trickling down neon skyscrapers as drone searchlights sweep the gritty alleys below.',
      'Inside the underground server bunker, holographic terminals pulsing with electric cyan telemetry.',
      'A tense standoff on an elevated magnetic highway between armored tactical androids.',
      'A cybernetic surgeon calibrates an overloaded quantum neural chip in a hidden back-alley clinic.',
    ],
    dialogues: [
      "The mainframe is locked with military-grade ICE... but they didn't anticipate our backdoor.",
      "Stand down, Unit 7. The board of directors signed your decommission order.",
      'In this city, memories are just data packets—and mine were just sold to the highest bidder.',
      'Power levels are critical! Route everything through the auxiliary reactor!',
    ],
    soundEffects: ['BZZZZT-KZZT!', 'SHKKK-CLACK!', 'VOOOOM!', 'PEW-PEW!', 'SKRRRR-TCH!'],
  },
  {
    genre: 'Sci-Fi',
    titles: ['Chrono Genesis: Event Horizon', 'Titan Echoes', 'Starlight Vanguard'],
    descriptions: [
      'Deep space mining vessel Prometheus-9 breaches a hyper-spatial rift, awakening an ancient sentient biomechanical titan.',
      'A squad of robotic terraformers discover that Mars was never truly barren—and the original architects are returning.',
    ],
    scenes: [
      'The bridge of the starship glowing with cyan telemetry as a swirling spatial rift opens ahead.',
      'An astronaut standing on the precipice of an alien crystal canyon under twin purple moons.',
      'The planetary defense array firing a concentrated ion beam into orbit.',
      'Deep within the derelict mothership, ancient glyphs ignite with cold blue plasma.',
    ],
    dialogues: [
      "Captain, the energy signature doesn't match anything in the Galactic Accord database.",
      'Initiating emergency warp jump in three... two... one... hold on!',
      "They aren't attacking us. They are trying to warning us about what's coming through.",
      'All reactor shields offline! Divert plasma flow to primary shields immediately!',
    ],
    soundEffects: ['KRAAA-KOW!', 'WHOMMMM-WHOMMMM!', 'ZAAAP!', 'BOOOOOOM!', 'PING-PING-PING!'],
  },
  {
    genre: 'Mecha',
    titles: ['Iron Vanguard: Aegis-01', 'Steel Valkyrie', 'Titan Protocol: Overdrive'],
    descriptions: [
      'Piloting the last surviving experimental titan mech, an ace pilot defends the atmospheric colony from colossal orbital invaders.',
    ],
    scenes: [
      'A towering 50-meter steel mech activating its chest core reactor with blinding cyan energy.',
      'Cockpit HUD flickering with red alerts as missile lock-on systems engage target swarm.',
      'A brutal close-quarters melee battle in the ruins of a collapsed space elevator.',
    ],
    dialogues: [
      'Neural link synchronized at 98.7%. Weapon systems primed and ready for sortie!',
      'Limiter release code: TITAN-OVERDRIVE! Let us finish this fight!',
      'Warning: Core temperature exceeding safety threshold by 300 percent!',
    ],
    soundEffects: ['CLANG-KRAK!', 'VVRRRR-SHHHK!', 'KABOOM!', 'CLACK-LOCK!'],
  },
];

// Presets for instant high quality sci-fi comic panels and characters
export const COMIC_PRESETS = {
  backgrounds: [
    {
      title: 'Neon Cyber City Rain',
      url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80',
      genre: 'Cyberpunk',
    },
    {
      title: 'Futuristic Command Bridge',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      genre: 'Sci-Fi',
    },
    {
      title: 'Deep Space Cosmic Rift',
      url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      genre: 'Sci-Fi',
    },
    {
      title: 'Cybernetic High-Tech Lab',
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      genre: 'Cyberpunk',
    },
    {
      title: 'Cyberpunk Alleyway Neon',
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
      genre: 'Cyberpunk',
    },
    {
      title: 'Derelict Industrial Wasteland',
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      genre: 'Dystopian',
    },
  ],
  characters: [
    {
      name: 'AX-09 Valkyrie',
      role: 'Robot',
      description: 'Tactical android combat unit with self-healing carbon nanotube alloy and cyan visor optics.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Commander Kaelen Voss',
      role: 'Protagonist',
      description: 'Former orbital fleet marshal turned rebel smuggler, armed with a custom plasma revolver.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Aetheria Prime',
      role: 'AI Entity',
      description: 'Omnipresent orbital AI construct whose holographic avatar shifts like liquid light.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Dr. Zachary Thorne',
      role: 'Antagonist',
      description: 'Lead bio-engineer for OmniCorp who believes cybernetic singularity must be forced upon humanity.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
  ],
};

export const generateComicSuggestion = (genre = 'Sci-Fi') => {
  const category =
    SCI_FI_TEMPLATES.find((t) => t.genre.toLowerCase() === genre.toLowerCase()) ||
    SCI_FI_TEMPLATES[0];

  const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    title: randomItem(category.titles),
    description: randomItem(category.descriptions),
    scene: randomItem(category.scenes),
    dialogue: randomItem(category.dialogues),
    soundEffect: randomItem(category.soundEffects),
  };
};
