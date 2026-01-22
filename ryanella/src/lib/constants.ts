export const CATEGORIES = [
    {
        name: "Women",
        slug: "women",
        subcategories: ["Dresses", "Tops", "Two-Piece Sets", "Jumpsuits", "Skirts", "Lounge Wear"],
    },
    {
        name: "Men",
        slug: "men",
        subcategories: ["Shirts", "Trousers", "Casual Wear", "Native Wear", "Jackets"],
    },
    {
        name: "Accessories",
        slug: "accessories",
        subcategories: ["Bags", "Sunglasses", "Belts"],
    },
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
