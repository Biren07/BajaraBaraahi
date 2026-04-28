"use client";

import { useState, useEffect } from "react";
import { Plus, Tag, Loader2, Edit, Trash2, Calendar, Search, MoreVertical } from "lucide-react";
import AdminShell from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { offerService } from "@/services/offerService";
import { bookService } from "@/services/bookService";
import toast from "react-hot-toast";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    type: "custom",
    discount: "",
    bookIds: [] as string[],
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchOffers();
    fetchBooks();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await offerService.getAllOffers();
      const data = response.data || response;
      setOffers(Array.isArray(data) ? data : data.offers || data.data || []);
    } catch (error) {
      toast.error("Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await bookService.getBooks();
      const booksData = response?.books || response?.data?.books || [];
      setBooks(booksData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenDialog = (offer?: any) => {
    if (offer) {
      setEditId(offer._id);
      setFormData({
        name: offer.name,
        type: offer.type,
        discount: offer.discount.toString(),
        bookIds: offer.bookIds || [],
        startDate: offer.startDate ? new Date(offer.startDate).toISOString().split('T')[0] : "",
        endDate: offer.endDate ? new Date(offer.endDate).toISOString().split('T')[0] : "",
      });
    } else {
      setEditId(null);
      setFormData({ name: "", type: "custom", discount: "", bookIds: [], startDate: "", endDate: "" });
    }
    setSearchTerm("");
    setIsDialogOpen(true);
  };

  const toggleBookSelection = (bookId: string) => {
    setFormData(prev => ({
      ...prev,
      bookIds: prev.bookIds.includes(bookId)
        ? prev.bookIds.filter(id => id !== bookId)
        : [...prev.bookIds, bookId]
    }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this offer?")) return;
    try {
      await offerService.deleteOffer(id);
      toast.success("Offer deleted");
      fetchOffers();
    } catch (error) {
      toast.error("Failed to delete offer");
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.type || !formData.discount || !formData.bookIds.length || !formData.endDate) {
      return toast.error("Please fill all required fields");
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        discount: Number(formData.discount),
        bookIds: formData.bookIds,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate,
      };

      if (editId) {
        await offerService.updateOffer(editId, payload);
        toast.success("Offer updated");
      } else {
        await offerService.createOffer(payload);
        toast.success("Offer activated");
      }
      setIsDialogOpen(false);
      fetchOffers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Action failed");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBooks = books.filter(book => 
    book.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6 max-w-7xl mx-auto pb-24 md:pb-6 px-4">
        {/* HEADER SECTION */}
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#800000] flex items-center justify-center shadow-lg shadow-[#800000]/20 shrink-0">
              <Tag className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-gray-900 tracking-tight leading-tight">Promotions</h1>
              <p className="text-[12px] md:text-sm text-gray-500 font-medium">Manage book discounts</p>
            </div>
          </div>
          <Button 
            onClick={() => handleOpenDialog()}
            className="hidden sm:flex bg-[#800000] hover:bg-[#600000] text-white rounded-2xl h-12 px-6 shadow-lg shadow-[#800000]/20 font-bold transition-all"
          >
            <Plus className="w-5 h-5 mr-2" /> New Offer
          </Button>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
             <Loader2 className="w-10 h-10 animate-spin text-[#800000]" />
             <p className="text-sm font-bold text-gray-400">Loading your offers...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block">
              <Card className="rounded-[32px] border-none shadow-xl shadow-gray-200/50 overflow-hidden bg-white">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-gray-50/50">
                      <TableRow>
                        <TableHead className="pl-8 h-16 font-bold uppercase text-[10px] text-gray-400 tracking-widest">Offer Name</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Type</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Value</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Books</TableHead>
                        <TableHead className="font-bold uppercase text-[10px] text-gray-400 tracking-widest">Expiry</TableHead>
                        <TableHead className="text-right pr-8 font-bold uppercase text-[10px] text-gray-400 tracking-widest">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {offers.map((offer) => (
                        <TableRow key={offer._id} className="group hover:bg-gray-50/50">
                          <TableCell className="pl-8 py-5 font-bold text-gray-900">{offer.name}</TableCell>
                          <TableCell>
                            <Badge className={`rounded-full px-3 py-1 text-[10px] font-black uppercase ${
                              offer.type === 'stock-clearance' ? 'bg-green-50 text-green-600' :
                              offer.type === 'festive' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                            }`}>
                              {offer.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-black text-gray-900">{offer.discount}%</TableCell>
                          <TableCell className="text-xs text-gray-500 font-medium">{offer.bookIds?.length || 0} items</TableCell>
                          <TableCell className="text-sm text-gray-500">{new Date(offer.endDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right pr-8">
                            <div className="flex justify-end gap-2">
                              <Button onClick={() => handleOpenDialog(offer)} size="icon" variant="ghost" className="rounded-xl hover:bg-blue-50 text-blue-600"><Edit className="w-4 h-4" /></Button>
                              <Button onClick={() => handleDelete(offer._id)} size="icon" variant="ghost" className="rounded-xl hover:bg-red-50 text-red-600"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* MOBILE RESPONSIVE CARDS */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {offers.map((offer) => (
                <Card key={offer._id} className="rounded-[24px] border-none shadow-md bg-white overflow-hidden active:scale-[0.98] transition-transform">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <Badge className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase mb-1 ${
                          offer.type === 'stock-clearance' ? 'bg-green-50 text-green-600' :
                          offer.type === 'festive' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {offer.type}
                        </Badge>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{offer.name}</h3>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-[#800000]">{offer.discount}%</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Discount</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="flex gap-4">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-gray-400 uppercase">Books</span>
                           <span className="text-sm font-bold text-gray-700">{offer.bookIds?.length || 0} Items</span>
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-bold text-gray-400 uppercase">Ends</span>
                           <span className="text-sm font-bold text-gray-700">{new Date(offer.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <Button onClick={() => handleOpenDialog(offer)} size="icon" className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 shadow-none border-none">
                            <Edit className="w-4 h-4" />
                         </Button>
                         <Button onClick={() => handleDelete(offer._id)} size="icon" className="w-10 h-10 rounded-full bg-red-50 hover:bg-red-100 text-red-600 shadow-none border-none">
                            <Trash2 className="w-4 h-4" />
                         </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && offers.length === 0 && (
          <div className="text-center py-20 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-200">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Tag className="w-8 h-8 text-gray-300" />
             </div>
             <h3 className="text-lg font-bold text-gray-900">No active promotions</h3>
             <p className="text-sm text-gray-500">Launch a new campaign to boost sales</p>
          </div>
        )}

        {/* MOBILE FLOATING ACTION BUTTON */}
        <Button 
          onClick={() => handleOpenDialog()}
          className="sm:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#800000] hover:bg-[#600000] text-white shadow-2xl shadow-[#800000]/40 z-50 flex items-center justify-center p-0 transition-transform active:scale-90"
        >
          <Plus className="w-8 h-8" />
        </Button>

        {/* DIALOG (Remains largely the same but with mobile-optimized padding) */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[95%] max-w-[550px] p-0 overflow-hidden border-none rounded-[24px] md:rounded-[32px] bg-white shadow-2xl">
            <div className="px-6 md:px-8 py-5 md:py-6 border-b border-gray-50 bg-gray-50/50">
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-black text-gray-900">
                  {editId ? "Update Offer" : "New Promotion"}
                </DialogTitle>
                <DialogDescription className="font-medium text-xs md:text-sm text-gray-500">Set your campaign details</DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-6 md:p-8 space-y-5 md:space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Promotion Title</Label>
                  <Input
                    className="rounded-xl md:rounded-2xl h-12 border-gray-100 bg-gray-50/50"
                    placeholder="e.g. Festival Season"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Offer Type</Label>
                    <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v})}>
                      <SelectTrigger className="rounded-xl md:rounded-2xl h-12 border-gray-100 bg-gray-50/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="stock-clearance">Stock Clearance</SelectItem>
                        <SelectItem value="festive">Festive</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Discount (%)</Label>
                    <Input 
                      type="number" 
                      className="rounded-xl md:rounded-2xl h-12 border-gray-100 bg-gray-50/50" 
                      placeholder="0" 
                      value={formData.discount} 
                      onChange={e => setFormData({...formData, discount: e.target.value})} 
                    />
                  </div>
                </div>
              </div>

              {/* BOOK SELECTION */}
              <div className="space-y-3">
                <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                  Select Books <span>({formData.bookIds.length})</span>
                </Label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-4 top-3.5 text-gray-400" />
                  <Input 
                    placeholder="Search titles..." 
                    className="pl-11 rounded-xl h-11 border-gray-100 bg-gray-50/50 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="rounded-2xl border border-gray-100 p-1 bg-gray-50/30">
                  <ScrollArea className="h-44 px-2">
                    <div className="space-y-1 py-2">
                      {filteredBooks.map((book) => (
                        <div 
                          key={book._id} 
                          className={`flex items-center space-x-3 p-3 rounded-xl transition-all cursor-pointer ${
                            formData.bookIds.includes(book._id) ? 'bg-white shadow-sm ring-1 ring-gray-100' : 'hover:bg-white'
                          }`} 
                          onClick={() => toggleBookSelection(book._id)}
                        >
                          <Checkbox 
                            id={book._id} 
                            checked={formData.bookIds.includes(book._id)}
                            onCheckedChange={() => toggleBookSelection(book._id)}
                            className="rounded-md border-gray-300 data-[state=checked]:bg-[#800000] data-[state=checked]:border-[#800000]"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-gray-700 truncate">{book.title}</p>
                            <p className="text-[10px] text-gray-400 font-medium tracking-tight">Rs. {book.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start Date</Label>
                  <Input type="date" className="rounded-xl h-12 border-gray-100 bg-gray-50/50 text-xs" value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">End Date</Label>
                  <Input type="date" className="rounded-xl h-12 border-gray-100 bg-gray-50/50 text-xs" value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-white border-t border-gray-50 flex gap-3">
              <Button variant="ghost" className="flex-1 h-12 md:h-14 rounded-xl md:rounded-2xl font-bold text-gray-500" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button 
                className="flex-[2] h-12 md:h-14 rounded-xl md:rounded-2xl bg-[#800000] hover:bg-[#600000] text-white font-black shadow-lg shadow-[#800000]/20 transition-all active:scale-95 disabled:opacity-70" 
                onClick={handleSubmit} 
                disabled={submitting}
              >
                {submitting ? <Loader2 className="animate-spin" /> : (editId ? "Update" : "Launch")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminShell>
  );
}