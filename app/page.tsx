"use client";
import { cn } from "@/lib/utils";
import type { TableColumnsType } from "antd";
import { Avatar, Badge, Card, Progress, Table, Tag } from "antd";
import {
  FiArrowDown,
  FiArrowUp,
  FiDollarSign,
  FiPackage,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

interface OrderData {
  key: string;
  orderId: string;
  customer: string;
  product: string;
  amount: number;
  status: "pending" | "completed" | "cancelled" | "processing";
  date: string;
}

interface ProductData {
  name: string;
  sales: number;
  revenue: number;
  stock: number;
}

export default function Home() {
  // Stats data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      isPositive: true,
      icon: <FiDollarSign className="text-2xl" />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Total Orders",
      value: "1,234",
      change: "+8.2%",
      isPositive: true,
      icon: <FiShoppingCart className="text-2xl" />,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      title: "Total Customers",
      value: "2,345",
      change: "+15.3%",
      isPositive: true,
      icon: <FiUsers className="text-2xl" />,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-2.1%",
      isPositive: false,
      icon: <FiTrendingUp className="text-2xl" />,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
    },
  ];

  // Recent orders data
  const ordersData: OrderData[] = [
    {
      key: "1",
      orderId: "#ORD-001",
      customer: "John Doe",
      product: "Wireless Headphones",
      amount: 299.99,
      status: "completed",
      date: "2025-01-01",
    },
    {
      key: "2",
      orderId: "#ORD-002",
      customer: "Jane Smith",
      product: "Smart Watch",
      amount: 499.99,
      status: "processing",
      date: "2025-01-01",
    },
    {
      key: "3",
      orderId: "#ORD-003",
      customer: "Bob Johnson",
      product: "Laptop Stand",
      amount: 79.99,
      status: "pending",
      date: "2024-12-31",
    },
    {
      key: "4",
      orderId: "#ORD-004",
      customer: "Alice Brown",
      product: "Mechanical Keyboard",
      amount: 149.99,
      status: "completed",
      date: "2024-12-31",
    },
    {
      key: "5",
      orderId: "#ORD-005",
      customer: "Charlie Wilson",
      product: "USB-C Hub",
      amount: 59.99,
      status: "cancelled",
      date: "2024-12-30",
    },
  ];

  // Top products data
  const topProducts: ProductData[] = [
    { name: "Wireless Headphones", sales: 234, revenue: 23400, stock: 45 },
    { name: "Smart Watch", sales: 189, revenue: 18900, stock: 23 },
    { name: "Laptop Stand", sales: 156, revenue: 7800, stock: 67 },
    { name: "Mechanical Keyboard", sales: 143, revenue: 14300, stock: 12 },
    { name: "USB-C Hub", sales: 98, revenue: 4900, stock: 89 },
  ];

  // Table columns
  const columns: TableColumnsType<OrderData> = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      render: (text) => (
        <span className="font-medium text-blue-600">{text}</span>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (text) => (
        <div className="flex items-center gap-2">
          <Avatar size="small">{text[0]}</Avatar>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span className="font-semibold">${amount.toFixed(2)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: OrderData["status"]) => {
        const statusConfig = {
          completed: { color: "green", text: "Completed" },
          processing: { color: "blue", text: "Processing" },
          pending: { color: "orange", text: "Pending" },
          cancelled: { color: "red", text: "Cancelled" },
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your store
            today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-1">
                  {stat.isPositive ? (
                    <FiArrowUp className="text-green-500 text-sm" />
                  ) : (
                    <FiArrowDown className="text-red-500 text-sm" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      stat.isPositive ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-400">vs last period</span>
                </div>
              </div>
              <div className={cn("p-3 rounded-lg", stat.bgColor)}>
                <div className={stat.iconColor}>{stat.icon}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <div className="lg:col-span-2">
          <Card
            title={
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Recent Orders</span>
                <Badge count={ordersData.length} showZero color="#1890ff" />
              </div>
            }
            className="shadow-sm"
          >
            <Table
              columns={columns}
              dataSource={ordersData}
              pagination={false}
              size="small"
            />
          </Card>
        </div>

        {/* Top Products - Takes 1 column */}
        <div>
          <Card
            title={
              <div className="flex items-center gap-2">
                <FiPackage className="text-blue-500" />
                <span className="text-lg font-semibold">Top Products</span>
              </div>
            }
            className="shadow-sm"
          >
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.sales} sales • $
                        {product.revenue.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded",
                        product.stock < 20
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      )}
                    >
                      {product.stock} left
                    </span>
                  </div>
                  <Progress
                    percent={(product.sales / 250) * 100}
                    showInfo={false}
                    strokeColor={product.stock < 20 ? "#ef4444" : "#3b82f6"}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Sales Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <Card
          title={
            <span className="text-lg font-semibold">Sales by Category</span>
          }
          className="shadow-sm"
        >
          <div className="space-y-4">
            {[
              { name: "Electronics", value: 45, color: "#3b82f6" },
              { name: "Clothing", value: 30, color: "#8b5cf6" },
              { name: "Home & Garden", value: 15, color: "#10b981" },
              { name: "Sports", value: 10, color: "#f59e0b" },
            ].map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {category.value}%
                  </span>
                </div>
                <Progress
                  percent={category.value}
                  showInfo={false}
                  strokeColor={category.color}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card
          title={<span className="text-lg font-semibold">Recent Activity</span>}
          className="shadow-sm"
        >
          <div className="space-y-4">
            {[
              {
                action: "New order placed",
                user: "John Doe",
                time: "2 minutes ago",
                type: "order",
              },
              {
                action: "Product out of stock",
                user: "System",
                time: "15 minutes ago",
                type: "alert",
              },
              {
                action: "New customer registered",
                user: "Jane Smith",
                time: "1 hour ago",
                type: "user",
              },
              {
                action: "Payment received",
                user: "Bob Johnson",
                time: "2 hours ago",
                type: "payment",
              },
              {
                action: "Review posted",
                user: "Alice Brown",
                time: "3 hours ago",
                type: "review",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    activity.type === "order" && "bg-blue-100",
                    activity.type === "alert" && "bg-red-100",
                    activity.type === "user" && "bg-green-100",
                    activity.type === "payment" && "bg-purple-100",
                    activity.type === "review" && "bg-orange-100"
                  )}
                >
                  <span className="text-xs font-semibold">
                    {activity.user[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
