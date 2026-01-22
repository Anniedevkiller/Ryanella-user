export const CATEGORIES = [
    {
        name: "Women",
        slug: "women",
        description: "Elegant silhouettes for the modern muse.",
        featuredImage: "/images/ui/women_teaser.png",
        subcategories: ["Dresses", "Tops", "Two-Piece Sets", "Jumpsuits", "Skirts", "Lounge Wear"],
    },
    {
        name: "Men",
        slug: "men",
        description: "Tailored sophistication for the bold gentleman.",
        featuredImage: "/images/ui/men_teaser.png",
        subcategories: ["Shirts", "Trousers", "Casual Wear", "Native Wear", "Jackets"],
    },
    {
        name: "Accessories",
        slug: "accessories",
        description: "The finishing touches to your masterpiece.",
        featuredImage: "/images/ui/accessories_teaser.png",
        subcategories: ["Bags", "Sunglasses", "Belts", "Jewelry"],
    },
    {
        name: "New Arrivals",
        slug: "new-arrivals",
        description: "Freshly curated pieces for the season.",
        featuredImage: "/images/ui/women_teaser.png",
        subcategories: ["Latest Drop", "Coming Soon"],
    },
    {
        name: "Sale",
        slug: "sale",
        description: "Timeless luxury at exceptional value.",
        featuredImage: "/images/ui/men_teaser.png",
        subcategories: ["Clearance", "Seasonal Offer"],
    }
];

export const PRODUCTS = [
    {
        id: "1",
        name: "Silk Evening Gown",
        price: 85000,
        priceUSD: 110,
        category: "women",
        subcategory: "Dresses",
        images: ["/products/gown-1.jpg", "/products/gown-2.jpg"],
        colors: ["Black", "Cream", "Gold"],
        sizes: ["XS", "S", "M", "L", "XL"],
        description: "Luxurious silk evening gown designed for elegance and comfort.",
        isNew: true,
        isBestSeller: true,
    },
    {
        id: "2",
        name: "Tailored Linen Shirt",
        price: 45000,
        priceUSD: 60,
        category: "men",
        subcategory: "Shirts",
        images: ["/products/shirt-1.jpg"],
        colors: ["White", "Beige", "Black"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        description: "Premium linen shirt with a modern tailored fit.",
        isNew: true,
        isBestSeller: false,
    },
    // Add more mock data as needed
];
