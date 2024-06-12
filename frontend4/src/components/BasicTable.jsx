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
import EditProduct from './ItemsPage/EditProduct';
import EditWareHouse from './WarehousePage/EditWareHouse';
import EditWarehousesStatus from './WarehouseStatePage/EditWarehousesStatus';
import EditUser from './UserPage/EditUser';
import EditClient from './ClientPage/EditClient';
import EditType from './TypePage/EditType';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute component

export default function BasicTable({ data, columns, URL, IdType, canDelete }) {
    const [sorting, setSorting] = useState([{ id: IdType, desc: false }]);
    const [filtering, setFiltering] = useState('');
    const [editItemId, setEditItemId] = useState(null);
    let token = sessionStorage.getItem('token');

    const handleEdit = (Id) => {
        setEditItemId(Id);
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

                        console.log(Id, "deleted successfully");
                        window.location.reload();
                    } else {
                        console.error("Failed to delete:", Id);
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
                            <th>Edytuj</th>
                            <PrivateRoute requiredPermissions={[canDelete]}>
                            <th>Usuń</th>
                            </PrivateRoute>
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
                                <button id="buttonItem" onClick={() => handleEdit(row.original[IdType])}>Edytuj</button>
                            </td>
                            <PrivateRoute requiredPermissions={[canDelete]}>
                            <td>
                                               <button id="buttonItem" onClick={() => handleDelete(row.original[IdType])}>Usuń</button>
                                               </td>
                                               </PrivateRoute>
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
            {IdType === 'productId' && editItemId && <PrivateRoute requiredPermissions={['PERM_EDIT_PRODUCTS']}>
                <EditProduct Id={editItemId} handleClose={() => setEditItemId(null)} />
            </PrivateRoute>}
            {IdType === 'warehouseId' && editItemId && <PrivateRoute requiredPermissions={['PERM_EDIT_WAREHOUSES']}>
                <EditWareHouse Id={editItemId} handleClose={() => setEditItemId(null)} />   </PrivateRoute>}
            {IdType === 'warehouseStatusId' && editItemId && <PrivateRoute requiredPermissions={['PERM_EDIT_STATUS']}>
                <EditWarehousesStatus Id={editItemId} handleClose={() => setEditItemId(null)} /> </PrivateRoute>}
            {IdType === 'id' && editItemId && <PrivateRoute requiredPermissions={['PERM_EDIT_USERS']}>
                <EditUser Id={editItemId} handleClose={() => setEditItemId(null)} /> </PrivateRoute>}
            {IdType === 'clientId' && editItemId && <PrivateRoute requiredPermissions={['PERM_EDIT_CLIENTS']}>
                <EditClient Id={editItemId} handleClose={() => setEditItemId(null)} /> </PrivateRoute>}
            {IdType === 'typeId' && editItemId && <PrivateRoute requiredPermissions={['PERM_EDIT_TYPES']}>
                <EditType Id={editItemId} handleClose={() => setEditItemId(null)} /> </PrivateRoute>}
        </div>
    );
}
