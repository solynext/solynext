# SolyNext redesign notes

## Business and content audit

The repository is the source of business content. It contains eight services, four case studies, an industry solutions directory, technology categories, three blog articles, engagement models, a delivery process, careers, and legal pages. The existing site targets business owners, product teams, and local/international clients seeking software development and related digital services. The primary conversion is a project inquiry.

| Area | Decision |
| --- | --- |
| Company name and contact channels | Retain SolyNext, the existing email addresses, and Pakistan location information. Remove the visibly placeholder phone number from the contact page. |
| Navigation | Prioritize Services, Our work, About, Insights, and Contact. Keep secondary destinations accessible in the footer and contextual links. |
| Homepage | Replace repetitive sales copy, engineering-console tabs, unsupported sitewide counters, dense guarantee boxes, oversized testimonial collections, and repeated conversion blocks with one clear narrative. |
| Services | Feature the four core software/design services on the homepage. Preserve branding, marketing, social media, and video offerings in the services directory and their existing detail routes. |
| Work | Feature FinEdge and MediTrack. Retain all four project records and detailed case-study routes. Keep reported project outcomes tied to their original records. |
| Client proof | Use one existing case-study testimonial without inventing a rating, verification status, new quote, or client. |
| About | Provide a brief homepage snapshot; keep the deeper company information on its dedicated page. |
| Process | Summarize delivery in four homepage steps; retain the deeper process page. |
| Technologies | Use a restrained homepage selection, with the full categorized directory retained. |
| Blog, solutions, pricing, careers, legal | Retain the existing content and routes; apply shared surfaces, typography, navigation, accessible page headings, and focus states. |
| Forms | Replace simulated inquiry and application receipt messages with explicit email draft handoffs. No backend or email service was configured in the original project. |

The case-study names, numerical results, testimonials, leadership information, and other company claims already exist in the repository, including a file named `data/mockData.ts`. Their authenticity cannot be established from the files alone. The redesign does not add business statistics, awards, certifications, client logos, social profiles, or offices. It does not describe existing testimonials as independently verified.

## Brand and visual system

No dedicated company profile, logo image, or brand guide was available. The burgundy/pink direction was already present in local uncommitted design work. It is retained provisionally, rather than represented as a palette extracted from a supplied profile. The navigation uses a typographic SolyNext wordmark with an original, simple lettermark treatment.

| Token | Value | Use |
| --- | --- | --- |
| Primary | `#9d284b` | Primary buttons, accents, active states |
| Primary hover | `#7d1d3b` | Hovered buttons and links |
| Secondary | `#ce6684` | Restrained visual accents |
| Dark brand surface | `#40232f` | Final conversion section |
| Page | `#fbfaf8` | Main neutral background |
| Surface | `#ffffff` | Product interfaces and cards |
| Inset | `#f5f2f0` | Secondary panels |
| Main text | `#242124` | Headings and body text |
| Secondary text | `#6b6467` | Supporting copy |
| Border | `#e9e3e2` | Dividers and subtle boundaries |

Geist provides the main typeface; Geist Mono supports small engineering labels. Layouts use a controlled 1240px maximum content width, responsive gutters, consistent section spacing, restrained radii, and lightweight hover transitions. Reduced-motion preferences disable transitions and transforms.

The hero and homepage project previews are original HTML/CSS interface concepts. They are labeled as illustrations, not presented as client screenshots or live performance data. They require no animation library or bitmap downloads. Existing imagery remains available on the detailed case-study pages.

## Interaction and accessibility

- Sticky navigation, mobile menu with expanded state, Escape dismissal, and visible keyboard focus.
- Skip-to-content links and one primary page heading on each route.
- Native expandable FAQ items.
- Searchable project directory with pressed states, result counts, and a reset action.
- Short, labeled inquiry form with browser-native required-field and email validation.
- Native modal dialog for existing service/pricing inquiry buttons, with modal focus behavior, Escape dismissal, and focus restoration.
- Email draft handoff explicitly states that the visitor must send the message in their email application.

## Inspiration and framework guidance

[thoughtbot services](https://thoughtbot.com/services) informed the focus on clear service scope and product stages. [Linear's interface refresh notes](https://linear.app/now/behind-the-latest-design-refresh) informed restrained hierarchy and spacing. No wording, layouts, illustrations, or branding were copied.

Implementation followed the installed Next.js 16.3.7 documentation for CSS and server/client component boundaries. The homepage stays a server component; interactive navigation, forms, and directory filters use client components.

## Homepage extensions

Four additional sections connect existing project content to deeper routes: industry solutions, delivery and handover, engagement models, and team insights. Industry and article cards read from the existing data records; engagement and handover copy summarizes the existing pricing, services, and process content. No new performance metrics or customer claims were added.

Reusable `EditorialHeading`, `CapabilityCard`, and `InsightCard` components support these sections. All seven new components render on the server. The existing motion controller progressively enhances the new cards with single-entry staggered reveals, cancels motion when the reduced-motion setting changes, and leaves content visible without JavaScript. Cards and grids adapt across desktop, tablet, and mobile.
