"use client";

import { useState, useEffect } from "react";
import { Eye, ShieldCheck, Loader2 } from "lucide-react";
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
import { userService } from "@/services/userService";
import toast from "react-hot-toast";

function statusBadge(status: string) {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-green-50 text-green-600 border-green-200";
    case "suspended":
    case "banned":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function roleBadge(role: string) {
  switch (role?.toLowerCase()) {
    case "admin":
      return "bg-black text-white";
    case "seller":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function AdminUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
  try {
    setLoading(true);

    const response = await userService.getAllUsers();
    console.log("Users response:", response);

    let usersArray = [];

    if (Array.isArray(response)) {
      usersArray = response;
    } else if (response && Array.isArray(response.allUsers)) {
      usersArray = response.allUsers; // <-- add this
    } else if (response && Array.isArray(response.users)) {
      usersArray = response.users;
    } else if (response?.data && Array.isArray(response.data.allUsers)) {
      usersArray = response.data.allUsers;
    } else if (response?.data && Array.isArray(response.data.users)) {
      usersArray = response.data.users;
    }

    setUsers(usersArray);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    toast.error("Failed to load users");
    setUsers([]);
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-[#800000]" />
        </div>
      </AdminShell>
    );
  }

  if (!Array.isArray(users)) {
    console.log("users is not array:", users);
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error loading users data</p>
            <Button onClick={fetchUsers} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </AdminShell>
    );
  }

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
                      key={u._id || u.id}
                      className="hover:bg-gray-50 transition"
                    >

                      <TableCell className="font-mono text-xs text-gray-500">
                        {u._id?.slice(-8) || u.id}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {u.firstname && u.lastname
                          ? `${u.firstname} ${u.lastname}`
                          : u.name || u.fullName || "-"}
                      </TableCell>

                      <TableCell className="text-gray-500">
                        {u.email}
                      </TableCell>

                      <TableCell>
                        <Badge className={roleBadge(u.role)}>
                          {u.role || "Customer"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Badge className={statusBadge(u.status)}>
                          {u.status || "Active"}
                        </Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:border-[#800000] hover:text-[#800000]"
                        >
                          <Eye className="w-4 h-4" />
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