export interface Venue {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  imageUrl: string;
  status: 'active' | 'maintenance' | 'inactive';
  published: boolean;
  stats: {
    revenue: number;
    occupancy: number;
    bookings: number;
  };
  basePrice: number;
  amenities: string[];
  description: string;
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'declined' | 'completed' | 'cancelled';
  totalAmount: number;
  addOns: AddOn[];
  guestCount: number;
  notes?: string;
  createdAt: string;
  isHighValue?: boolean;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  venueIds: string[];
  status: 'active' | 'inactive';
  imageUrl: string;
  shifts: Shift[];
}

export interface Shift {
  id: string;
  venueId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  venueIds: string[];
  status: 'available' | 'in-use' | 'maintenance';
  quantity: number;
  pricePerDay: number;
  imageUrl: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: 'catering' | 'equipment' | 'service' | 'vip';
}

export interface Promotion {
  id: string;
  name: string;
  code: string;
  type: 'percentage' | 'fixed' | 'membership';
  value: number;
  startDate: string;
  endDate: string;
  venueIds: string[];
  status: 'active' | 'inactive' | 'scheduled';
  usageCount: number;
  maxUsage?: number;
}

export interface TimeSlot {
  id: string;
  venueId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'blocked';
  price?: number;
  bookingId?: string;
}

export interface KPIData {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface RevenueData {
  period: string;
  revenue: number;
  bookings: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  type: 'auto-approve' | 'auto-pricing' | 'notification' | 'reminder';
  enabled: boolean;
  conditions: Record<string, any>;
  actions: Record<string, any>;
}

export interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'staff' | 'system';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}
