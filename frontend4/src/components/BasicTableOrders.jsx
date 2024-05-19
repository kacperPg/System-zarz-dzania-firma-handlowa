import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './ItemsPage.css';

export default function BasicTableOrders({ data, columns, IdType,Navigate }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState('');
  let token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const handleRowClick = (rowId) => {
    if(Navigate===true){
    navigate(`/Order/${rowId}`);
    }
  };

  return (
    <div className='w3-container'>
      <label htmlFor="formSearch">Wyszukaj</label>
      <input
        id="formSearch"
        type='text'
        value={filtering}
        onChange={e => setFiltering(e.target.value)}
      />
      <table className='w3-table-all'>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: '🔼',
                        desc: '🔽'
                      }[header.column.getIsSorted() ?? null]}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => handleRowClick(row.original[IdType])} style={{ cursor: 'pointer' }}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button id="buttonItem" onClick={() => table.setPageIndex(0)}>Pierwsza Strona</button>
        <button id="buttonItem" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Poprzednia strona</button>
        <button id="buttonItem" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Następna strona</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)} id="buttonItem">Ostatnia Strona</button>
      </div>
    </div>
  );
}
