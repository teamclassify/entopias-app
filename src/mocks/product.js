export const mockProducts = {
  products: [
    {
      id: 1,
      name: "Cafe Basico",
      description: "Cafe mas basico posible.",
      type: "Molido",
      status: true,
      createdAt: "2025-04-08T18:32:49.000Z",
      updatedAt: "2025-04-11T02:47:03.981Z",
      photos: [
        {
          id: 3,
          url: "https://wjtmjrfdgzplbydfenyn.supabase.co/storage/v1/object/public/products/public/daaa129a-384a-4be7-bfc4-ea0bcfcc85b9.cafe2.jpg",
          productId: 1,
        },
      ],
      varieties: [
        { id: 2, stock: 100, weight: 200, price: 35000, productId: 1 },
        { id: 1, stock: 10, weight: 100, price: 20000, productId: 1 },
        { id: 5, stock: 20000, weight: 500, price: 100000, productId: 1 },
        { id: 4, stock: 2000, weight: 250, price: 50000, productId: 1 },
      ],
      batches: [
        {
          id: 1,
          productId: 1,
          producerId: 1,
          initialWeight: 500,
          finalWeight: "300",
          roastedDate: "2025-04-08T18:33:18.000Z",
          roastedType: "2025-04-08T18:33:19.000Z",
          aromaticNotes: "Limon, miel",
          expirationDate: "2027-04-01T00:00:00.000Z",
          purchasePrice: 330000,
          createdAt: "2025-04-08T18:33:39.000Z",
          updatedAt: "2025-04-08T18:33:40.000Z",
          producer: {
            id: 1,
            name: "San Juanito",
            email: "sanjuanito@gmail.com",
            phone: "42342334",
            country: "Colombia",
            state: "Norte de Santander",
            farm: "San Juanito",
          },
        },
      ],
    },
  ],
  count: 1,
};
