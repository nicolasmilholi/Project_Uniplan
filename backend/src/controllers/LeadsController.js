const connection = require('../database/connection');

module.exports = {
  async index(request, response) {

    const { page = 1 } = request.query;

    const [count] = await connection('leads').count();

    const leads = await connection('leads')
      .join('user', 'user.id', '=', 'leads.user_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'leads.*', 
        'user.name',  
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(leads);
  },

  async create(request, response) {
    const {nome, description, email, selectedUf, selectedCity, whatsapp } = request.body;
    const user_id = request.headers.authorization;

    const [id] = await connection('leads').insert({
      nome,
      description,
      email,
      selectedUf,
      selectedCity,
      whatsapp,
      user_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const leads = await connection('leads')
      .where('id', id)
      .select('user_id')
      .first();

    if (leads.user_id !== user_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('leads').where('id', id).delete();

    return response.status(204).send();
  }
};