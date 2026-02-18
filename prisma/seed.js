import { prisma } from "../src/client.js";
import userData from "../src/data/users.json" with { type: 'json' };
import hostData from "../src/data/hosts.json" with { type: 'json' };
import reviewData from "../src/data/reviews.json" with { type: 'json' };
import bookingData from "../src/data/bookings.json" with { type: 'json' };
import propertyData from "../src/data/properties.json" with { type: 'json' };

// No idea what to do with the amenities.json:
// Nowhere in the instructions is it explained, nor can i cross-ref the ids with any.

async function main() {
    console.log(`Found ${userData.users.length} users, Seeding.`);
    for (const user of userData.users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        });
    }

    console.log(`Found ${hostData.hosts.length} host, Seeding.`);
    for (const host of hostData.hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host
        });
    }

    console.log(`Found ${propertyData.properties.length} properties, Seeding.`);
    for (const property of propertyData.properties) {
        await prisma.property.upsert({
            where: { id: property.id },
            update: {},
            create: property
        });
    }

    console.log(`Found ${reviewData.reviews.length} review, Seeding.`);
    for (const review of reviewData.reviews) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: review
        });
    }

    console.log(`Found ${bookingData.bookings.length} booking, Seeding.`);
    for (const booking of bookingData.bookings) {
        await prisma.booking.upsert({
            where: { id: booking.id },
            update: {},
            create: booking
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
