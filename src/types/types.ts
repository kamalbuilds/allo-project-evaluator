export enum Slug {
  GOERLI = "goerli",
  OPTIMISM_GOERLI = "optimism-goerli",
  SEPOLIA = "sepolia",
  PGN_SEPOLIA = "pgn-sepolia",
  CELO_ALFAJORES = "celo-alfajores",
  ARBITRUM_SEPOLIA = "arbitrum-sepolia",
}

export enum OrderBy {
  BLOCK_TIMESTAMP_DESC,
}

export enum EPoolStatus {
  UPCOMING = "Upcoming",
  ACTIVE = "Active",
  ENDED = "Ended",
}

type ApplicationStatus = "Accepted" | "Rejected" | "Pending" | "Paid";

export type TApplicationMetadata = {
  name: string;
  website: string;
  description: string;
  email: string;
  base64Image: string;
};

export type TNewApplicationResponse = {
  blockTimestamp: string;
  isUsingRegistryAnchor: boolean;
  metadataPointer: string;
  recipientAddress: `0x${string}`;
  recipientId: `0x${string}`;
  requestedAmount: string;
  status: ApplicationStatus;
  metadata?: TApplicationMetadata;
  applicationBanner?: string;
};

export interface IContract {
  name: string;
  address: string;
}
export interface ICoreContracts {
  registryImplementation: IContract;
  registryProxy: IContract;
  alloImplementation: IContract;
  alloProxy: IContract;
}

export interface IStrategyContracts {
  donationVotingMerklePaout: IContract;
  directGrantsSimple: IContract;
}

export interface INetwork {
  [key: number]: TNetworkData;
}

export type TNetworkData = {
  id: string;
  slug: Slug;
  name: string;
  explorer: string;
  coreContracts: ICoreContracts;
  strategyContracts: IStrategyContracts;
  symbol: string;
  rpc?: string;
};

export type TTableData = {
  headers?: string[];
  rows: (string | React.JSX.Element | undefined)[][];
};

/** todo: table overrride type */
export type TOverride = {
  header: string | undefined | "";
  description: string | undefined | "";
  rowsPerPage: number;
  showPagination: boolean;
  className: string;
};

export type Metadata = {
  protocol: number;
  pointer: string;
};

export enum MetadataProtocol {
  "Undefined",
  "IPFS",
}

export interface IAlloTransactionLogResponse {
  alloTransactions: TAlloTransactionLog[];
}

export type TAlloTransactionLog = {
  hash: string;
  fromAddress: string;
  toAddress: string;
  functionName: string;
  functionArgs: TFunctionArgs[];
  status: string;
  blockHash: string;
  blockNumber: string;
  blockTimestamp: string;
  chainId: string;
};

export type TFunctionArgs = {
  name: string;
  type: string;
  value: string;
};
