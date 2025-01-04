import React, { useState } from 'react';

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

interface Invoice {
  id: string;
  date: string;
  customer: string;
  amount: number;
  status: 'Paid' | 'Unpaid';
}

const App: React.FC = () => {
  const [ledger, setLedger] = useState<LedgerEntry[]>([
    { id: '1', date: '2023-10-01', description: 'Initial Balance', debit: 0, credit: 10000, balance: 10000 },
    { id: '2', date: '2023-10-02', description: 'Purchase of Goods', debit: 5000, credit: 0, balance: 5000 },
    { id: '3', date: '2023-10-03', description: 'Sales Revenue', debit: 0, credit: 7000, balance: 12000 },
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: '1', date: '2023-10-01', customer: 'Customer A', amount: 5000, status: 'Paid' },
    { id: '2', date: '2023-10-02', customer: 'Customer B', amount: 3000, status: 'Unpaid' },
    { id: '3', date: '2023-10-03', customer: 'Customer C', amount: 7000, status: 'Paid' },
  ]);

  const [newEntry, setNewEntry] = useState<Omit<LedgerEntry, 'id' | 'balance'>>({
    date: '',
    description: '',
    debit: 0,
    credit: 0,
  });

  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id' | 'status'>>({
    date: '',
    customer: '',
    amount: 0,
  });

  const addLedgerEntry = () => {
    const lastBalance = ledger.length > 0 ? ledger[ledger.length - 1].balance : 0;
    const balance = lastBalance + newEntry.credit - newEntry.debit;
    const entry: LedgerEntry = {
      id: (ledger.length + 1).toString(),
      ...newEntry,
      balance,
    };
    setLedger([...ledger, entry]);
    setNewEntry({ date: '', description: '', debit: 0, credit: 0 });
  };

  const addInvoice = () => {
    const invoice: Invoice = {
      id: (invoices.length + 1).toString(),
      ...newInvoice,
      status: 'Unpaid',
    };
    setInvoices([...invoices, invoice]);
    setNewInvoice({ date: '', customer: '', amount: 0 });
  };

  return (
    <div className="min- bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Tally Prime Clone</h1>

        {/* Ledger Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ledger</h2>
          <div className="grid grid-cols-5 gap-4 mb-4">
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Debit"
              value={newEntry.debit}
              onChange={(e) => setNewEntry({ ...newEntry, debit: parseFloat(e.target.value) })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Credit"
              value={newEntry.credit}
              onChange={(e) => setNewEntry({ ...newEntry, credit: parseFloat(e.target.value) })}
              className="p-2 border rounded"
            />
            <button
              onClick={addLedgerEntry}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Entry
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Date</th>
                <th className="p-2">Description</th>
                <th className="p-2">Debit</th>
                <th className="p-2">Credit</th>
                <th className="p-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((entry) => (
                <tr key={entry.id} className="border-b">
                  <td className="p-2">{entry.date}</td>
                  <td className="p-2">{entry.description}</td>
                  <td className="p-2">{entry.debit}</td>
                  <td className="p-2">{entry.credit}</td>
                  <td className="p-2">{entry.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Invoices</h2>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              type="date"
              value={newInvoice.date}
              onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Customer"
              value={newInvoice.customer}
              onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newInvoice.amount}
              onChange={(e) => setNewInvoice({ ...newInvoice, amount: parseFloat(e.target.value) })}
              className="p-2 border rounded"
            />
            <button
              onClick={addInvoice}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Add Invoice
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Date</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td className="p-2">{invoice.date}</td>
                  <td className="p-2">{invoice.customer}</td>
                  <td className="p-2">{invoice.amount}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded ${
                        invoice.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;