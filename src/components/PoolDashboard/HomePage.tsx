"use client"
import React from 'react';
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Overview } from "@/components/overview";
import { RecentSales } from "@/components/recent-sales";
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
import { EPoolStatus } from '@/types/types';
import { cn } from '../../../lib/utils';
import Recipient from '../Recipient';

const HomePage = ({
    pool,
    poolMetadata,
    applications
}: {
    pool: any;
    poolMetadata: string;
    applications: any;
}) => {
    let metadataObj;
    try {
        metadataObj = JSON.parse(poolMetadata);
    } catch (error) {
        metadataObj = {
            error: "Error parsing metadata",
        };
    }

    console.log("metadataObj", metadataObj)
    console.log("POOL fetched", pool);
    console.log("Applications >>>>>>>", applications);

    const status: EPoolStatus = getPoolStatus(
        pool.allocationStartTime,
        pool.allocationEndTime,
    );
    console.log("Status", status)

    const allocateds = pool.allocateds;
    const distributeds = pool.distributeds;


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
                            <CalendarDateRangePicker allocationStartTime={pool.allocationStartTime} allocationEndTime={pool.allocationEndTime} />
                        </div>
                    </div>
                    <div>
                        <p>{metadataObj?.description}</p>
                    </div>
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
                                            {ethers.formatUnits(
                                                pool.pool.amount ?? 0,
                                                pool.pool.tokenMetadata.decimals ?? 18,
                                            )}{" "}
                                            {pool.pool.tokenMetadata.symbol ??
                                                getNetworks()[Number(pool.chainId)].symbol}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% from last month
                                        </p>
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
                                            {getStrategyTypeFromStrategyName(pool.pool.strategyName)}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            <Address
                                                address={pool.pool.strategy}
                                                chainId={Number(pool.chainId)}
                                            />
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
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
                                            {pool.pool.profile.name}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            <ShortProfileId profileId={pool.pool.profile.profileId} />
                                        </p>
                                    </CardContent>
                                </Card>
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
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                        {applications.map((application: any) => {
                            console.log("Application", application)
                            return (
                                <Card className="col-span-4 md:col-span-3" key={application.blockTimestamp}>
                                    <CardHeader>
                                        <CardTitle>
                                            {application.metadata.name}
                                        </CardTitle>
                                        <CardDescription className=' min-h-[75px]'>
                                            {application.metadata.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Recipient application={application} pool={pool} />
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4 md:col-span-3">
                            <CardHeader>
                                <CardTitle>Allocatees</CardTitle>
                                <CardDescription>
                                    You have {pool.allocateds.length} allocatees
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RecentSales allocated={pool.allocateds} />
                            </CardContent>
                        </Card>
                        <Card className="col-span-4 md:col-span-3">
                            <CardHeader>
                                <CardTitle>Distributees</CardTitle>
                                <CardDescription>
                                    You have {pool.distributeds.length} distributees
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* <RecentSales /> */}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;