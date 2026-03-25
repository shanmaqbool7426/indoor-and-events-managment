import { Calendar, DollarSign, Percent, Clock, Plus, TrendingUp } from "lucide-react";
import KPI from "../components/Dashboard/KPI";
import VenueCard from "../components/Dashboard/VenueCard";
import BookingRequestCard from "../components/Dashboard/BookingRequestCard";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { mockVenues, mockBookings, mockRevenueData } from "../data/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

export default function Dashboard() {
  const pendingBookings = mockBookings.filter(b => b.status === 'pending');
  const activeVenues = mockVenues.filter(v => v.status === 'active' && v.published).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back! Here's your venue overview</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Venue
          </Button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI
          title="Total Bookings Today"
          value={3}
          change={12.5}
          trend="up"
          icon={Calendar}
          index={0}
        />
        <KPI
          title="Revenue This Week"
          value="$28,450"
          change={8.3}
          trend="up"
          icon={DollarSign}
          index={1}
        />
        <KPI
          title="Average Occupancy"
          value="75%"
          change={-2.1}
          trend="down"
          icon={Percent}
          index={2}
        />
        <KPI
          title="Pending Requests"
          value={pendingBookings.length}
          change={0}
          trend="neutral"
          icon={Clock}
          index={3}
        />
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-800" />
                <XAxis 
                  dataKey="period" 
                  className="text-xs"
                  stroke="currentColor"
                />
                <YAxis 
                  className="text-xs"
                  stroke="currentColor"
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#0066FF" 
                  strokeWidth={2}
                  dot={{ fill: '#0066FF', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Booking Requests */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pending Requests</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {pendingBookings.slice(0, 3).map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <BookingRequestCard
                  booking={booking}
                  onApprove={(id) => console.log('Approve', id)}
                  onDecline={(id) => console.log('Decline', id)}
                  onReschedule={(id) => console.log('Reschedule', id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Performing Venues */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Top Performing Venues</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {activeVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <VenueCard
                  venue={venue}
                  onEdit={(venue) => console.log('Edit venue', venue)}
                  onTogglePublish={(id, published) => console.log('Toggle publish', id, published)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <Plus className="h-5 w-5" />
                <span className="text-xs">Add Venue</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">Block Dates</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs">Set Promotion</span>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                <DollarSign className="h-5 w-5" />
                <span className="text-xs">Update Pricing</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
