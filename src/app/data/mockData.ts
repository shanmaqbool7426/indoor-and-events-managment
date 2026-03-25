import { Venue, Booking, Staff, Equipment, Promotion, TimeSlot, KPIData, RevenueData, AutomationRule, Notification } from '../types';

export const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Grand Ballroom',
    type: 'Wedding Hall',
    capacity: 500,
    location: 'Downtown Plaza',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8138d?w=800&q=80',
    status: 'active',
    published: true,
    stats: {
      revenue: 45000,
      occupancy: 85,
      bookings: 24
    },
    basePrice: 2500,
    amenities: ['Parking', 'Catering', 'AV Equipment', 'Dance Floor'],
    description: 'Elegant ballroom perfect for weddings and corporate events'
  },
  {
    id: '2',
    name: 'Rooftop Terrace',
    type: 'Event Space',
    capacity: 150,
    location: 'Skyline Tower',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    status: 'active',
    published: true,
    stats: {
      revenue: 28000,
      occupancy: 72,
      bookings: 18
    },
    basePrice: 1800,
    amenities: ['City Views', 'Bar', 'Lounge Area', 'Heating'],
    description: 'Stunning rooftop venue with panoramic city views'
  },
  {
    id: '3',
    name: 'Garden Pavilion',
    type: 'Outdoor Venue',
    capacity: 200,
    location: 'Riverside Park',
    imageUrl: 'https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?w=800&q=80',
    status: 'active',
    published: true,
    stats: {
      revenue: 32000,
      occupancy: 68,
      bookings: 16
    },
    basePrice: 2000,
    amenities: ['Garden', 'Gazebo', 'Outdoor Lighting', 'Tent Option'],
    description: 'Beautiful garden setting for outdoor celebrations'
  },
  {
    id: '4',
    name: 'Conference Center',
    type: 'Corporate',
    capacity: 300,
    location: 'Business District',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
    status: 'maintenance',
    published: false,
    stats: {
      revenue: 18000,
      occupancy: 45,
      bookings: 12
    },
    basePrice: 1500,
    amenities: ['Projector', 'Whiteboards', 'WiFi', 'Breakout Rooms'],
    description: 'Modern conference facility for business events'
  },
  {
    id: '5',
    name: 'Intimate Lounge',
    type: 'Private Party',
    capacity: 50,
    location: 'Arts District',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    status: 'active',
    published: true,
    stats: {
      revenue: 15000,
      occupancy: 92,
      bookings: 28
    },
    basePrice: 800,
    amenities: ['Bar', 'Sound System', 'Mood Lighting', 'VIP Area'],
    description: 'Cozy lounge perfect for intimate gatherings'
  },
  {
    id: '6',
    name: 'Beach Pavilion',
    type: 'Beach Wedding',
    capacity: 180,
    location: 'Coastal Avenue',
    imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    status: 'active',
    published: true,
    stats: {
      revenue: 38000,
      occupancy: 78,
      bookings: 20
    },
    basePrice: 2200,
    amenities: ['Beach Access', 'Sunset Views', 'Covered Area', 'Beach Decor'],
    description: 'Beachfront venue with stunning ocean views'
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'B001',
    venueId: '1',
    venueName: 'Grand Ballroom',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '+1 234-567-8901',
    date: '2026-04-15',
    startTime: '18:00',
    endTime: '23:00',
    status: 'pending',
    totalAmount: 5800,
    guestCount: 250,
    addOns: [
      { id: 'A1', name: 'Premium Catering', price: 2500, quantity: 1, type: 'catering' },
      { id: 'A2', name: 'DJ Service', price: 800, quantity: 1, type: 'service' }
    ],
    notes: 'Wedding reception - needs vegan menu options',
    createdAt: '2026-03-24T10:30:00Z',
    isHighValue: true
  },
  {
    id: 'B002',
    venueId: '2',
    venueName: 'Rooftop Terrace',
    customerName: 'Michael Chen',
    customerEmail: 'mchen@company.com',
    customerPhone: '+1 234-567-8902',
    date: '2026-03-28',
    startTime: '19:00',
    endTime: '22:00',
    status: 'confirmed',
    totalAmount: 2300,
    guestCount: 80,
    addOns: [
      { id: 'A3', name: 'Bar Service', price: 500, quantity: 1, type: 'service' }
    ],
    notes: 'Corporate mixer event',
    createdAt: '2026-03-20T14:15:00Z'
  },
  {
    id: 'B003',
    venueId: '3',
    venueName: 'Garden Pavilion',
    customerName: 'Emily Rodriguez',
    customerEmail: 'emily.r@email.com',
    customerPhone: '+1 234-567-8903',
    date: '2026-05-10',
    startTime: '15:00',
    endTime: '20:00',
    status: 'pending',
    totalAmount: 4200,
    guestCount: 150,
    addOns: [
      { id: 'A4', name: 'Garden Decorations', price: 1200, quantity: 1, type: 'service' },
      { id: 'A5', name: 'Photography Package', price: 1000, quantity: 1, type: 'service' }
    ],
    notes: 'Birthday celebration - needs kids entertainment',
    createdAt: '2026-03-23T09:45:00Z',
    isHighValue: true
  },
  {
    id: 'B004',
    venueId: '5',
    venueName: 'Intimate Lounge',
    customerName: 'David Park',
    customerEmail: 'd.park@email.com',
    customerPhone: '+1 234-567-8904',
    date: '2026-03-26',
    startTime: '20:00',
    endTime: '01:00',
    status: 'confirmed',
    totalAmount: 1200,
    guestCount: 35,
    addOns: [
      { id: 'A6', name: 'Premium Bar', price: 400, quantity: 1, type: 'service' }
    ],
    createdAt: '2026-03-18T16:20:00Z'
  },
  {
    id: 'B005',
    venueId: '1',
    venueName: 'Grand Ballroom',
    customerName: 'Jennifer Martinez',
    customerEmail: 'jmart@email.com',
    customerPhone: '+1 234-567-8905',
    date: '2026-04-20',
    startTime: '17:00',
    endTime: '22:00',
    status: 'pending',
    totalAmount: 6500,
    guestCount: 320,
    addOns: [
      { id: 'A7', name: 'Luxury Catering', price: 3000, quantity: 1, type: 'catering' },
      { id: 'A8', name: 'Live Band', price: 1000, quantity: 1, type: 'service' }
    ],
    notes: 'Anniversary gala - needs stage setup',
    createdAt: '2026-03-22T11:00:00Z',
    isHighValue: true
  }
];

