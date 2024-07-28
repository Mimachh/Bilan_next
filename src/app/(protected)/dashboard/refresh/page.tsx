import React from 'react'
import DataTable from './_components/data-table'
import { Plus } from 'lucide-react'
import { columns } from './_components/columns'
import { getRefreshesFromAdmin } from '@/actions/dashboard/refresh'
import RefreshDetails from '@/components/forms/refresh-details'

const Page = async () => {
    const refreshes = await getRefreshesFromAdmin(); 
  return (
    <div>
    <h2 className='font-bold text-2xl'>Refresh</h2>
    <DataTable
    actionButtonText={
      <>
        <Plus size={15} />
        Ajouter
      </>
    }
    modalChildren={<RefreshDetails />}
    filterValue="name"
    columns={columns}
    data={refreshes}
  ></DataTable>
  </div>
  )
}

export default Page