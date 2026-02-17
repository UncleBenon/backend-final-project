import { prisma } from "../src/client.js";
import userData from "../src/data/users.json" with { type: 'json' };
import hostData from "../src/data/hosts.json" with { type: 'json' };
import reviewData from "../src/data/reviews.json" with { type: 'json' };
import bookingData from "../src/data/bookings.json" with { type: 'json' };
import propertyData from "../src/data/properties.json" with { type: 'json' };

// TODO:
//      Seed all the data correctly to the database.

async function main() {
    console.log(`Found ${userData.users.length} users.`);
    console.log(`Found ${hostData.hosts.length} hosts.`);
    console.log(`Found ${reviewData.reviews.length} reviews.`);
    console.log(`Found ${bookingData.bookings.length} bookings.`);
    console.log(`Found ${propertyData.properties.length} properties.`);
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
