import React from 'react';
import CardPersona from './CardPersona';
import { IPerson } from '@/app/types/user.interface';

interface ListaPersonasProps {
  data: IPerson[];
}

const ListaPersonas: React.FC<ListaPersonasProps> = ({ data }) => {
  return (
    <div className="grid gap-10 xs:grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10 pb-24">
      {data.map((person, index) => (
        <CardPersona key={index} person={person} />
      ))}
    </div>
  );
}

export default ListaPersonas;