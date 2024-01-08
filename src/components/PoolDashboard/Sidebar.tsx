import React from 'react';
import { DashboardNav } from '../dashboard-nav';
import { navItems } from '../../../constants/data';
import { cn } from '../../../lib/utils';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

const Sidebar = ({ className }: SidebarProps) => {
    return (
        <div className={cn("py-16 border", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                        Overview
                    </h2>
                    <div className="space-y-1">
                        <DashboardNav items={navItems} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;