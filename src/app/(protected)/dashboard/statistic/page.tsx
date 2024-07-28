import React from "react";
import DataTable from "./_components/data-table";
import { Plus } from "lucide-react";
import { columns } from "./_components/columns";
import { getStatsFromAdmin } from "@/actions/dashboard/stats";
import StatDetails from "@/components/forms/stat-details";

const Page = async () => {
    const stats = await getStatsFromAdmin()
  return (
    <div>
      <h2 className="font-bold text-2xl">Stats</h2>
      <DataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Ajouter
          </>
        }
        modalChildren={<StatDetails />}
        filterValue="name"
        columns={columns}
        data={stats}
      ></DataTable>
    </div>
  );
};

export default Page;
