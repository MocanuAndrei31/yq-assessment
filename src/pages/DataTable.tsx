import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Bug,
  Users,
} from "lucide-react";
import { fetchDashboardData } from "../services/api";
import type { DashboardData } from "../services/api";
import { FeedbackModal } from "../components/FeedbackModal";
import { useTheme } from "../hooks/useTheme";

interface TableRow {
  location: string;
  waitTime: number;
  utilization: number;
  staffCount: number;
  staff: string[];
}

export const DataTable: React.FC = () => {
  const { themeColor } = useTheme();
  const [data, setData] = useState<DashboardData | null>(null);
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [feedbackModal, setFeedbackModal] = useState<{ isOpen: boolean; type: 'feedback' | 'bug' }>({
    isOpen: false,
    type: 'feedback'
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);

        const rows: TableRow[] = dashboardData.sectionData.map((section) => ({
          location: section.locationName,
          waitTime: section.metrics.waitTimeSeconds,
          utilization: section.metrics.workForceUtilization.total,
          staffCount: section.metrics.workForceUtilization.persons.length,
          staff: section.metrics.workForceUtilization.persons.map(
            (p) => `${p.firstName} ${p.lastName}`
          ),
        }));

        setTableData(rows);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns: ColumnDef<TableRow>[] = [
    {
      accessorKey: "location",
      header: ({ column }) => (
        <button
          className="flex items-center justify-center gap-1 hover:text-gray-700 w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
    },
    {
      accessorKey: "waitTime",
      header: ({ column }) => (
        <button
          className="flex items-center justify-center gap-1 hover:text-gray-700 w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Wait Time (s)
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: ({ row }) => `${row.original.waitTime}s`,
    },
    {
      accessorKey: "utilization",
      header: ({ column }) => (
        <button
          className="flex items-center justify-center gap-1 hover:text-gray-700 w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Utilization
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${row.original.utilization}%` }}
            />
          </div>
          <span>{row.original.utilization}%</span>
        </div>
      ),
    },
    {
      accessorKey: "staffCount",
      header: ({ column }) => (
        <button
          className="flex items-center justify-center gap-1 hover:text-gray-700 w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Staff Count
          <ArrowUpDown className="w-4 h-4" />
        </button>
      ),
    },
    {
      accessorKey: "staff",
      header: () => <div className="text-center w-full">Staff Members</div>,
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          {row.original.staff.join(", ")}
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const gradientClasses = {
    blue: 'from-blue-600 to-purple-600',
    purple: 'from-purple-600 to-pink-600',
    pink: 'from-pink-600 to-orange-600',
    green: 'from-green-600 to-blue-600',
    orange: 'from-orange-600 to-red-600',
  };

  return (
    <div className="space-y-6">
      <div className={`bg-gradient-to-r ${gradientClasses[themeColor]} rounded-2xl p-6 md:p-8 text-white`}>
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Store Section Data</h1>
            <p className="text-white/80 text-sm md:text-base">Workforce data by location</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              onClick={() => setFeedbackModal({ isOpen: true, type: 'feedback' })}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Send Feedback</span>
              <span className="sm:hidden">Feedback</span>
            </button>
            <button 
              onClick={() => setFeedbackModal({ isOpen: true, type: 'bug' })}
              className="flex items-center justify-center gap-2 px-3 py-2 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg hover:bg-white/30 transition-all"
            >
              <Bug className="w-4 h-4" />
              <span className="hidden sm:inline">Report Bug</span>
              <span className="sm:hidden">Bug</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-3 text-lg">Active Users Summary</h3>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {data?.activeUsers
                .reduce((sum, item) => sum + item.value, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total active users over the period</div>
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        onClose={() => setFeedbackModal({ ...feedbackModal, isOpen: false })}
        type={feedbackModal.type}
      />
    </div>
  );
};
