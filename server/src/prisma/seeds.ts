import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient

async function createUsers() {
  return prisma.user.createMany({
    data: [
      {
        name: "Alice Silva",
        email: "alice@example.com",
        passwordHash: "hashsenha1",
      },
      {
        name: "Bob Souza",
        email: "bob@example.com",
        passwordHash: "hashsenha2",
      },
    ],
    skipDuplicates: true,
  });
}

async function createProducts() {
  return prisma.product.createMany({
    data: [
      {
        name: "iPhone 14",
        category: "Smartphone",
        description: "Apple iPhone 14 com 128GB.",
        quantity: 10,
        price: 5999.0,
        image: "iphone14.jpg",
      },
      {
        name: "Samsung Galaxy S23",
        category: "Smartphone",
        description: "Samsung Galaxy S23 256GB.",
        quantity: 15,
        price: 4999.0,
        image: "galaxys23.jpg",
      },
      {
        name: "Dell XPS 13",
        category: "Notebook",
        description: "Dell XPS 13, Intel i7, 16GB RAM.",
        quantity: 5,
        price: 7999.0,
        image: "dellxps13.jpg",
      },
    ],
    skipDuplicates: true,
  });
}

async function main() {
  console.log("Seeding database...");
  await createUsers();
  await createProducts();
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
