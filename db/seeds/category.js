
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del()
  await knex('category').insert([
    {id: 1, title: 'rowValue1'},
    {id: 2, title: 'rowValue2'},
    {id: 3, title: 'rowValue3'}
  ]);
};
