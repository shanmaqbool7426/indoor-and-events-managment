import { useState } from "react";
import { Plus, Search, TrendingUp, Tag, Calendar, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { mockPromotions, mockVenues, mockAutomationRules } from "../data/mockData";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Pricing() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPromotions = mockPromotions.filter((promo) =>
    promo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pricingRules = mockAutomationRules.filter(rule => rule.type === 'auto-pricing');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">Active</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">Scheduled</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">Inactive</Badge>;
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pricing & Promotions</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage pricing rules and promotional offers</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Promotion
        </Button>
      </motion.div>

      {/* Dynamic Pricing Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Dynamic Pricing Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pricingRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">{rule.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {rule.conditions.days?.join(', ')} • {rule.actions.priceMultiplier && `${((rule.actions.priceMultiplier - 1) * 100).toFixed(0)}% increase`}
                  </p>
                </div>
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(checked) => {
                    toast.success(checked ? 'Rule enabled' : 'Rule disabled');
                  }}
                />
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Pricing Rule
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Venue Base Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Venue Base Pricing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockVenues.map((venue) => (
                <div key={venue.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">{venue.name}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{venue.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${venue.basePrice}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">per event</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="search"
          placeholder="Search promotions by name or code..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Promotions</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{mockPromotions.length}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {mockPromotions.filter(p => p.status === 'active').length}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Usage</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {mockPromotions.reduce((acc, p) => acc + p.usageCount, 0)}
          </p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">Avg Discount</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {Math.round(mockPromotions.reduce((acc, p) => acc + (p.type === 'percentage' ? p.value : 0), 0) / mockPromotions.filter(p => p.type === 'percentage').length)}%
          </p>
        </div>
      </motion.div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPromotions.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Tag className="h-4 w-4 text-slate-400" />
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">{promo.name}</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">{promo.code}</p>
                  </div>
                  {getStatusBadge(promo.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Discount Value */}
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg text-center border border-green-200 dark:border-green-900">
                  <p className="text-3xl font-bold text-green-600">
                    {promo.type === 'percentage' ? `${promo.value}%` : `$${promo.value}`}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {promo.type === 'percentage' ? 'Percentage Off' : 'Fixed Amount Off'}
                  </p>
                </div>

                {/* Date Range */}
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                  </span>
                </div>

                {/* Usage Stats */}
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Usage</span>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">
                      {promo.usageCount}{promo.maxUsage ? ` / ${promo.maxUsage}` : ''}
                    </span>
                  </div>
                  {promo.maxUsage && (
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${(promo.usageCount / promo.maxUsage) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Applicable Venues */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Applies to:</p>
                  <div className="flex flex-wrap gap-1">
                    {promo.venueIds.slice(0, 3).map((venueId) => {
                      const venue = mockVenues.find(v => v.id === venueId);
                      return venue ? (
                        <Badge key={venueId} variant="outline" className="text-xs">
                          {venue.name}
                        </Badge>
                      ) : null;
                    })}
                    {promo.venueIds.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{promo.venueIds.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPromotions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-slate-600 dark:text-slate-400">No promotions found</p>
        </motion.div>
      )}
    </div>
  );
}
