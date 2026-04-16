"use client";

import { useState } from "react";
import {
  Eye,
  Plus,
  RefreshCcw,
  Tag,
  Trash2,
  Edit,
  X,
} from "lucide-react";

import AdminShell from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialProducts = [
  {
    id: "PROD-1001",
    title: "The Midnight Library",
    category: "Fiction",
    price: 24.99,
    stock: 18,
  },
  {
    id: "PROD-1002",
    title: "Atomic Habits",
    category: "Self-Help",
    price: 32.99,
    stock: 7,
  },
  {
    id: "PROD-1003",
    title: "Dune",
    category: "Literature",
    price: 42.99,
    stock: 0,
  },
];

export default function AdminProductPage() {
  const [products, setProducts] = useState(initialProducts);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
  });

  const openAdd = () => {
    setEditId(null);
    setForm({ title: "", category: "", price: "", stock: "" });
    setOpen(true);
  };

  const openEdit = (p: any) => {
    setEditId(p.id);
    setForm({
      title: p.title,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
    });
    setOpen(true);
  };

  const submit = () => {
    if (!form.title) return;

    if (editId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editId
            ? {
                ...p,
                ...form,
                price: Number(form.price),
                stock: Number(form.stock),
              }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        {
          id: `PROD-${Date.now()}`,
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        },
        ...prev,
      ]);
    }

    setOpen(false);
  };

  const remove = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <AdminShell>
      <div className="space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#800000]/10 flex items-center justify-center">
                <Tag className="w-5 h-5 text-[#800000]" />
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Products
              </h1>
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
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.map((p) => (
                  <TableRow
                    key={p.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {p.title}
                    </TableCell>

                    <TableCell className="text-gray-600">
                      {p.category}
                    </TableCell>

                    <TableCell className="text-right font-medium">
                      ${p.price}
                    </TableCell>

                    <TableCell className="text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.stock === 0
                            ? "bg-red-50 text-red-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {p.stock}
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
                          onClick={() => remove(p.id)}
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

        {/* MODAL (PROFESSIONAL STYLE) */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 relative">

              {/* close */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold text-gray-900">
                {editId ? "Update Product" : "Add Product"}
              </h2>

              <Input
                placeholder="Product title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <Input
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />

              <Input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

              <Input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />

              <Button
                className="w-full bg-[#800000] hover:bg-[#5f0000]"
                onClick={submit}
              >
                {editId ? "Update Product" : "Save Product"}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setForm({
                    title: "",
                    category: "",
                    price: "",
                    stock: "",
                  })
                }
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