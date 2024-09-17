import React from 'react';
import { IPerson } from '@/app/types/user.interface';

interface CardPersonaProps {
  person: IPerson;
}

const CardPersona: React.FC<CardPersonaProps> = ({ person }) => {
  const { fullName, username, email, picture } = person;

  return (
    <div className="bg-white rounded-lg shadow-md max-w-sm w-full flex flex-col items-center p-4">
      <img
        src={picture.medium}
        alt={fullName}
        className="w-24 h-24 object-cover object-center rounded-full border-2 border-gray-300 mb-4"
      />
      <div className="text-center">
        <p className="text-lg font-semibold">{fullName}</p>
        <p className="text-gray-500">@{username}</p>
        <p className="text-gray-700 mt-1">{email}</p>
      </div>
    </div>
  );
}

export default CardPersona;
