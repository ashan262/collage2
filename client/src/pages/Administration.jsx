import React from "react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Clock,
  GraduationCap,
  BookOpen,
  Award,
} from "lucide-react";

const Administration = () => {
  const administrativeStaff = [
    {
      name: "Dr. Muhammad Aslam",
      position: "Principal",
      qualification: "PhD in Education, M.A English",
      experience: "25 years",
      email: "principal@fgssc.edu.pk",
      phone: "0519292724",
      image: "/api/placeholder/200/200",
      responsibilities: [
        "Overall college administration",
        "Academic policy implementation",
        "Staff supervision and development",
        "Student welfare and discipline",
      ],
    },
    {
      name: "Mr. Shahid Hussain",
      position: "Vice Principal",
      qualification: "M.Sc Physics, B.Ed",
      experience: "20 years",
      email: "viceprincipal@fgssc.edu.pk",
      phone: "0519292725",
      image: "/api/placeholder/200/200",
      responsibilities: [
        "Academic coordination",
        "Examination supervision",
        "Faculty management",
        "Curriculum development",
      ],
    },
    {
      name: "Ms. Fatima Khan",
      position: "Head of Administration",
      qualification: "MBA, M.A Public Administration",
      experience: "15 years",
      email: "admin@fgssc.edu.pk",
      phone: "0519292726",
      image: "/api/placeholder/200/200",
      responsibilities: [
        "Administrative operations",
        "Human resource management",
        "Financial oversight",
        "Infrastructure management",
      ],
    },
    {
      name: "Mr. Ali Ahmad",
      position: "Academic Coordinator",
      qualification: "M.Sc Mathematics, M.Ed",
      experience: "12 years",
      email: "academic@fgssc.edu.pk",
      phone: "0519292727",
      image: "/api/placeholder/200/200",
      responsibilities: [
        "Academic scheduling",
        "Faculty coordination",
        "Student academic support",
        "Performance monitoring",
      ],
    },
    {
      name: "Ms. Ayesha Malik",
      position: "Student Affairs Officer",
      qualification: "M.A Psychology, Diploma in Counseling",
      experience: "8 years",
      email: "studentaffairs@fgssc.edu.pk",
      phone: "0519292728",
      image: "/api/placeholder/200/200",
      responsibilities: [
        "Student welfare",
        "Counseling services",
        "Disciplinary matters",
        "Extracurricular activities",
      ],
    },
    {
      name: "Mr. Tariq Mahmood",
      position: "Finance Officer",
      qualification: "MBA Finance, CA Inter",
      experience: "18 years",
      email: "finance@fgssc.edu.pk",
      phone: "0519292729",
      image: "/api/placeholder/200/200",
      responsibilities: [
        "Financial management",
        "Budget planning",
        "Fee collection",
        "Financial reporting",
      ],
    },
  ];

  const departments = [
    {
      name: "Academic Department",
      head: "Vice Principal",
      icon: <BookOpen size={32} />,
      color: "blue",
      functions: [
        "Curriculum planning and implementation",
        "Faculty recruitment and training",
        "Academic performance monitoring",
        "Research and development activities",
      ],
    },
    {
      name: "Administrative Department",
      head: "Head of Administration",
      icon: <Users size={32} />,
      color: "green",
      functions: [
        "General administration",
        "Human resource management",
        "Infrastructure maintenance",
        "Policy implementation",
      ],
    },
    {
      name: "Student Affairs Department",
      head: "Student Affairs Officer",
      icon: <GraduationCap size={32} />,
      color: "purple",
      functions: [
        "Student welfare and support",
        "Counseling and guidance",
        "Disciplinary management",
        "Extracurricular coordination",
      ],
    },
    {
      name: "Finance Department",
      head: "Finance Officer",
      icon: <Award size={32} />,
      color: "orange",
      functions: [
        "Financial planning and control",
        "Budget management",
        "Fee administration",
        "Financial audit and compliance",
      ],
    },
  ];

  const officeHours = [
    { day: "Monday - Thursday", time: "8:00 AM - 4:00 PM" },
    { day: "Friday", time: "8:00 AM - 12:00 PM" },
    { day: "Saturday", time: "8:00 AM - 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Administration
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
            Meet our dedicated administrative team committed to excellence in
            education and student welfare
          </p>
        </div>
      </div>

      {/* Administrative Staff */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
            Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our experienced administrative professionals ensure smooth
            operations and academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {administrativeStaff.map((staff, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <Users size={48} className="text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-gray-800 mb-2">
                  {staff.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-2">
                  {staff.position}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {staff.qualification}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Experience: {staff.experience}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail size={14} className="mr-2" />
                    {staff.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone size={14} className="mr-2" />
                    {staff.phone}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Key Responsibilities:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {staff.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex items-start">
                        <span className="w-2 h-2 bg-indigo-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Departments */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
              Administrative Departments
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our well-organized departments ensure efficient management and
              quality service delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`text-${dept.color}-600 mr-4`}>
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-800">
                      {dept.name}
                    </h3>
                    <p className={`text-${dept.color}-600 font-medium`}>
                      Head: {dept.head}
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Key Functions:
                  </h4>
                  <ul className="space-y-2">
                    {dept.functions.map((func, funcIndex) => (
                      <li
                        key={funcIndex}
                        className="flex items-start text-sm text-gray-600"
                      >
                        <span
                          className={`w-2 h-2 bg-${dept.color}-600 rounded-full mr-2 mt-2 flex-shrink-0`}
                        ></span>
                        {func}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Hours and Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Office Hours */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Clock className="text-indigo-600 mr-3" size={24} />
              <h3 className="text-2xl font-heading font-bold text-gray-800">
                Office Hours
              </h3>
            </div>
            <div className="space-y-3">
              {officeHours.map((schedule, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                >
                  <span className="font-medium text-gray-700">
                    {schedule.day}
                  </span>
                  <span className="text-gray-600">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-lg p-6">
            <div className="flex items-center mb-6">
              <MapPin className="mr-3" size={24} />
              <h3 className="text-2xl font-heading font-bold">
                Contact Administration
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Address:</p>
                <p className="text-indigo-100">
                  F.G Degree College for Boys Kohat, The Mal, Rawalpindi Cantt,
                  Pakistan
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Phone:</p>
                <p className="text-indigo-100">0519292724</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Email:</p>
                <p className="text-indigo-100">fgdcbkohat@gmail.com</p>
              </div>
              <div>
                <p className="font-semibold mb-1">Principal's Office:</p>
                <p className="text-indigo-100">principal@fgssc.edu.pk</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Administration;
