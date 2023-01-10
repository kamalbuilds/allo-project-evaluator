"use client"
import React, { useEffect } from 'react';
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { AllocatesList } from "@/components/AllocatesList";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TPoolDetail } from '../Pool/types';
import { convertChainIdToNetworkName } from '@/utils/utils';
import { ethers } from 'ethers';
import { getNetworks } from '@/utils/networks';
import { Address, ShortProfileId } from '../Address';
import { getPoolStatus, getStrategyTypeFromStrategyName, statusColors } from '@/utils/helpers';
import Link from 'next/link';
import { EPoolStatus, TNewApplicationResponse } from '@/types/types';
import { cn } from '../../../lib/utils';
import Recipient from '../Recipient';
import DistrbuitedList from '../DistributedList';
import Allocatee from '../Allocatee';
import { IoIosWarning } from "react-icons/io";
import { MicroGrantsStrategy } from "@allo-team/allo-v2-sdk";
import { useState } from 'react';
import Banner from '../Banner';
import {  utils , Signer} from "ethers";
import {  ThirdwebSDK } from "@thirdweb-dev/sdk";

const HomePage = ({
    pool,
    poolMetadata,
    applications
}: {
    pool: any;
    poolMetadata: string;
    applications: TNewApplicationResponse[];
}) => {
    let metadataObj;
    try {
        metadataObj = JSON.parse(poolMetadata);
    } catch (error) {
        metadataObj = {
            error: "Error parsing metadata",
        };
    }

    const status: EPoolStatus = getPoolStatus(
        pool?.allocationStartTime,
        pool?.allocationEndTime,
    );


    return (
        <div className="flex-1 pt-16 overflow-x-hidden overflow-y-auto ">

            {pool && (
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            

                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Hi, Welcome to {" "}
                            <Link href={metadataObj?.website} target='_blank'>
                                <span className={cn(statusColors[status], "text-green-400 hover:underline")}>{metadataObj?.name}</span>
                            </Link>
                            {" "}Pool 👋
                        </h2>

                        <div className="hidden md:flex items-center space-x-2">
                            <CalendarDateRangePicker allocationStartTime={pool?.allocationStartTime} allocationEndTime={pool?.allocationEndTime} />
                        </div>
                    </div>

                    <div>
                        <p>{metadataObj?.description}</p>
                    </div>

                    {status === 'Ended' && <div className='text-md flex flex-row items-center gap-2 font-normal text-red-500'>
                        <IoIosWarning color={"rgb(216 15 15)"} />
                        <div> This Pool has Ended and the Rewards have been distributed</div>
                    </div>}
                    
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics" disabled>
                                {convertChainIdToNetworkName(Number(pool.chainId))}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Amount
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {ethers.utils.formatUnits(
                                                pool.pool.amount ?? 0,
                                                pool.pool?.tokenMetadata.decimals ?? 18,
                                            )}{" "}
                                            {pool.pool.tokenMetadata.symbol ??
                                                getNetworks()[Number(pool.chainId)].symbol}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Strategy
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {getStrategyTypeFromStrategyName(pool.pool?.strategyName)}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            <Address
                                                address={pool.pool.strategy}
                                                chainId={Number(pool.chainId)}
                                            />
                                        </p>
                                    </CardContent>
                                </Card>

                                <Link href={`/profile/${pool?.chainId}/${pool.pool.profile?.profileId}`}>
                                    <Card className='hover:shadow-xl'>
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                            <CardTitle className="text-sm font-medium">Profile</CardTitle>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                className="h-4 w-4 text-muted-foreground"
                                            >
                                                <rect width="20" height="14" x="2" y="5" rx="2" />
                                                <path d="M2 10h20" />
                                            </svg>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {pool.pool.profile?.name}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                <ShortProfileId profileId={pool.pool.profile?.profileId} />
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>


                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Threshold Approvals
                                        </CardTitle>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            className="h-4 w-4 text-muted-foreground"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{pool.approvalThreshold}</div>

                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className='text-2xl pt-8 font-bold tracking-tight'>Applications </div>
                    <button className='text-sm text-gray-500 hover:underline'>Apply </button>                                
                    {applications.length == 0 && <div>No receipients by the Pool</div>}

                    <div className='flex gap-4 overflow-scroll pb-8 pt-4'>
                        {applications?.map((application: TNewApplicationResponse) => {
                            return (
                                <>
                                    {application.metadata && (
                                        <div className='flex flex-1 min-w-[350px] pb-4 rounded-lg flex-col border border-whitesmoke' key={application.blockTimestamp}>
                                            <div className="flex items-center gap-x-4 rounded-lg border-b border-gray-900/5 bg-gray-50">
                                                <Banner
                                                    image={application.applicationBanner}
                                                    alt={application.metadata!.name}
                                                />
                                            </div>

                                            <div className='ml-4 h-[100px] flex flex-col gap-2'>
                                                <div className='text-[24px]'> {application.metadata.name}</div>
                                                <div>{application.metadata.description.slice(0, 100)}...</div>
                                            </div>
                                            <Recipient application={application} pool={pool} />
                                        </div>
                                    )}
                                </>
                            )
                        })}
                    </div>


                    <div className='flex gap-4 overflow-scroll pb-8 pt-4'>

                        <div className='flex flex-1 min-w-[350px]  py-4 rounded-lg flex-col border border-whitesmoke' >
                            <div className='ml-4 h-[100px] flex flex-col gap-2'>
                                <div className='text-2xl font-bold'>Allocatees </div>
                                <div>{pool.allocateds.length} allocatees have casted vote</div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                {pool?.allocateds.map((allocatee: { transactionHash: any; }) => {
                                    return (
                                        <Allocatee key={allocatee?.transactionHash} allocatee={allocatee} applications={applications} />
                                    )
                                })}
                            </div>
                        </div>

                        <div className='flex flex-1 min-w-[350px]  py-4 rounded-lg flex-col border border-whitesmoke' >
                            <div className='ml-4 h-[100px] flex flex-col gap-2'>
                                <div className='text-2xl font-bold'>Grants Distributed </div>
                                <div> You have {pool.distributeds.length} receipients who got grants</div>
                            </div>
                            <div className='flex flex-col gap-8'>
                                {pool?.distributeds.map((distributee: any, index: React.Key | null | undefined) => {
                                    return (
                                        <div key={index} className='border-y-2 px-4 flex flex-col gap-4'>
                                            <DistrbuitedList distributee={distributee} applications={applications} pool={pool} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>



                    </div>


                </div>
            )}
        </div>
    );
};

export default HomePage;