import React from 'react';
import Sidebar from './Sidebar';
import HomePage from './HomePage';
import { TPoolDetail } from '../Pool/types';
import request from 'graphql-request';
import { getMicroGrants, graphqlEndpoint } from '@/utils/query';

const PoolDashboard = ({
    pool,
    poolMetadata,
    applications
}: {
    pool: any;
    poolMetadata: string;
    applications: any
}) => {



    return (
        <div className="flex h-screen overflow-hidden">
            {/* <Sidebar className="w-1/6 hidden md:block" /> */}
            <HomePage pool={pool} poolMetadata={poolMetadata} applications={applications} />
        </div>
    );
};

export default PoolDashboard;