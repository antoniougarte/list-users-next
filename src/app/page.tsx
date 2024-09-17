'use client'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { IPerson, IRandomPersonResult } from "./types/user.interface";
import ListaPersonas from '@/components/ListaPersonas';
import Paginacion from '@/components/Paginacion';

export default function Home() {
  const [data, setData] = useState<IPerson[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    if (page >= 1) {
      fetch(`https://randomuser.me/api/?page=${page}&results=12&seed=abc&inc=gender,name,email,login,picture`)
        .then(response => response.json())
        .then((responseData: IRandomPersonResult) => {
          console.log({ responseData });

          const transformedData: IPerson[] = responseData.results.map(val => ({
            fullName: `${val.name.first} ${val.name.last}`,
            gender: val.gender,
            username: val.login.username,
            email: val.email,
            picture: val.picture
          }));

          setData(transformedData);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsLoading(false);
        });
    }
  }, [page]);

  const filteredData = useMemo(() => {
    const copyOfData = [...data];
    return copyOfData.filter(val => val.fullName.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, data]);

  const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => setFilter(e.target.value);

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed top-0 w-full">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4 icon icon-tabler icons-tabler-outline icon-tabler-users">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
            <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">Lista de usuarios</span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
      </nav>
      <div className="w-full mx-auto h-screen d-grid mt-16">
        <div className="py-4 px-10 pt-10">
          <input
            type="text"
            placeholder="Filtrar por nombre"
            onChange={onChangeFilter}
            value={filter}
            className="p-2 rounded-md border border-gray-300"
          />
        </div>
        <div className="py-4 px-10">
          {isLoading ? (
            <div className="text-center text-gray-600">Cargando...</div>
          ) : (
            <ListaPersonas data={filter ? filteredData : data} />
          )}
        </div>
        <Paginacion page={page} onPageChange={handlePageChange} />
      </div>
    </>
  );
}
