import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Mail,
  Phone,
  BookOpen,
  Award,
  GraduationCap,
  MapPin,
  Calendar,
  Star,
  ChevronDown,
  ChevronUp,
  Users,
  Loader,
} from "lucide-react";
import PageHero from "../components/PageHero";
import apiService from "../services/apiService";
import { getImageUrl } from "../utils/imageUtils";

// Reusable FacultyCard component
const FacultyCard = ({ member }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Get the image URL using the utility function
  const imageUrl = getImageUrl(
    member.image?.url || member.image?.path || member.photoUrl || ""
  );

  // Fallback image if no image is available
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    member.name
  )}&background=3B82F6&color=white&size=80`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={imageUrl || fallbackImage}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {member.name}
            </h3>
            <p className="text-primary-600 font-medium text-sm mb-2">
              {member.designation}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <BookOpen size={14} />
                <span>{member.department}</span>
              </div>
              {member.experience && (
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{member.experience}</span>
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {member.subjects?.slice(0, 2).map((subject, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {subject}
                </span>
              ))}
              {member.subjects?.length > 2 && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  +{member.subjects.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary-600"
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            )}
            {member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary-600"
              >
                <Phone size={14} />
                <span>Call</span>
              </a>
            )}
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>{showDetails ? "Less Details" : "More Details"}</span>
            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
            {member.qualifications && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Qualifications
                </h4>
                <p className="text-sm text-gray-600">{member.qualifications}</p>
              </div>
            )}

            {member.specialization && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Specialization
                </h4>
                <p className="text-sm text-gray-600">{member.specialization}</p>
              </div>
            )}

            {member.subjects && member.subjects.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Subjects Teaching
                </h4>
                <div className="flex flex-wrap gap-1">
                  {member.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.achievements && member.achievements.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  Key Achievements
                </h4>
                <ul className="space-y-1">
                  {member.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-600 flex items-start space-x-2"
                    >
                      <Award
                        className="flex-shrink-0 mt-0.5 text-yellow-500"
                        size={12}
                      />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {member.bio && (
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Biography</h4>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            )}

            <div className="flex items-center space-x-4 pt-2">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="bg-primary-600 text-white px-4 py-2 rounded text-sm hover:bg-primary-700 transition-colors"
                >
                  Contact via Email
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="border border-primary-600 text-primary-600 px-4 py-2 rounded text-sm hover:bg-primary-50 transition-colors"
                >
                  Call Now
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Faculty = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch faculty data from API
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const response = await apiService.get("/faculty");
        setFacultyMembers(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        setError("Failed to load faculty data");
        // Fallback to empty array to prevent crashes
        setFacultyMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  // Get unique departments from faculty data
  const departments = [
    { value: "all", label: "All Departments" },
    ...Array.from(new Set(facultyMembers.map((member) => member.department)))
      .filter((dept) => dept) // Filter out empty departments
      .sort()
      .map((dept) => ({
        value: dept,
        label: dept.charAt(0).toUpperCase() + dept.slice(1).replace("-", " "),
      })),
  ];

  // Filter faculty based on search and department
  const filteredFaculty = facultyMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.subjects?.some((subject) =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesDepartment =
      selectedDepartment === "all" || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        title="Our Faculty"
        subtitle="Meet our dedicated and experienced educators"
        description="Our qualified and experienced faculty members are committed to your academic success and character development."
        height="h-64 md:h-72"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Faculty", href: "/faculty" },
          {
            label:
              selectedDepartment === "all"
                ? "All Departments"
                : departments.find((d) => d.value === selectedDepartment)
                    ?.label || "Directory",
          },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop"
      />

      {/* Faculty Directory */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-800 mb-4">
                Faculty Directory
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Our qualified and experienced faculty members are dedicated to
                providing quality education and guidance
              </p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-12">
                <Loader className="animate-spin text-primary-600" size={32} />
                <span className="ml-2 text-gray-600">Loading faculty...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Faculty Content - Only show when not loading and no error */}
            {!loading && !error && (
              <>
                {/* Search and Filter */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        placeholder="Search faculty by name, subject, or position..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Filter size={16} />
                      <span>Filters</span>
                    </button>
                  </div>

                  {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                          Ph.D. Holders
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                          20+ Years Experience
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                          Award Winners
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                          Department Heads
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing{" "}
                    <span className="font-medium">
                      {filteredFaculty.length}
                    </span>{" "}
                    faculty members
                    {selectedDepartment !== "all" && (
                      <span>
                        {" "}
                        in{" "}
                        <span className="font-medium">
                          {
                            departments.find(
                              (d) => d.value === selectedDepartment
                            )?.label
                          }
                        </span>
                      </span>
                    )}
                  </p>
                </div>

                {/* Faculty Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredFaculty.map((member, index) => (
                    <FacultyCard
                      key={member._id || member.id || index}
                      member={member}
                    />
                  ))}
                </div>

                {filteredFaculty.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No faculty members found
                    </h3>
                    <p className="text-gray-600">
                      Try adjusting your search criteria or filters
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Academic Community
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Interested in becoming part of our faculty? We're always looking for
            passionate educators to join our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Faculty Positions
            </button>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Contact HR
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faculty;
