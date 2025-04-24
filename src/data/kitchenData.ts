export const kitchenData = {
    date: "2025-04-24",
    totalReservations: 2,
    totalCovers: 6,
    totalItems: 4,
    complexOrders: 0,
    dietaryRequirements: {
      "gluten-free": 1,
      "nut-free": 1,
    },
    tables: [
      {
        tableNumber: 1,
        covers: 4,
        complexityScore: 3.0,
        prepTime: 36,
        dietary: {
          "gluten-free": 1,
          "nut-free": 1,
        },
        orders: [
          { name: "Duck Confit", dietary: "gluten-free" },
          { name: "Salmon Tartare", dietary: "nut-free" },
        ],
        notes: "Multiple dietary restrictions - verify ingredients",
      },
      {
        tableNumber: 2,
        covers: 2,
        complexityScore: 2.0,
        prepTime: 30,
        orders: [
          { name: "Beef Bourguignon" },
          { name: "Chocolate Soufflé" },
        ],
      },
    ],
  };
  