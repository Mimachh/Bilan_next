"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Edit, FileText, MoreHorizontal, Trash } from "lucide-react";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/modal-provider";
import { AlertModal } from "@/components/global/alert-modal";
import CustomModal from "@/components/global/custom-modal";

import { toast } from "sonner";
import { deleteRefresh } from "@/actions/dashboard/refresh";
import { StatisticDataTable } from "@/types/statistic";
import StatDetails from "@/components/forms/stat-details";
import { deleteStat, getStatById } from "@/actions/dashboard/stats";
import { Switch } from "@/components/ui/switch";
import SourceDetails from "@/components/forms/source-details";


export const columns: ColumnDef<StatisticDataTable>[] = [
  {
    accessorKey: "id",
    header: "",
    cell: () => {
      return null;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span>{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "categorie",
    header: "Catégorie",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span>{row.original.category.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status ",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Switch checked={row.getValue("isActive")} />
        </div>
      );
    },
  },
  {
    accessorKey: "isFeatured",
    header: "Mis en avant ?",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <Switch checked={row.getValue("isFeatured")} />
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;

      return <CellActions rowData={rowData} />;
    },
  },
];

interface CellActionsProps {
  rowData: StatisticDataTable;
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
  if (!rowData) return;
  const router = useRouter();

  const { data, setOpen: setOpenModal } = useModal();
  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");


  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const onDelete = (id: string) => {
    startTransition(() => {
      deleteStat(id)
        .then((d) => {
          if (d?.error) {
            setError(d.error);
            toast.error("Something went wrong");
          }

          if (d?.success) {
            router.refresh();
            toast.success("Category deleted successfully");
            setOpen(false);
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
          setError("Something went wrong");
        });
    });
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onDelete(rowData?.id);
        }}
        loading={loading}
        title="Supprimer le compteur ?"
        description="Cette action est irréversible."
      />

      <DropdownMenu onOpenChange={setDropdownOpen} open={dropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              setOpenModal(
                <CustomModal
                  subheading="Modifier le compteur"
                  title="Modifier le compteur"
                >
                  <StatDetails />
                </CustomModal>,
                async () => {
                  return { stat: await getStatById(rowData?.id) };
                }
              );
            }}
          >
            <Edit size={15} />
            Modifier
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              setOpenModal(
                <CustomModal
                  subheading="Ajouter ou modifier les sources de ce compteur."
                  title="Sources"
                >
                  <SourceDetails />
                </CustomModal>,
                async () => {
                  return { stat: await getStatById(rowData?.id) };
                }
              );
            }}
          >
            <FileText size={15} />
            Sources
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex gap-2 cursor-pointer"
            onClick={() => {
              setDropdownOpen(false);
              setOpen(true);
            }}
          >
            <Trash size={15} /> Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
