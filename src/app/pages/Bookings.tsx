import { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";
import BookingRequestCard from "../components/Dashboard/BookingRequestCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockBookings } from "../data/mockData";
import { motion } from "motion/react";

export default function Bookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filterBookings = (status?: string) => {
    return mockBookings.filter((booking) => {
      const matchesSearch = booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           booking.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           booking.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !status || booking.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const allBookings = filterBookings();
  const pendingBookings = filterBookings('pending');
  const confirmedBookings = filterBookings('confirmed');
  const completedBookings = filterBookings('completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Bookings & Requests</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage and track all venue bookings</p>
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="search"
          placeholder="Search by customer name, venue, or booking ID..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Bookings</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{mockBookings.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {mockBookings.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Confirmed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {mockBookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            ${mockBookings.reduce((acc, b) => acc + b.totalAmount, 0).toLocaleString()}
          </p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto">
            <TabsTrigger value="all">All ({allBookings.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {allBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pendingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
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
            {pendingBookings.length === 0 && (
              <p className="text-center text-slate-600 dark:text-slate-400 py-12">
                No pending bookings
              </p>
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {confirmedBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BookingRequestCard booking={booking} />
                </motion.div>
              ))}
            </div>
            {confirmedBookings.length === 0 && (
              <p className="text-center text-slate-600 dark:text-slate-400 py-12">
                No confirmed bookings
              </p>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {completedBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BookingRequestCard booking={booking} />
                </motion.div>
              ))}
            </div>
            {completedBookings.length === 0 && (
              <p className="text-center text-slate-600 dark:text-slate-400 py-12">
                No completed bookings
              </p>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
