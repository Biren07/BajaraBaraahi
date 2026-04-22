"use client";

import { useState, useEffect } from "react";
import {
  Eye,
  Plus,
  RefreshCcw,
  Tag,
  Trash2,
  Edit,
  X,
  Loader2,
  BookOpen,
  Upload,
  Image,
} from "lucide-react";

import AdminShell from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

export default function AdminProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const GENRES = [
    "fiction",
    "romance",
    "action",
    "thriller",
    "horror",
    "fantasy",
    "biography",
    "self-help",
    "other",
  ];
  const CATEGORIES = ["best-selling", "new-arrivals", "general"];

  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    description: "",
    original_price: "",
    discount: "0",
    stock: "",
    genre: "fiction",
    category: "general",
    weight: "300",
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await bookService.getBooks();
      setProducts(response.books || response || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditId(null);
    setForm({
      title: "",
      author: "",
      isbn: "",
      description: "",
      original_price: "",
      discount: "0",
      stock: "",
      genre: "fiction",
      category: "general",
      weight: "300",
    });
    setCoverImage(null);
    setCoverPreview("");
    setOpen(true);
  };

  const openEdit = (p: any) => {
    setEditId(p._id || p.id);
    setForm({
      title: p.title || "",
      author: p.author || "",
      isbn: p.isbn || "",
      description: p.description || "",
      original_price: String(p.original_price || p.price || ""),
      discount: String(p.discount || "0"),
      stock: String(p.stock || ""),
      genre: p.genre || "fiction",
      category: p.category || "general",
      weight: String(p.weight || "300"),
    });
    setCoverImage(null);
    setCoverPreview(p.cover_Img?.url || "");
    setOpen(true);
  };

  const submit = async () => {
    if (
      !form.title ||
      !form.original_price ||
      !form.author ||
      !form.isbn ||
      !form.description
    ) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      setSubmitting(true);

      const bookData = {
        title: form.title,
        author: form.author,
        isbn: form.isbn,
        description: form.description,
        original_price: Number(form.original_price),
        discount: Number(form.discount) || 0,
        stock: Number(form.stock) || 1,
        genre: form.genre,
        category: form.category,
        weight: Number(form.weight) || 300,
      };

      if (editId) {
        await bookService.updateBook(editId, bookData, coverImage || undefined);
        setProducts((prev) =>
          prev.map((p) =>
            p._id === editId || p.id === editId ? { ...p, ...bookData } : p,
          ),
        );
        toast.success("Product updated successfully");
      } else {
        const response = await bookService.addBook(
          bookData,
          coverImage || undefined,
        );
        setProducts((prev) => [response.book || response, ...prev]);
        toast.success("Product added successfully");
      }

      setOpen(false);
    } catch (error: any) {
      console.error("Failed to save product:", error);
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (coverPreview && coverPreview.startsWith("blob:")) {
        URL.revokeObjectURL(coverPreview);
      }
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await bookService.deleteBook(id);
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
      toast.success("Product deleted successfully");
    } catch (error: any) {
      console.error("Failed to delete product:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
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

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#800000]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#800000]" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Manage your inventory, pricing & stock levels
            </p>
          </div>

          <Button
            onClick={openAdd}
            className="bg-[#800000] hover:bg-[#5f0000] text-white rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* TABLE CARD */}
        <Card className="rounded-2xl border-gray-200 shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Original</TableHead>
                  <TableHead className="text-right">Discount</TableHead>
                  <TableHead className="text-right">Final</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((p) => (
                  <TableRow
                    key={p._id || p.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {p.title}
                    </TableCell>

                    <TableCell className="text-gray-600">{p.author}</TableCell>

                    <TableCell className="text-gray-600 capitalize">
                      {p.genre}
                    </TableCell>

                    <TableCell className="text-gray-600 capitalize">
                      {p.category}
                    </TableCell>

                    <TableCell className="text-right text-gray-400 line-through">
                      Rs. {p.original_price || 0}
                    </TableCell>

                    <TableCell className="text-right">
                      {p.discount > 0 ? (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                          -{p.discount}%
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </TableCell>

                    <TableCell className="text-right font-semibold">
                      Rs. {p.original_price 
                        ? p.discount > 0 
                          ? (p.original_price * (1 - p.discount / 100)).toFixed(2)
                          : p.original_price
                        : 0}
                    </TableCell>

                    <TableCell className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.stock === 0 || p.stock === undefined
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {p.stock ?? 0}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(p)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => remove(p._id || p.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* MODAL */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
              {/* close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-5">

  {/* TITLE */}
  <h2 className="text-xl font-semibold text-gray-900">
    {editId ? "Update Product" : "Add Product"}
  </h2>

  {/* TITLE */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">Product Title *</label>
    <Input
      placeholder="Enter product title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
    />
  </div>

  {/* AUTHOR */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">Author *</label>
    <Input
      placeholder="Enter author name"
      value={form.author}
      onChange={(e) => setForm({ ...form, author: e.target.value })}
    />
  </div>

  {/* ISBN */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">ISBN *</label>
    <Input
      placeholder="Enter ISBN"
      value={form.isbn}
      onChange={(e) => setForm({ ...form, isbn: e.target.value })}
    />
  </div>

  {/* IMAGE UPLOAD */}
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">
      Cover Image
    </label>

    <div className="flex items-center gap-4">

      <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
        <Upload className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          {coverImage ? coverImage.name : "Upload image"}
        </span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      {coverPreview && (
        <img
          src={coverPreview}
          alt="preview"
          className="h-16 w-12 object-cover rounded-md border"
        />
      )}
    </div>
  </div>

  {/* PRICE + DISCOUNT */}
  <div className="grid grid-cols-2 gap-4">

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Price *
      </label>
      <Input
        type="number"
        placeholder="0.00"
        value={form.original_price}
        onChange={(e) =>
          setForm({ ...form, original_price: e.target.value })
        }
      />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Discount %
      </label>
      <Input
        type="number"
        placeholder="0"
        value={form.discount}
        onChange={(e) =>
          setForm({ ...form, discount: e.target.value })
        }
      />
    </div>
  </div>

  {/* GENRE + CATEGORY */}
  <div className="grid grid-cols-2 gap-4">

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Genre *
      </label>
      <select
        value={form.genre}
        onChange={(e) =>
          setForm({ ...form, genre: e.target.value })
        }
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
      >
        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Category *
      </label>
      <select
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* STOCK + WEIGHT */}
  <div className="grid grid-cols-2 gap-4">

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Stock *
      </label>
      <Input
        type="number"
        placeholder="0"
        value={form.stock}
        onChange={(e) =>
          setForm({ ...form, stock: e.target.value })
        }
      />
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Weight (g)
      </label>
      <Input
        type="number"
        placeholder="300"
        value={form.weight}
        onChange={(e) =>
          setForm({ ...form, weight: e.target.value })
        }
      />
    </div>
  </div>

  {/* DESCRIPTION */}
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      Description *
    </label>
    <Input
      placeholder="Write product description..."
      value={form.description}
      onChange={(e) =>
        setForm({ ...form, description: e.target.value })
      }
    />
  </div>

</div>

              <Button
                className="w-full bg-[#800000] hover:bg-[#5f0000]"
                onClick={submit}
                disabled={submitting}
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {editId ? "Update Product" : "Save Product"}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setForm({
                    title: "",
                    author: "",
                    isbn: "",
                    description: "",
                    original_price: "",
                    discount: "0",
                    stock: "",
                    genre: "fiction",
                    category: "general",
                    weight: "300",
                  });
                  setCoverImage(null);
                  setCoverPreview("");
                }}
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
