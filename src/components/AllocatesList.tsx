import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Address } from "./Address";

export function AllocatesList({
  allocated
}: any) {

  return (
    <div className="space-y-8">
      {allocated.map((allocates: any) => {
        console.log("Allocate", allocates);
        return (
          <div className="flex items-center" key={allocates.transactionHash}>

            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{allocates.contractName}</p>
              <p className="text-sm text-muted-foreground">
                <Address
                  address={allocates.sender}
                  chainId={Number(allocates.chainId)}
                />
              </p>
            </div>

            <div className="ml-4 space-y-1">
              {allocates.status == '1' && (
                <div className="bg-yellow-400 px-4 py-2 rounded-lg">Pending</div>
              )}
              {allocates.status == '2' && (
                <div className="bg-green-400 px-4 py-2 rounded-lg">Approved</div>
              )}
              {allocates.status == '3' && (
                <div className="bg-red-400 px-4 py-2 rounded-lg">Failed</div>
              )}
            </div>

          </div>
        )
      })}
    </div>
  );
}
