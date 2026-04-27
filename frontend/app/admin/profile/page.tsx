"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/admin-shell";

export default function AdminProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@example.com",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleLogout = async () => {
    setLoading(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    console.log("Profile updated:", profile);
  };

  const handlePasswordUpdate = () => {
    if (password.new !== password.confirm) {
      alert("Passwords do not match");
      return;
    }

    console.log("Password updated:", password);
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <AdminShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Account Settings
          </h1>
          <p className="text-sm text-gray-500">
            Manage your profile and security settings
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">Admin Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                className="w-full mt-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#800000]/30"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                className="w-full mt-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#800000]/30"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
          </div>

          <button
            onClick={handleProfileUpdate}
            className="bg-[#800000] hover:bg-[#5f0000] text-white px-4 py-2 rounded-xl transition"
          >
            Save Changes
          </button>
        </div>

        {/* PASSWORD CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#800000]/30"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#800000]/30"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-[#800000]/30"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
            />
          </div>

          <button
            onClick={handlePasswordUpdate}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            Update Password
          </button>
        </div>

        {/* LOGOUT SECTION */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">Logout</h3>
            <p className="text-sm text-gray-500">
              Sign out from admin dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl disabled:opacity-50 transition"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
