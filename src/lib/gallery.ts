export type GalleryImage = {
  src: string;
  alt: string;
};

export type GallerySection = {
  slug: string;
  title: string;
  photos: number;
  image: string;
  description: string;
  images: GalleryImage[];
};

export type GalleryCategory = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: "heart" | "users" | "sparkles" | "crown" | "gift";
  sections: GallerySection[];
};

const imageSet = {
  bride:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200",
  groom:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200",
  couple:
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
  family:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
  friends:
    "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=1200",
  guest:
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200",
  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1200",
  birthday:
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
  corporate:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
};

function images(primary: string, label: string): GalleryImage[] {
  return [
    { src: primary, alt: label },
    { src: imageSet.sunglasses, alt: `${label} eyewear detail` },
    { src: imageSet.couple, alt: `${label} styled moment` },
    { src: imageSet.guest, alt: `${label} guest look` },
  ];
}

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "bride-groom",
    title: "Bride & Groom",
    subtitle: "Timeless moments of love, beautifully styled.",
    description: "Curated frames for wedding-day presence and portraits.",
    image: imageSet.couple,
    icon: "heart",
    sections: [
      {
        slug: "bride",
        title: "Bride",
        photos: 96,
        image: imageSet.bride,
        description: "Elegant bridal eyewear matched to outfit, jewelry, and face shape.",
        images: images(imageSet.bride, "Bride styling"),
      },
      {
        slug: "groom",
        title: "Groom",
        photos: 74,
        image: imageSet.groom,
        description: "Sharp groom looks for ceremonies, portraits, and evening moments.",
        images: images(imageSet.groom, "Groom styling"),
      },
      {
        slug: "couple",
        title: "Couple",
        photos: 102,
        image: imageSet.couple,
        description: "Coordinated couple styling that feels connected without matching too hard.",
        images: images(imageSet.couple, "Couple styling"),
      },
    ],
  },
  {
    slug: "family",
    title: "Family",
    subtitle: "Balanced styling for family presence.",
    description: "Refined eyewear for parents, siblings, and family portraits.",
    image: imageSet.family,
    icon: "users",
    sections: [
      {
        slug: "parents",
        title: "Parents",
        photos: 68,
        image: imageSet.family,
        description: "Classic frame direction for parents and close family.",
        images: images(imageSet.family, "Family styling"),
      },
      {
        slug: "siblings",
        title: "Siblings",
        photos: 54,
        image: imageSet.friends,
        description: "Modern selections for brothers, sisters, and younger family.",
        images: images(imageSet.friends, "Sibling styling"),
      },
      {
        slug: "portraits",
        title: "Family Portraits",
        photos: 47,
        image: imageSet.couple,
        description: "Cohesive looks for frame-worthy group photographs.",
        images: images(imageSet.couple, "Family portrait styling"),
      },
    ],
  },
  {
    slug: "friends-crew",
    title: "Friends & Crew",
    subtitle: "Expressive looks for your closest circle.",
    description: "Group styling for friends, bride crews, and groom crews.",
    image: imageSet.friends,
    icon: "sparkles",
    sections: [
      {
        slug: "bride-crew",
        title: "Bride Crew",
        photos: 63,
        image: imageSet.bride,
        description: "Polished styling for bridesmaids and close friends.",
        images: images(imageSet.bride, "Bride crew styling"),
      },
      {
        slug: "groom-crew",
        title: "Groom Crew",
        photos: 57,
        image: imageSet.groom,
        description: "Confident frame choices for groom crews and friends.",
        images: images(imageSet.groom, "Groom crew styling"),
      },
      {
        slug: "party",
        title: "Party Looks",
        photos: 71,
        image: imageSet.friends,
        description: "Stylish, personality-led selections for celebration moments.",
        images: images(imageSet.friends, "Party styling"),
      },
    ],
  },
  {
    slug: "guest-experience",
    title: "Guest Experience",
    subtitle: "Curated experiences your guests will love.",
    description: "Premium styling stations and guest-focused eyewear moments.",
    image: imageSet.guest,
    icon: "crown",
    sections: [
      {
        slug: "vip-guests",
        title: "VIP Guest Styling",
        photos: 48,
        image: imageSet.guest,
        description: "Personalized frame guidance for key guests.",
        images: images(imageSet.guest, "VIP guest styling"),
      },
      {
        slug: "family-guests",
        title: "Family Guest Styling",
        photos: 61,
        image: imageSet.family,
        description: "Comfortable, elegant selections for family guests.",
        images: images(imageSet.family, "Family guest styling"),
      },
      {
        slug: "premium",
        title: "Premium Guest Styling",
        photos: 55,
        image: imageSet.couple,
        description: "Elevated styling support for premium wedding experiences.",
        images: images(imageSet.couple, "Premium guest styling"),
      },
      {
        slug: "sunglasses-bar",
        title: "Sunglasses Bar",
        photos: 72,
        image: imageSet.sunglasses,
        description: "A stylish station where guests can pick their favorite pair.",
        images: images(imageSet.sunglasses, "Sunglasses bar"),
      },
    ],
  },
  {
    slug: "personal-occasion",
    title: "Personal Occasion",
    subtitle: "Every occasion deserves a perfect look.",
    description: "Styling for birthdays, celebrations, travel, and professional presence.",
    image: imageSet.birthday,
    icon: "gift",
    sections: [
      {
        slug: "birthday",
        title: "Birthday Styling",
        photos: 58,
        image: imageSet.birthday,
        description: "Statement frames for birthday memories and celebration portraits.",
        images: images(imageSet.birthday, "Birthday styling"),
      },
      {
        slug: "anniversary",
        title: "Anniversary Styling",
        photos: 48,
        image: imageSet.couple,
        description: "Romantic, refined styling for anniversary moments.",
        images: images(imageSet.couple, "Anniversary styling"),
      },
      {
        slug: "vacation",
        title: "Vacation Styling",
        photos: 52,
        image: imageSet.sunglasses,
        description: "Travel-ready eyewear with comfort, shape, and personality.",
        images: images(imageSet.sunglasses, "Vacation styling"),
      },
      {
        slug: "corporate",
        title: "Corporate Styling",
        photos: 46,
        image: imageSet.corporate,
        description: "Professional eyewear choices for polished daily presence.",
        images: images(imageSet.corporate, "Corporate styling"),
      },
    ],
  },
];

export function getGalleryCategory(slug: string) {
  return galleryCategories.find((category) => category.slug === slug);
}
