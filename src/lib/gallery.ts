export type GallerySection = {
  slug: string;
  title: string;
  description: string;
};

export type GalleryCategory = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: "heart" | "users" | "sparkles" | "crown" | "gift";
  sections: GallerySection[];
};

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "bride-groom",
    title: "Bride & Groom",
    subtitle: "Timeless moments of love, beautifully styled.",
    description:
      "Curated frames for wedding-day presence and portraits.",
    icon: "heart",
    sections: [
      {
        slug: "bride",
        title: "Bride",
        description:
          "Elegant bridal styling and wedding looks.",
      },
      {
        slug: "groom",
        title: "Groom",
        description:
          "Sharp groom styling and portrait looks.",
      },
      {
        slug: "couple",
        title: "Couple",
        description:
          "Coordinated couple styling and moments.",
      },
    ],
  },

  {
    slug: "family",
    title: "Family",
    subtitle: "Balanced styling for family presence.",
    description:
      "Refined eyewear for parents, siblings and portraits.",
    icon: "users",
    sections: [
      {
        slug: "parents",
        title: "Parents",
        description:
          "Classic styling for parents and elders.",
      },
      {
        slug: "siblings",
        title: "Siblings",
        description:
          "Modern styling for brothers and sisters.",
      },
      {
        slug: "portraits",
        title: "Family Portraits",
        description:
          "Group portrait styling and moments.",
      },
    ],
  },

  {
    slug: "friends-crew",
    title: "Friends & Crew",
    subtitle:
      "Expressive looks for your closest circle.",
    description:
      "Group styling for friends and wedding crews.",
    icon: "sparkles",
    sections: [
      {
        slug: "bride-crew",
        title: "Bride Crew",
        description:
          "Styling for bridesmaids and close friends.",
      },
      {
        slug: "groom-crew",
        title: "Groom Crew",
        description:
          "Styling for groom crew and friends.",
      },
      {
        slug: "party",
        title: "Party Looks",
        description:
          "Celebration and party styling.",
      },
    ],
  },

  {
    slug: "guest-experience",
    title: "Guest Experience",
    subtitle:
      "Curated experiences your guests will love.",
    description:
      "Premium styling stations and guest experiences.",
    icon: "crown",
    sections: [
      {
        slug: "vip-guests",
        title: "VIP Guest Styling",
        description:
          "Premium styling for VIP guests.",
      },
      {
        slug: "family-guests",
        title: "Family Guest Styling",
        description:
          "Comfortable styling for family guests.",
      },
      {
        slug: "premium",
        title: "Premium Guest Styling",
        description:
          "Luxury styling experience.",
      },
      {
        slug: "sunglasses-bar",
        title: "Sunglasses Bar",
        description:
          "Interactive sunglasses experience.",
      },
    ],
  },

  {
    slug: "personal-occasion",
    title: "Personal Occasion",
    subtitle:
      "Every occasion deserves a perfect look.",
    description:
      "Styling for birthdays, travel and celebrations.",
    icon: "gift",
    sections: [
      {
        slug: "birthday",
        title: "Birthday Styling",
        description:
          "Birthday celebration styling.",
      },
      {
        slug: "anniversary",
        title: "Anniversary Styling",
        description:
          "Romantic anniversary styling.",
      },
      {
        slug: "vacation",
        title: "Vacation Styling",
        description:
          "Travel and vacation looks.",
      },
      {
        slug: "corporate",
        title: "Corporate Styling",
        description:
          "Professional and business styling.",
      },
    ],
  },
];

export function getGalleryCategory(slug: string) {
  return galleryCategories.find(
    (category) => category.slug === slug
  );
}