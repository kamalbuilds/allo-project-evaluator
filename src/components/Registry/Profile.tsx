"use client";

import Link from "next/link";
import { Address, truncatedString } from "../Address";
import Table from "../Table";
import { TTableData } from "../../types/types";
import { convertChainIdToNetworkName } from "@/utils/utils";
import { TProfileDetail } from "./types";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { profile } from "console";

const Profile = ({ data }: { data: TProfileDetail[] }) => {

  // console.log("Profile", data)

  const tableData: TTableData = {
    headers: ["ID", "Anchor", "Name", "Updated At", "Sender", "Network"],
    rows: Object.values(data).map((profile: TProfileDetail) => {
      return [
        // eslint-disable-next-line react/jsx-key
        <Link href={`/profile/${profile.chainId}/${profile.profileId}`}>
          <span className="text-green-800">
            {truncatedString(profile.profileId)}
          </span>
        </Link>,
        // eslint-disable-next-line react/jsx-key
        <Address address={profile.anchor} chainId={Number(profile.chainId)} />,
        profile.name,
        (new Date(profile.updatedAt)).toLocaleString(),
        // eslint-disable-next-line react/jsx-key
        <Address address={profile.creator} chainId={Number(profile.chainId)} />,
        convertChainIdToNetworkName(profile.chainId),
      ];
    }),
  };

  const isMobile = useMediaQuery(768);

  return (
    <Table
      data={tableData}
      header={"Profiles"}
      description={"A list of all the profiles in the registry on all supported networks"}
      showPagination={true}
      rowsPerPage={isMobile ? 5 : 10} activeState={undefined} filterPool={undefined} clearSelect={undefined} />
  );
};

export default Profile;
