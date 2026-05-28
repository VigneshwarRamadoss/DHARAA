import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import editorial from "@/assets/editorial.jpg";

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
    image: p1,
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
    image: p2,
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
    image: p3,
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
    image: p4,
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
    image: p1,
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
    image: p2,
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
    image: p3,
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
    image: p4,
    is_active: true,
    stock: 80
  },
  {
    id: "n1",
    name: "Aura Herringbone Chain",
    price: 599,
    category: "Necklaces",
    description: "A sleek, liquid-gold herringbone chain that sits perfectly flat against the collarbone. Handcrafted in our Mumbai atelier with premium anti-tarnish coating.",
    features: ["Anti-Tarnish", "18k Gold Plated", "Fluid Movement", "2-Year Guarantee"],
    image: p1,
    is_active: true,
    stock: 40
  },
  {
    id: "n2",
    name: "Zeenat Coin Pendant",
    price: 449,
    category: "Necklaces",
    description: "Inspired by ancient temple coins, this pendant features an intricately carved motif suspended from a delicate cable chain. Beautiful layered or worn solo.",
    features: ["Hand-Carved Motif", "High Polish", "Adjustable Length", "Atelier Exclusive"],
    image: p3,
    is_active: true,
    stock: 25
  },
  {
    id: "n3",
    name: "Devi Oxidised Layering Set",
    price: 799,
    category: "Necklaces",
    description: "A pre-curated duo featuring a detailed choker and a longer crescent pendant in premium oxidized sterling silver finish. The ultimate festive statement.",
    features: ["Pre-Layered Duo", "Oxidised Silver Finish", "Lightweight Alloy", "Generational Craft"],
    image: p2,
    is_active: true,
    stock: 15
  },
  {
    id: "n4",
    name: "Iris Minimalist Bar Necklace",
    price: 299,
    category: "Necklaces",
    description: "A slender, high-polish gold bar suspended on a micro-cable chain. An understated statement of pure minimalist refinement.",
    features: ["Ultra-Lightweight", "Anti-Tarnish Seal", "Seamless Clasp", "Everyday Staple"],
    image: p4,
    is_active: true,
    stock: 60
  },
  {
    id: "n5",
    name: "Kaya Seed Bead Strand",
    price: 149,
    category: "Necklaces",
    description: "A playful, delicate strand of tiny matte-gold seed beads, hand-strung on durable steel wire. Sits high at the collarbone.",
    features: ["Hand-Strung", "Matte Finish", "High-Durability Wire", "Perfect for Layering"],
    image: p1,
    is_active: true,
    stock: 100
  },
  {
    id: "n6",
    name: "Meera Pearl Station Necklace",
    price: 499,
    category: "Necklaces",
    description: "Lustrous freshwater pearls spaced evenly along a fine, shimmering gold chain. A timeless bridge between traditional heritage and modern poise.",
    features: ["Freshwater Pearls", "18k Gold Plated", "Gift Box Included", "Secure Lobster Clasp"],
    image: editorial,
    is_active: true,
    stock: 30
  },
  {
    id: "e1",
    name: "Rhea Ribbed Hoops",
    price: 399,
    category: "Earrings",
    description: "Medium-sized chunky hoops featuring a vintage-inspired ribbed texture. Extremely lightweight and plated in a rich warm gold.",
    features: ["Premium Hollow Tube", "18k Gold Plated", "Click-Secure Clasp", "Hypoallergenic"],
    image: p1,
    is_active: true,
    stock: 45
  },
  {
    id: "e2",
    name: "Mayur Oxidised Jhumkas",
    price: 299,
    category: "Earrings",
    description: "Exquisite peacock-motif oxidized jhumkas featuring tiny silver beads that dance with your movements. A timeless classic.",
    features: ["Generational Craft", "Detailed Engraving", "Comfort Weight", "Anti-Tarnish Sterling Silver Finish"],
    image: p2,
    is_active: true,
    stock: 35
  },
  {
    id: "e3",
    name: "Aria Pearl Drop Studs",
    price: 199,
    category: "Earrings",
    description: "Lustrous white pearls suspended gracefully from tiny, high-polish gold studs. Effortless bridal or everyday elegance.",
    features: ["Freshwater Pearls", "Anti-Tarnish Backing", "Comfort Fit Posts", "Perfect Gifting"],
    image: p3,
    is_active: true,
    stock: 50
  },
  {
    id: "e4",
    name: "Tara Statement Chandeliers",
    price: 549,
    category: "Earrings",
    description: "Stunning tiered chandelier earrings that catch the light from every angle. Designed for grand celebrations and unforgettable nights.",
    features: ["Multi-Tiered Design", "Faceted Quartz Accents", "Oxidised Silver Base", "Comfort Backing Included"],
    image: p4,
    is_active: true,
    stock: 20
  },
  {
    id: "e5",
    name: "Nila Celestial Studs Set",
    price: 89,
    category: "Earrings",
    description: "A charming duo of micro-sized crescent moon and star studs, finished in polished silver. Designed for daily wear.",
    features: ["Micro Scale", "925 Sterling Silver Plated", "Friction Post", "Everyday Comfort"],
    image: p4,
    is_active: true,
    stock: 120
  },
  {
    id: "e6",
    name: "Aditi Enamel Hoop Drops",
    price: 249,
    category: "Earrings",
    description: "Dainty gold hoops featuring detachable drop charms coated in a rich, ivory enamel. Two styles in one gorgeous pair.",
    features: ["Detachable Charms", "Hand-Painted Enamel", "18k Gold Plated", "Hypoallergenic Base"],
    image: p1,
    is_active: true,
    stock: 30
  },
  {
    id: "r1",
    name: "Solis Gold Stacking Ring",
    price: 249,
    category: "Rings",
    description: "A fluid, high-polish gold band designed for stacking. Minimalist everyday luxury.",
    features: ["Stackable", "18k Gold Plated", "High Polish", "Anti-Tarnish"],
    image: p3,
    is_active: true,
    stock: 100
  },
  {
    id: "r2",
    name: "Dusk Oxidised Band",
    price: 199,
    category: "Rings",
    description: "A statement band with a hammered texture in deep oxidized silver.",
    features: ["Statement Piece", "Oxidised Silver Finish", "Hammered Texture", "Comfort Fit"],
    image: p2,
    is_active: true,
    stock: 45
  },
  {
    id: "r3",
    name: "Noor Pearl Cocktail Ring",
    price: 549,
    category: "Rings",
    description: "An adjustable cocktail ring crowned with a beautiful freshwater pearl. Occasion ready.",
    features: ["Freshwater Pearl", "Adjustable Size", "Cocktail Style", "18k Gold Plated"],
    image: p1,
    is_active: true,
    stock: 25
  },
  {
    id: "r4",
    name: "Vara Geometric Ring",
    price: 349,
    category: "Rings",
    description: "A precision-cut architectural ring with a flat square face. Minimalist geometry.",
    features: ["Geometric Design", "Precision Cut", "Anti-Tarnish", "Modernist"],
    image: p4,
    is_active: true,
    stock: 35
  },
  {
    id: "r5",
    name: "Amara Midi Set",
    price: 149,
    category: "Rings",
    description: "A set of three thin, stackable bands designed to be worn on the upper fingers.",
    features: ["Midi Ring Set", "Set of 3", "Ultra-Thin", "Everyday Wear"],
    image: p1,
    is_active: true,
    stock: 80
  },
  {
    id: "r6",
    name: "Raahi Adjustable Ring",
    price: 89,
    category: "Rings",
    description: "An open-back, adjustable ring featuring a delicate leaf motif.",
    features: ["Adjustable Size", "Leaf Motif", "Under ₹99", "Gifting"],
    image: p2,
    is_active: true,
    stock: 120
  }
];

