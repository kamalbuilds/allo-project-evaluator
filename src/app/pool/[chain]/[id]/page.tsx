import PoolDetailPage from "@/components/Pool/PoolDetail";
import { IPoolDetailResponse, TPoolDetail } from "@/components/Pool/types";
import PoolDashboard from "@/components/PoolDashboard";
import { TNewApplicationResponse } from "@/types/types";
import { getMicroGrants, getPoolDetailDataQuery, graphqlEndpoint } from "@/utils/query";
import { request } from "graphql-request";
import ErrorPage from "./errorPage";
import { getIPFSClient } from "@/utils/ipfs";

export default async function PoolDetail({
  params,
}: {
  params: { chain: string; id: string };
}) {
  const response: IPoolDetailResponse = await request(
    graphqlEndpoint,
    getPoolDetailDataQuery,
    {
      chainId: params.chain,
      poolId: params.id,
    }
  );

  const { pool }: { pool: TPoolDetail } = response;

  let poolMetadata = "{}";

  try {
    const response = await fetch(
      `https://gitcoin.mypinata.cloud/ipfs/${pool.metadataPointer}`,
    );

    // Check if the response status is OK (200)
    if (response.ok) {
      poolMetadata = await response.text();
    }
  } catch (error) {
    console.error(error);
  }

  const grantsDetails: any = await request(
    graphqlEndpoint,
    getMicroGrants,
    {
      poolId: params.id,
      chainId: params.chain,
    }
  );

  const Pool = grantsDetails?.microGrant;

  let applications: TNewApplicationResponse[] = [];

  for (let i = 0; i < Pool?.microGrantRecipients.length; i++) {
    const application = Pool?.microGrantRecipients[i];
    if (application.metadataPointer !== "") {
      try {

        const metadata = await getIPFSClient().fetchJson(
          application.metadataPointer,
        );
        application.metadata = metadata;
        if (metadata.base64Image) {
          const image = await getIPFSClient().fetchJson(metadata.base64Image);
          application.applicationBanner = image.data;
        }

        const response = await fetch(
          `https://gitcoin.mypinata.cloud/ipfs/${application.metadataPointer}`,
        );

        if (response.ok) {
          let metadata = await response.json();
          application.metadata = metadata;
        }
      } catch (error) {
        console.error("Error", error);
      }
    }

    applications.push(application);
  }

  return (
    <>
      {pool.strategyName ? <PoolDashboard pool={Pool} poolMetadata={poolMetadata} applications={applications} /> : <ErrorPage />}
    </>
  );
}
