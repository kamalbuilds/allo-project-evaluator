import React from 'react';
import { Address } from './Address';

const Allocatee = ({
    allocatee,
    applications
}: any) => {

    const receipientbyAllocatee = applications.filter(
        (application: any) =>
            application.recipientId === allocatee.recipientId.toLowerCase(),
    );


    return (
        <div className="flex items-center justify-between px-4" key={allocatee.transactionHash}>

            <div className="ml-4 space-y-1">
                <p className="text-lg text-muted-foreground">
                    <Address
                        address={allocatee.sender}
                        chainId={Number(allocatee.chainId)}
                    />
                </p>
            </div>

            <div className="ml-4 space-y-1">
                {allocatee.status == '1' && (
                    <div className="bg-yellow-400 px-4 py-2 rounded-lg">Pending</div>
                )}
                {allocatee.status == '2' && (
                    <div className="bg-green-400 px-4 py-2 rounded-lg">Approved</div>
                )}
                {allocatee.status == '3' && (
                    <div className="bg-red-400 px-4 py-2 rounded-lg">Rejected</div>
                )}
            </div>

            {receipientbyAllocatee.map((item: any, index: number) => {
                return (
                    <div key={index} className='text-xl'>

                        {item.metadata?.name ? (
                            <>{item.metadata.name}</>
                        ) : (
                            item?.receipientAddress ? <Address
                                address={item.recipientAddress}
                                chainId={Number(allocatee.chainId)}
                            /> : <>Winner</>
                        )}
                    </div>
                )
            })}

        </div>
    );
};

export default Allocatee;