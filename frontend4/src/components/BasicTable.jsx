import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from '@tanstack/react-table'
  import { useState } from 'react';
  import axios from '../api/axios';
  import EditProduct from './EditProduct';

  let token = sessionStorage.getItem('token');

  export default function BasicTable({ data, columns, URL, IdType }) {
      const [sorting, setSorting] = useState([]);
      const [filtering, setFiltering] = useState('');
      const [editProductId, setEditProductId] = useState(null); // State to hold the ID of the product being edited
  
      const handleEdit = (Id) => {
        setEditProductId(Id); // Set the ID of the product being edited
      }
  
      const handleDelete = (Id) => {
          const confirmDelete = window.confirm("Jesteś pewien że chcesz usunąć rekord ?");
  
          if (confirmDelete) {
              axios.delete(`${URL}/${Id}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              })
              .then(response => {
                  if (response.status === 204) {
                      // Delete was successful, refresh the window
                      console.log(Id, "deleted successfully");
                      window.location.reload();
                  } else {
                      console.error("Failed to delete :", Id);
                  }
              })
              .catch(error => {
                  console.error("Error deleting:", error);
              });
          }
      }
  
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
      })
  
      return (
          <div className='w3-container'>
              Wyszukaj <input id="formSearch" type='text' value={filtering} onChange={e => setFiltering(e.target.value)} />
              <table className='w3-table-all'>
                  <thead>
                      {table.getHeaderGroups().map(headerGroup => (
                          <tr key={headerGroup.id}>
                              {headerGroup.headers.map(header => (
                                  <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
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
                              <th>Edit</th>
                              <th>Delete</th>
                          </tr>
                      ))}
                  </thead>
  
                  <tbody>
                      {table.getRowModel().rows.map(row => (
                          <tr key={row.id}>
                              {row.getVisibleCells().map(cell => (
                                  <td key={cell.id}>
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                              ))}
                              <td>
                              <button onClick={() => handleEdit(row.original[IdType])}>Edit</button>
                              </td>
                              <td>
                                  <button onClick={() => handleDelete(row.original[IdType])}>Delete</button>
                              </td>
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
              {/* Render EditProduct modal if editProductId is not null */}
              {IdType === 'productId' && editProductId && <EditProduct Id={editProductId} handleClose={() => setEditProductId(null)} />}

          </div>
      );
  }