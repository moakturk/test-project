"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, CheckCircle } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <div className="backdrop-blur-xl bg-gradient-to-br from-primary-900/20 to-primary-900/10 border-2 border-primary-500/50 rounded-2xl p-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
          <p className="text-gray-400">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-900/80 to-gray-900/40 border border-gray-800 rounded-2xl p-8 shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Send us a Message</h2>
        <p className="text-gray-400">
          Fill out the form below and we'll get back to you as soon as possible
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@company.com"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-300">Company Name</Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-0000"
              className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-gray-300">Message *</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Tell us about your automation needs..."
            className="min-h-[150px] bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary-500"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/30"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
