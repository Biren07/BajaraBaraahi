"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit,
  X,
  Loader2,
  Upload,
  Package,
  BookOpen,
} from "lucide-react";

import AdminShell from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookService } from "@/services/bookService";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function AdminProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const GENRES = ["fiction", "romance", "action", "thriller", "horror", "fantasy", "biography", "self-help", "other"];
  const CATEGORIES = ["best-selling", "new-arrivals", "general"];

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    original_price: "",
    discount: "0",
    stock: "1",
    genre: "fiction",
    category: "general",
    weight: "300",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await bookService.getBooks();
      setProducts(response.books || response || []);
    } catch (error) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const openAdd = () => {
    setEditId(null);
    setForm({
      title: "", author: "", isbn: "", description: "",
      original_price: "", discount: "0", stock: "1",
      genre: "fiction", category: "general", weight: "300",
    });
    setCoverImage(null);
    setCoverPreview("");
    setOpen(true);
  };

  const openEdit = (p: any) => {
    setEditId(p._id);
    setForm({
      title: p.title,
      author: p.author,
      isbn: p.isbn,
      description: p.description,
      original_price: String(p.original_price),
      discount: String(p.discount || 0),
      stock: String(p.stock),
      genre: p.genre,
      category: p.category,
      weight: String(p.weight || 300),
    });
    setCoverPreview(p.cover_Img?.url || "");
    setOpen(true);
  };

  const submit = async () => {
    if (!form.title || !form.author || !form.isbn || !form.description || !form.original_price) {
      return toast.error("Please fill all required fields");
    }

    try {
      setSubmitting(true);
      const bookData = {
        ...form,
        original_price: Number(form.original_price),
        discount: Number(form.discount),
        stock: Number(form.stock),
        weight: Number(form.weight),
      };

      if (editId) {
        await bookService.updateBook(editId, bookData, coverImage || undefined);
        toast.success("Listing Updated");
      } else {
        if (!coverImage) return toast.error("Please upload a cover image");
        await bookService.addBook(bookData, coverImage);
        toast.success("New Book Published");
      }
      fetchProducts();
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminShell>
      <div className="space-y-6 pb-20 md:pb-0">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 md:px-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#800000]/10 flex items-center justify-center">
              <Package className="w-5 h-5 md:w-6 md:h-6 text-[#800000]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Inventory</h1>
              <p className="text-xs md:text-sm text-gray-500 font-medium">Manage catalog and stock</p>
            </div>
          </div>
          <Button onClick={openAdd} className="bg-[#800000] hover:bg-[#600000] text-white rounded-2xl h-12 px-6 shadow-lg w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" /> Add New Book
          </Button>
        </div>

        {/* INVENTORY LIST - RESPONSIVE */}
        <div className="space-y-4">
          {/* Desktop View: Table */}
          <Card className="hidden md:block rounded-[32px] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="pl-8 h-14 text-[11px] font-bold uppercase text-gray-400">Book Listing</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase text-gray-400">Category/Genre</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase text-gray-400">Price</TableHead>
                    <TableHead className="text-[11px] font-bold uppercase text-gray-400 text-center">Stock</TableHead>
                    <TableHead className="text-right pr-8 text-[11px] font-bold uppercase text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} className="h-40 text-center"><Loader2 className="animate-spin mx-auto text-gray-400" /></TableCell></TableRow>
                  ) : currentProducts.map((p) => (
                    <TableRow key={p._id} className="group hover:bg-gray-50/50 transition-colors">
                      <TableCell className="pl-8 py-5">
                        <div className="flex items-center gap-4">
                          <img src={p.cover_Img?.url} className="w-12 h-16 object-cover rounded-xl border" alt="" />
                          <div className="max-w-[200px]">
                            <p className="font-bold text-gray-900 truncate">{p.title}</p>
                            <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">ISBN: {p.isbn}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase text-[#800000] bg-[#800000]/5 px-2 py-0.5 rounded-md w-fit">{p.category}</span>
                          <span className="text-xs text-gray-500 capitalize">{p.genre}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-black text-gray-900">Rs.{p.price}</span>
                          <span className="text-[10px] text-gray-400 line-through">Rs.{p.original_price}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={cn("px-3 py-1 rounded-full text-[11px] font-black", p.stock > 5 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                          {p.stock} Units
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex justify-end gap-2">
                          <Button onClick={() => openEdit(p)} size="icon" variant="ghost" className="rounded-xl hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Mobile View: Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden px-2">
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#800000]" /></div>
            ) : currentProducts.map((p) => (
              <div key={p._id} className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <img src={p.cover_Img?.url} className="w-20 h-28 min-w-[80px] object-cover rounded-2xl shadow-sm border" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-black uppercase text-[#800000] bg-[#800000]/5 px-2 py-0.5 rounded-md">{p.category}</span>
                      <div className="flex gap-1">
                        <button onClick={() => openEdit(p)} className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button className="p-2 bg-red-50 text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <h3 className="font-bold text-gray-900 mt-1.5 truncate leading-tight">{p.title}</h3>
                    <p className="text-[10px] text-gray-400 font-medium mb-2 uppercase">ISBN: {p.isbn}</p>
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-gray-900 leading-none">Rs.{p.price}</span>
                      <span className="text-[10px] text-gray-400 line-through">Rs.{p.original_price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-500 capitalize font-medium">{p.genre}</span>
                  <span className={cn("px-3 py-1 rounded-xl text-[10px] font-black uppercase", p.stock > 5 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')}>
                    Stock: {p.stock}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* MODAL / OVERLAY */}
{open && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => !submitting && setOpen(false)} />
    
    {/* Modal Content */}
    <div className="relative w-full max-w-5xl bg-[#FDFCFB] sm:rounded-[40px] shadow-2xl overflow-hidden h-full sm:h-auto max-h-screen sm:max-h-[95vh] flex flex-col">
      
      {/* Sticky Header */}
      <div className="px-6 md:px-10 py-5 md:py-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
          {editId ? "Update Listing" : "Add to Catalog"}
        </h2>
        <button onClick={() => setOpen(false)} className="p-2 md:p-3 hover:bg-gray-100 rounded-2xl text-gray-400 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Scrollable Form Body */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left Column: Image & Meta (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 block text-center lg:text-left">
                Cover Image
              </label>
              <div className={cn(
                "relative aspect-[3/4] max-w-[240px] mx-auto lg:max-w-none rounded-[24px] border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition-all",
                coverPreview ? 'border-transparent' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              )}>
                {coverPreview ? (
                  <img src={coverPreview} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="w-8 h-8 text-[#800000] mx-auto mb-2 opacity-50" />
                    <p className="text-[10px] font-bold text-gray-500 uppercase">JPG / PNG</p>
                  </div>
                )}
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} disabled={submitting} />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 bg-white p-5 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">ISBN Code *</label>
                <Input className="rounded-xl h-11 text-xs" placeholder="ISBN-13" value={form.isbn} onChange={e => setForm({...form, isbn: e.target.value})} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Weight (g)</label>
                <Input type="number" className="rounded-xl h-11 text-xs" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} />
              </div>
            </div>
          </div>

          {/* Right Column: Main Details (Span 8) */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* Full width on Mobile & Desktop */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Book Title *</label>
                <Input className="rounded-2xl h-12 md:h-14 text-base font-medium shadow-sm" placeholder="Enter book name" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
              </div>
              
              {/* Side by Side on Desktop, Stacked on Mobile */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Author Name *</label>
                <Input className="rounded-2xl h-12" placeholder="Writer" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Genre</label>
                <Select value={form.genre} onValueChange={(v) => setForm({...form, genre: v})}>
                  <SelectTrigger className="rounded-2xl h-12 capitalize"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">{GENRES.map(g => <SelectItem key={g} value={g} className="capitalize">{g}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Category</label>
                <Select value={form.category} onValueChange={(v) => setForm({...form, category: v})}>
                  <SelectTrigger className="rounded-2xl h-12 capitalize"><SelectValue /></SelectTrigger>
                  <SelectContent className="rounded-xl">{CATEGORIES.map(c => <SelectItem key={c} value={c} className="capitalize">{c.replace('-', ' ')}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Initial Stock</label>
                <Input type="number" className="rounded-2xl h-12" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Original Price (Rs) *</label>
                <Input type="number" className="rounded-2xl h-12 bg-gray-50/50" value={form.original_price} onChange={e => setForm({...form, original_price: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Discount (%)</label>
                <Input type="number" className="rounded-2xl h-12 bg-gray-50/50" value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Description *</label>
              <Textarea className="rounded-[24px] min-h-[140px] md:min-h-[160px] resize-none p-4 text-sm leading-relaxed shadow-sm" placeholder="Tell readers about this book..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="p-6 md:p-10 border-t border-gray-100 bg-white flex flex-col md:flex-row gap-3 shrink-0">
        <Button variant="ghost" className="order-2 md:order-1 flex-1 h-12 md:h-14 rounded-2xl font-bold text-gray-500 hover:bg-gray-50" onClick={() => setOpen(false)}>
          Discard Changes
        </Button>
        <Button className="order-1 md:order-2 flex-[2] h-12 md:h-14 rounded-2xl bg-[#800000] hover:bg-[#600000] text-white font-black shadow-lg transition-all active:scale-[0.98]" onClick={submit} disabled={submitting}>
          {submitting ? <Loader2 className="animate-spin w-6 h-6" /> : (editId ? "Save Updates" : "Publish to Store")}
        </Button>
      </div>
    </div>
  </div>
)}
      </div>
    </AdminShell>
  );
}