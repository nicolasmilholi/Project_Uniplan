const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const user = await connection('user').select('*');
  
    return response.json(user);
  },

  async create(request, response) {
    debugger
    const { name, email } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
    
    await connection('user').insert({
      id,
      name,
      email,
    })
    return response.json({ id });
  }
};