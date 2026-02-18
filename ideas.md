# Sealcoating Calculator — Design Brainstorm

## Idea 1: "Asphalt Noir" — Industrial Brutalism Meets Precision

<response>
<text>
**Design Movement**: Industrial Brutalism with a precision-engineering aesthetic — think heavy machinery dashboards meets high-end automotive configurators.

**Core Principles**:
1. Raw, honest materials — dark surfaces that evoke fresh asphalt
2. Gold as the accent of authority and profit — every gold element signals money/value
3. Vertical rhythm with clear sectioning — like a job estimate sheet
4. Progressive disclosure — don't overwhelm, reveal complexity gradually

**Color Philosophy**:
- Primary: #1A1A1A (asphalt black) — the foundation, like a freshly sealed lot
- Accent: #F5C518 (gold) — profit, success, the money line
- Surface: #242424 (dark charcoal) — card backgrounds, elevated surfaces
- Muted: #6B6B6B (concrete gray) — secondary text, borders
- Success: #22C55E — positive margin indicators
- White: #F5F5F0 (warm white) — primary text, slightly warm to avoid harshness

**Layout Paradigm**: Single-column scrolling form with sticky summary footer. Sections are stacked vertically like a job checklist — each section is a collapsible "chapter" with a gold numbered badge. The summary bar stays pinned at the bottom like a cash register total.

**Signature Elements**:
1. Gold-striped section dividers that mimic road line markings
2. A "profit gauge" — a horizontal bar that fills from red to gold as margins are protected
3. Numbered gold badges on each section header (like a step-by-step walkthrough)

**Interaction Philosophy**: Every input change instantly ripples through to the bottom summary. Inputs feel tactile — number fields have increment/decrement buttons. Sections expand/collapse smoothly. The experience is like filling out a professional estimate.

**Animation**: Sections slide open with a smooth 300ms ease-out. The profit gauge animates when values change. Numbers in the summary count up/down smoothly. Gold accents pulse subtly on hover.

**Typography System**:
- Display: "Oswald" (bold, condensed) — section headers, the final price
- Body: "Source Sans 3" — form labels, descriptions, inputs
- Mono: "JetBrains Mono" — all dollar amounts and calculations
</text>
<probability>0.08</probability>
</response>

## Idea 2: "Blueprint Builder" — Construction Document Aesthetic

<response>
<text>
**Design Movement**: Technical blueprint / construction document aesthetic — the calculator feels like a professional estimating worksheet that a contractor would use.

**Core Principles**:
1. Grid-paper precision — everything aligns to an invisible grid
2. Annotation-style labels — like handwritten notes on a blueprint
3. Functional beauty — every element serves a purpose
4. Trust through professionalism — looks like it was built by someone who knows the trade

**Color Philosophy**:
- Background: #0D1117 (deep navy-black) — like a blueprint background
- Grid lines: #1E2A3A (subtle blue-gray) — the underlying structure
- Gold: #F5C518 — highlights, active states, the money numbers
- Text: #E6EDF3 (cool white) — crisp and readable
- Accent blue: #3B82F6 — links, interactive elements
- Section bg: #161B22 — card surfaces

**Layout Paradigm**: Two-column on desktop (form left, live summary right that scrolls with you). On mobile, summary becomes a collapsible bottom sheet. Form sections use a tab/stepper pattern — Materials → Labor → Equipment → Overhead → Loans → Salary → Results.

**Signature Elements**:
1. Dotted grid background pattern (like graph paper)
2. "Annotation" tooltips that look like handwritten margin notes
3. A running "tape" on the right showing each cost line item as it's entered

**Interaction Philosophy**: Tab-based navigation between sections. Each section validates before moving forward. The right panel updates in real-time like a live spreadsheet. Tooltips appear as helpful annotations.

**Animation**: Tab transitions slide horizontally. Numbers in the summary ticker up/down. Tooltips fade in with a slight upward drift. Progress bar at top fills as sections are completed.

**Typography System**:
- Display: "Barlow Condensed" (semi-bold) — headers, section titles
- Body: "IBM Plex Sans" — form labels, descriptions
- Mono: "IBM Plex Mono" — all numbers, calculations, prices
</text>
<probability>0.06</probability>
</response>

## Idea 3: "Gold Standard" — Premium Dark Dashboard

<response>
<text>
**Design Movement**: Premium dark dashboard — inspired by fintech apps and luxury automotive interfaces. The calculator should feel like a high-end business tool, not a cheap web form.

**Core Principles**:
1. Dark elegance — the interface commands respect
2. Gold hierarchy — gold is used sparingly for maximum impact on key numbers
3. Card-based modularity — each cost category is its own contained card
4. Results-first thinking — the price output is always visible and prominent

**Color Philosophy**:
- Background: #0F0F0F (true dark) — premium, no-nonsense
- Surface: #1A1A1A (card black) — elevated cards with subtle borders
- Gold: #F5C518 — the hero color, used only for: final price, section icons, key CTAs
- Gold muted: #F5C518/20 (20% opacity) — backgrounds for gold-accented elements
- Text primary: #FAFAFA — clean white
- Text secondary: #A0A0A0 — muted descriptions
- Border: #2A2A2A — subtle card edges
- Success: #10B981 — margin health indicator

**Layout Paradigm**: Asymmetric two-panel on desktop — left panel (60%) is a scrollable form with accordion sections, right panel (40%) is a sticky results dashboard with the price breakdown, a donut chart of cost distribution, and the final recommended price in large gold type. On mobile, the results panel becomes a floating bottom bar that expands on tap.

**Signature Elements**:
1. Gold gradient glow behind the final price number
2. Cost distribution donut chart with gold/gray segments
3. Subtle noise texture on the background for depth

**Interaction Philosophy**: Accordion sections keep the form manageable. Each section has a gold icon and a mini-summary showing that section's subtotal. Inputs have gold focus rings. The results panel feels like a live financial dashboard.

**Animation**: Accordion open/close with spring physics (framer-motion). Price numbers animate with a counting effect. The donut chart segments animate when values change. Cards have a subtle hover lift. Gold glow pulses gently on the final price.

**Typography System**:
- Display: "Plus Jakarta Sans" (extra-bold) — the final price, section headers
- Body: "Plus Jakarta Sans" (regular/medium) — form labels, descriptions
- Mono: "Space Mono" — dollar amounts, calculations, percentages
</text>
<probability>0.07</probability>
</response>
