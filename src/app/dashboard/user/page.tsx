import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { users } from "../../../../constants/data";

const breadcrumbItems = [{ title: "User", link: "/dashboard/user" }];
export default function page() {

  const Allocatees = [
    {
      recipientId: '0xa834ca9c58df55d18659c2476fceb7c17d8de215',
      sender: '0x4f4c70c011b065dc45a7a13cb72e645c6a50dde3',
      contractAddress: '0xa78df804731dd16a37d19ee6dd381655e563b021',
      contractName: 'MicroGrantsCommon',
      chainId: '421614',
      status: '2',
      blockTimestamp: '2023-12-24T14:43:43+00:00',
      transactionHash: '0x0738b22113793a8f8f2d3240b26e9e6933f328264ce45844f949d9b8da10752c'
    },
    {
      recipientId: '0xa834ca9c58df55d18659c2476fceb7c17d8de215',
      sender: '0xf672cd5ee805b72804bee9a40ba7b8dc8f573596',
      contractAddress: '0xa78df804731dd16a37d19ee6dd381655e563b021',
      contractName: 'MicroGrantsCommon',
      chainId: '421614',
      status: '2',
      blockTimestamp: '2023-12-25T06:41:43+00:00',
      transactionHash: '0x5dc529c253aee406f056542c9fcb499decb4fb8166133648a3495bcea5eea19f'
    },
    {
      recipientId: '0xa834ca9c58df55d18659c2476fceb7c17d8de215',
      sender: '0x54a8c3cafc55e19a1c7af46c571d0fbef3e830f5',
      contractAddress: '0xa78df804731dd16a37d19ee6dd381655e563b021',
      contractName: 'MicroGrantsCommon',
      chainId: '421614',
      status: '3',
      blockTimestamp: '2023-12-24T15:12:00+00:00',
      transactionHash: '0xac850b6b9f15ad33e166f3d45b6b9b857cf56363ab22f140336ad3f0ea65f097'
    },
    {
      recipientId: '0x0c147129fe90be7358b6221c6a15c66e569b69ee',
      sender: '0x4f4c70c011b065dc45a7a13cb72e645c6a50dde3',
      contractAddress: '0xa78df804731dd16a37d19ee6dd381655e563b021',
      contractName: 'MicroGrantsCommon',
      chainId: '421614',
      status: '3',
      blockTimestamp: '2023-12-25T08:27:01+00:00',
      transactionHash: '0xf75788bb3c4ed907fcfc46099df9119625018ba940b770c5ada3efcccc3a69e8'
    }
  ];


  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <UserClient data={users} Allocatees={Allocatees} />
      </div>
    </>
  );
}
