import React from 'react'

const Politics = () => {
    return (
        <div className='w-full bg-white/95 py-24'>
            <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg pt-10">
                <h1 className="text-2xl font-bold mb-4">Politique de Confidentialité</h1>

                <p className="mb-4">Nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.</p>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">1. Données collectées</h2>
                    <p className="mb-2"><strong>Formulaire de newsletter :</strong> Nous collectons votre adresse e-mail après votre consentement.</p>
                    <p className="mb-2"><strong>Formulaire de pétition :</strong> Nous collectons votre nom, prénom, adresse e-mail et une version hachée de votre adresse IP pour limiter les signatures. Ces signatures pourront être utilisée</p>
                    <p><strong>Formulaire de contact :</strong> Nous collectons votre nom, prénom, adresse e-mail et votre message.</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">2. Utilisation des données</h2>
                    <p className="mb-2">Vos données sont utilisées exclusivement pour les finalités suivantes :</p>
                    <ul className="list-disc list-inside">
                        <li>Vous envoyer des informations via la newsletter (si vous y avez souscrit).</li>
                        <li>Vérifier l'unicité des signatures pour la pétition.</li>
                        <li>Répondre à vos demandes via le formulaire de contact.</li>
                    </ul>
                </div>

                <div className="">
    <h2 className="text-2xl font-bold mb-4">Collecte des Données pour la Pétition</h2>
    <p className="mb-2">
        Lorsque vous signez une pétition sur notre site, nous collectons les informations suivantes :
    </p>
    <ul className="list-disc list-inside mb-4">
        <li>Votre adresse e-mail</li>
        <li>Votre nom et prénom</li>
        <li>Votre adresse IP, stockée sous forme de hash, pour limiter les signatures en double</li>
    </ul>
    <p className="mb-2">
        Ces informations sont utilisées uniquement dans le cadre de la pétition afin d’assurer son authenticité et sa validité.
    </p>
</div>

<div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-3">
    <h2 className="text-2xl font-bold mb-4">Diffusion des Signatures</h2>
    <p className="mb-2">
        Les signatures collectées peuvent être communiquées à l'organisme de vérification chargé de s'assurer de leur authenticité.
        Elles peuvent également être transmises au principal concerné par la pétition (institution, entreprise, administration, etc.).
    </p>
    <p className="mb-2">
        Cependant, nous ne partagerons jamais vos adresses e-mail ni votre adresse IP avec ces entités, sauf obligation légale.
    </p>
</div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">3. Conservation des données</h2>
                    <p className="mb-2">Vos données sont conservées aussi longtemps que nécessaire :</p>
                    <ul className="list-disc list-inside">
                        <li>Les abonnements à la newsletter peuvent être annulés à tout moment.</li>
                        <li>Les signatures de pétition sont conservées aussi longtemps que la pétition est active.</li>
                        <li>Les messages du formulaire de contact sont supprimés après traitement.</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">4. Sécurité des données</h2>
                    <p>Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé ou toute divulgation.</p>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">5. Vos droits</h2>
                    <p>Vous avez le droit d'accéder, de rectifier ou de supprimer vos données. Pour exercer ces droits, contactez-nous via notre formulaire de contact.</p>
                </div>

                <p className="text-sm text-gray-600">Dernière mise à jour : 22-02-2025</p>
            </div>
        </div>
    )
}

export default Politics