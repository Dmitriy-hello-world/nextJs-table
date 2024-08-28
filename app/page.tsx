import { fetchJsonData } from '../utils/fetchData';
import { Table } from '../components/Table';

export default async function Home() {
  const data = await fetchJsonData('/api/data');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-2xl font-bold mb-4">Product Table</h1>
      <Table products={data} />
    </main>
  );
}
