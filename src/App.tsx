import { useEffect, useState } from 'react';
import { z } from 'zod';
import ErrorMessage from './components/Error';
import Table from './components/table/Table';

const transactionSchema = z.object({
  id: z.number(),
  date: z.string().refine(
    (dateStr) => !isNaN(Date.parse(dateStr)),
    { message: 'Invalid date format' }
  ),
  amount: z.number(),
  merchant: z.string(),
  category: z.string()
});

const responseSchema = z.object({
  next: z.object({
    page: z.number(),
    limit: z.number(),
  }),
  totalPages: z.number(),
  currentPage: z.number(),
  transactions: z.array(transactionSchema),
});

export type Transaction = z.infer<typeof transactionSchema>;

export type Pagination = {
  next: {
    page: number;
    limit: number
  };
  totalPages: number;
  currentPage: number;
};

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(''); //TODO: Needed?
      try {
        const response = await fetch('https://tip-transactions.vercel.app/api/transactions?page=1');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText} (${response.status})`);
        }
        const data = await response.json();

        const parseResult = responseSchema.safeParse(data);
        if (!parseResult.success) {
          throw new Error('Data validation failed.'); // TODO: Include zod errors?
        }
        const validatedData = parseResult.data;

        setTransactions(validatedData.transactions);
        setPagination({
          next: validatedData.next,
          totalPages: validatedData.totalPages,
          currentPage: validatedData.currentPage,
        });
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unexpected error occurred.")
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold p-2">Expenses</h1>
      {loading ? (
        <p className="p-2">Loading...</p>
      ) : (
        <div className="max-h-[80vh] overflow-y-auto border border-gray-300">
          <Table
            transactions={transactions}
            className=""
          />
        </div>
      )}
      {pagination && (
        <div className="relative p-5">
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>
      )}
    </div>
  );
};