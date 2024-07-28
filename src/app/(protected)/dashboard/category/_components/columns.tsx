"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/modal-provider";
import { AlertModal } from "@/components/global/alert-modal";
import { CategoryDataTable } from "@/types/category";
import { Switch } from "@/components/ui/switch";
import CustomModal from "@/components/global/custom-modal";
import {
  deleteCategory,
  getCategoryById,
} from "@/actions/dashboard/categories";
import CategoryDetails from "@/components/forms/category-details";
import { toast } from "sonner";

export const columns: ColumnDef<CategoryDataTable>[] = [
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
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <span>{row.getValue("slug")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Actif ?",
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
  rowData: CategoryDataTable;
}

const CellActions: React.FC<CellActionsProps> = ({ rowData }) => {
 
  const router = useRouter();
  const { data, setOpen: setOpenModal } = useModal();
  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
 
 

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (!rowData) return;

  const onDelete = (id: number) => {
    startTransition(() => {
      deleteCategory(id)
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
        title="Supprimer la catégories ?"
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
            className="flex gap-2"
            onClick={() => navigator.clipboard.writeText(rowData?.slug)}
          >
            <Copy size={15} /> Copy Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              setDropdownOpen(false);
              setOpenModal(
                <CustomModal
                  subheading="Modifier la catégorie"
                  title="Modifier la catégorie"
                >
                  <CategoryDetails />
                </CustomModal>,
                async () => {
                  return { category: await getCategoryById(rowData?.id) };
                }
              );
            }}
          >
            <Edit size={15} />
            Modifier
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex gap-2"
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
