/**
 * Rich project write-ups — full pages at `/projects/[slug]`.
 */

import { POSTURE_PATCH_FIRMWARE } from './posture-patch-firmware'

/** @typedef {{ src: string, alt: string, caption?: string, layout?: 'full' | 'half' }} ProjectPageImage */

/** @typedef {{ filename?: string, language?: string, content: string }} ProjectPageCode */

/** @typedef {{ id?: string, title: string, paragraphs: string[], images?: ProjectPageImage[], code?: ProjectPageCode }} ProjectPageSection */

/**
 * @typedef {Object} ProjectPage
 * @property {string} [heroImage] - Full-width image at top of modal
 * @property {string} [heroImageAlt]
 * @property {string} [heroImageCaption]
 * @property {ProjectPageSection[]} sections
 * @property {ProjectPageImage[]} [gallery] - Optional image grid at the end
 */

/** @type {Record<string, ProjectPage>} */
export const PROJECT_PAGES = {
  'posture-patch': {
    heroImage: '/images/posture-patch/workshop.png',
    heroImageAlt: 'Building the Posture Patch prototype at the makerspace',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'Posture Patch uses an MPU6050 to track upper-body tilt and triggers a vibration motor when you slouch for more than 2 seconds — built for long study and desk sessions.',
          'The goal is quiet, real-time correction without apps or screens: feel a buzz, sit up, keep working.',
        ],
      },
      {
        id: 'problem',
        title: 'Why I built it',
        paragraphs: [
          'After hours at a laptop, I noticed my shoulders creeping forward and my lower back rounding — but I only caught it when I already felt sore.',
          'I wanted something lightweight that could detect the pattern early and nudge me before pain set in.',
        ],
        images: [
          {
            src: '/images/posture-patch/components.png',
            alt: 'MPU6050, microcontroller, and vibration motor',
            caption: 'Core parts — MPU6050, board, and coin vibration motor',
            layout: 'full',
          },
        ],
      },
      {
        id: 'approach',
        title: 'How it works',
        paragraphs: [
          'An MPU6050 fuses accelerometer and gyro data with a complementary filter, compared against a personal baseline you set at startup.',
          'If tilt exceeds 5° while you’re settled (not moving much), a timer starts — hold bad posture for 2 seconds and the motor vibrates. Press the button anytime to recalibrate your baseline.',
        ],
        images: [
          {
            src: '/images/posture-patch/breadboard.png',
            alt: 'Breadboard prototype with MPU6050 and vibration motor wired to microcontroller',
            caption: 'Early breadboard bring-up — MPU6050, motor, and microcontroller',
            layout: 'full',
          },
        ],
      },
      {
        id: 'firmware',
        title: 'Firmware',
        paragraphs: [
          'Arduino sketch using the Adafruit MPU6050 library — gyro bias calibration on boot, complementary filtering, and motion gating so fidgeting doesn’t false-trigger the motor.',
        ],
        code: {
          filename: 'posture_patch.ino',
          language: 'cpp',
          content: POSTURE_PATCH_FIRMWARE,
        },
      },
      {
        id: 'next-steps',
        title: 'Next steps',
        paragraphs: [
          'Exploring graphene 2D tattoos for sensing posture — thinner, flexible sensors that could sit closer to the skin than a rigid IMU board.',
        ],
      },
    ],
  },
  orca: {
    heroImage: '/images/orca/painted.png',
    heroImageAlt: 'Finished hand-painted PLA orca sculpture',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'An articulated PLA orca — 3D printed, sanded, filed, and hand-painted. A maker-space weekend project from slicer to finish.',
          'It came off the printer bright purple because I forgot to swap the filament. Painted over it anyway.',
        ],
      },
      {
        id: 'print',
        title: 'Print',
        paragraphs: [
          'Sliced in PrusaSlicer and printed in PLA at the makerspace.',
        ],
        images: [
          {
            src: '/images/orca/slicer.png',
            alt: 'Orca model in PrusaSlicer on a laptop next to the purple print',
            layout: 'full',
          },
        ],
      },
      {
        id: 'process',
        title: 'Sanding & paint',
        paragraphs: [
          'Sanded down layer lines while rewatching Silicon Valley.',
          'Filed the tight spots, then hand-painted black and white over the purple base until it actually looked like an orca.',
        ],
        images: [
          {
            src: '/images/orca/sanding.png',
            alt: 'Sanding the purple orca at the makerspace',
            layout: 'full',
          },
        ],
      },
    ],
  },
  streakit: {
    heroImage: '/images/streakit/apple-store-pitch.png',
    heroImageAlt: 'Streakit storyboard pitch at Apple Store — problem, solution, outcome',
    heroImageCaption: 'Spring 2024',
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        paragraphs: [
          'Streakit is a product design exploration: how might local coffee shops and lunch spots get Snackpass-style loyalty without the cost and complexity of a full ordering platform?',
          'I focused on the full loop — user research with owners, concept storyboarding, Wallet pass design, and validating whether anyone would actually use it at the register.',
        ],
      },
      {
        id: 'problem',
        title: 'Problem & users',
        paragraphs: [
          'Two users, one broken system. Shop owners rely on paper punch cards but get no retention data and no way to spot regulars. Customers lose cards, forget them, or stop caring after the first few stamps.',
          'Snackpass works on campus because it owns ordering end-to-end. Most neighborhood SMBs just need repeat visits — not a marketplace, not a POS overhaul.',
        ],
        images: [
          {
            src: '/images/streakit/cafe-loyalty-card.png',
            alt: 'Barista holding a coffee loyalty punch card behind the counter',
            caption: 'Research anchor — the paper punch card every shop already uses',
            layout: 'full',
          },
        ],
      },
      {
        id: 'research',
        title: 'Research & discovery',
        paragraphs: [
          'In-person interviews with small business owners around campus — understanding daily workflow at the register, what they’d pay for, and whether digital loyalty could replace the hole punch without slowing service.',
          'Early insight: owners don’t need another dashboard on day one. They need customers to come back. Customers don’t want another app — they want something they won’t lose.',
          'Deeper discovery surfaced harder constraints: many owners were first-generation immigrants with limited English, and in-person pitches that worked on paper didn’t land the same way across language and trust barriers.',
        ],
      },
      {
        id: 'concept',
        title: 'Concept & storyboard',
        paragraphs: [
          'I framed the product as a three-act story for a Today at Apple pitch: a shop with no regulars → a Wallet-based loyalty system that tracks visits and rewards the 8th coffee → regulars who actually return.',
          'The comic storyboard (Str(Eat)K It) kept the concept legible to non-technical owners: problem, intervention, outcome — before any UI polish.',
        ],
      },
      {
        id: 'solution',
        title: 'Design solution',
        paragraphs: [
          'Wallet-native loyalty passes — scan a QR, add the card, collect stamps on each visit. Visual language mirrors the paper punch card so the mental model is instant.',
          'One pass per shop, stacked in Apple Wallet alongside cards people already carry. Progress is visible at a glance; the reward (free on the 8th) stays familiar.',
        ],
        images: [
          {
            src: '/images/streakit/wallet-coffee-card.png',
            alt: 'Coffee loyalty card in Apple Wallet with stamp progress',
            layout: 'half',
          },
          {
            src: '/images/streakit/wallet-grid.png',
            alt: 'Multiple Streakit loyalty cards stacked in Apple Wallet',
            layout: 'half',
            caption: 'High-fidelity pass concepts — single-shop stamp card and multi-merchant wallet stack',
          },
        ],
      },
      {
        id: 'decisions',
        title: 'Key design decisions',
        paragraphs: [
          'No app download — Wallet + QR removes the biggest adoption barrier for both sides. If it’s not in their pocket already, it won’t get used.',
          'Punch-card metaphor, not points economy — eight stamps and a free coffee matches what shops already run. No retraining staff or customers.',
          'Owner value before analytics — track visits and reward regulars first; retention dashboards can come once the habit loop works.',
          'Pilot-first GTM — city-based rollout with a simple SMB subscription, shaped by what owners said they’d actually consider paying for.',
        ],
      },
      {
        id: 'outcome',
        title: 'What I learned',
        paragraphs: [
          'The concept came together on storyboard and in Wallet — Apple Store pitch, Figma passes, a clear story from paper card to digital loyalty.',
          'Talking to owners changed the picture. Most weren’t interested in a monthly subscription on top of everything else they already run the shop on.',
          'Language mattered too. A lot of the owners I met were native to other countries and more comfortable in their first language — explaining Wallet, QR, and a new tool in English-only conversations didn’t always land.',
          'Streakit stayed at the exploration stage: research, concept, and prototypes. The takeaway for me was designing for how people actually buy and adopt, not just how the product looks in Wallet.',
        ],
      },
    ],
  },
  dozy: {
    heroTitle: 'Helping students recover sleep without guessing when to nap',
    heroSubtitle:
      'Inspired by Apple Health, Oura, and WHOOP, Dozy turns sleep history into personalized nap recommendations.',
    meta: {
      role: 'Founder, Product Designer, iOS Developer',
      timeline: '2 weeks',
      focus: 'User Research, Prototyping, UX Design, User Testing, iOS Dev',
    },
    heroImages: [
      {
        src: '/images/dozy/summary-home.png',
        alt: 'Dozy summary home — sleep debt, nap window, and restorative activity rings',
        caption: 'Summary home',
      },
      {
        src: '/images/dozy/nap-window.png',
        alt: 'Dozy nap window — personalized 90-minute nap recommendation with start button',
        caption: 'Nap recommendation',
      },
      {
        src: '/images/dozy/watch-nap.png',
        alt: 'Dozy on Apple Watch — 20 minute nap timer with tap to start',
        caption: 'Watch nap timer',
        device: 'watch',
      },
    ],
    sections: [
      {
        id: 'problem',
        eyebrow: 'The Problem',
        title: 'Students know they’re tired. They don’t know whether they should nap.',
        paragraphs: [
          'Students often experience fatigue during classes, exams, and late-night work, but deciding whether to nap is confusing. A nap can help recovery, but the wrong timing or length can make users feel groggier or disrupt nighttime sleep. Existing sleep apps show sleep data, but they rarely turn that data into a clear next step.',
        ],
        competitorImages: [
          {
            src: '/images/dozy/competitor-apple-health.png',
            alt: 'Apple Health sleep tracking — stages chart and time asleep',
            caption: 'Apple Health',
          },
          {
            src: '/images/dozy/competitor-oura.png',
            alt: 'Oura sleep regularity and bedtime consistency chart',
            caption: 'Oura',
          },
          {
            src: '/images/dozy/competitor-whoop.png',
            alt: 'WHOOP sleep analysis — hours of sleep and restorative sleep breakdown',
            caption: 'WHOOP',
          },
        ],
      },
      {
        id: 'competitive-research',
        eyebrow: 'Competitive Research',
        title: 'Sleep trackers show what happened. Dozy helps decide what to do next.',
        paragraphs: [
          'I studied sleep tracking apps like Apple Health, Oura, and WHOOP to understand how they communicate sleep duration, recovery, readiness, trends, and habit feedback. These products are strong at collecting and visualizing data, but they often leave users to interpret what the data means on their own.',
        ],
        designOpportunity: {
          label: 'Design opportunity',
          items: [
            'Should I nap?',
            'When should I nap?',
            'How long should I nap?',
          ],
        },
      },
      {
        id: 'research',
        eyebrow: 'Research',
        title: 'People want to take powerful naps — guilt free.',
        findings: {
          label: 'Findings',
          items: [
            'Users cannot easily quantify sleep debt.',
            'Users fear naps ruining nighttime sleep.',
            'Most naps are impulsive.',
            'Existing sleep tools focus on tracking instead of action.',
          ],
        },
        insights: {
          label: 'Insights',
          items: [
            'Users don’t want more sleep data. They want a recommendation.',
            'Timing matters more than duration.',
          ],
        },
        personaCarousel: {
          label: 'User personas',
          slides: [
            {
              src: '/images/dozy/persona-sans.png',
              alt: 'Sans B — student persona who wants actionable sleep guidance over charts',
              name: 'Sans B',
              role: 'Student · Apple Health & Watch user',
              quote:
                'I don’t have time to decode charts at 11pm — just tell me when to go to bed.',
            },
            {
              src: '/images/dozy/persona-david.png',
              alt: 'David — working commuter student persona with limited time for sleep tools',
              name: 'David',
              role: 'Working commuter student',
              quote:
                'Between my job and a two-hour commute, sleep is whatever’s left over.',
            },
            {
              src: '/images/dozy/persona-athlete.png',
              alt: 'Anonymous Athlete — NCAA soccer player persona focused on nap recovery',
              name: 'Anonymous Athlete',
              role: 'NCAA Division I soccer player',
              quote:
                'Coach tracks my training. Nobody’s helping me figure out the recovery side.',
            },
            {
              src: '/images/dozy/persona-priya.png',
              alt: 'Priya Sharma — international grad student persona managing sleep and stress',
              name: 'Priya Sharma',
              role: 'International Master’s student',
              quote:
                'New country, new timezone, packed program — my sleep fell apart and so did my focus.',
            },
          ],
        },
      },
      {
        id: 'design-exploration',
        eyebrow: 'Design Exploration',
        title: 'Designing for people, not data.',
        paragraphs: [
          'Sleep is technical — stages, cycles, debt, restorative ratios. Most apps expose all of it and leave users to make sense of the numbers.',
          'I wanted the opposite: hide the complexity and keep the experience calm and intuitive, even for someone who has never thought about REM or sleep debt.',
        ],
        image: {
          src: '/images/dozy/figma-board.png',
          alt: 'Dozy Figma board showing onboarding, home dashboard, nap flow, sleep debt charts, and Apple Watch surfaces',
          caption: 'Figma — full product flow & design system',
          width: 1024,
          height: 805,
        },
        mindMapImage: {
          src: '/images/dozy/mind-map.png',
          alt: 'Dozy case study mind map — problem, research, insights, architecture, testing, and reflection',
          caption: 'Project mind map — full case study arc',
          width: 1024,
          height: 779,
        },
      },
      {
        id: 'reflection',
        eyebrow: 'Reflection',
        title: 'What recovery actually looks like.',
        points: [
          {
            lead: 'Better rest, better headspace.',
            body: 'Poor sleep and mental health are deeply linked — fatigue feeds stress, anxiety, and low mood. By helping users actually recover instead of just tracking their exhaustion, Dozy supports mental wellbeing at its root.',
          },
          {
            lead: 'A nap is a tool, not a cure.',
            body: "A nap reduces sleep debt and restores alertness, but it doesn't erase that debt completely — real recovery takes consistent, quality sleep over time. Sleep is also shaped by more than duration: temperature, light, noise, stress, and caffeine all affect how restorative it actually is. Dozy points users in the right direction, but it works best alongside healthy habits and a calm sleep environment — one piece of the bigger picture, not a replacement for consistent rest.",
          },
        ],
      },
    ],
  },
}

export function getProjectPage(caseStudyId) {
  if (!caseStudyId) return null
  return PROJECT_PAGES[caseStudyId] ?? null
}
