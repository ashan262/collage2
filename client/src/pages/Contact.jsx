import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageSquare,
  Calendar,
  Navigation,
} from "lucide-react";
import PageHero from "../components/PageHero";
import { contactAPI } from "../services/apiService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.submit(formData);
      toast.success("Message sent successfully! We will get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content:
        "Federal Government Degree College For Boys Dhoda Road Kohat Cantt",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "0333-6040021",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email",
      content: "fgdcbkohat@gmail.com",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon - Fri: 8:00 AM - 2:00 PM\nSaturday: 8:00 AM - 12:00 PM",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const departments = [
    {
      name: "Administration",
      phone: "0333-6040021",
      email: "fgdcbkohat@gmail.com",
      head: "Administrative Officer",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Contact Us"
        subtitle="Get in Touch with Federal Government Degree College For Boys Kohat Cantt"
        description="We're here to help! Reach out to us for any inquiries about admissions, academics, or general information."
        height="h-64 md:h-72"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        backgroundImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop"
      />

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${info.color}`}
                >
                  <info.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-800 mb-6">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about admissions, academics, or campus life?
                We're here to help. Send us a message and we'll get back to you
                as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                      <User
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                      <Mail
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+92-xxx-xxxxxxx"
                      />
                      <Phone
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={16}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admissions">Admissions</option>
                      <option value="academic">Academic</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Brief subject of your message"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Your detailed message..."
                    />
                    <MessageSquare
                      className="absolute left-3 top-3.5 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="spinner mr-2"></div>
                  ) : (
                    <Send className="mr-2" size={16} />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div>
              <h3 className="text-2xl font-heading font-bold text-gray-800 mb-6">
                Visit Our Campus
              </h3>

              {/* Directions */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Directions
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Located on Dhoda Road, Kohat Cantt</li>
                  <li>• Near Kohat Cantonment area</li>
                  <li>• Accessible by public transport</li>
                  <li>• Ample parking available on campus</li>
                </ul>
              </div>

              {/* Department Contacts */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Department Contacts
                </h4>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <h5 className="font-semibold text-gray-800 mb-2">
                        {dept.name}
                      </h5>
                      <p className="text-sm text-gray-600 mb-1">
                        Head: {dept.head}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Phone: {dept.phone}
                      </p>
                      <p className="text-sm text-gray-600">
                        Email: {dept.email}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Quick answers to common questions about Federal Government Degree
              College For Boys Kohat Cantt.
            </p>
          </div>{" "}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-3">
                What are the admission requirements?
              </h4>
              <p className="text-gray-600 text-sm">
                Students must have completed Matriculation with minimum 60%
                marks. Admission is based on merit and entrance test
                performance.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-3">
                When do admissions open?
              </h4>
              <p className="text-gray-600 text-sm">
                Admissions typically open in June-July for the new academic year
                starting in August. Check our website for exact dates.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-3">
                What programs do you offer?
              </h4>
              <p className="text-gray-600 text-sm">
                We offer FSc (Pre-Medical & Pre-Engineering), ICS (Computer
                Science), ICom (Commerce), and FA (Arts) programs.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="font-semibold text-gray-800 mb-3">
                Do you provide hostel facilities?
              </h4>
              <p className="text-gray-600 text-sm">
                Currently, we don't have hostel facilities. However, we can
                provide information about nearby accommodation options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
