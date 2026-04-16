import { Crown, Eye, Plus, RefreshCcw, Users } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const clubs = [
  {
    id: "CLUB-1",
    name: "Fiction Fanatics",
    members: 2450,
    currentBook: "The Midnight Library",
    nextMeeting: "May 25, 2026",
    status: "Active",
  },
  {
    id: "CLUB-2",
    name: "Sci-Fi Explorers",
    members: 1890,
    currentBook: "Project Hail Mary",
    nextMeeting: "May 28, 2026",
    status: "Active",
  },
  {
    id: "CLUB-3",
    name: "Business Minds",
    members: 3200,
    currentBook: "Psychology of Money",
    nextMeeting: "May 22, 2026",
    status: "Active",
  },
  {
    id: "CLUB-4",
    name: "Mystery Solvers",
    members: 1567,
    currentBook: "The Silent Patient",
    nextMeeting: "May 30, 2026",
    status: "Inactive",
  },
];

function clubStatusBadgeClass(status: string) {
  switch (status) {
    case "Active":
      return "bg-[#800000]/10 text-[#800000] border-[#800000]/20";
    case "Inactive":
      return "bg-gray-100 text-gray-500 border-gray-200";
    default:
      return "bg-gray-100 text-gray-500";
  }
}

export default function AdminCirclePage() {
  return (
    <AdminShell>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#800000]/10 flex items-center justify-center shadow-sm">
            <Crown className="w-5 h-5 text-[#800000]" />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Circle Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage reading clubs, members, and schedules.
            </p>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-6">

          {/* Table Card */}
          <Card className="shadow-sm border rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                Club Directory
              </CardTitle>
              <p className="text-sm text-gray-500">
                Total {clubs.length} active records
              </p>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Club ID</TableHead>
                      <TableHead>Club Name</TableHead>
                      <TableHead className="text-right">Members</TableHead>
                      <TableHead>Current Book</TableHead>
                      <TableHead>Next Meeting</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {clubs.map((c) => (
                      <TableRow
                        key={c.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <TableCell className="font-mono text-xs text-gray-500">
                          {c.id}
                        </TableCell>

                        <TableCell className="font-medium text-gray-900">
                          {c.name}
                        </TableCell>

                        <TableCell className="text-right font-semibold">
                          {c.members.toLocaleString()}
                        </TableCell>

                        <TableCell className="text-gray-500">
                          {c.currentBook}
                        </TableCell>

                        <TableCell className="text-gray-500">
                          {c.nextMeeting}
                        </TableCell>

                        <TableCell>
                          <Badge className={clubStatusBadgeClass(c.status)}>
                            {c.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-300 hover:border-[#800000] hover:text-[#800000] transition"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Form Card */}
          <Card className="shadow-sm border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Create Club
              </CardTitle>
              <p className="text-sm text-gray-500">
                Add a new reading circle
              </p>
            </CardHeader>

            <CardContent className="space-y-4">

              <Input placeholder="Club name" />
              <Input type="number" placeholder="Members" />
              <Input placeholder="Current book" />
              <Input type="date" />

              <div className="flex gap-2 pt-2">
                <Button className="flex-1 bg-[#800000] hover:bg-[#660000] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Club
                </Button>

                <Button variant="outline" className="border-gray-300">
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-2 pt-1">
                <Users className="w-3 h-3" />
                UI only — backend not connected
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </AdminShell>
  );
}