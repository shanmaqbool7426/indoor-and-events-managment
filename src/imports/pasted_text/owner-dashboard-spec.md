1. Global App Settings
WebApp type & breakpoints
Mobile-first: base viewport 390px; desktop canvas 1440px
Breakpoints: sm:640, md:768, lg:1024, xl:1280, 2xl:1536
Primary persona
Venue Owner: manage multiple venues, staff, availability, pricing, bookings, equipment, promotions
Tone & Layout
Clean, card-based dashboards, actionable CTAs, high contrast, subtle micro-interactions, real-time updates
2. Owner Dashboard – Screen Overview

Top-to-bottom layout (mobile + desktop)

Sidebar Navigation (collapsible)
Dashboard overview
Venue Listings
Calendar / Availability
Bookings & Requests
Staff / Equipment Management
Pricing & Promotions
Revenue & Analytics
Settings & Integrations
Overview / KPI Cards
Total Bookings Today / Week / Month
Revenue snapshot (today / week / month)
Occupancy %
Pending Requests / Approvals
Quick Actions (Add New Venue, Set Promotions)
Venue Listings Management
List of venues with:
Quick stats: revenue, occupancy, bookings
Publish / Unpublish toggle
Edit venue details inline
Automated status indicators (e.g., Fully Booked, Slots Open, Maintenance)
Availability & Calendar Automation
Interactive calendar with drag-and-drop slots
Bulk update (block dates, recurring availability)
Smart auto-pricing based on demand or day/time
Auto-notifications to customers when availability changes
Bookings & Requests
Incoming booking requests with automated rules (accept high-value automatically)
Approve / Decline / Reschedule buttons
Real-time notifications & chat with customers
Automated confirmation emails / SMS / WhatsApp integration
Staff & Resource Management
Assign staff to venues or shifts
Track equipment availability
Automated reminders & conflict alerts
Pricing & Promotions
Dynamic pricing (peak vs off-peak, special dates)
Add-ons: catering, equipment, VIP packages
Promo codes, discounts, membership perks
Auto-apply best promotion rules per booking
Revenue & Analytics
Charts: revenue by period, occupancy rates, top venues
Export CSV / PDF
Predicted revenue & peak demand forecast
Automated alerts on underperforming venues
Automations & Integrations
Payment gateway (Stripe + local options)
Accounting export (QuickBooks / Xero)
Email / SMS / WhatsApp notifications
API for third-party apps
Settings
Profile, bank/payment accounts, notifications
Automated workflow rules (auto-approve bookings, send reminders)
User management (staff roles, permissions)
3. Component Library (Owner-Centric)
Layout
Navbar (logo, notifications, quick actions)
Sidebar (collapsible, role-based)
Footer (support, documentation links)
Inputs & Controls
Select / MultiSelect (categories, staff, resources)
Toggle (availability, auto-pricing, publish/unpublish)
Date & Time Pickers (for slots)
Range Slider (pricing, capacity)
Cards
VenueCard (with stats, quick actions, occupancy)
BookingRequestCard (approve / decline / reschedule)
StaffCard, EquipmentCard
Media
GalleryCarousel, VideoPlayer (for venue showcase)
Booking / Automation
CalendarSlotPicker (editable slots, auto-updates)
BookingSummary (customer & booking details)
AddOnItem (extra services & equipment)
Analytics
KPI Card, ChartCard wrapper, ForecastCard
Feedback & Notifications
Toasts (booking updates)
Modal (confirm actions)
Skeleton loaders for large dashboards
4. Next.js + Tailwind Component Structure
/components/Layout/
Navbar.tsx (notifications, quick actions)
Sidebar.tsx (props: role, collapse state)
Footer.tsx
/components/Dashboard/
KPI.tsx (props: title, value, icon, trend)
VenueCard.tsx (props: venue, stats, onEdit)
BookingRequestCard.tsx
CalendarSlotPicker.tsx
StaffCard.tsx
EquipmentCard.tsx
/components/UI/
Button.tsx, Toggle.tsx, Select.tsx, MultiSelect.tsx, Modal.tsx, Toast.tsx
ChartCard.tsx, ForecastCard.tsx
/components/Automation/
PromoManager.tsx, AutoRulesManager.tsx
NotificationSettings.tsx

Props & TypeScript Interfaces should cover stats, availability, bookings, pricing rules, staff, resources, and promotions.

5. UI Kit & Tokens (Owner System)
Colors
Primary: #0066FF (action)
Success: #16A34A
Danger: #E02424
Warning: #FFB020
Neutral: slate-900 / slate-700 / slate-400
Background: light: #F7FAFC, dark: #0F172A
Typography
Inter UI / Merriweather headings
Base: 16px, scale 14–40px
Weights: 400 / 600 / 700
Spacing & Radius
Spacing: 4, 8, 12, 16, 24, 32, 48
Border-radius: 4px / 8px / 16px
Dark Mode
Swap background/text roles, maintain color accents
Animations
Micro-interactions for cards, buttons, modals
Framer Motion snippets as previously described
6. Owner Flow Diagram
Dashboard → Venue Listings → Edit Venue → Calendar → Booking Requests → Auto Approve / Notify → Revenue Reports → Promotions → Staff/Resource → Settings
Automations: Auto-pricing, Auto-approve high-value bookings, Auto-notifications to staff/customers, Auto-email/SMS reminders
7. Accessibility & QA Checklist
Keyboard navigation (all dashboards, calendar, cards)
ARIA labels on interactive widgets
High contrast, responsive typography
Lazy-load charts, calendars, and images
Optimized for desktop and mobile with mobile-first CSS

✅ Outcome: Using this prompt, the AI generates a full venue-owner management SaaS, covering every automation, dashboard, booking, and resource management feature, with Next.js + Tailwind component specs, reusable UI library, mockups, responsive design, and Framer Motion interactions.

If you want, I can rewrite this prompt as a single ultra-detailed AI prompt you can feed directly to ChatGPT, so it will output all screens, Next.js components, props, mockups, and automation flows for only owners, ready to implement.

Do you want me to do that next?

giv 