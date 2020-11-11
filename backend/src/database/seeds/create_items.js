export async function seed() {
  await knex('items').insert([
    { title: 'Novo Plano' },
    { title: 'Solicitação de Boleto'},
    { title: 'Orçamento de Plano'},
    { title: 'Dúvidas',},
  ]);
}