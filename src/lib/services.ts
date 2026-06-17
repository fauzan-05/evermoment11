export const services = [
  {
    slug: "bride-groom-styling",
    title: "Bride & Groom Styling",
    category: "Bride, Groom, Couple",
    shortDescription:
      "A personalized styling experience built around your wedding wardrobe, face, and presence so every frame feels intentional, not added.",
    description:
      "Private eyewear styling for brides, grooms, and couples. We consider your outfit direction, ceremony flow, photography moments, face shape, comfort, and personal identity before curating frames that feel refined and completely yours.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1600",
    includes: [
      "Bride, groom, and couple frame direction",
      "Styling matched to wedding wardrobe and event tone",
      "Curated premium frame selection",
      "Final look guidance for photography and presence",
    ],
  },
  {
    slug: "family-styling",
    title: "Family Styling",
    category: "Father, Mother, Parent Couple",
    shortDescription:
      "Coordinated eyewear styling for parents and close family, creating a balanced and refined visual presence across every moment.",
    description:
      "A thoughtful styling experience for parents and close family members who want a polished look without losing individuality. Each selection is refined around comfort, occasion wear, and the family’s overall visual harmony.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
    includes: [
      "Father, mother, and parent couple styling",
      "Elegant frame options for traditional and formal looks",
      "Comfort-led selections for long celebrations",
      "Coordinated presence for family photography",
    ],
  },
  {
    slug: "friends-crew-styling",
    title: "Friends & Crew Styling",
    category: "Sister, Brother, Bride Crew, Groom Crew",
    shortDescription:
      "Modern, personality-led styling for your circle, designed to feel cohesive in group moments while still individually expressive.",
    description:
      "Eyewear styling for siblings, close friends, bride crews, and groom crews. The experience keeps group moments visually connected while giving each person a frame choice that suits their features and personality.",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1600",
    includes: [
      "Sister, brother, bride crew, and groom crew styling",
      "Cohesive looks for group photos and celebrations",
      "Personality-led frame recommendations",
      "Modern options for festive and travel wardrobes",
    ],
  },
  {
    slug: "guest-experience-styling",
    title: "Guest Experience Styling",
    category: "Guest Experience",
    shortDescription:
      "Thoughtful eyewear selections for guests who value comfort, elegance, and a polished presence throughout the event.",
    description:
      "A refined guest-focused eyewear experience for celebrations where every detail matters. Guests receive curated selections that balance comfort, event styling, and understated elegance.",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1600",
    includes: [
      "Guest-ready frame curation",
      "Comfort-focused selections for long event days",
      "Elegant options for festive and formal wardrobes",
      "On-request group styling direction",
    ],
  },
  {
    slug: "personal-occasion-styling",
    title: "Personal Occasion Styling",
    category: "Engagements, Travel, Celebrations, Professional Presence",
    shortDescription:
      "Eyewear curated for engagements, travel, celebrations, and professional appearances because styling should extend beyond one day.",
    description:
      "A personal styling session for the moments beyond the wedding day. We curate frames for engagements, travel, celebrations, meetings, and everyday presence so your eyewear becomes part of a complete style identity.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1600",
    includes: [
      "Engagement, travel, and celebration styling",
      "Professional and everyday frame direction",
      "Face shape and wardrobe-led curation",
      "Signature style recommendations",
    ],
  },
] as const;

export type Service = (typeof services)[number];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
