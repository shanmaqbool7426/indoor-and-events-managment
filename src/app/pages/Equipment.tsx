import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { mockEquipment, mockVenues } from "../data/mockData";
import { motion } from "motion/react";

export default function Equipment() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEquipment = mockEquipment.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">Available</Badge>;
      case 'in-use':
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">In Use</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">Maintenance</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Equipment Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track and manage venue equipment</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
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
          placeholder="Search equipment by name or type..."
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
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Items</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {mockEquipment.reduce((acc, e) => acc + e.quantity, 0)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Available</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {mockEquipment.filter(e => e.status === 'available').reduce((acc, e) => acc + e.quantity, 0)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">In Use</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {mockEquipment.filter(e => e.status === 'in-use').reduce((acc, e) => acc + e.quantity, 0)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Categories</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {new Set(mockEquipment.map(e => e.type)).size}
          </p>
        </div>
      </motion.div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEquipment.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(item.status)}
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.type}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Quantity & Price */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Quantity</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Price/Day</p>
                    <p className="text-lg font-bold text-green-600">${item.pricePerDay}</p>
                  </div>
                </div>

                {/* Assigned Venues */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Available at:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.venueIds.map((venueId) => {
                      const venue = mockVenues.find(v => v.id === venueId);
                      return venue ? (
                        <Badge key={venueId} variant="outline" className="text-xs">
                          {venue.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Track Usage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredEquipment.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-600 dark:text-slate-400">No equipment found</p>
        </motion.div>
      )}
    </div>
  );
}
