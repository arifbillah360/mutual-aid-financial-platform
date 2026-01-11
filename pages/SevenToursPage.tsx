import React from 'react';
import { BlinkingText } from '../components/BlinkingText';
import { TRIANGULUM_TOURS, PLEIADES_TOURS } from '../constants';

const TourTable: React.FC<{ title: string; tours: typeof TRIANGULUM_TOURS }> = ({ title, tours }) => (
  <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto">
    <h3 className="text-2xl font-bold text-emerald-400 mb-6 text-center">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Tour
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Offert
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Reçu
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Avoir
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {tours.map((tourData) => (
            <tr key={tourData.tour}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                {tourData.tour}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {tourData.offert.toLocaleString('fr-FR')}€
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {tourData.recu.toLocaleString('fr-FR')}€
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                {tourData.avoir.toLocaleString('fr-FR')}€
              </td>
            </tr>
          ))}
          <tr className="bg-gray-700 font-bold">
            <td colSpan={3} className="px-6 py-4 text-left text-sm text-gray-100">
              Total:
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-300">
              {tours[0].total?.toLocaleString('fr-FR')}€
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const SevenToursPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-5xl font-extrabold text-center text-white mb-12">
        LES 7 TOURS - Understanding the System
      </h2>

      <div className="mb-12 text-center text-lg text-gray-300">
        <p className="mb-2">Key Terms:</p>
        <ul className="list-disc list-inside space-y-1 mx-auto max-w-md">
          <li><BlinkingText className="font-semibold text-purple-400">Alcyone</BlinkingText> = Personne que vous soutenez</li>
          <li><BlinkingText className="font-semibold text-blue-400">Constellation</BlinkingText> = Les personnes qui vous soutiennent</li>
          <li><BlinkingText className="font-semibold text-emerald-400">7 Ensemble</BlinkingText> = La plateforme</li>
        </ul>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-12 mb-16">
        <TourTable title="TRIANGULUM (3 People Option)" tours={TRIANGULUM_TOURS} />
        <TourTable title="PLÉIADES (7 People Option)" tours={PLEIADES_TOURS} />
      </div>

      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-4xl mx-auto text-lg text-gray-200">
        <h3 className="text-2xl font-bold text-emerald-400 mb-4 text-center">Explications des Colonnes :</h3>
        <ul className="space-y-3">
          <li>
            <span className="font-semibold text-gray-100">Offert:</span> Ce que vous payez à votre Alcyone au début du tour.
          </li>
          <li>
            <span className="font-semibold text-gray-100">Reçu:</span> Ce que vous recevez de votre Constellation lorsque tous vos membres ont contribué.
          </li>
          <li>
            <span className="font-semibold text-gray-100">Avoir:</span> La somme d'argent que vous conservez pour vous-même après avoir payé le prochain tour.
          </li>
        </ul>
        <p className="mt-6 text-center italic text-gray-400">
          "Je commence par payer 21€, et à chaque tour, je reçois de l'argent des autres. Au Tour 7, je touche d'énormes sommes !"
        </p>
      </div>
    </div>
  );
};