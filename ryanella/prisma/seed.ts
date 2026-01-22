import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // 1. Clean up existing data
    await prisma.review.deleteMany();
    await prisma.wishlist.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log("Database cleared.");

    // 2. Create Initial Admin & User
    const hashedPassword = await bcrypt.hash("password123", 10);
    const admin = await prisma.user.create({
        data: {
            name: "Ryanella Admin",
            email: "admin@ryanella.com",
            password: hashedPassword,
            role: "ADMIN",
        },
    });

    const user = await prisma.user.create({
        data: {
            name: "Ryanella Muse",
            email: "muse@ryanella.com",
            password: hashedPassword,
            role: "USER",
        },
    });

    console.log("Users created.");

    // 3. Create Categories
    const categories = await Promise.all([
        prisma.category.create({
            data: { name: "Women", slug: "women" },
        }),
        prisma.category.create({
            data: { name: "Men", slug: "men" },
        }),
        prisma.category.create({
            data: { name: "Accessories", slug: "accessories" },
        }),
    ]);

    console.log("Categories created.");

    // 4. Create initial Products
    const productData = [
        {
            name: "Silk Evening Gown",
            description: "A breathtaking emerald silk gown with a hand-stitched hem and pearl buttons. Perfect for the most elegant soirées.",
            priceNGN: 125000,
            priceUSD: 155,
            categoryId: categories[0].id,
            images: ["https://images.unsplash.com/photo-1539008835064-07ae395b0086?q=80&w=2000&auto=format&fit=crop"],
            sizes: ["XS", "S", "M", "L"],
            colors: ["Emerald", "Black", "Gold"],
            stock: 12,
            isActive: true,
        },
        {
            name: "Artisan Leather Loafers",
            description: "Handcrafted Italian leather loafers with gold-plated buckle detailing. Redefining masculine elegance.",
            priceNGN: 85000,
            priceUSD: 110,
            categoryId: categories[1].id,
            images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=2000&auto=format&fit=crop"],
            sizes: ["42", "43", "44", "45"],
            colors: ["Cognac", "Ebony"],
            stock: 25,
            isActive: true,
        },
        {
            name: "Pearl Cascade Earrings",
            description: "Sophisticated drop earrings featuring natural freshwater pearls and 18k gold mounting.",
            priceNGN: 45000,
            priceUSD: 60,
            categoryId: categories[2].id,
            images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2000&auto=format&fit=crop"],
            sizes: ["One Size"],
            colors: ["Gold/Pearl"],
            stock: 50,
            isActive: true,
        }
    ];

    const products = [];
    for (const p of productData) {
        const product = await prisma.product.create({ data: p });
        products.push(product);
    }

    console.log("Products created.");

    // 5. Create Reviews
    await prisma.review.createMany({
        data: [
            {
                rating: 5,
                comment: "The craftsmanship on the silk gown is unparalleled. A true masterpiece.",
                userId: user.id,
                productId: products[0].id,
            },
            {
                rating: 5,
                comment: "The loafers fit perfectly. Luxury that you can feel with every step.",
                userId: user.id,
                productId: products[1].id,
            },
            {
                rating: 4,
                comment: "Elegant and timeless design. The pearls are exquisite.",
                userId: user.id,
                productId: products[2].id,
            }
        ]
    });

    // 6. Create Sample Orders
    const order = await prisma.order.create({
        data: {
            userId: user.id,
            totalAmount: 170000,
            status: "PROCESSING",
            paymentStatus: "PAID",
            shippingAddress: "45 Muse Avenue, Ikoyi, Lagos",
            items: {
                create: [
                    {
                        productId: products[1].id,
                        quantity: 2,
                        price: 85000,
                        size: "42",
                        color: "Ebony"
                    }
                ]
            }
        }
    });

    console.log("Orders created.");
    console.log("Seeds planted successfully. 🌿");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
