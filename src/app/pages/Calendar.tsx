import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "motion/react";
import { mockBookings, mockVenues } from "../data/mockData";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 24)); // March 24, 2026
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getBookingsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return mockBookings.filter(booking => {
      const matchesDate = booking.date === dateStr;
      const matchesVenue = !selectedVenue || booking.venueId === selectedVenue;
      return matchesDate && matchesVenue;
    });
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const bookings = getBookingsForDate(day);
    const isToday = day === 24 && currentDate.getMonth() === 2 && currentDate.getFullYear() === 2026;
    
    days.push(
      <motion.div
        key={day}
        whileHover={{ scale: 1.05 }}
        className={`aspect-square p-2 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer transition-all ${
          isToday ? 'bg-blue-50 dark:bg-blue-950 border-blue-600' : 'hover:bg-slate-50 dark:hover:bg-slate-900'
        }`}
      >
        <div className="h-full flex flex-col">
          <span className={`text-sm font-semibold ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>
            {day}
          </span>
          <div className="flex-1 mt-1 space-y-1 overflow-y-auto">
            {bookings.slice(0, 3).map((booking) => (
              <div
                key={booking.id}
                className={`text-xs p-1 rounded truncate ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' 
                    : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400'
                }`}
              >
                {booking.venueName.split(' ')[0]}
              </div>
            ))}
            {bookings.length > 3 && (
              <div className="text-xs text-slate-600 dark:text-slate-400">
                +{bookings.length - 3} more
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Calendar & Availability</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage bookings and block dates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Block Dates</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Booking
          </Button>
        </div>
      </motion.div>

      {/* Venue Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        <Button
          variant={selectedVenue === null ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedVenue(null)}
        >
          All Venues
        </Button>
        {mockVenues.slice(0, 5).map((venue) => (
          <Button
            key={venue.id}
            variant={selectedVenue === venue.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedVenue(venue.id)}
          >
            {venue.name}
          </Button>
        ))}
      </motion.div>

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={previousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {days}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Legend & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Legend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-green-100 dark:bg-green-950 border border-green-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Confirmed Booking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-orange-100 dark:bg-orange-950 border border-orange-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Pending Request</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-blue-50 dark:bg-blue-950 border-2 border-blue-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Today</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 rounded bg-red-100 dark:bg-red-950 border border-red-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Blocked Date</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Total Bookings</span>
                <Badge className="text-lg">
                  {mockBookings.filter(b => b.date.startsWith('2026-03') || b.date.startsWith('2026-04') || b.date.startsWith('2026-05')).length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Confirmed</span>
                <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                  {mockBookings.filter(b => b.status === 'confirmed').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Pending</span>
                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">
                  {mockBookings.filter(b => b.status === 'pending').length}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Revenue</span>
                <span className="text-lg font-bold text-green-600">
                  ${mockBookings.reduce((acc, b) => acc + b.totalAmount, 0).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
