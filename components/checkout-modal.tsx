'use client'

import { useState, useRef, useEffect } from 'react'
import { Loader2, X } from 'lucide-react'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  selectedColor?: string
  onSuccess: () => void
}

interface FormData {
  name: string
  email: string
  countryCode: string
  phone: string
  address: string
  pincode: string
}

interface Errors {
  [key: string]: string
}

export function CheckoutModal({ isOpen, onClose, productName, selectedColor, onSuccess }: CheckoutModalProps) {
  const productDisplayName = selectedColor ? `${productName} - ${selectedColor}` : productName
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    address: '',
    pincode: '',
  })

  const [errors, setErrors] = useState<Errors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderId, setOrderId] = useState('ADO-X7R2K9')
  const [firstName, setFirstName] = useState('Customer')

  // Generate random order ID
  const generateOrderId = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomString = ''
    for (let i = 0; i < 6; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return `ADO-${randomString}`
  }

  // Extract first name from full name
  const getFirstName = (fullName: string): string => {
    if (!fullName.trim()) return 'Customer'
    return fullName.trim().split(/\s+/)[0]
  }

  // Scroll to top when success screen is shown
  useEffect(() => {
    if (isSubmitted && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [isSubmitted])

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: Errors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Shipping address is required'
    }

    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required'
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    // Special handling for phone - only allow digits
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10)
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }))
      if (errors.phone) {
        setErrors((prev) => ({ ...prev, phone: '' }))
      }
      return
    }

    // Special handling for pincode - only allow digits
    if (name === 'pincode') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6)
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }))
      if (errors.pincode) {
        setErrors((prev) => ({ ...prev, pincode: '' }))
      }
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Generate order ID and extract first name on submit
    const newOrderId = generateOrderId()
    const newFirstName = getFirstName(formData.name)
    setOrderId(newOrderId)
    setFirstName(newFirstName)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
    onSuccess()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      {!isSubmitted ? (
        <div ref={scrollContainerRef} className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-slate-900 p-8 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white">Secure Your Airdeks Workspace</h2>
            <p className="mt-2 text-sm text-slate-300">
              Complete your shipping profile below to reserve your{' '}
              <span className="font-semibold text-emerald-400">{productDisplayName}</span>. No credit card or advance
              digital payment required.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="mt-2 w-full rounded-lg border border-white/15 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="mt-2 w-full rounded-lg border border-white/15 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Phone with Country Code */}
            <div>
              <label className="block text-sm font-medium text-white">Phone</label>
              <div className="mt-2 flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value }))}
                  className="w-24 rounded-lg border border-white/15 bg-slate-800 px-3 py-2.5 text-white transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+61">🇦🇺 +61</option>
                  <option value="+81">🇯🇵 +81</option>
                  <option value="+86">🇨🇳 +86</option>
                  <option value="+33">🇫🇷 +33</option>
                  <option value="+49">🇩🇪 +49</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  maxLength={10}
                  className="flex-1 rounded-lg border border-white/15 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-white">
                Shipping Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Your complete shipping address"
                rows={3}
                className="mt-2 w-full rounded-lg border border-white/15 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {errors.address && <p className="mt-1 text-xs text-red-400">{errors.address}</p>}
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-white">
                Pincode (6 digits)
              </label>
              <input
                type="tel"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="560001"
                maxLength={6}
                className="mt-2 w-full rounded-lg border border-white/15 bg-slate-800 px-4 py-2.5 text-white placeholder-slate-500 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {errors.pincode && <p className="mt-1 text-xs text-red-400">{errors.pincode}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : (
                'Submit'
              )}
            </button>

            {/* Subtext */}
            <p className="text-center text-xs text-slate-400">
              By clicking, you agree to pay only upon safe physical delivery.
            </p>
          </form>
        </div>
      ) : (
        // Success Screen
        <div ref={scrollContainerRef} className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-slate-900 p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 hover:bg-white/10"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          <div className="space-y-6 text-white">
            {/* Success Header */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                <div className="h-8 w-8 rounded-full bg-emerald-500"></div>
              </div>
              <h2 className="text-2xl font-bold">Hello <span className="text-emerald-400">{firstName}</span>, Your <span className="text-emerald-400">{productDisplayName}</span> Workspace is Reserved.</h2>
            </div>
            <div className="space-y-4 rounded-lg border border-white/10 bg-slate-800/50 p-6">
                <p><span className="font-semibold">Order Reference: </span>{orderId}</p>
                <p><span className="font-semibold">Allocation Status: </span>Confirmed, Secured, and Priority-Queued.
                </p>
            </div>
            {/* Important Allocation Notice */}
            <div className="space-y-4 rounded-lg border border-white/10 bg-slate-800/50 p-6">
              <h3 className="font-semibold">An Important Update Regarding Your Shipment Timeline</h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>
                  We want to be completely transparent about your delivery window. Our latest production run has just reached 100% capacity and sold out due to ongoing demand from our corporate partners and remote professionals.
                </p>

                <p>
                  As a brand, we have always refused to compromise on the structural safety, material quality, and manual calibration of our desks. Because of this commitment, we craft our workstations in controlled, limited runs rather than rushing through mass production.
                </p>

                <p>
                  <span className="font-semibold text-white">The good news:</span> Your checkout was completed just before the system cutoff. Your priority allocation spot has been successfully locked into our next production run.
                </p>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="space-y-4 rounded-lg border border-white/10 bg-slate-800/50 p-6">
              <h3 className="font-semibold">What Happens Next?</h3>

              <div className="space-y-3 text-sm text-slate-300">

                <p>
                  <span className="font-semibold text-white">Estimated Dispatch Timeline:</span>{' '}
                  Your unit will be carefully assembled, tested for weight balance, and shipped out from our warehouse in exactly 12 days.
                </p>

                <p>
                  <span className="font-semibold text-white">Our Trust Promise:</span> Our team takes genuine pride in every single workstation that leaves our facility, which is why we require ₹0 upfront.
                </p>
              </div>
            </div>


            {/* WhatsApp CTA */}
            {(() => {
              // Build WhatsApp message with all details
              const whatsappMessage = `Hi! I wanted to follow up on my recent ${productDisplayName} reservation.\n\n*Order Details:*\nOrder ID: ${orderId}\nCustomer Name: ${formData.name}\nPhone: ${formData.countryCode}${formData.phone}\nShipping Address: ${formData.address}\nPincode: ${formData.pincode}\nProduct: ${productDisplayName}\n\nCould you please help me with priority handling for my dispatch queue? Thank you!`
              const whatsappLink = `https://wa.me/919969965182?text=${encodeURIComponent(whatsappMessage)}`

              return (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-4 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <span>Move to Priority Tracking via WhatsApp</span>
                  <span className="text-xs font-normal text-green-100">
                    Connects you with our dispatch desk to expedite your batch assignment.
                  </span>
                </a>
              )
            })()}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
