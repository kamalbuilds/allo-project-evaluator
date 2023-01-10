"use client";

import { convertChainIdToNetworkName } from "@/utils/utils";
import { Address, AddressResponsive, truncatedString } from "../Address";
import { TProfileDetail } from "./types";
import Pool from "../Pool/Pool";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { RxAvatar } from "react-icons/rx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getNetworks } from "@/utils/networks";
import { MdDateRange } from "react-icons/md";
import { FaChessKing } from "react-icons/fa";
import { FaAnchor } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";




const ProfileDetail = ({
  profile,
  metadata,
}: {
  profile: TProfileDetail;
  metadata: string;
}) => {
  let metadataObj;
  try {
    metadataObj = JSON.parse(metadata ?? "");
  } catch (error) {
    metadataObj = {
      error: "Error parsing metadata",
    };
  }
  const isMobile = useMediaQuery(768);
  const py = isMobile ? "py-2" : "py-6";

  return (
    <div className="pb-10">

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">

        <div className="flex flex-col justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            {profile?.name}
          </h2>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500 font-mono">
            {isMobile ? truncatedString(profile?.profileId) : profile?.profileId}
          </p>

        </div>

        <div className="text-xl flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <RxAvatar />
            <div className="text-gray-400">{profile?.name}</div>
          </div>
          {metadataObj.description && <div className="flex flex-row items-center gap-2">
            <MdOutlineDescription />
            <div className="text-gray-400">{metadataObj.description}</div>
          </div>}
          {metadataObj.website && <div className="flex flex-row items-center gap-2">
            <FaGlobe />
            <div className="text-gray-400">{metadataObj.website}</div>
          </div>}
          {metadataObj.email && <div className="flex flex-row items-center gap-2">
            <MdEmail />
            <div className="text-gray-400">{metadataObj.email}</div>
          </div>}
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              {convertChainIdToNetworkName(profile.chainId)}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Anchor
                  </CardTitle>
                  <FaAnchor />
                </CardHeader>
                <CardContent>
                  <div className="text-md font-bold">
                    {profile?.anchor && <Address address={profile?.anchor}
                      chainId={Number(profile.chainId)} />}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Creator
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
                  <div className="text-md font-bold">
                    {profile?.creator && <Address address={profile?.creator}
                      chainId={Number(profile.chainId)} />}
                  </div>
                </CardContent>
              </Card>

              {/* <Link href={`/profile/${pool?.chainId}/${pool.pool.profile?.profileId}`}> */}
              <Card className='hover:shadow-xl'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Owner</CardTitle>
                  <FaChessKing />
                </CardHeader>
                <CardContent>
                  <div className="text-md font-bold">
                    <Address address={profile?.owner}
                      chainId={Number(profile.chainId)} />
                  </div>
                </CardContent>
              </Card>
              {/* </Link> */}


              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Created At
                  </CardTitle>
                  <MdDateRange />
                </CardHeader>
                <CardContent>
                  <div className="text-md font-bold">
                    {new Date(profile.createdAt).toDateString()}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

      </div>

      <div>
        <div className="text-3xl font-bold tracking-tight"> Pools </div>
        <div>There are {profile.pools.length} pools created by this profile</div>
        <div>

          {profile.pools.length > 0 && (
            <>
              <Pool data={profile.pools} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
