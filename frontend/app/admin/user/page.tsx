import { Eye, ShieldCheck } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const users = [
  {
    id: "USR-10001",
    name: "Sita Gurung",
    email: "sita@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: "USR-10002",
    name: "Manish Khadka",
    email: "manish@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: "USR-10003",
    name: "Roshni Thapa",
    email: "roshni@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "USR-10004",
    name: "Bikram Chaudhary",
    email: "bikram@example.com",
    role: "Customer",
    status: "Suspended",
  },
];

function statusBadge(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-50 text-green-600 border-green-200";
    case "Suspended":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function roleBadge(role: string) {
  switch (role) {
    case "Admin":
      return "bg-black text-white";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function AdminUserPage() {
  return (
    <AdminShell>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#800000]/10 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#800000]" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Users
            </h1>
            <p className="text-sm text-gray-500">
              View and manage registered users
            </p>
          </div>
        </div>

        {/* TABLE */}
        <Card className="rounded-2xl border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              User Directory
            </CardTitle>
            <p className="text-sm text-gray-500">
              Total {users.length} users in system
            </p>
          </CardHeader>

          <CardContent className="p-0">

            <div className="overflow-x-auto">
              <Table>

                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {users.map((u) => (
                    <TableRow
                      key={u.id}
                      className="hover:bg-gray-50 transition"
                    >

                      <TableCell className="font-mono text-xs text-gray-500">
                        {u.id}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {u.name}
                      </TableCell>

                      <TableCell className="text-gray-500">
                        {u.email}
                      </TableCell>

                      <TableCell>
                        <Badge className={roleBadge(u.role)}>
                          {u.role}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge className={statusBadge(u.status)}>
                          {u.status}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:border-[#800000] hover:text-[#800000]"
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

      </div>
    </AdminShell>
  );
}