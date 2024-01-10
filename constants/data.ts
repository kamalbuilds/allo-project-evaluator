import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "../types";

export type User = {
  id: number;
  recipientId: string;
  sender: string;
  transactionHash: string;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    recipientId: "0xa834ca9c58df55d18659c2476fceb7c17d8de215",
    sender: "0x4f4c70c011b065dc45a7a13cb72e645c6a50dde3",
    transactionHash: "0x0738b22113793a8f8f2d3240b26e9e6933f328264ce45844f949d9b8da10752c",
    status: "2",
  },
  {
    id: 2,
    recipientId: "0xa834ca9c58df55d18659c2476fceb7c17d8de215",
    sender: "0x4f4c70c011b065dc45a7a13cb72e645c6a50dde3",
    transactionHash: "0x0738b22113793a8f8f2d3240b26e9e6933f328264ce45844f949d9b8da10752c",
    status: "2",
  },
  {
    id: 3,
    recipientId: "0xa834ca9c58df55d18659c2476fceb7c17d8de215",
    sender: "0x4f4c70c011b065dc45a7a13cb72e645c6a50dde3",
    transactionHash: "0x0738b22113793a8f8f2d3240b26e9e6933f328264ce45844f949d9b8da10752c",
    status: "2",
  },
  {
    id: 4,
    recipientId: "0xa834ca9c58df55d18659c2476fceb7c17d8de215",
    sender: "0x4f4c70c011b065dc45a7a13cb72e645c6a50dde3",
    transactionHash: "0x0738b22113793a8f8f2d3240b26e9e6933f328264ce45844f949d9b8da10752c",
    status: "2",
  },
  {
    id: 5,
    recipientId: "0xa834ca9c58df55d18659c2476fceb7c17d8de215",
    sender: "0x4f4c70c011b065dc45a7a13cb72e645c6a50dde3",
    transactionHash: "0x0738b22113793a8f8f2d3240b26e9e6933f328264ce45844f949d9b8da10752c",
    status: "2",
  },

];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/dashboard/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/dashboard/employee",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/dashboard/kanban",
    icon: "kanban",
    label: "kanban",
  }
];
