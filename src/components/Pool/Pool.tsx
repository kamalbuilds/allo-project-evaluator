"use client";

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

const Pool = ({
  data,
  header,
  description,
}: {
  data: TPoolDetail[];
  header?: string;
  description?: string;
}) => {

  const filterPool = (strategy: string) => {
    const filteredArray = data.filter(item => getStrategyTypeFromStrategyName(item.strategyName) === strategy);
    console.log("Filtered Array", filteredArray);
  }



  const tableData: TTableData = {
    headers: [
      "ID",
      "Address",
      "Token",
      "Amount",
      "Profile Name",
      "Profile Owner",
      "Updated At",
      "Network",
      "Strategy",
      "Strategy Name"
    ],
    rows: Object.values(data).map((pool: TPoolDetail) => {

      console.log("Pool", pool);

      return [
        // eslint-disable-next-line react/jsx-key
        <Link
          className="text-green-800 hover:bg-green-200 p-2 rounded-md"
          href={`/pool/${pool.chainId}/${pool.poolId}`}
        >
          {pool.poolId}
        </Link>,
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
        <div key={pool.poolId}>{pool.strategy}</div>,
        <div key={pool.poolId}>{getStrategyTypeFromStrategyName(pool.strategyName)}</div>
      ];
    }),
  };

  const isMobile = useMediaQuery(768);

  return (
    <>
      <div onClick={() => filterPool("Manual")}>Manual</div>
      <div onClick={() => filterPool("Governance")}>Governance</div>
      <div>Hats</div>


      <Table
        data={tableData}
        header={header}
        description={description}
        showPagination={true}
        rowsPerPage={isMobile ? 5 : 10}
      />
    </>
  );
};

export default Pool;