export const mockStaff: Staff[] = [
  {
    id: 'S001',
    name: 'Alex Thompson',
    email: 'alex.t@venues.com',
    phone: '+1 234-567-9001',
    role: 'Event Manager',
    venueIds: ['1', '2'],
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    shifts: [
      { id: 'SH1', venueId: '1', date: '2026-03-28', startTime: '16:00', endTime: '23:00' },
      { id: 'SH2', venueId: '2', date: '2026-03-29', startTime: '18:00', endTime: '22:00' }
    ]
  },
  {
    id: 'S002',
    name: 'Maria Santos',
    email: 'maria.s@venues.com',
    phone: '+1 234-567-9002',
    role: 'Catering Supervisor',
    venueIds: ['1', '3', '6'],
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    shifts: [
      { id: 'SH3', venueId: '1', date: '2026-04-15', startTime: '14:00', endTime: '23:00' }
    ]
  },
  {
    id: 'S003',
    name: 'James Wilson',
    email: 'james.w@venues.com',
    phone: '+1 234-567-9003',
    role: 'Technical Support',
    venueIds: ['2', '4'],
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    shifts: []
  },
  {
    id: 'S004',
    name: 'Lisa Anderson',
    email: 'lisa.a@venues.com',
    phone: '+1 234-567-9004',
    role: 'Guest Services',
    venueIds: ['5'],
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    shifts: [
      { id: 'SH4', venueId: '5', date: '2026-03-26', startTime: '19:00', endTime: '02:00' }
    ]
  }
];

export const mockEquipment: Equipment[] = [
  {
    id: 'E001',
    name: 'Professional Sound System',
    type: 'Audio',
    venueIds: ['1', '2', '3'],
    status: 'available',
    quantity: 3,
    pricePerDay: 500,
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80'
  },
  {
    id: 'E002',
    name: 'LED Stage Lighting',
    type: 'Lighting',
    venueIds: ['1', '2', '5'],
    status: 'available',
    quantity: 5,
    pricePerDay: 350,
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80'
  },
  {
    id: 'E003',
    name: 'Projector & Screen',
    type: 'AV',
    venueIds: ['4'],
    status: 'in-use',
    quantity: 2,
    pricePerDay: 250,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80'
  },
  {
    id: 'E004',
    name: 'Dance Floor',
    type: 'Furniture',
    venueIds: ['1', '3', '6'],
    status: 'available',
    quantity: 2,
    pricePerDay: 800,
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80'
  },
  {
    id: 'E005',
    name: 'Portable Bar',
    type: 'Furniture',
    venueIds: ['2', '5', '6'],
    status: 'available',
    quantity: 4,
    pricePerDay: 200,
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&q=80'
  }
];

