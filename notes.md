# Build Notes

## Current State
- App compiles with no TypeScript errors
- Screenshot shows: hero with parking lot image, gold/black branding, two-panel layout
- Recommended price showing $0.69/sqft with defaults
- Job Volume section open by default, Materials section collapsed
- Right panel shows: Recommended Price, Total Cost, Margin, Monthly Revenue, Monthly Profit
- All sections rendering correctly

## Image URLs
- Hero: compressed CDN URL in Home.tsx
- Texture: not used yet
- Truck icon: not used yet

## TODO
- The subtotal badge for Job Volume shows "$100,000 sqft/mo" — the $ prefix is wrong for sqft. Need to fix the formatting in CostSection
- Consider making the subtotal badge smarter about what it displays
- Polish mobile experience
