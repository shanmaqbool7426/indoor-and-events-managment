import { useState } from "react";
import { Plus, Search, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { mockStaff, mockVenues } from "../data/mockData";
import { motion } from "motion/react";

export default function Staff() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = mockStaff.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Staff Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your team and assign shifts</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Staff Member
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
          placeholder="Search staff by name or role..."
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
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Staff</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{mockStaff.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {mockStaff.filter(s => s.status === 'active').length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Upcoming Shifts</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {mockStaff.reduce((acc, s) => acc + s.shifts.length, 0)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Roles</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {new Set(mockStaff.map(s => s.role)).size}
          </p>
        </div>
      </motion.div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStaff.map((staff, index) => (
          <motion.div
            key={staff.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <ImageWithFallback
                    src={staff.imageUrl}
                    alt={staff.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{staff.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{staff.role}</p>
                    <Badge className={`mt-2 ${
                      staff.status === 'active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {staff.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Phone className="h-4 w-4" />
                    <span>{staff.phone}</span>
                  </div>
                </div>

                {/* Assigned Venues */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Assigned Venues:</p>
                  <div className="flex flex-wrap gap-1">
                    {staff.venueIds.map((venueId) => {
                      const venue = mockVenues.find(v => v.id === venueId);
                      return venue ? (
                        <Badge key={venueId} variant="outline" className="text-xs">
                          {venue.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Upcoming Shifts */}
                {staff.shifts.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Upcoming Shifts:</p>
                    <div className="space-y-2">
                      {staff.shifts.map((shift) => {
                        const venue = mockVenues.find(v => v.id === shift.venueId);
                        return (
                          <div key={shift.id} className="flex items-center gap-2 text-sm p-2 bg-slate-50 dark:bg-slate-900 rounded">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <div className="flex-1">
                              <p className="font-medium text-slate-900 dark:text-white">{venue?.name}</p>
                              <p className="text-xs text-slate-600 dark:text-slate-400">
                                {new Date(shift.date).toLocaleDateString()} • {shift.startTime} - {shift.endTime}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Assign Shift
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-600 dark:text-slate-400">No staff members found</p>
        </motion.div>
      )}
    </div>
  );
}
