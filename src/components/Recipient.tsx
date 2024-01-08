import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Address, AddressResponsive } from "./Address";
import { Status, statusColors } from '@/utils/helpers';
import { ethers } from 'ethers';
import { getNetworks } from '@/utils/networks';
import { cn } from '../../lib/utils';
import { Metadata } from '@/types/types';

type IApplication = {
    recipientId: string;
    recipientAddress: string;
    requestedAmount: string;
    metadataPointer: string;
    blockTimestamp: string;
    isUsingRegistryAnchor: boolean;
    status: string;
    metadata: Metadata
}

type Props = {
    application: IApplication;
    pool: any;
}

const Recipient = ({ application, pool }: Props) => {

    const allocateds = pool.allocateds;
    const distributeds = pool.distributeds;

    console.log("Applications", application);
    console.log("Allocated", allocateds)
    console.log("distributeds", distributeds);
    console.log("Pool", pool);


    const allocatedsForThisReceipient = allocateds.filter(
        (allocated: any) =>
            allocated.recipientId === application.recipientId.toLowerCase(),
    );

    console.log("allocatedsForThisReceipient", allocatedsForThisReceipient)

    const approvals = allocatedsForThisReceipient.filter(
        (allocation: any) => allocation.status === Status.Accepted.toString(),
    );

    const rejections = allocatedsForThisReceipient.filter(
        (allocation: any) => allocation.status === Status.Rejected.toString(),
    );

    console.log("Approvals", approvals, rejections, statusColors[application.status as keyof typeof statusColors]);
    return (
        <div className="space-y-8">

            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Status</p>
                </div>
                {application.status === 'Pending' && <div className="hover:underline px-2 py-1 text-yellow-600 bg-yellow-50 ml-auto font-medium">{application.status}</div>}
                {application.status === 'Accepted' && <div className="hover:underline px-2 py-1 text-green-700 bg-green-50 ml-auto font-medium">{application.status}</div>}
                {application.status === 'Rejected' && <div className="hover:underline px-2 py-1 text-red-700 bg-red-50 ml-auto font-medium">{application.status}</div>}
            </div>


            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Application ID</p>
                </div>
                <div className="ml-auto font-medium">
                    <Address
                        address={application.recipientId}
                        chainId={Number(pool.chainId)}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Recipient Address</p>
                </div>
                <div className="ml-auto font-medium">
                    <Address
                        address={application.recipientAddress}
                        chainId={Number(pool.chainId)}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Amount</p>
                </div>
                <div className="ml-auto font-medium">
                    {ethers.formatUnits(
                        application.requestedAmount ?? 0,
                        pool.pool.tokenMetadata.decimals ?? 18,
                    )}{" "}
                    {pool.pool.tokenMetadata.symbol ??
                        getNetworks()[Number(pool.chainId)].symbol}
                </div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Approvals</p>
                </div>
                <div className="ml-auto font-medium">
                    {approvals.length}/{pool.approvalThreshold}
                </div>
            </div>
            <div className="flex items-center">
                <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Rejections</p>
                </div>
                <div className="ml-auto font-medium">
                    {rejections.length}
                </div>
            </div>
        </div>
    );
};

export default Recipient;