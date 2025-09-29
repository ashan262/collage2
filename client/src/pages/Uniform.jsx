import React, { useState } from "react";
import {
  Shirt,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";

const Uniform = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const uniformSpecs = {
    boys: {
      regular: {
        shirt: "White full sleeve shirt with college monogram",
        pants: "Dark gray formal pants",
        tie: "College tie with blue and white stripes",
        shoes: "Black formal leather shoes",
        socks: "Black formal socks",
        blazer: "Navy blue blazer with college crest (Winter)",
        sweater: "Navy blue V-neck sweater (Winter optional)",
      },
      sports: {
        shirt: "White polo shirt with college logo",
        shorts: "Navy blue sports shorts",
        tracksuit: "Navy blue tracksuit with college name",
        shoes: "White sports shoes",
        socks: "White sports socks",
      },
    },
    girls: {
      regular: {
        shirt: "White full sleeve shirt with college monogram",
        pants: "Dark gray formal pants or navy blue dupatta",
        scarf: "White dupatta/scarf (for those who choose)",
        shoes: "Black formal shoes (closed toe)",
        socks: "Black formal socks",
        blazer: "Navy blue blazer with college crest (Winter)",
        sweater: "Navy blue cardigan or pullover (Winter optional)",
      },
      sports: {
        shirt: "White polo shirt with college logo",
        pants: "Navy blue sports pants or shorts",
        tracksuit: "Navy blue tracksuit with college name",
        shoes: "White sports shoes",
        socks: "White sports socks",
      },
    },
  };

  const uniformRules = [
    {
      category: "General Rules",
      icon: <CheckCircle size={20} />,
      color: "green",
      rules: [
        "Uniform is mandatory for all students during college hours",
        "Students must wear complete uniform - partial uniform not allowed",
        "Uniform should be clean, properly ironed and well-maintained",
        "All uniform items must bear the official college monogram/logo",
        "Students not in proper uniform may be sent home",
      ],
    },
    {
      category: "Appearance Standards",
      icon: <Star size={20} />,
      color: "blue",
      rules: [
        "Hair should be neat, clean and well-groomed",
        "Boys: Hair should not touch the collar, no facial hair allowed",
        "Girls: Long hair should be tied back neatly",
        "Excessive makeup, nail polish and jewelry not allowed",
        "Only small ear studs allowed for girls",
      ],
    },
    {
      category: "Footwear Requirements",
      icon: <Shirt size={20} />,
      color: "purple",
      rules: [
        "Only prescribed shoes allowed - no sandals or sneakers",
        "Shoes must be polished and in good condition",
        "Sports shoes only allowed during PE classes",
        "No high heels or platform shoes",
        "Socks must be worn at all times",
      ],
    },
    {
      category: "Seasonal Requirements",
      icon: <Calendar size={20} />,
      color: "orange",
      rules: [
        "Summer: Light uniform without blazer (April - September)",
        "Winter: Full uniform with blazer/sweater (October - March)",
        "Raincoat/umbrella allowed during monsoon season",
        "No unauthorized jackets or hoodies",
        "Only college-approved winter wear permitted",
      ],
    },
  ];

  const uniformVendors = [
    {
      name: "Al-Hasan Tailors",
      address: "Shop #15, Committee Chowk, Rawalpindi Cantt",
      phone: "051-9290555",
      speciality: "Custom tailoring and alterations",
      timings: "9:00 AM - 8:00 PM (Mon-Sat)",
      rating: 4.5,
    },
    {
      name: "College Uniform Store",
      address: "Near Main Gate, The Mall, Rawalpindi Cantt",
      phone: "051-9291234",
      speciality: "Ready-made uniforms and accessories",
      timings: "8:00 AM - 7:00 PM (Daily)",
      rating: 4.3,
    },
    {
      name: "Crescent Tailors",
      address: "Bank Road, Saddar, Rawalpindi",
      phone: "051-5123456",
      speciality: "Premium quality uniforms",
      timings: "10:00 AM - 9:00 PM (Mon-Sat)",
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-600 to-gray-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            College Uniform
          </h1>
          <p className="text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto mb-8">
            Official dress code and uniform specifications for F.G Sir Syed
            College
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg font-semibold mb-2">
              Academic Session 2025-2026
            </p>
            <p className="text-slate-100">
              Uniform is mandatory for all students during college hours
            </p>
          </div>
        </div>
      </div>

      {/* Uniform Specifications */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Uniform Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Detailed specifications for regular and sports uniforms
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "all"
                ? "bg-slate-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            All Uniforms
          </button>
          <button
            onClick={() => setSelectedCategory("boys")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "boys"
                ? "bg-slate-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Boys Uniform
          </button>
          <button
            onClick={() => setSelectedCategory("girls")}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "girls"
                ? "bg-slate-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Girls Uniform
          </button>
        </div>

        {/* Uniform Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(selectedCategory === "all" || selectedCategory === "boys") && (
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-gray-800 text-center">
                Boys Uniform
              </h3>

              {/* Boys Regular Uniform */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Shirt className="text-blue-600 mr-3" size={24} />
                  <h4 className="text-xl font-heading font-bold text-gray-800">
                    Regular Uniform
                  </h4>
                </div>
                <ul className="space-y-2">
                  {Object.entries(uniformSpecs.boys.regular).map(
                    ([item, description]) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle
                          className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        <div>
                          <span className="font-medium text-gray-800 capitalize">
                            {item.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="text-gray-600 ml-1">
                            {description}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Boys Sports Uniform */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="text-green-600 mr-3" size={24} />
                  <h4 className="text-xl font-heading font-bold text-gray-800">
                    Sports Uniform
                  </h4>
                </div>
                <ul className="space-y-2">
                  {Object.entries(uniformSpecs.boys.sports).map(
                    ([item, description]) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle
                          className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        <div>
                          <span className="font-medium text-gray-800 capitalize">
                            {item.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="text-gray-600 ml-1">
                            {description}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}

          {(selectedCategory === "all" || selectedCategory === "girls") && (
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold text-gray-800 text-center">
                Girls Uniform
              </h3>

              {/* Girls Regular Uniform */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Shirt className="text-pink-600 mr-3" size={24} />
                  <h4 className="text-xl font-heading font-bold text-gray-800">
                    Regular Uniform
                  </h4>
                </div>
                <ul className="space-y-2">
                  {Object.entries(uniformSpecs.girls.regular).map(
                    ([item, description]) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle
                          className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        <div>
                          <span className="font-medium text-gray-800 capitalize">
                            {item.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="text-gray-600 ml-1">
                            {description}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Girls Sports Uniform */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Users className="text-green-600 mr-3" size={24} />
                  <h4 className="text-xl font-heading font-bold text-gray-800">
                    Sports Uniform
                  </h4>
                </div>
                <ul className="space-y-2">
                  {Object.entries(uniformSpecs.girls.sports).map(
                    ([item, description]) => (
                      <li key={item} className="flex items-start">
                        <CheckCircle
                          className="text-green-600 mr-2 mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        <div>
                          <span className="font-medium text-gray-800 capitalize">
                            {item.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <span className="text-gray-600 ml-1">
                            {description}
                          </span>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Uniform Rules */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Uniform Rules & Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Important rules and guidelines for wearing college uniform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uniformRules.map((category, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className={`text-${category.color}-600 mr-3`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-gray-800">
                    {category.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {category.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start">
                      <div
                        className={`w-2 h-2 bg-${category.color}-600 rounded-full mr-3 mt-2 flex-shrink-0`}
                      ></div>
                      <span className="text-gray-700 text-sm">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authorized Vendors */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Authorized Uniform Vendors
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Purchase your uniform from these authorized vendors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {uniformVendors.map((vendor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-heading font-bold text-gray-800">
                  {vendor.name}
                </h3>
                <div className="flex items-center">
                  <Star className="text-yellow-500 mr-1" size={14} />
                  <span className="text-sm text-gray-600">{vendor.rating}</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <MapPin
                    className="text-gray-400 mr-2 mt-0.5 flex-shrink-0"
                    size={14}
                  />
                  <span className="text-gray-600">{vendor.address}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="text-gray-600 ml-2">{vendor.phone}</span>
                </div>
                <div className="flex items-start">
                  <Clock
                    className="text-gray-400 mr-2 mt-0.5 flex-shrink-0"
                    size={14}
                  />
                  <span className="text-gray-600">{vendor.timings}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className="font-medium text-gray-700">Speciality:</span>
                  <p className="text-gray-600 text-xs mt-1">
                    {vendor.speciality}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Need Help with Uniform?
            </h3>
            <p className="text-slate-100 mb-6 max-w-2xl mx-auto">
              For any queries regarding uniform specifications, vendors, or
              compliance, contact our administration office
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold mb-2">Office Hours</h4>
                <p className="text-slate-100">
                  Monday - Friday
                  <br />
                  8:00 AM - 4:00 PM
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Phone</h4>
                <p className="text-slate-100">0519292724</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-slate-100">info@fgckohat.edu.pk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uniform;
