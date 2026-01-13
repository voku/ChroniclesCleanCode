import { Chapter, Interaction } from './types';

export const interactions: Record<string, Interaction> = {
  'identity': {
    id: 'identity',
    triggerPhrase: 'confusing identity',
    title: 'The Identity Crisis',
    description: 'Lazy naming hides the true intent of your code. Like a hero wearing a mask that hides their purpose, generic names like "get" or "data" create confusion. Be specific.',
    badExample: {
      title: 'Ambiguous Naming',
      language: 'php',
      code: '// The "get" method tells us nothing about the return value\n$user = $sentinel->getUser(); \n// Is it an ID? A User Object? A boolean?'
    },
    betterExample: [
      {
        title: 'Explicit Naming',
        language: 'php',
        code: '// Now we know exactly what is happening\n$user = $sentinel->identifyCivilian();'
      }
    ]
  },
  'gatekeeper': {
    id: 'gatekeeper',
    triggerPhrase: 'vague riddles',
    title: 'The Gatekeeper\'s Riddle',
    description: 'Loose comparisons (==) are dangerous riddles. They accept values that "look" right but might be wrong types. Strict comparisons (===) ensure security and predictability.',
    badExample: {
      title: 'Loose Comparison',
      language: 'php',
      code: 'if ($threatLevel == 1) { \n    // This allows true, 1, "1", and sometimes more...\n}'
    },
    betterExample: [
      {
        title: 'Strict Comparison',
        language: 'php',
        code: 'if ($this->detectThreat() === true) { \n    // Only true is allowed.\n}'
      }
    ]
  },
  'complexity': {
    id: 'complexity',
    triggerPhrase: 'labyrinth of rules',
    title: 'The Logic Labyrinth',
    description: 'Complex boolean conditions are hard to read and prone to bugs. Encapsulate complex logic into named methods that describe *what* the condition represents.',
    badExample: {
      title: 'Cognitive Overload',
      language: 'php',
      code: 'if ($active && $count < 10 && $type !== "villain" || $force) {\n    // What does this combination actually mean?\n}'
    },
    betterExample: [
      {
        title: 'Encapsulated Logic',
        language: 'php',
        code: 'if ($this->isSafeToProceed($civilian, $zone)) {\n    // The logic is hidden, the intent is clear.\n}'
      }
    ]
  },
  'speedster': {
    id: 'speedster',
    triggerPhrase: 'stopped for everyone',
    title: 'The Nested Trap',
    description: 'Arrow code (nested if-statements) makes code hard to follow. Use "Guard Clauses" to return or continue early, keeping the "happy path" unindented and readable.',
    badExample: {
      title: 'Deep Nesting',
      language: 'php',
      code: 'foreach ($sectors as $sector) {\n    if ($sector->isActive) {\n        if ($sector->hasVillains) {\n            $this->purify($sector);\n        }\n    }\n}'
    },
    betterExample: [
      {
        title: 'Guard Clauses',
        language: 'php',
        code: 'foreach ($sectors as $sector) {\n    if (!$sector->isActive) continue;\n    if (!$sector->hasVillains) continue;\n\n    $this->purify($sector);\n}'
      }
    ]
  },
  'multitasker': {
    id: 'multitasker',
    triggerPhrase: 'do everything at once',
    title: 'The God Object',
    description: 'A method or class should have a single responsibility. If a method name contains "And" (e.g., validateAndSaveAndEmail), it is doing too much.',
    badExample: {
      title: 'Doing Too Much',
      language: 'php',
      code: 'function save(City $city) {\n    $this->scan($city);\n    $this->defend($city);\n    $this->rebuild($city);\n}'
    },
    betterExample: [
      {
        title: 'Separation of Concerns',
        language: 'php',
        code: '$scanner->scan($city);\n$defender->defend($city);\n$builder->rebuild($city);'
      }
    ]
  },
  'lineage': {
    id: 'lineage',
    triggerPhrase: 'generic descendants',
    title: 'Inheritance Hell',
    description: 'Deep inheritance chains with generic names (Manager, Handler, Object) create brittle code. Prefer composition (using Interfaces) over inheritance.',
    badExample: {
      title: 'Generic Inheritance',
      language: 'php',
      code: 'class SyntaxSentinel extends EntityObjectManager {\n    // Implicit dependencies are hidden here\n}'
    },
    betterExample: [
      {
        title: 'Composition',
        language: 'php',
        code: 'class SyntaxSentinel implements GuardianInterface {\n    // Explicit behavior defined by contract\n}'
      }
    ]
  },
  'redemption': {
    id: 'redemption',
    triggerPhrase: 'redeemed the logic',
    title: 'Refactoring',
    description: 'Code is never finished, only refactored. We write code for humans first, machines second.',
    badExample: {
      title: 'Before',
      language: 'php',
      code: '$p = $o->getP(); // cryptic'
    },
    betterExample: [
      {
        title: 'After',
        language: 'php',
        code: '$power = $sentinel->getPowerLevel(); // readable'
      }
    ]
  }
};

