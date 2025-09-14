module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Contests', [
      {
        contestType: 'name',
        title: 'Holiday Campaign',
        industry: 'Marketing',
        focusOfWork: 'New Year promotion',
        status: 'active',
        prize: 100,
        priority: 1,
        orderId: 'ORD123',
        userId: 12,
        createdAt: new Date('2024-12-27'),
      },
      {
        contestType: 'logo',
        title: 'Winter Logo',
        industry: 'Design',
        focusOfWork: 'Winter branding',
        status: 'finished',
        prize: 200,
        priority: 1,
        orderId: 'ORD124',
        userId: 11,
        createdAt: new Date('2025-01-10'),
      },
      {
        contestType: 'tagline',
        title: 'Spring Tagline',
        industry: 'Retail',
        focusOfWork: 'Spring promo',
        status: 'active',
        prize: 150,
        priority: 1,
        orderId: 'ORD125',
        userId: 11, 
        createdAt: new Date('2025-02-01'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Contests', null, {});
  },
};
