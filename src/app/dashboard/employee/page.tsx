import BreadCrumb from "@/components/breadcrumb";
import { columns } from "@/components/tables/employee-tables/columns";
import { EmployeeTable } from "@/components/tables/employee-tables/employee-table";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Employee } from "../../../../constants/data";
import { cn } from "../../../../lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
    (country ? `&search=${country}` : ""),
  );
  const employeeRes = await res.json();
  console.log("employeeRes", employeeRes);
  const totalUsers = employeeRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const employee: Employee[] = employeeRes.users;
  console.log("employee", employee);


  const Distributeds = [
    {
      recipientId: '0xa834ca9c58df55d18659c2476fceb7c17d8de215',
      recipientAddress: '0x613fd64679b478e6445fd9debd37497453c5883d',
      amount: '10000000000000',
      sender: '0xf672cd5ee805b72804bee9a40ba7b8dc8f573596',
      contractName: 'MicroGrantsCommon',
      contractAddress: '0xa78df804731dd16a37d19ee6dd381655e563b021',
      transactionHash: '0x5dc529c253aee406f056542c9fcb499decb4fb8166133648a3495bcea5eea19f',
      blockNumber: '3372875',
      blockTimestamp: '2023-12-25T06:41:43+00:00',
      chainId: '421614'
    }
  ]




  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Employee (${totalUsers})`}
            description="Manage users for your business"
          />

          <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <EmployeeTable
          searchKey="country"
          pageNo={page}
          columns={columns}
          totalUsers={totalUsers}
          data={employee}
          pageCount={pageCount}
        />
      </div>
    </>
  );
}
