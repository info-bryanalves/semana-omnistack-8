import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'
import './Main.css'

import logo from '../assets/logo.svg'
import dislike from '../assets/dislike.svg'
import like from '../assets/like.svg'

export default function Main({ match }) {

  const [users, setUsers] = useState([])

  useEffect(() => {

    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: match.params.id
        }
      })

      const users = response.data

      if (users) {
        setUsers(users)
      }
    }

    loadUsers()

  }, [match.params.id])

  async function handleLike(id) {

    await api.post(`/devs/${id}/likes`, null, {
      headers: {
        user: match.params.id
      }
    })

    setUsers(users.filter(user => user._id !== id))
  }

  async function handleDislike(id) {

    await api.post(`/devs/${id}/dislikes`, null, {
      headers: {
        user: match.params.id
      }
    })

    setUsers(users.filter(user => user._id !== id))
  }

  return (
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {
        users.lenght > 0 ?
          <ul>
            {users.map(({ _id: id, avatar, name, bio }) => (
              <li key={id}>
                <img src={avatar} alt="" />
                <footer>
                  <strong>{name}</strong>
                  <p>{bio}</p>
                </footer>
                <div className="buttons">
                  <button type="button" onClick={() => handleDislike(id)}>
                    <img src={dislike} alt="dislike" />
                  </button>
                  <button type="button" onClick={() => handleLike(id)}>
                    <img src={like} alt="like" />
                  </button>
                </div>
              </li>
            ))}
          </ul> : (
            <div className="empty">Acabou =(</div>
          )
      }

    </div>
  )
}