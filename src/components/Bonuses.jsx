import React from 'react';

const Bonuses = ({ bonuses }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Your Bonuses</h3>
      <ul className="space-y-2">
        {bonuses.map((bonus) => (
          <li key={bonus.uuid} className="flex justify-between items-center">
            <span>{bonus.name}</span>
            <span className="font-semibold">{bonus.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bonuses;
