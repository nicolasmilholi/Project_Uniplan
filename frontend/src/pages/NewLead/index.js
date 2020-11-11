import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import axios from 'axios';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo2.png';



export default function NewLead() {
  const [nome, setNome] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhats] = useState('');
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);

  const history = useHistory();

  const userId = localStorage.getItem('userId');



  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(selectedUf) {
    const uf = selectedUf

    setSelectedUf(uf);
  }

  function handleSelectCity(selectedCity) {
    const city = selectedCity
    setSelectedCity(city);
  }


  async function handleNewLead(e) {
    e.preventDefault();

    const data = {
      nome,
      description,
      email,
      selectedUf,
      selectedCity,
      whatsapp
    };

    try {
      await api.post('leads', data, {
        headers: {
          Authorization: userId,
        }
      })

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo lead</h1>
          <p>Insira os dados do cliente para que possamos entrar em contato</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewLead}>
          <input
            placeholder="Nome do Cliente"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <textarea
            placeholder="Motivo Contato"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            placeholder="E-Mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhats(e.target.value)}
          />

          <div className="field-group">
            <div className="field">
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={e => handleSelectUf(e.target.value)}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={e => handleSelectCity(e.target.value)}
              >
                <option value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}