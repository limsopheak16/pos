"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Minus, Plus, ShoppingCart, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ProductGrid } from "@/components/pos/product-grid";
import { staticCustomers } from "@/data/static-data";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
}

interface ProductCategory {
  id: string;
  name: string;
}

interface Customer {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch static products
      const productResponse = await fetch("/api/static-products");
      const productResult = await productResponse.json();
      if (productResult.data) {
        setProducts(productResult.data.records);
      }

      // Use static customers
      const posCustomers = staticCustomers.map(customer => ({
        id: customer.id,
        name: `${customer.firstName} ${customer.lastName}`,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        totalOrders: customer.totalOrders,
        totalSpent: customer.totalSpent
      }));
      setCustomers(posCustomers);

      // Generate categories from products
      const allProducts = productResult.data?.records || [];
      const uniqueCategories = Array.from(new Set(allProducts.map((p: any) => p.category)));
      const categoryList = uniqueCategories.map((cat, index) => ({
        id: String(index + 1),
        name: String(cat)
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      if (exists) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((current) =>
      current.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      })
    );
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + (parseFloat(item.price.replace('$', ''))) * item.quantity,
    0
  );
  const vat = subtotal * 0.1; // 10% VAT
  const total = subtotal + vat - discount;

  const getProductPrice = (product: Product) => {
    return parseFloat(product.price.replace('$', ''));
  };

  const completeSale = async () => {
    if (cart.length === 0) return;
    
    try {
      const saleData = {
        transactionCode: `SALE-${Date.now()}`,
        transactionDate: new Date().toISOString(),
        totalAmount: subtotal,
        totalDiscountAmount: discount,
        vatAmount: vat,
        grandTotalAmount: total,
        paymentMethod: "Cash",
        customerId: selectedCustomer || null,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          unitPrice: getProductPrice(item),
          discountPercentage: 0,
          discountAmount: 0,
          vatPercentage: 10,
          vatAmount: getProductPrice(item) * item.quantity * 0.1,
          totalAmount: getProductPrice(item) * item.quantity,
          grandTotalAmount: getProductPrice(item) * item.quantity * 1.1,
        }))
      };

      const response = await fetch("/api/sale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        setCart([]);
        setSelectedCustomer("");
        setDiscount(0);
        alert("Sale completed successfully!");
      } else {
        alert("Failed to complete sale");
      }
    } catch (error) {
      console.error("Error completing sale:", error);
      alert("Error completing sale");
    }
  };

  return (
    <div className="flex max-h-[892px] bg-gray-100">
      {/* Products List - Left Side */}
      <div className="flex flex-col w-2/3 p-4 gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Point of Sale</h1>
        </div>

        <ProductGrid
          onProductSelect={addToCart}
          loading={loading}
        />

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Customer</Label>
            <Select
              value={selectedCustomer}
              onValueChange={setSelectedCustomer}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Select customer</SelectItem>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.firstName} {customer.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Cashier</Label>
            <div className="flex items-center gap-2 p-2 bg-white rounded-md">
              <User className="w-4 h-4" />
              <span>Admin User</span>
            </div>
          </div>
          <div>
            <Label>Date</Label>
            <div className="p-2 bg-white rounded-md">
              {format(new Date(), "PPP")}
            </div>
          </div>
        </div>
      </div>

      {/* Cart - Right Side */}
      <div className="w-1/3 bg-white p-6 shadow-lg flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <ShoppingCart className="w-5 h-5" />
          <h2 className="text-xl font-bold">Current Sale</h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="space-y-4">
            {cart.map((item) => {
              const price = getProductPrice(item);
              return (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                    <span className="text-2xl">🛍️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <Separator className="my-6" />

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>VAT (10%)</span>
            <span>${vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-20"
              />
              <span>${discount.toFixed(2)}</span>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button 
            className="w-full bg-sky-800" 
            size="lg"
            disabled={cart.length === 0}
            onClick={completeSale}
          >
            Complete Sale
          </Button>
        </div>
      </div>
    </div>
  );
}
