import Link from 'next/link'
import React from 'react'

const BetaFooter = () => {
  return (
    <div className="bg-black text-white">
        <ul className='flex justify-center space-x-6 py-4 text-[13px] tracking-tighter'>
            <li><Link href="/mentions-legales">Mentions légales</Link></li>
            <li><Link href="/politiques-de-confidentialite">Politiques de confidentialité</Link></li>
            {/* <li><Link href="">Cookies</Link></li> */}
        </ul>
    </div>
  )
}

export default BetaFooter