export const mockPromotions: Promotion[] = [
  {
    id: 'P001',
    name: 'Spring Special',
    code: 'SPRING2026',
    type: 'percentage',
    value: 15,
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    venueIds: ['1', '2', '3'],
    status: 'active',
    usageCount: 12,
    maxUsage: 50
  },
  {
    id: 'P002',
    name: 'Early Bird Discount',
    code: 'EARLYBIRD',
    type: 'percentage',
    value: 20,
    startDate: '2026-03-15',
    endDate: '2026-12-31',
    venueIds: ['1', '2', '3', '4', '5', '6'],
    status: 'active',
    usageCount: 28,
    maxUsage: 100
  },
  {
    id: 'P003',
    name: 'Corporate Package',
    code: 'CORP500',
    type: 'fixed',
    value: 500,
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    venueIds: ['2', '4'],
    status: 'active',
    usageCount: 8
  },
  {
    id: 'P004',
    name: 'Summer Weekday Deal',
    code: 'SUMMER24',
    type: 'percentage',
    value: 25,
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    venueIds: ['3', '6'],
    status: 'scheduled',
    usageCount: 0,
    maxUsage: 30
  }
];

export const mockKPIs: KPIData[] = [
  {
    title: 'Total Bookings Today',
    value: 3,
    change: 12.5,
    trend: 'up',
    icon: 'calendar'
  },
  {
    title: 'Revenue This Week',
    value: '$28,450',
    change: 8.3,
    trend: 'up',
    icon: 'dollar-sign'
  },
  {
    title: 'Average Occupancy',
    value: '75%',
    change: -2.1,
    trend: 'down',
    icon: 'percent'
  },
  {
    title: 'Pending Requests',
    value: 8,
    change: 0,
    trend: 'neutral',
    icon: 'clock'
  }
];

export const mockRevenueData: RevenueData[] = [
  { period: 'Jan', revenue: 45000, bookings: 32 },
  { period: 'Feb', revenue: 52000, bookings: 38 },
  { period: 'Mar', revenue: 58000, bookings: 42 },
  { period: 'Apr', revenue: 48000, bookings: 35 },
  { period: 'May', revenue: 65000, bookings: 48 },
  { period: 'Jun', revenue: 72000, bookings: 52 },
  { period: 'Jul', revenue: 68000, bookings: 50 },
  { period: 'Aug', revenue: 61000, bookings: 45 },
  { period: 'Sep', revenue: 55000, bookings: 40 },
  { period: 'Oct', revenue: 59000, bookings: 43 },
  { period: 'Nov', revenue: 63000, bookings: 46 },
  { period: 'Dec', revenue: 78000, bookings: 58 }
];

export const mockAutomationRules: AutomationRule[] = [
  {
    id: 'AR001',
    name: 'Auto-approve bookings over $5000',
    type: 'auto-approve',
    enabled: true,
    conditions: { minAmount: 5000 },
    actions: { approve: true, notifyCustomer: true }
  },
  {
    id: 'AR002',
    name: 'Weekend premium pricing (+30%)',
    type: 'auto-pricing',
    enabled: true,
    conditions: { days: ['Saturday', 'Sunday'] },
    actions: { priceMultiplier: 1.3 }
  },
  {
    id: 'AR003',
    name: 'Send booking reminder 48h before event',
    type: 'reminder',
    enabled: true,
    conditions: { hoursBefore: 48 },
    actions: { sendEmail: true, sendSMS: true }
  },
  {
    id: 'AR004',
    name: 'Notify staff 24h before shift',
    type: 'notification',
    enabled: true,
    conditions: { hoursBefore: 24, notifyType: 'staff' },
    actions: { sendEmail: true }
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'booking',
    title: 'New High-Value Booking',
    message: 'Sarah Johnson requested Grand Ballroom for $5,800',
    read: false,
    timestamp: '2026-03-24T10:30:00Z',
    actionUrl: '/bookings'
  },
  {
    id: 'N002',
    type: 'payment',
    title: 'Payment Received',
    message: 'Michael Chen paid $2,300 for Rooftop Terrace booking',
    read: false,
    timestamp: '2026-03-24T09:15:00Z'
  },
  {
    id: 'N003',
    type: 'staff',
    title: 'Staff Conflict Alert',
    message: 'Alex Thompson has overlapping shifts on March 28',
    read: true,
    timestamp: '2026-03-23T15:45:00Z',
    actionUrl: '/staff'
  },
  {
    id: 'N004',
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'David Park confirmed booking for Intimate Lounge',
    read: true,
    timestamp: '2026-03-23T11:20:00Z'
  }
];
