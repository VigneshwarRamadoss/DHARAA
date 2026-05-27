export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  features: string[];
  image: string;
  is_active: boolean;
  stock: number;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Classic Gold Hoops",
    price: 399,
    category: "Anti-Tarnish",
    description: "Everyday gold hoops that never lose their shine. Perfect for a minimal look or stacking with other earrings. Handcrafted from premium anti-tarnish alloy.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p1.jpg",
    is_active: true,
    stock: 50
  },
  {
    id: "p2",
    name: "Oxidised Silver Jhumkas",
    price: 299,
    category: "Oxidised",
    description: "Traditional oxidized jhumkas reimagined for everyday wear. Lightweight and exquisitely detailed.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p2.jpg",
    is_active: true,
    stock: 35
  },
  {
    id: "p3",
    name: "Rose Quartz Pendant Set",
    price: 499,
    category: "Gift Combos",
    description: "A beautiful rose quartz pendant with matching stud earrings. The perfect gift for someone special.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p3.jpg",
    is_active: true,
    stock: 12
  },
  {
    id: "p4",
    name: "Minimalist Silver Ring",
    price: 89,
    category: "Under ₹99",
    description: "A delicate silver ring perfect for stacking or wearing on its own. Beautifully simple.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p4.jpg",
    is_active: true,
    stock: 100
  },
  {
    id: "p5",
    name: "Pearl Drop Earrings",
    price: 199,
    category: "Anti-Tarnish",
    description: "Elegant pearl drop earrings set in anti-tarnish gold plating. A timeless classic for any occasion.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p1.jpg",
    is_active: true,
    stock: 25
  },
  {
    id: "p6",
    name: "Oxidised Choker Necklace",
    price: 349,
    category: "Oxidised",
    description: "Make a statement with this beautifully detailed oxidised silver choker. Pairs wonderfully with traditional and fusion wear.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p2.jpg",
    is_active: true,
    stock: 15
  },
  {
    id: "p7",
    name: "Everyday Studs Combo",
    price: 199,
    category: "Gift Combos",
    description: "A set of three minimalist stud earrings for everyday wear. Includes gold balls, cubic zirconia, and tiny pearls.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p3.jpg",
    is_active: true,
    stock: 40
  },
  {
    id: "p8",
    name: "Thin Stackable Bangles",
    price: 99,
    category: "Under ₹99",
    description: "A set of three thin, textured bangles. Lightweight and perfect for creating that satisfying jingle.",
    features: ["Premium materials", "Handcrafted", "Easy maintenance", "Gifting"],
    image: "/src/assets/p4.jpg",
    is_active: true,
    stock: 80
  }
];