export const chapters: Chapter[] = [
  {
    id: 0,
    title: "Prologue: The Fall of the Monolith",
    content: [
      { type: 'text', content: "// I was there when the Mainframe fell.\n// The Technical Debt had grown too high.\n\n$system->collapse('CRITICAL_FAILURE');\n\n// We lost everything in the Spaghetti Code.\n// I swore an oath that day.\n// Never to write code that humans couldn't understand.\n// I am not just a developer anymore.\n\n// I am the cleanup crew." }
    ]
  },
  {
    id: 1,
    title: "Chapter 1: The Initialization",
    content: [
      { type: 'text', content: "// In the quiet memory heap of the city,\n// the hero initialized their class.\n\n$sentinel = new SyntaxSentinel();\n\n// But even heroes make mistakes.\n// My first methods were hidden behind a confusing identity." },
      { type: 'interaction', content: "$sentinel->getUser();", interactionId: 'identity' },
      { type: 'text', content: "\n// The citizens looked at me in confusion.\n// 'Are you fetching a user? Or capturing one?'\n\n$sentinel->rushTo($crimeScene);\n\n// I activated my Refactor Vision.\n// To save the day, my intent must be explicit.\n\n$sentinel->identifyCivilian();\n\n// Now, the context was crystal clear." }
    ]
  },
  {
    id: 2,
    title: "Chapter 2: The Gatekeeper",
    content: [
      { type: 'text', content: "// At the edge of the city stood the Gatekeeper.\n// He guarded the Conditional Fortress.\n\n$gatekeeper->guardGate($traveler);\n\n// But he was old, and spoke in vague riddles." },
      { type: 'interaction', content: "if ($traveler == 1) { \n    $gate->open(); \n}", interactionId: 'gatekeeper' },
      { type: 'text', content: "\n// He let in '1', 1, and true.\n// The Type Safety of the city was compromised.\n\n// Panicked, he tried to overcompensate with complexity:" },
      { type: 'interaction', content: "if ($a && $b || $c && !$d) { \n    $gate->lock(); \n}", interactionId: 'complexity' },
      { type: 'text', content: "\n// No one could parse the boolean logic in their heads.\n// Honest travelers were trapped outside.\n\n// I stepped in to refactor the law:\n\nif ($this->isSafeToProceed($traveler)) {\n    $this->openGate();\n}" }
    ]
  },
  {
    id: 3,
    title: "Chapter 3: The Velocity",
    content: [
      { type: 'text', content: "// Velocity was the fastest runner in the runtime.\n// But she had a habit of nesting her thoughts.\n\nforeach ($people as $person) {" },
      { type: 'interaction', content: "    if ($person->isSafe()) { \n        // She paused here...\n    }", interactionId: 'speedster' },
      { type: 'text', content: "        // She stopped to check everyone, layer by layer.\n        // The indentation grew deeper and deeper.\n        // Her speed slowed to a crawl.\n}\n\n// I showed her the Art of 'Continue'.\n// We skip the happy cases early to stay fast.\n\nforeach ($people as $person) {\n    if ($person->isSafe()) continue;\n    \n    $this->rescue($person);\n}" }
    ]
  },
  {
    id: 4,
    title: "Chapter 4: The Chimera",
    content: [
      { type: 'text', content: "// A beast arose from the Legacy Module.\n// It was the God Object, a creature of many tasks.\n\n$monster = new Chimera();\n\n// It tried to do everything at once:" },
      { type: 'interaction', content: "$monster->doItAll();", interactionId: 'multitasker' },
      { type: 'text', content: "\n// It calculated taxes, sent emails, and formatted strings.\n// The memory leaked. The stack overflowed.\n\n// I drew my Blade of Separation.\n// We sliced the beast into single responsibilities.\n\n$scanner->scan();\n$defender->defend();\n$builder->rebuild();" }
    ]
  },
  {
    id: 5,
    title: "Chapter 5: The Lineage",
    content: [
      { type: 'text', content: "// In the Hall of Ancestors, the statues stood tall.\n// But the inheritance chain was deep and brittle.\n\nclass SentinelNew extends SentinelOld {\n    // 'Who am I?' cried the instance.\n    // 'I depend on logic written 10 years ago.'\n}" },
      { type: 'interaction', content: "class Special extends SentinelNew { \n    // I am a mystery.\n}", interactionId: 'lineage' },
      { type: 'text', content: "\n// The Architect decreed a new law:\n// 'Favor Composition over Inheritance.'\n\nclass SyntaxSentinel implements GuardianInterface {\n    // Now I am defined by my abilities,\n    // not by my parents.\n}" }
    ]
  },
  {
    id: 6,
    title: "Epilogue: return true;",
    content: [
      { type: 'text', content: "// We looked back at the spaghetti code we once wrote.\n// We saw the confusion we caused.\n\ntry {" },
      { type: 'interaction', content: "    $legacy->refactor();", interactionId: 'redemption' },
      { type: 'text', content: "} catch (BadCodeException $e) {\n    // We learned from our mistakes.\n}\n\n// We write code for humans first.\n// And the system ran happily ever after.\n\nreturn true;" }
    ]
  },
  {
    id: 7,
    title: "The Legacy",
    content: [
      { type: 'text', content: "// The city is safe. The code is clean.\n// But the work of the Syntax Sentinel is never done.\n\n// Remember my rules:\n// 1. Name things with intent.\n// 2. Keep conditions simple.\n// 3. Avoid deep nesting.\n// 4. One job per function.\n\n// Go forth, and may your pull requests be merged.\n// -- The Syntax Sentinel." }
    ]
  }
];
