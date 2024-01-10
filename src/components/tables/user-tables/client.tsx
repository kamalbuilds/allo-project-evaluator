"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { User } from "../../../../constants/data";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

interface ProductsClientProps {
  data: User[];
  Allocatees: any;
}

export const UserClient: React.FC<ProductsClientProps> = ({ data, Allocatees }) => {
  const params = useParams();
  const router = useRouter();



  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Allocatees (${data.length})`}
          description="Users that have been allocated in the pool"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
