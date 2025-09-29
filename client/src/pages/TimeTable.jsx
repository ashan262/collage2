import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Download,
  Filter,
  BookOpen,
  Users,
  MapPin,
  Bell,
  ChevronLeft,
  ChevronRight,
  Printer,
} from "lucide-react";
import HeroCarousel from "../components/HeroCarousel";

const TimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("fsc-pre-medical-1st");

  const classes = [
    { value: "fsc-pre-medical-1st", label: "FSc Pre-Medical (1st Year)" },
    { value: "fsc-pre-medical-2nd", label: "FSc Pre-Medical (2nd Year)" },
    {
      value: "fsc-pre-engineering-1st",
      label: "FSc Pre-Engineering (1st Year)",
    },
    {
      value: "fsc-pre-engineering-2nd",
      label: "FSc Pre-Engineering (2nd Year)",
    },
    { value: "ics-1st", label: "ICS (1st Year)" },
    { value: "ics-2nd", label: "ICS (2nd Year)" },
    { value: "icom-1st", label: "ICom (1st Year)" },
    { value: "icom-2nd", label: "ICom (2nd Year)" },
    { value: "fa-1st", label: "FA (1st Year)" },
    { value: "fa-2nd", label: "FA (2nd Year)" },
  ];

  const timeSlots = [
    "08:00 - 08:40",
    "08:40 - 09:20",
    "09:20 - 10:00",
    "10:00 - 10:20", // Break
    "10:20 - 11:00",
    "11:00 - 11:40",
    "11:40 - 12:20",
    "12:20 - 13:00",
    "13:00 - 13:40", // Lunch Break
    "13:40 - 14:20",
    "14:20 - 15:00",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Sample timetable data - in real app, this would come from API
  const timetableData = {
    "fsc-pre-medical-1st": {
      Monday: [
        { subject: "Physics", teacher: "Dr. Ahmed Khan", room: "Room 101" },
        { subject: "Chemistry", teacher: "Prof. Fatima Malik", room: "Lab A" },
        { subject: "Biology", teacher: "Dr. Sarah Ahmad", room: "Lab B" },
        { type: "break", label: "Morning Break" },
        { subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "Room 102" },
        {
          subject: "English",
          teacher: "Prof. Rashid Mahmood",
          room: "Room 201",
        },
        { subject: "Urdu", teacher: "Mr. Hassan Ali", room: "Room 202" },
        {
          subject: "Islamic Studies",
          teacher: "Mr. Abdullah Sheikh",
          room: "Room 203",
        },
        { type: "break", label: "Lunch Break" },
        {
          subject: "Physics Lab",
          teacher: "Dr. Ahmed Khan",
          room: "Physics Lab",
        },
        { subject: "Study Period", teacher: "Class Teacher", room: "Room 101" },
      ],
      Tuesday: [
        { subject: "Biology", teacher: "Dr. Sarah Ahmad", room: "Lab B" },
        { subject: "Physics", teacher: "Dr. Ahmed Khan", room: "Room 101" },
        { subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "Room 102" },
        { type: "break", label: "Morning Break" },
        { subject: "Chemistry", teacher: "Prof. Fatima Malik", room: "Lab A" },
        {
          subject: "English",
          teacher: "Prof. Rashid Mahmood",
          room: "Room 201",
        },
        {
          subject: "Pakistan Studies",
          teacher: "Mr. Tariq Ahmed",
          room: "Room 204",
        },
        { subject: "Urdu", teacher: "Mr. Hassan Ali", room: "Room 202" },
        { type: "break", label: "Lunch Break" },
        {
          subject: "Chemistry Lab",
          teacher: "Prof. Fatima Malik",
          room: "Chemistry Lab",
        },
        { subject: "Tutorial", teacher: "Subject Teachers", room: "Various" },
      ],
      Wednesday: [
        { subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "Room 102" },
        { subject: "Biology", teacher: "Dr. Sarah Ahmad", room: "Lab B" },
        { subject: "Physics", teacher: "Dr. Ahmed Khan", room: "Room 101" },
        { type: "break", label: "Morning Break" },
        {
          subject: "English",
          teacher: "Prof. Rashid Mahmood",
          room: "Room 201",
        },
        { subject: "Chemistry", teacher: "Prof. Fatima Malik", room: "Lab A" },
        {
          subject: "Islamic Studies",
          teacher: "Mr. Abdullah Sheikh",
          room: "Room 203",
        },
        { subject: "Urdu", teacher: "Mr. Hassan Ali", room: "Room 202" },
        { type: "break", label: "Lunch Break" },
        {
          subject: "Biology Lab",
          teacher: "Dr. Sarah Ahmad",
          room: "Biology Lab",
        },
        { subject: "Library Period", teacher: "Librarian", room: "Library" },
      ],
      Thursday: [
        { subject: "Chemistry", teacher: "Prof. Fatima Malik", room: "Lab A" },
        { subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "Room 102" },
        {
          subject: "English",
          teacher: "Prof. Rashid Mahmood",
          room: "Room 201",
        },
        { type: "break", label: "Morning Break" },
        { subject: "Physics", teacher: "Dr. Ahmed Khan", room: "Room 101" },
        { subject: "Biology", teacher: "Dr. Sarah Ahmad", room: "Lab B" },
        {
          subject: "Pakistan Studies",
          teacher: "Mr. Tariq Ahmed",
          room: "Room 204",
        },
        { subject: "Urdu", teacher: "Mr. Hassan Ali", room: "Room 202" },
        { type: "break", label: "Lunch Break" },
        { subject: "Test/Assessment", teacher: "Various", room: "Room 101" },
        { subject: "Study Hall", teacher: "Monitor", room: "Hall" },
      ],
      Friday: [
        {
          subject: "Islamic Studies",
          teacher: "Mr. Abdullah Sheikh",
          room: "Room 203",
        },
        { subject: "Physics", teacher: "Dr. Ahmed Khan", room: "Room 101" },
        { subject: "Chemistry", teacher: "Prof. Fatima Malik", room: "Lab A" },
        { type: "break", label: "Morning Break" },
        { subject: "Biology", teacher: "Dr. Sarah Ahmad", room: "Lab B" },
        { subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "Room 102" },
        {
          subject: "English",
          teacher: "Prof. Rashid Mahmood",
          room: "Room 201",
        },
        { subject: "Friday Prayer", teacher: "", room: "Prayer Hall" },
        { type: "break", label: "Prayer Break" },
        { subject: "Sports/PT", teacher: "PT Teacher", room: "Playground" },
        { subject: "Assembly", teacher: "All Staff", room: "Main Hall" },
      ],
      Saturday: [
        { subject: "Revision", teacher: "Various", room: "Various" },
        { subject: "Mathematics", teacher: "Mr. Ali Hassan", room: "Room 102" },
        { subject: "Physics", teacher: "Dr. Ahmed Khan", room: "Room 101" },
        { type: "break", label: "Morning Break" },
        { subject: "Chemistry", teacher: "Prof. Fatima Malik", room: "Lab A" },
        { subject: "Biology", teacher: "Dr. Sarah Ahmad", room: "Lab B" },
        {
          subject: "English",
          teacher: "Prof. Rashid Mahmood",
          room: "Room 201",
        },
        {
          subject: "Co-curricular",
          teacher: "Activity Teachers",
          room: "Various",
        },
        { type: "break", label: "Lunch Break" },
        {
          subject: "Extra Classes",
          teacher: "Subject Teachers",
          room: "Various",
        },
        { subject: "Clean-up", teacher: "Class Monitor", room: "Classroom" },
      ],
    },
  };

  const currentTimetable =
    timetableData[selectedClass] || timetableData["fsc-pre-medical-1st"];

  const getSubjectColor = (subject) => {
    const colors = {
      Physics: "bg-blue-100 text-blue-800 border-blue-200",
      Chemistry: "bg-green-100 text-green-800 border-green-200",
      Biology: "bg-purple-100 text-purple-800 border-purple-200",
      Mathematics: "bg-red-100 text-red-800 border-red-200",
      English: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Urdu: "bg-pink-100 text-pink-800 border-pink-200",
      "Islamic Studies": "bg-teal-100 text-teal-800 border-teal-200",
      "Pakistan Studies": "bg-indigo-100 text-indigo-800 border-indigo-200",
      "Computer Science": "bg-gray-100 text-gray-800 border-gray-200",
      default: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[subject] || colors.default;
  };

  const TimeTableCell = ({ period}) => {
    if (period?.type === "break") {
      return (
        <td className="p-2 text-center bg-orange-50 border border-orange-200">
          <div className="flex items-center justify-center space-x-2">
            <Bell size={14} className="text-orange-600" />
            <span className="text-sm font-medium text-orange-700">
              {period.label}
            </span>
          </div>
        </td>
      );
    }

    if (!period) {
      return (
        <td className="p-2 border border-gray-200 bg-gray-50">
          <div className="text-center text-gray-400 text-sm">-</div>
        </td>
      );
    }

    return (
      <td className="p-2 border border-gray-200">
        <div
          className={`rounded-lg p-3 h-full ${getSubjectColor(
            period.subject
          )} border`}
        >
          <div className="text-sm font-semibold mb-1">{period.subject}</div>
          <div className="text-xs opacity-80 mb-1">{period.teacher}</div>
          <div className="flex items-center space-x-1 text-xs opacity-70">
            <MapPin size={10} />
            <span>{period.room}</span>
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel
        title="Time Table"
        subtitle="View class schedules and academic timetables"
        height="h-64"
        breadcrumbs={[{ label: "Time Table" }]}
      />

      {/* Controls Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="text-primary-600" size={20} />
                  <label className="font-medium text-gray-700">
                    Select Class:
                  </label>
                </div>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent min-w-[250px]"
                >
                  {classes.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Download size={16} />
                  <span>Download PDF</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Printer size={16} />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Weekly Schedule -{" "}
                    {classes.find((c) => c.value === selectedClass)?.label}
                  </h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>Academic Year 2024-25</span>
                  </div>
                </div>
              </div>

              {/* Timetable Grid */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-4 text-left font-semibold text-gray-700 border-r border-gray-200 min-w-[120px]">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} />
                          <span>Time</span>
                        </div>
                      </th>
                      {days.map((day) => (
                        <th
                          key={day}
                          className="p-4 text-center font-semibold text-gray-700 border-r border-gray-200 last:border-r-0 min-w-[160px]"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((timeSlot, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 last:border-b-0"
                      >
                        <td className="p-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-200">
                          <div className="text-sm">{timeSlot}</div>
                        </td>
                        {days.map((day) => (
                          <TimeTableCell
                            key={`${day}-${index}`}
                            period={currentTimetable[day]?.[index]}
                            timeSlot={timeSlot}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Subject Legend
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  "Physics",
                  "Chemistry",
                  "Biology",
                  "Mathematics",
                  "English",
                  "Urdu",
                  "Islamic Studies",
                  "Pakistan Studies",
                ].map((subject) => (
                  <div key={subject} className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded ${getSubjectColor(
                        subject
                      )} border`}
                    ></div>
                    <span className="text-sm text-gray-700">{subject}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">
                  Important Timings
                </h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li>• School starts at 8:00 AM sharp</li>
                  <li>• Morning break: 10:00 - 10:20 AM</li>
                  <li>• Lunch break: 1:00 - 1:40 PM</li>
                  <li>• Friday prayer: 12:20 - 1:00 PM</li>
                  <li>• Saturday early dismissal: 3:00 PM</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="font-semibold text-yellow-800 mb-3">
                  General Instructions
                </h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li>• Students must be in class before the bell</li>
                  <li>• Lab sessions require proper safety gear</li>
                  <li>• Mobile phones not allowed during classes</li>
                  <li>• Inform teacher for any emergency</li>
                  <li>• Check notice board for updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8">
              Additional Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Calendar className="mx-auto text-primary-600 mb-4" size={32} />
                <h4 className="font-semibold text-gray-800 mb-2">
                  Academic Calendar
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  View important dates, holidays, and exam schedules
                </p>
                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                  View Calendar →
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <BookOpen className="mx-auto text-green-600 mb-4" size={32} />
                <h4 className="font-semibold text-gray-800 mb-2">
                  Exam Schedule
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Check upcoming tests and examination timetables
                </p>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                  View Exams →
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Bell className="mx-auto text-yellow-600 mb-4" size={32} />
                <h4 className="font-semibold text-gray-800 mb-2">
                  Announcements
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Stay updated with latest schedule changes
                </p>
                <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm">
                  View Updates →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimeTable;
