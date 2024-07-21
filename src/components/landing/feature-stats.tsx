import Link from 'next/link'
import React from 'react'
import { Eye, LineChart, Plus } from 'lucide-react';
import { Button } from '../ui/button';
const FeatureStats = () => {
  return (
    <section className='max-w-lg mx-auto space-y-6 my-12 px-4 '>
        <h2 className='text-4xl text-center font-bold'>Le bilan de Jupiter</h2>

        {/* Section de chaque catégorie */}

        <div className='flex items-center justify-between'>
            <h3 className='text-xl font-semibold'>Economie</h3>
            <Link href='/' className='text-primaryColor transition-all hover:text-primaryColor/90 underline'>Voir la liste complète</Link>
        </div>

        <div className='flex items-center justify-between'>
            <div className=''>
            <h4>Dette publique : </h4>
            <p>3 143 966 956,05 €</p>
            </div>
            <div className='space-x-1.5'>
              <Button variant={"outlinePrimaryColor"} size={"sm_icon"}><LineChart size={12} /></Button>
              <Button variant={"outlinePrimaryColor"} size={"sm_icon"}><Eye size={12} /></Button>
            </div>
        </div>
        <div className='flex items-center justify-between'>
            <div className=''>
            <h4>Dette publique : </h4>
            <p>3 143 966 956,05 €</p>
            </div>
            <div className='space-x-1.5'>
              <Button variant={"outlinePrimaryColor"} size={"sm_icon"}><LineChart size={12} /></Button>
              <Button variant={"outlinePrimaryColor"} size={"sm_icon"}><Eye size={12} /></Button>
            </div>
        </div>
        <div className='flex items-center justify-between'>
            <div className=''>
            <h4>Dette publique : </h4>
            <p>3 143 966 956,05 €</p>
            </div>
            <div className='space-x-1.5'>
              <Button variant={"outlinePrimaryColor"} size={"sm_icon"}><LineChart size={12} /></Button>
              <Button variant={"outlinePrimaryColor"} size={"sm_icon"}><Eye size={12} /></Button>
            </div>
        </div>
    </section>
  )
}

export default FeatureStats