import React, { useState } from 'react'
import { db } from './firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import logo from './logo-dark-green.svg'
import underConst from './under const.png'

const translations = {
  en: {
    title: 'Our platform is under construction',
    description1:
      'Join us in transforming lives across Bolivia! 🇧🇴',
    description2:
      'Our innovative donation platform connects compassionate individuals with those in need, creating a bridge of hope and support.',
    description3:
      "Whether you're seeking assistance or looking to make a difference, our user-friendly platform makes it easy to create campaigns, donate securely, and track your impact.",
    description4:
      "Be part of a community that's changing Bolivia, one act of kindness at a time.",
    description5:
      'Be notified when we launch and be among the first to experience the power of united giving!',
    emailPlaceholder: 'Enter your email',
    submitButton: 'Send',
    successMessage: 'Email submitted successfully!',
    errorMessage:
      'Error submitting email. Please try again.',
  },
  es: {
    title: 'Nuestra plataforma está en construcción',
    description1:
      '¡Únete a nosotros para transformar vidas en toda Bolivia! 🇧🇴',
    description2:
      'Nuestra innovadora plataforma de donaciones conecta a personas compasivas con aquellos que necesitan ayuda, creando un puente de esperanza y apoyo.',
    description3:
      'Ya sea que estés buscando asistencia o quieras marcar la diferencia, nuestra plataforma fácil de usar te permite crear campañas, donar de forma segura y seguir tu impacto',
    description4:
      'Sé parte de una comunidad que está cambiando Bolivia, un acto de bondad a la vez',
    description5:
      '¿Quieres ser notificado cuando lancemos y sé de los primeros en experimentar el poder de la donación unida?',
    emailPlaceholder: 'Ingresa tu correo electrónico',
    submitButton: 'Enviar',
    successMessage:
      '¡Correo electrónico enviado con éxito!',
    errorMessage:
      'Error al enviar el correo electrónico. Por favor, inténtelo de nuevo.',
  },
}

function App() {
  const [language, setLanguage] = useState('en')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'emails'), {
        email: email,
        language: language,
        timestamp: new Date(),
      })
      setMessage(translations[language].successMessage)
      setEmail('')
    } catch (error) {
      setMessage(translations[language].errorMessage)
      console.error('Error adding document: ', error)
    }
  }

  return (
    <div className='App'>
      <div className='language-selector'>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`language-button ${
            language === 'en' ? 'active' : ''
          }`}
        >
          English
        </button>
        <button
          onClick={() => handleLanguageChange('es')}
          className={`language-button ${
            language === 'es' ? 'active' : ''
          }`}
        >
          Español
        </button>
      </div>

      <img src={logo} alt='Minka logo' className='logo' />
      <img
        src={underConst}
        alt='Under construction'
        className='underConst'
      />

      <h1 className=''>{translations[language].title}</h1>
      <p className=''>
        {translations[language].description1}
        <br />
        {translations[language].description2}
        <br />
        <br />
        {translations[language].description3}
        <br />
        {translations[language].description4}
        <br />
        {translations[language].description5}
      </p>

      {message && (
        <p
          className={`message ${
            message.includes('Error') ? 'error' : 'success'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={
            translations[language].emailPlaceholder
          }
          required
          className='email-input'
        />
        <button type='submit' className='submit-button'>
          {translations[language].submitButton}
        </button>
      </form>
    </div>
  )
}

export default App
