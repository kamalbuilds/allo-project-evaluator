"use client";
import { useState } from "react";
import Table from "../Table";
import { TTableData } from "../../types/types";
import { Address } from "../Address";
import {
  convertChainIdToNetworkName,
  formatAmount,
  truncatePoolName,
} from "@/utils/utils";
import Link from "next/link";
import { TPoolDetail } from "./types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getStrategyTypeFromStrategyName } from "@/utils/helpers";

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Pool = ({
  data,
  header,
  description,
}: {
  data: TPoolDetail[];
  header?: string;
  description?: string;
}) => {

  const [filteredPool, setFilteredPool] = useState(data);

  const tableData: TTableData = {
    headers: [
      "ID",
      "Strategy Name",
      "Strategy",
      "Token",
      "Amount",
      "Profile Name",
      "Profile Owner",
      "Updated At",
      "Network",

    ],
    rows: Object.values(filteredPool).map((pool: TPoolDetail) => {

      console.log("Pool", pool);

      return [
        // eslint-disable-next-line react/jsx-key
        <Link
          className="text-green-800 hover:bg-green-200 p-2 rounded-md"
          href={`/pool/${pool.chainId}/${pool.poolId}`}
        >
          {pool.poolId}
        </Link>,
        <div key={pool.poolId}>{getStrategyTypeFromStrategyName(pool.strategyName)}</div>,
        // {getStrategyTypeFromStrategyName(pool.pool.strategyName)}

        ,
        // eslint-disable-next-line react/jsx-key
        <Address address={pool.strategy} chainId={Number(pool.chainId)} />,
        // eslint-disable-next-line react/jsx-key
        <Address address={pool.token} chainId={Number(pool.chainId)} />,
        formatAmount(pool.amount, pool.tokenMetadata?.decimals ?? 18),
        truncatePoolName(pool.profile?.name ?? ""),
        // eslint-disable-next-line react/jsx-key
        <Address address={pool.profile?.owner ?? ""} chainId={Number(pool.chainId)} />,
        (new Date(pool.updatedAt)).toLocaleString(),
        convertChainIdToNetworkName(Number(pool.chainId)),


      ];
    }),
  };

  const isMobile = useMediaQuery(768);
  const [activeState, setActiveState] = useState('Select');

  const filterPool = (strategy: string) => {
    setActiveState(strategy)
    const filteredArray = data.filter(item => getStrategyTypeFromStrategyName(item.strategyName) == strategy
    );
    setFilteredPool(filteredArray);
  }

  const clearSelect = () => {
    setActiveState('Select');
    setFilteredPool(data);
  }

  return (
    <>
      <Table
        data={tableData}
        header={header}
        description={description}
        showPagination={true}
        rowsPerPage={isMobile ? 5 : 10}
        activeState={activeState}
        filterPool={filterPool}
        clearSelect={clearSelect}
      />
    </>
  );
};

export default Pool;
