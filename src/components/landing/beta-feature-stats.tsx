import React from 'react'
import { GlowingEffectDemo } from './frid'
import { getCurrentYear } from '@/actions/root/year';

const BetaFeatureStat = async () => {
    const startOfYear = 1735686000000;
    const now = new Date().getTime();

  return (
    <div className='bg-black py-24 font-madeTommy space-y-8 relative'>
        <div className='mx-auto max-w-4xl'>
            <h3 className='text-muted mb-5'>Les chiffres de l'année en direct.</h3>
        <GlowingEffectDemo startOfYear={startOfYear} now={now} />
        </div>
    </div>
  )
}

export default BetaFeatureStat