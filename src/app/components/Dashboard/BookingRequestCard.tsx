import { Booking } from "../../types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Calendar, Clock, Users, DollarSign, Mail, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface BookingRequestCardProps {
  booking: Booking;
  onApprove?: (bookingId: string) => void;
  onDecline?: (bookingId: string) => void;
  onReschedule?: (bookingId: string) => void;
}

export default function BookingRequestCard({ booking, onApprove, onDecline, onReschedule }: BookingRequestCardProps) {
  const getStatusBadge = () => {
    switch (booking.status) {
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">Confirmed</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400">Declined</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">Cancelled</Badge>;
    }
  };

  const handleApprove = () => {
    onApprove?.(booking.id);
    toast.success(`Booking ${booking.id} approved and confirmation sent to ${booking.customerName}`);
  };

  const handleDecline = () => {
    onDecline?.(booking.id);
    toast.error(`Booking ${booking.id} declined`);
  };

  const handleReschedule = () => {
    onReschedule?.(booking.id);
    toast.info('Reschedule request sent to customer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{booking.venueName}</h3>
                {booking.isHighValue && (
                  <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400">
                    High Value
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Booking #{booking.id}</p>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Info */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <p className="font-semibold text-sm text-slate-900 dark:text-white mb-2">{booking.customerName}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Mail className="h-3 w-3" />
                <span>{booking.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Phone className="h-3 w-3" />
                <span>{booking.customerPhone}</span>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-slate-900 dark:text-white">
                {new Date(booking.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="text-slate-900 dark:text-white">
                {booking.startTime} - {booking.endTime}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-slate-400" />
              <span className="text-slate-900 dark:text-white">{booking.guestCount} guests</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-slate-400" />
              <span className="font-semibold text-slate-900 dark:text-white">
                ${booking.totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Add-ons */}
          {booking.addOns.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Add-ons:</p>
              <div className="flex flex-wrap gap-1">
                {booking.addOns.map((addon) => (
                  <Badge key={addon.id} variant="outline" className="text-xs">
                    {addon.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {booking.notes && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                <p className="text-xs text-blue-900 dark:text-blue-300">{booking.notes}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          {booking.status === 'pending' && (
            <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                size="sm"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                onClick={handleApprove}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={handleReschedule}
              >
                Reschedule
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={handleDecline}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Decline
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
