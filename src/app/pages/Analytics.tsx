import { Download, TrendingUp, DollarSign, Calendar, Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockRevenueData, mockVenues, mockBookings } from "../data/mockData";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "motion/react";

export default function Analytics() {
  // Venue performance data
  const venuePerformance = mockVenues.map(venue => ({
    name: venue.name,
    revenue: venue.stats.revenue,
    occupancy: venue.stats.occupancy,
    bookings: venue.stats.bookings
  }));

  // Booking status distribution
  const bookingStatusData = [
    { name: 'Confirmed', value: mockBookings.filter(b => b.status === 'confirmed').length, color: '#16A34A' },
    { name: 'Pending', value: mockBookings.filter(b => b.status === 'pending').length, color: '#FFB020' },
    { name: 'Completed', value: mockBookings.filter(b => b.status === 'completed').length, color: '#0066FF' },
    { name: 'Cancelled', value: mockBookings.filter(b => b.status === 'cancelled').length, color: '#E02424' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Revenue & Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track performance and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  ${mockRevenueData.reduce((acc, d) => acc + d.revenue, 0).toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% vs last year
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-50 dark:bg-green-950 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {mockRevenueData.reduce((acc, d) => acc + d.bookings, 0)}
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8.3% vs last year
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Avg. Occupancy</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {Math.round(mockVenues.reduce((acc, v) => acc + v.stats.occupancy, 0) / mockVenues.length)}%
                </p>
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 rotate-180" />
                  -2.1% vs last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Avg. Guests</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {Math.round(mockBookings.reduce((acc, b) => acc + b.guestCount, 0) / mockBookings.length)}
                </p>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% vs last month
                </p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="venues">Venue Performance</TabsTrigger>
          <TabsTrigger value="bookings">Booking Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue & Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={mockRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="period" stroke="currentColor" />
                    <YAxis yAxisId="left" stroke="currentColor" tickFormatter={(value) => `$${value / 1000}k`} />
                    <YAxis yAxisId="right" orientation="right" stroke="currentColor" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#0066FF" strokeWidth={3} name="Revenue ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="bookings" stroke="#16A34A" strokeWidth={3} name="Bookings" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="venues" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={venuePerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="name" stroke="currentColor" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="currentColor" tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Bar dataKey="revenue" fill="#0066FF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate by Venue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={venuePerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                    <XAxis dataKey="name" stroke="currentColor" angle={-45} textAnchor="end" height={100} />
                    <YAxis stroke="currentColor" tickFormatter={(value) => `${value}%`} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                      formatter={(value: number) => [`${value}%`, 'Occupancy']}
                    />
                    <Bar dataKey="occupancy" fill="#16A34A" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Booking Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={bookingStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bookingStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Venues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {venuePerformance
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 6)
                      .map((venue, index) => (
                        <div key={venue.name} className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{venue.name}</p>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              {venue.bookings} bookings • {venue.occupancy}% occupancy
                            </p>
                          </div>
                          <p className="font-bold text-green-600">${(venue.revenue / 1000).toFixed(0)}k</p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Predicted Revenue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Next Month</p>
                <p className="text-3xl font-bold text-purple-600">$82k</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">+5% predicted growth</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Peak Season</p>
                <p className="text-3xl font-bold text-pink-600">Jun-Aug</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Highest demand period</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-900 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Underperforming</p>
                <p className="text-3xl font-bold text-orange-600">1</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Venue needs attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
