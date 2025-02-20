import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const ContactForm = () => {
  return (
    <div className='max-w-xl mx-auto'>
        <div className='border border-primaryColor/20 rounded-md p-12'>
            <h3 className='text-2xl font-bold mb-8 text-white/60'>Nous contacter</h3>
    <Input type='text' placeholder='Nom' className='w-full mb-4' />
    <Input type='text' placeholder='Prénom' className='w-full mb-4' />
    <Input type='email' placeholder='Email' className='w-full mb-4' />
    <Input type='text' placeholder='Objet' className='w-full mb-4' />
    <textarea placeholder='Message' className='w-full mb-4 h-32'></textarea>
    <Button>Envoyer</Button>
        </div>
    </div>
  )
}

export default ContactForm