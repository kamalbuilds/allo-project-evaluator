import ProfileDetail from "@/components/Registry/ProfileDetail";
import {
  IProfileDetailResponse,
  TProfileDetail,
} from "@/components/Registry/types";
import { getProfileDetailDataQuery, graphqlEndpoint, getMicroGrants } from "@/utils/query";
import request from "graphql-request";

export default async function ProfileDetailPage({
  params,
}: {
  params: { id: string; chain: number };
}) {
  const profileDetails: IProfileDetailResponse = await request(
    graphqlEndpoint,
    getProfileDetailDataQuery,
    {
      chainId: params.chain,
      profileId: params.id,
    }
  );



  const profile: TProfileDetail = profileDetails.profile;

  const response = await fetch(
    `https://gitcoin.mypinata.cloud/ipfs/${profile?.metadataPointer}`,
  );

  let metadata = "";

  if (response.ok) metadata = await response.text();

  return (
    <>
      <ProfileDetail profile={profile} metadata={metadata} />
      {/* <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Grants</h1>
          <div className="flex flex-col items-center justify-center">
            {grantsDetails?.microGrant.poolId}
            {grantsDetails?.microGrant.chainId}
          </div>
        </div>
    </div> */}
    </>
  );
}
