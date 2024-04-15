import { DateTime } from 'luxon'
import { useMemo } from 'react'
import movies from './MOVIE_DATA.json'
import mock from './MOCK_DATA.json'
import BasicTable from './BasicTable'
import { NavBarBoodstrap } from './Navbar/navbarBS'
import './ItemsPage.css';
function ItemsPage() {
  const data = useMemo(() => mock, [])

  /** @type import('@tanstack/react-table').ColumnDef<any> */

  const productColumn = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Kod Produktu',
      accessorKey: 'Item_Code',
    },
    {
      header: 'Nazwa Produktu',
      accessorKey: 'Item_Name',
    },
    {
      header: 'Typ',
      accessorKey: 'Type',
    },
    {
      header: 'Cena',
      accessorKey: 'Price',
    },
    {
      header: 'Data dodania',
      accessorKey: 'Adding_date',
    },
  ]

  return (
    <>
    <div class="wrapper">
         <NavBarBoodstrap />    
         <section></section>
         <section id="idTabelaProduktow">
            <BasicTable data={data} columns={productColumn} />
            </section>
        </div>
    </>
  )
}

export default ItemsPage