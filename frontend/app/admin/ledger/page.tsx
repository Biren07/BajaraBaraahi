import { CreditCard, Plus, RefreshCcw, ReceiptText } from "lucide-react"
import AdminShell from "@/components/admin/admin-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const transactions = [
  {
    id: "TXN-1001",
    date: "Apr 10, 2026",
    type: "Purchase",
    orderId: "ORD-2026-001",
    amount: -124.5,
    status: "Completed",
  },
  {
    id: "TXN-1002",
    date: "Apr 11, 2026",
    type: "Refund",
    orderId: "ORD-2026-001",
    amount: 15.99,
    status: "Completed",
  },
  {
    id: "TXN-1003",
    date: "Apr 12, 2026",
    type: "Purchase",
    orderId: "ORD-2026-002",
    amount: -58.99,
    status: "Completed",
  },
  {
    id: "TXN-1004",
    date: "Apr 14, 2026",
    type: "Gift Card",
    orderId: null,
    amount: 50.0,
    status: "Completed",
  },
]

function ledgerAmountClass(amount: number) {
  return amount >= 0 ? "text-green-700" : "text-foreground font-semibold"
}

function ledgerStatusBadgeClass(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-500/10 text-green-700 border-green-500/20"
    case "Pending":
      return "bg-blue-500/10 text-blue-700 border-blue-500/20"
    case "Failed":
      return "bg-red-500/10 text-red-700 border-red-500/20"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function AdminLedgerPage() {
  const totalTransactions = transactions.length
  const totalCredits = transactions
    .filter((t) => t.amount >= 0)
    .reduce((sum, t) => sum + t.amount, 0)
  const totalDebits = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Ledger</h1>
            <p className="text-sm text-muted-foreground">
              Admin view of transactions and activity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 md:p-5">
              <div className="text-sm text-muted-foreground">Transactions</div>
              <div className="text-2xl md:text-3xl font-bold">{totalTransactions}</div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 md:p-5">
              <div className="text-sm text-muted-foreground">Total Credits</div>
              <div className="text-2xl md:text-3xl font-bold text-green-700">
                ${totalCredits.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 md:p-5">
              <div className="text-sm text-muted-foreground">Total Debits</div>
              <div className="text-2xl md:text-3xl font-bold">
                ${totalDebits.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,340px] gap-6">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Transactions</CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {transactions.length} records
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>TXN ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((t, idx) => (
                      <TableRow key={t.id}>
                        <TableCell className="font-mono text-sm">
                          {t.id}
                          <div className="text-xs text-muted-foreground">
                            #{idx + 1}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {t.date}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-muted text-foreground border-border">
                            {t.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {t.orderId ?? "—"}
                        </TableCell>
                        <TableCell className={`text-right ${ledgerAmountClass(t.amount)}`}>
                          {t.amount >= 0 ? "+" : "-"}$
                          {Math.abs(t.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={ledgerStatusBadgeClass(t.status)}
                          >
                            {t.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Add Transaction</CardTitle>
              <div className="text-sm text-muted-foreground">
                Create a ledger transaction (demo).
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Type</div>
                <Input placeholder="Purchase / Refund / Gift Card" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Order ID (optional)</div>
                <Input placeholder="ORD-2026-001" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Amount</div>
                <Input type="number" step="0.01" placeholder="e.g. -58.99 or 50.00" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Status</div>
                <Input placeholder="Completed / Pending / Failed" />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ledger
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-border hover:border-primary hover:text-primary"
                  aria-label="Reset form (demo)"
                >
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              </div>

              <div className="text-xs text-muted-foreground pt-1 flex items-center gap-2">
                <ReceiptText className="w-3 h-3" />
                UI only; no backend wired yet.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  )
}

