"use client";

import { useState, useEffect } from "react";
import { Plus, Ticket, Loader2, Edit, Trash2, Copy, MoreVertical } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { couponService } from "@/services/couponService";
import toast from "react-hot-toast";

function statusBadge(isActive: boolean) {
  return isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100";
}

export default function AdminCouponPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", couponCode: "", discount: "", maxUses: "" });

  useEffect(() => { fetchCoupons(); }, []);

const fetchCoupons = async () => {
  try {
    setLoading(true);

    const res = await couponService.getAllCoupons();

    console.log("API:", res);

    setCoupons(res?.promos || []);
  } catch (error) {
    toast.error("Failed to load coupons");
    setCoupons([]);
  } finally {
    setLoading(false);
  }
};

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.couponCode || !formData.discount || !formData.maxUses) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const couponData = {
        name: formData.name,
        couponCode: formData.couponCode.toUpperCase(),
        discount: parseFloat(formData.discount),
        maxUses: parseInt(formData.maxUses),
      };
      if (editingId) {
        await couponService.updateCoupon(editingId, couponData);
        toast.success("Coupon updated successfully");
      } else {
        await couponService.createCoupon(couponData);
        toast.success("Coupon created successfully");
      }
      setCreateDialogOpen(false);
      setFormData({ name: "", couponCode: "", discount: "", maxUses: "" });
      setEditingId(null);
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to save coupon");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (coupon: any) => {
    setEditingId(coupon._id);
    setFormData({
      name: coupon.name,
      couponCode: coupon.couponCode,
      discount: coupon.discount.toString(),
      maxUses: coupon.maxUses.toString(),
    });
    setCreateDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    setDeleting(id);
    try {
      await couponService.deleteCoupon(id);
      toast.success("Coupon deleted successfully");
      fetchCoupons();
    } catch (error) {
      toast.error("Failed to delete coupon");
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return (
    <AdminShell>
      <div className="flex items-center justify-center h-[60vh]"><Loader2 className="w-10 h-10 animate-spin text-[#800000]" /></div>
    </AdminShell>
  );

  return (
    <AdminShell>
      <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#800000] flex items-center justify-center shadow-lg shadow-[#800000]/20">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Coupons</h1>
              <p className="text-sm font-medium text-slate-500">Manage promotional strategy and discounts</p>
            </div>
          </div>
          <Button onClick={() => setCreateDialogOpen(true)} className="bg-[#800000] hover:bg-[#600000] text-white rounded-xl px-6 py-6 sm:py-2 h-auto shadow-md transition-all active:scale-95">
            <Plus className="w-5 h-5 mr-2" /> Create New Offer
          </Button>
        </div>


        {/* CONTENT TABLE / MOBILE LIST */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="py-4 px-6 font-bold text-slate-700">Campaign Code</TableHead>

                  <TableHead className="font-bold text-slate-700">Value</TableHead>
                  <TableHead className="font-bold text-slate-700">Usage Tracker</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="text-right px-6 font-bold text-slate-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon._id} className="hover:bg-slate-50/50 transition-colors group">
                    <TableCell className="px-6 py-5">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 font-mono tracking-tighter uppercase">{coupon.couponCode}</span>
                          <Button variant="ghost" size="sm" onClick={() => copyToClipboard(coupon.couponCode)} className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"><Copy className="w-3.5 h-3.5 text-slate-400" /></Button>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{coupon.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="font-extrabold text-slate-900">{coupon.value}%</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 w-32">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase"><span>{coupon.usedCount} used</span> <span>{coupon.maxUsage} limit</span></div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#800000] rounded-full" style={{ width: `${(coupon.usedCount / coupon.maxUsage) * 100}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><Badge className={`${statusBadge(coupon.isActive)} px-3 py-1 rounded-lg border shadow-sm font-bold uppercase text-[10px]`}>{coupon.isActive ? 'Active' : 'Inactive'}</Badge></TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleEdit(coupon)} className="rounded-lg hover:bg-[#800000]/10 hover:text-[#800000]"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDelete(coupon._id)} disabled={deleting === coupon._id} className="rounded-lg hover:bg-rose-50 hover:text-rose-600">
                          {deleting === coupon._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden divide-y divide-slate-100">
            {coupons.map((coupon) => (
              <div key={coupon._id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-black text-slate-900 uppercase tracking-tighter">{coupon.couponCode}</span>
                      <Badge className={`${statusBadge(coupon.isActive)} text-[10px] px-2 py-0.5 rounded-md uppercase border`}>{coupon.isActive ? 'Active' : 'Inactive'}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{coupon.name}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400"><MoreVertical className="w-5 h-5" /></Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl">
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Value</p><p className="font-black text-[#800000]">{coupon.value}%</p></div>
                  <div><p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Usage</p><p className="font-bold text-slate-700">{coupon.usedCount} / {coupon.maxUsage}</p></div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleEdit(coupon)} className="flex-1 rounded-xl font-bold text-slate-700 h-11">Edit</Button>
                  <Button variant="outline" onClick={() => handleDelete(coupon._id)} disabled={deleting === coupon._id} className="flex-1 rounded-xl font-bold text-rose-600 border-rose-100 h-11">
                    {deleting === coupon._id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Simplified Dialog Implementation */}
      <Dialog open={createDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setCreateDialogOpen(false);
          setEditingId(null);
          setFormData({ name: "", couponCode: "", discount: "", maxUses: "" });
        } else {
          setCreateDialogOpen(true);
        }
      }}>
        <DialogContent className="rounded-[32px] sm:max-w-[450px] p-8">
          <DialogHeader><DialogTitle className="text-2xl font-bold tracking-tight">{editingId ? "Edit Coupon" : "Create Coupon"}</DialogTitle></DialogHeader>
          <div className="space-y-5 py-4">
            <div className="space-y-2"><Label className="text-xs font-bold uppercase text-slate-500 ml-1">Campaign Name</Label><Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="E.g. Summer 2026 Sale" className="rounded-xl border-slate-200 h-11 focus-visible:ring-[#800000]" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label className="text-xs font-bold uppercase text-slate-500 ml-1">Code</Label><Input value={formData.couponCode} onChange={(e) => setFormData({...formData, couponCode: e.target.value})} placeholder="SUMMER50" className="rounded-xl border-slate-200 h-11 uppercase font-bold" /></div>
              <div className="space-y-2"><Label className="text-xs font-bold uppercase text-slate-500 ml-1">Discount %</Label><Input type="number" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} placeholder="10" className="rounded-xl border-slate-200 h-11" /></div>
            </div>
            <div className="space-y-2"><Label className="text-xs font-bold uppercase text-slate-500 ml-1">Max Uses</Label><Input type="number" value={formData.maxUses} onChange={(e) => setFormData({...formData, maxUses: e.target.value})} placeholder="100" className="rounded-xl border-slate-200 h-11" /></div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setCreateDialogOpen(false)} className="flex-1 rounded-xl h-12 font-bold">Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting} className="flex-1 rounded-xl h-12 font-bold bg-[#800000] hover:bg-[#600000]">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? "Update Coupon" : "Create Coupon")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}