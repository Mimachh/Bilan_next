import React from "react";

const Mentions = () => {
  return (
    <div className="w-full bg-white/95 py-24 min-h-[90vh]">
      <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Mentions Légales</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Hébergeur</h3>
          <p className="text-gray-700">Nom: Vercel Inc</p>
          <p className="text-gray-700">
            Adresse: Vercel Inc, 650 California St, San Francisco, CA 94108, US
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Editeur</h3>
          <p className="text-gray-700">Nom: Mimach</p>
          <p className="text-gray-700">Email: contact@mimach.fr</p>
        </div>
      </div>
    </div>
  );
};

export default Mentions;
