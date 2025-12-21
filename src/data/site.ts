export const site = {
  name: 'HG Cuisine',
  contactName: 'Henry Ghanney',
  email: 'hgcuisine06@gmail.com',
  phone: '3478335484',
  formattedPhone: '(347) 833-5484',
  locationLabel: 'By appointment • Available for travel',
  bookingEmailSubject: 'HG Cuisine — Booking Request',
} as const

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Booking', to: '/booking' },
  { label: 'Contact', to: '/contact' },
] as const
