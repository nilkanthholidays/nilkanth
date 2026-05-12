'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const text = `Name: ${name}%0aEmail: ${email}%0aMessage: ${message}`;
    const whatsappURL = `https://wa.me/916353853297?text=${text}`;
    window.open(whatsappURL, '_blank');

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-16 px-4 bg-background" id="get-in-touch">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 text-foreground">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <div className="flex flex-col justify-start">
            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <span>📩</span> Contact Us
            </h3>
            <form onSubmit={sendToWhatsApp} className="space-y-4 flex-grow flex flex-col">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-secondary border-border focus:ring-foreground"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full bg-secondary border-border focus:ring-foreground"
                />
              </div>

              <div className="flex-grow">
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel plans..."
                  rows={5}
                  required
                  className="w-full bg-secondary border-border focus:ring-foreground min-h-48"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold py-3 text-base transition-all duration-300"
              >
                Send on WhatsApp
              </Button>
            </form>
          </div>

          {/* Office Info & Map */}
          <div className="flex flex-col justify-start">
            <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
              <span>📍</span> Our Office
            </h3>

            {/* Office Details */}
            <div className="mb-6 space-y-4 text-foreground">
              <div>
                <p className="font-bold text-lg">Nilkanth Holidays</p>
                <p className="text-muted-foreground mt-2 leading-relaxed text-sm">
                  Second Floor, Satva Complex, 204,<br />
                  NR Sindhu Bhavan Rd, Thaltej,<br />
                  Ahmedabad, Gujarat 380059
                </p>
              </div>

              <div>
                <p className="font-bold text-sm mb-3">Phone Numbers</p>
                <div className="space-y-2">
                  <a
                    href="tel:+916353853297"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span>📞</span> +91 63538 53297
                  </a>
                  <a
                    href="tel:+918866653297"
                    className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <span>📞</span> +91 88666 53297
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="overflow-hidden rounded-lg border border-border shadow-md h-72">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.55123456789!2d72.5056085!3d23.0479272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8530064d2713%3A0x30ba0e8054dbf273!2sNilkanth%20Holidays!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
