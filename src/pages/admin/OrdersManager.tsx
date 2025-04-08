
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Check, 
  X, 
  Eye, 
  CreditCard,
  Building,
  User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

// Order types
type PaymentMethod = 'online' | 'bank_transfer' | 'on_site';
type OrderStatus = 'pending' | 'verified' | 'cancelled';

interface Order {
  id: string;
  userId: string;
  userName: string;
  orderDate: string;
  courseCardId: string;
  courseCardName: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  transferCode?: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    userName: 'John Doe',
    orderDate: '2023-12-01',
    courseCardId: 'basic',
    courseCardName: 'Basic Package',
    quantity: 1,
    totalPrice: 1000,
    paymentMethod: 'bank_transfer',
    status: 'pending',
    transferCode: '12345'
  },
  {
    id: 'ORD-002',
    userId: '2',
    userName: 'Jane Smith',
    orderDate: '2023-12-02',
    courseCardId: 'standard',
    courseCardName: 'Standard Package',
    quantity: 1,
    totalPrice: 1800,
    paymentMethod: 'on_site',
    status: 'pending'
  },
  {
    id: 'ORD-003',
    userId: '3',
    userName: 'Alice Johnson',
    orderDate: '2023-12-03',
    courseCardId: 'premium',
    courseCardName: 'Premium Package',
    quantity: 1,
    totalPrice: 3200,
    paymentMethod: 'bank_transfer',
    status: 'verified',
    transferCode: '67890'
  },
  {
    id: 'ORD-004',
    userId: '4',
    userName: 'Bob Brown',
    orderDate: '2023-12-04',
    courseCardId: 'standard',
    courseCardName: 'Standard Package',
    quantity: 2,
    totalPrice: 3600,
    paymentMethod: 'online',
    status: 'verified'
  },
  {
    id: 'ORD-005',
    userId: '5',
    userName: 'Carol White',
    orderDate: '2023-12-05',
    courseCardId: 'basic',
    courseCardName: 'Basic Package',
    quantity: 1,
    totalPrice: 1000,
    paymentMethod: 'on_site',
    status: 'cancelled'
  }
];

const OrdersManager = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string>('all');
  
  // Filter orders based on selected filters
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPaymentMethod = paymentMethodFilter === 'all' || order.paymentMethod === paymentMethodFilter;
    return matchesStatus && matchesPaymentMethod;
  });
  
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailOpen(true);
  };
  
  const handleVerifyOrder = (orderId: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: 'verified' } : order
      )
    );
    toast({
      title: "Order Verified",
      description: `Order ${orderId} has been marked as verified.`,
    });
  };
  
  const handleCancelOrder = (orderId: string) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      )
    );
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been cancelled.`,
    });
  };
  
  const getPaymentMethodIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'online':
        return <CreditCard className="h-4 w-4" />;
      case 'bank_transfer':
        return <Building className="h-4 w-4" />;
      case 'on_site':
        return <User className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case 'online':
        return 'Online Payment';
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'on_site':
        return 'On-site Payment';
      default:
        return '';
    }
  };
  
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
      case 'verified':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Verified</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <AdminLayout title="Orders Management">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            View and manage all course card purchase orders
          </CardDescription>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="w-full sm:w-64">
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger id="status-filter">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-64">
              <Label htmlFor="payment-filter">Filter by Payment Method</Label>
              <Select
                value={paymentMethodFilter}
                onValueChange={setPaymentMethodFilter}
              >
                <SelectTrigger id="payment-filter">
                  <SelectValue placeholder="Filter by payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="on_site">On-site Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course Card</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.userName}</TableCell>
                          <TableCell>{order.orderDate}</TableCell>
                          <TableCell>{order.courseCardName}</TableCell>
                          <TableCell>${order.totalPrice}</TableCell>
                          <TableCell className="flex items-center gap-2">
                            {getPaymentMethodIcon(order.paymentMethod)}
                            <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                          </TableCell>
                          <TableCell>{getStatusBadge(order.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-500 hover:text-green-600"
                                onClick={() => handleVerifyOrder(order.id)}
                                disabled={order.status !== 'pending'}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => handleCancelOrder(order.id)}
                                disabled={order.status !== 'pending'}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6">
                          No orders found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="pending">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course Card</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.filter(order => order.status === 'pending').length > 0 ? (
                      filteredOrders
                        .filter(order => order.status === 'pending')
                        .map(order => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.userName}</TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.courseCardName}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell className="flex items-center gap-2">
                              {getPaymentMethodIcon(order.paymentMethod)}
                              <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleViewOrder(order)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-green-500 hover:text-green-600"
                                  onClick={() => handleVerifyOrder(order.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() => handleCancelOrder(order.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No pending orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="verified">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course Card</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.filter(order => order.status === 'verified').length > 0 ? (
                      filteredOrders
                        .filter(order => order.status === 'verified')
                        .map(order => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.userName}</TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.courseCardName}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell className="flex items-center gap-2">
                              {getPaymentMethodIcon(order.paymentMethod)}
                              <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No verified orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="cancelled">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Course Card</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.filter(order => order.status === 'cancelled').length > 0 ? (
                      filteredOrders
                        .filter(order => order.status === 'cancelled')
                        .map(order => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.userName}</TableCell>
                            <TableCell>{order.orderDate}</TableCell>
                            <TableCell>{order.courseCardName}</TableCell>
                            <TableCell>${order.totalPrice}</TableCell>
                            <TableCell className="flex items-center gap-2">
                              {getPaymentMethodIcon(order.paymentMethod)}
                              <span>{getPaymentMethodLabel(order.paymentMethod)}</span>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleViewOrder(order)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6">
                          No cancelled orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Order Detail Dialog */}
      <Dialog open={isOrderDetailOpen} onOpenChange={setIsOrderDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Detailed information about order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span>{getStatusBadge(selectedOrder.status)}</span>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Customer Information</h3>
                <div className="bg-muted/40 p-3 rounded-md space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span>{selectedOrder.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User ID:</span>
                    <span>{selectedOrder.userId}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Order Information</h3>
                <div className="bg-muted/40 p-3 rounded-md space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Date:</span>
                    <span>{selectedOrder.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course Card:</span>
                    <span>{selectedOrder.courseCardName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span>{selectedOrder.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Price:</span>
                    <span className="font-bold">${selectedOrder.totalPrice}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Payment Information</h3>
                <div className="bg-muted/40 p-3 rounded-md space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Method:</span>
                    <span className="flex items-center gap-2">
                      {getPaymentMethodIcon(selectedOrder.paymentMethod)}
                      {getPaymentMethodLabel(selectedOrder.paymentMethod)}
                    </span>
                  </div>
                  
                  {selectedOrder.paymentMethod === 'bank_transfer' && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transfer Code:</span>
                      <span>{selectedOrder.transferCode}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedOrder.status === 'pending' && (
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => {
                      handleVerifyOrder(selectedOrder.id);
                      setIsOrderDetailOpen(false);
                    }}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Verify Order
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => {
                      handleCancelOrder(selectedOrder.id);
                      setIsOrderDetailOpen(false);
                    }}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel Order
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOrderDetailOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default OrdersManager;
