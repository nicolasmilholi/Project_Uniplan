import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo2.png';

export default function Profile() {
  const [leads, setLeads] = useState([]);

  const history = useHistory();

  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: userId,
      }
    }).then(response => {
      setLeads(response.data);
    })
  }, [userId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`leads/${id}`, {
        headers: {
          Authorization: userId,
        }
      });

      setLeads(leads.filter(leads => leads.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vindo, {userName}</span>

        <Link className="button" to="/leads/new">Cadastrar novo lead</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Leads cadastrados</h1>

      <ul>
        {leads.map(leads => (
          <li key={leads.id}>
            <strong>Nome:</strong>
            <p>{leads.nome}</p>

            <strong>Motivo de Contato:</strong>
            <p>{leads.description}</p>

            <button onClick={() => handleDeleteIncident(leads.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}