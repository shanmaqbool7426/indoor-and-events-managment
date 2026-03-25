import { Venue } from "../../types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { MapPin, Users, DollarSign, TrendingUp, Edit, MoreVertical } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { motion } from "motion/react";
import { toast } from "sonner";

interface VenueCardProps {
  venue: Venue;
  onEdit?: (venue: Venue) => void;
  onTogglePublish?: (venueId: string, published: boolean) => void;
}

export default function VenueCard({ venue, onEdit, onTogglePublish }: VenueCardProps) {
  const getStatusBadge = () => {
    switch (venue.status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">Maintenance</Badge>;
      case 'inactive':
        return <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">Inactive</Badge>;
    }
  };

  const handleTogglePublish = (checked: boolean) => {
    onTogglePublish?.(venue.id, checked);
    toast.success(checked ? 'Venue published' : 'Venue unpublished');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden h-full">
        <div className="relative h-48">
          <ImageWithFallback
            src={venue.imageUrl}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            {getStatusBadge()}
          </div>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{venue.name}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4" />
                <span>{venue.location}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(venue)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Details
                </DropdownMenuItem>
                <DropdownMenuItem>View Calendar</DropdownMenuItem>
                <DropdownMenuItem>View Bookings</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Delete Venue</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Users className="h-4 w-4" />
            <span>Capacity: {venue.capacity} guests</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mb-1">
                <DollarSign className="h-3 w-3" />
                <span>Revenue</span>
              </div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">
                ${(venue.stats.revenue / 1000).toFixed(0)}k
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mb-1">
                <TrendingUp className="h-3 w-3" />
                <span>Occupancy</span>
              </div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">
                {venue.stats.occupancy}%
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mb-1">
                <Users className="h-3 w-3" />
                <span>Bookings</span>
              </div>
              <p className="font-semibold text-sm text-slate-900 dark:text-white">
                {venue.stats.bookings}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Switch
                checked={venue.published}
                onCheckedChange={handleTogglePublish}
                id={`publish-${venue.id}`}
              />
              <label htmlFor={`publish-${venue.id}`} className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                Published
              </label>
            </div>
            <Button size="sm" variant="outline" onClick={() => onEdit?.(venue)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
