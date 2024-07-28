import React from 'react'
import DataTable from './_components/data-table'
import { Plus } from 'lucide-react'
import { columns } from './_components/columns'
import { getCategoriesFromAdmin } from '@/actions/dashboard/categories'
import CategoryDetails from '@/components/forms/category-details'

const Page = async () => {
  const categories = await getCategoriesFromAdmin()
  return (
    <div>
      <h2 className='font-bold text-2xl'>Catégories</h2>
      <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<CategoryDetails />}
      filterValue="name"
      columns={columns}
      data={categories}
    ></DataTable>
    </div>
  )
}

export default Page