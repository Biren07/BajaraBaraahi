"use client";

import { useState, useEffect } from "react";
import { Eye, ShieldCheck, Loader2, Mail, User as UserIcon, Trash2, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { userService } from "@/services/userService";
import toast from "react-hot-toast";

function roleBadge(role: string) {
  switch (role?.toLowerCase()) {
    case "admin":
      return "bg-black text-white hover:bg-black/90";
    case "user":
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
}

export default function AdminUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      let usersArray = [];
      if (Array.isArray(response)) usersArray = response;
      else if (response?.allUsers) usersArray = response.allUsers;
      else if (response?.users) usersArray = response.users;
      else if (response?.data?.allUsers) usersArray = response.data.allUsers;

      setUsers(usersArray);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await userService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
      toast.success("User deleted successfully");
    } catch (error: any) {
      toast.error("Failed to delete user");
    }
  };

  const formatName = (u: any) => {
    return u.firstname 
      ? `${u.firstname}${u.middlename ? ` ${u.middlename}` : ''} ${u.lastname}` 
      : u.name || "N/A";
  };

  // PAGINATION LOGIC
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin text-[#800000]" />
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#800000]/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#800000]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
              <p className="text-sm text-gray-500">Managing {users.length} accounts</p>
            </div>
          </div>
          <Button onClick={fetchUsers} variant="outline" size="sm" className="bg-white">Refresh</Button>
        </div>

        <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden bg-white">
          <CardContent className="p-0">
            
            {/* MOBILE VIEW */}
            <div className="md:hidden divide-y divide-gray-100">
              {currentUsers.map((u) => (
                <div key={u._id || u.id} className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {u.profileImage?.url ? (
                          <img src={u.profileImage.url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{formatName(u)}</h3>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500"><Eye className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => removeUser(u._id || u.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {u.email}</div>
                    {u.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {u.phone}</div>}
                    <Badge className={`${roleBadge(u.role)} text-[10px] px-2 py-0 mt-1`}>{u.role || "User"}</Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP VIEW */}
            <div className="hidden md:block">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>User Details</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentUsers.map((u) => (
                    <TableRow key={u._id || u.id} className="hover:bg-gray-50/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                            {u.profileImage?.url ? (
                              <img src={u.profileImage.url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <UserIcon className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{formatName(u)}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-xs text-gray-600 gap-1">
                          <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {u.email}</div>
                          {u.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {u.phone}</div>}
                        </div>
                      </TableCell>
                      <TableCell><Badge className={roleBadge(u.role)}>{u.role || "User"}</Badge></TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-[#800000]"><Eye className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500 hover:bg-red-50" onClick={() => removeUser(u._id || u.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* PAGINATION FOOTER */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Page <span className="font-medium text-gray-900">{currentPage}</span> of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}