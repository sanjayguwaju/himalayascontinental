"use client";

import {
  Users,
  FileText,
  ClipboardList,
  Package,
  ShoppingCart,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Boxes,
  Building2,
} from "lucide-react";
import "./styles/admin-tailwind.css";
import { Button } from "../admin-ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../admin-ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../admin-ui/tabs";
import { Badge } from "../admin-ui/badge";

export function AdminDashboard() {
  return (
    <div className="adm:flex adm:flex-col">
      {/* Top Navbar */}
      <div className="adm:border-b adm:border-border/40 adm:bg-card">
        <div className="adm:flex adm:h-16 adm:items-center adm:px-4">
          <div className="adm:flex adm:items-center adm:gap-2">
            <Package className="adm:h-6 adm:w-6 adm:text-primary" />
            <span className="adm:font-semibold adm:text-lg">Himalayas Continental</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="adm:flex-1 adm:space-y-4 adm:p-4 md:adm:p-8 adm:pt-6">
        <div className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0">
          <div>
            <h2 className="adm:text-2xl sm:adm:text-3xl adm:font-bold adm:tracking-tight">
              Business Dashboard
            </h2>
            <p className="adm:text-sm adm:text-muted-foreground adm:mt-1">
              Overview of products, sales, and business operations
            </p>
          </div>
          <div className="adm:flex adm:items-center adm:space-x-2">
            <Button size="sm" variant="outline">
              Export Report
            </Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="adm:space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="adm:space-y-4">
            <div className="adm:flex adm:flex-nowrap adm:gap-4 adm:overflow-x-auto adm:pb-4 adm:-mx-4 adm:px-4 md:adm:mx-0 md:adm:px-0 md:adm:grid md:adm:grid-cols-2 lg:adm:grid-cols-4 md:adm:overflow-visible md:adm:pb-0">
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Total Products</CardTitle>
                  <Boxes className="adm:h-4 adm:w-4 adm:text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">156</div>
                  <p className="adm:text-xs adm:text-muted-foreground">Across 8 categories</p>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Pending Orders</CardTitle>
                  <ShoppingCart className="adm:h-4 adm:w-4 adm:text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">24</div>
                  <p className="adm:text-xs adm:text-muted-foreground">8 require processing</p>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Monthly Revenue</CardTitle>
                  <TrendingUp className="adm:h-4 adm:w-4 adm:text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">Rs. 2.4M</div>
                  <p className="adm:text-xs adm:text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Contact Inquiries</CardTitle>
                  <Users className="adm:h-4 adm:w-4 adm:text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">+18</div>
                  <p className="adm:text-xs adm:text-muted-foreground">5 new this week</p>
                </CardContent>
              </Card>
            </div>

            <div className="adm:flex adm:flex-nowrap adm:gap-4 adm:overflow-x-auto adm:pb-4 adm:-mx-4 adm:px-4 md:adm:mx-0 md:adm:px-0 md:adm:overflow-visible md:adm:pb-0">
              <Card className="adm:min-w-[300px] adm:w-full lg:adm:w-1/2 md:adm:min-w-0">
                <CardHeader>
                  <CardTitle>Products by Category</CardTitle>
                  <CardDescription>Distribution across product categories</CardDescription>
                </CardHeader>
                <CardContent className="adm:pl-2">
                  <div className="adm:flex adm:items-end adm:justify-between adm:h-[350px] adm:pb-4 adm:pt-4 adm:px-2">
                    {[
                      { name: "Medical Equipments", value: 180 },
                      { name: "International Business", value: 150 },
                      { name: "Medicines", value: 120 },
                      { name: "Surgical Supplies", value: 110 },
                      { name: "Diagnostics", value: 95 },
                      { name: "Patient Care", value: 80 },
                      { name: "Lab Equipment", value: 75 },
                      { name: "Imaging", value: 70 },
                    ].map((data, i) => (
                      <div
                        key={i}
                        className="adm:flex adm:flex-col adm:items-center adm:gap-2 adm:flex-1"
                      >
                        <div
                          className="adm:w-full adm:max-w-[2rem] adm:bg-primary adm:rounded-t-sm"
                          style={{ height: `${data.value}px`, maxHeight: "300px" }}
                        />
                        <span className="adm:text-[10px] sm:adm:text-xs adm:text-muted-foreground adm:hidden sm:adm:block">
                          {data.name}
                        </span>
                        <span className="adm:text-[10px] sm:adm:text-xs adm:text-muted-foreground sm:adm:hidden">
                          {data.name[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[300px] adm:w-full lg:adm:w-1/2 md:adm:min-w-0">
                <CardHeader>
                  <CardTitle>Recent Product Inquiries</CardTitle>
                  <CardDescription>Customer inquiries for products</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="adm:space-y-4">
                    {[
                      {
                        name: "Kathmandu Medical Center",
                        product: "Oxygen Concentrator 10L",
                        status: "Pending",
                        date: "2 days ago",
                      },
                      {
                        name: "HealthCare Solutions Pvt. Ltd.",
                        product: "Patient Monitor X3",
                        status: "Under Review",
                        date: "3 days ago",
                      },
                      {
                        name: "MediCare Hospital",
                        product: "Infusion Pump",
                        status: "Approved",
                        date: "1 week ago",
                      },
                      {
                        name: "BioMed Supplies Nepal",
                        product: "Surgical Instruments Set",
                        status: "Pending",
                        date: "1 week ago",
                      },
                      {
                        name: "City Diagnostics",
                        product: "Digital BP Monitor",
                        status: "Rejected",
                        date: "2 weeks ago",
                      },
                    ].map((inquiry, i) => (
                      <div key={i} className="adm:flex adm:items-center">
                        <div className="adm:flex adm:h-9 adm:w-9 adm:items-center adm:justify-center adm:rounded-full adm:bg-muted">
                          <ClipboardList className="adm:h-4 adm:w-4 adm:text-muted-foreground" />
                        </div>
                        <div className="adm:ml-4 adm:space-y-1 adm:flex-1 adm:min-w-0">
                          <p className="adm:text-sm adm:font-medium adm:leading-none adm:truncate">
                            {inquiry.name}
                          </p>
                          <p className="adm:text-xs adm:text-muted-foreground">{inquiry.product}</p>
                        </div>
                        <div className="adm:ml-2 adm:flex adm:items-center adm:gap-2">
                          <Badge
                            variant={
                              inquiry.status === "Approved"
                                ? "default"
                                : inquiry.status === "Rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="adm:text-xs"
                          >
                            {inquiry.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="products" className="adm:space-y-4">
            <div className="adm:grid adm:gap-4 md:adm:grid-cols-2 lg:adm:grid-cols-3">
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-base">Medical Equipments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-3xl adm:font-bold">85</div>
                  <p className="adm:text-xs adm:text-muted-foreground">
                    Critical care & diagnostic
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-base">Medicines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-3xl adm:font-bold">42</div>
                  <p className="adm:text-xs adm:text-muted-foreground">Pharmaceutical products</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-base">International Business</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-3xl adm:font-bold">29</div>
                  <p className="adm:text-xs adm:text-muted-foreground">Import/export products</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Category Overview</CardTitle>
                <CardDescription>Product distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="adm:flex adm:h-[300px] adm:items-center adm:justify-center adm:rounded-lg adm:border adm:border-dashed">
                  <p className="adm:text-sm adm:text-muted-foreground">
                    Category-wise product breakdown visualization
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="adm:space-y-4">
            <div className="adm:grid adm:gap-4 md:adm:grid-cols-2 lg:adm:grid-cols-4">
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">124</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold adm:text-amber-500">8</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold adm:text-green-500">98</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Cancelled</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold adm:text-red-500">18</div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Orders by Product Category</CardTitle>
                <CardDescription>Order distribution by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="adm:space-y-4">
                  {[
                    { category: "Medical Equipments", count: 56, color: "bg-blue-500" },
                    { category: "Medicines", count: 32, color: "bg-amber-500" },
                    { category: "International Business", count: 28, color: "bg-purple-500" },
                    { category: "Other Products", count: 8, color: "bg-gray-500" },
                  ].map((item, i) => (
                    <div key={i} className="adm:flex adm:items-center adm:gap-4">
                      <div className={`adm:h-2 adm:w-2 adm:rounded-full ${item.color}`} />
                      <div className="adm:flex-1">
                        <p className="adm:text-sm adm:font-medium">{item.category}</p>
                      </div>
                      <div className="adm:text-sm adm:font-bold">{item.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="adm:space-y-4">
            <div className="adm:grid adm:gap-4 md:adm:grid-cols-2 lg:adm:grid-cols-4">
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Total Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">156</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Notices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">24</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Press Releases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">18</div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Content Activity</CardTitle>
                <CardDescription>Latest updates and publications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="adm:space-y-4">
                  {[
                    {
                      title: "Health Camp Announcement",
                      type: "Notice",
                      date: "Today",
                      status: "Published",
                    },
                    {
                      title: "New Equipment Procurement",
                      type: "News",
                      date: "Yesterday",
                      status: "Published",
                    },
                    {
                      title: "Staff Training Program",
                      type: "Press Release",
                      date: "2 days ago",
                      status: "Draft",
                    },
                    {
                      title: "Community Health Workshop",
                      type: "Event",
                      date: "3 days ago",
                      status: "Published",
                    },
                  ].map((item, i) => (
                    <div key={i} className="adm:flex adm:items-center adm:gap-4">
                      <div className="adm:flex adm:h-9 adm:w-9 adm:items-center adm:justify-center adm:rounded-full adm:bg-muted">
                        <FileText className="adm:h-4 adm:w-4 adm:text-muted-foreground" />
                      </div>
                      <div className="adm:flex-1 adm:min-w-0">
                        <p className="adm:text-sm adm:font-medium adm:truncate">{item.title}</p>
                        <p className="adm:text-xs adm:text-muted-foreground">
                          {item.type} • {item.date}
                        </p>
                      </div>
                      <Badge
                        variant={item.status === "Published" ? "default" : "secondary"}
                        className="adm:text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
