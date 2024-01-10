import React from 'react';
import { Address, Hash } from './Address';
import { ethers } from 'ethers';
import { getNetworks } from '@/utils/networks';

const DistrbuitedList = ({
    distributee,
    applications,
    pool
}: any) => {

    const applicant = applications.filter((application: any) =>
        application.recipientId === distributee.recipientId.toLowerCase()
    )

    const applicantWon = applicant[0];
    return (
        <div className=''>
            <div className='text-xl'>
                🎉 {" "} {applicantWon.metadata ? applicantWon.metadata.name : (
                    <Address
                        address={distributee.recipientAddress}
                        chainId={Number(distributee.chainId)}
                    />
                )}{" "}🎉
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <div className='flex flex-row justify-between'>
                    <div className='text-md text-gray-500'>Amount Received</div>
                    <div className='text-md text-gray-500'>
                        {ethers.utils.formatUnits(
                            distributee.amount ?? 0,
                            pool.pool.tokenMetadata.decimals ?? 18,
                        )}{" "}
                        {pool.pool.tokenMetadata.symbol ??
                            getNetworks()[Number(pool.chainId)].symbol}
                    </div>

                </div>

                <div className='flex flex-row justify-between'>
                    <div className='text-md text-gray-500'>Sender</div>
                    <div className='text-md text-gray-500'>
                        <Address
                            address={distributee.sender}
                            chainId={Number(distributee.chainId)}
                        />
                    </div>
                </div>

                <div className='flex flex-row justify-between'>
                    <div className='text-md text-gray-500'>Transaction hash</div>
                    <div className='text-md text-gray-500'>
                        <Hash
                            hash={distributee.transactionHash}
                            chainId={Number(distributee.chainId)}
                        />
                    </div>
                </div>
            </div>



        </div>
    );
};

export default DistrbuitedList;