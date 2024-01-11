import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Address, AddressResponsive } from "./Address";
import { Status, statusColors } from '@/utils/helpers';
import { ethers } from 'ethers';
import { getNetworks } from '@/utils/networks';
import { cn } from '../../lib/utils';
import { Metadata, TNewApplicationResponse } from '@/types/types';
import Banner from './Banner';
import { Web3Button } from '@thirdweb-dev/react';

type Props = {
    application: TNewApplicationResponse;
    pool: any;
}

const Recipient = ({ application, pool }: Props) => {

    const alertnotallocate =() => {
        alert("You are not an allocate of this pool ❌")
    }

    const allocateds = pool.allocateds;
    const distributeds = pool.distributeds;

    const allocatedsForThisReceipient = allocateds.filter(
        (allocated: any) =>
            allocated.recipientId === application.recipientId.toLowerCase(),
    );

    const approvals = allocatedsForThisReceipient.filter(
        (allocation: any) => allocation.status === Status.Accepted.toString(),
    );

    const rejections = allocatedsForThisReceipient.filter(
        (allocation: any) => allocation.status === Status.Rejected.toString(),
    );

    return (
        <div className="space-y-8">



            <div className="flex items-center mx-4">
                <div className=" space-y-1">
                    <p className="text-sm font-medium leading-none">Status</p>
                </div>
                {application.status === 'Pending' && <div className="hover:underline px-2 py-1 text-yellow-600 bg-yellow-50 ml-auto font-medium">{application.status}</div>}
                {application.status === 'Accepted' && <div className="hover:underline px-2 py-1 text-green-700 bg-green-50 ml-auto font-medium">{application.status}</div>}
                {application.status === 'Rejected' && <div className="hover:underline px-2 py-1 text-red-700 bg-red-50 ml-auto font-medium">{application.status}</div>}
            </div>




            <div className='mx-4 flex gap-4 flex-col'>
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
                        {application?.recipientAddress && <Address
                            address={application.recipientAddress}
                            chainId={Number(pool.chainId)}
                        />}
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Amount</p>
                    </div>
                    <div className="ml-auto font-medium">
                        {ethers.utils.formatUnits(
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

                <button className="w-full hover:bg-green-400 p-4 text-orange-600" onClick={() => alertnotallocate()}>Allocate</button>
            </div>
        </div>
    );
};

export default Recipient;