import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  Award,
  GraduationCap,
} from "lucide-react";
import { toast } from "react-hot-toast";
import apiService from "../../../services/apiService";
import { getImageUrl } from "../../../utils/imageUtils";

const AdminFacultyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "english",
    position: "Teacher",
    qualification: "",
    specialization: "",
    experience: "",
    joiningDate: "",
    dateOfBirth: "",
    address: "",
    photoUrl: "",
    bio: "",
    achievements: [],
    subjects: [],
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [errors, setErrors] = useState({});
  const [achievementInput, setAchievementInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageDeleted, setImageDeleted] = useState(false);

  const departments = [
    "english",
    "mathematics",
    "science",
    "physics",
    "chemistry",
    "biology",
    "computer-science",
    "history",
    "geography",
    "urdu",
    "islamiat",
    "physical-education",
    "arts",
  ];

  const positions = [
    "Principal",
    "Vice Principal",
    "Head of Department",
    "Senior Teacher",
    "Teacher",
    "Assistant Teacher",
    "Lecturer",
    "Professor",
    "Lab Assistant",
    "Sports Instructor",
    "Librarian",
  ];

  const fetchFacultyMember = useCallback(async () => {
    try {
      setInitialLoading(true);
      const response = await apiService.get(`/admin/faculty/${id}`);
      const faculty = response.data.data; // Access nested data

      setFormData({
        name: faculty.name || "",
        email: faculty.email || "",
        phone: faculty.phone || "",
        department: faculty.department || "english",
        position: faculty.designation || "Teacher", // Map designation to position
        qualification: faculty.qualifications || "", // Map qualifications to qualification
        specialization: faculty.specialization || "",
        experience: faculty.experience || "",
        joiningDate: faculty.joiningDate
          ? new Date(faculty.joiningDate).toISOString().split("T")[0]
          : "",
        dateOfBirth: faculty.dateOfBirth
          ? new Date(faculty.dateOfBirth).toISOString().split("T")[0]
          : "",
        address: faculty.address || "",
        photoUrl: faculty.photoUrl || "",
        bio: faculty.bio || "",
        achievements: faculty.achievements || [],
        subjects: faculty.subjects || [],
        status: faculty.status || "active",
      });

      // Set photo preview - handle both Cloudinary URLs and legacy paths
      if (faculty.image && faculty.image.url) {
        setPhotoPreview(getImageUrl(faculty.image.url));
      } else if (faculty.image && faculty.image.path) {
        setPhotoPreview(getImageUrl(faculty.image.path));
      } else if (faculty.photoUrl) {
        setPhotoPreview(getImageUrl(faculty.photoUrl));
      }
    } catch (error) {
      console.error("Error fetching faculty member:", error);
      toast.error("Failed to load faculty member");
      navigate("/admin/faculty");
    } finally {
      setInitialLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (isEditing) {
      fetchFacultyMember();
    }
  }, [isEditing, fetchFacultyMember]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoUrlChange = (e) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, photoUrl: url }));
    setPhotoPreview(url);

    if (errors.photoUrl) {
      setErrors((prev) => ({ ...prev, photoUrl: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Clear photo URL if file is selected
      setFormData((prev) => ({ ...prev, photoUrl: "" }));
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPhotoPreview("");
    setFormData((prev) => ({ ...prev, photoUrl: "" }));
    setImageDeleted(true); // Flag that image should be deleted
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (
      achievementInput.trim() &&
      !formData.achievements.includes(achievementInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, achievementInput.trim()],
      }));
      setAchievementInput("");
    }
  };

  const handleRemoveAchievement = (achievementToRemove) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter(
        (achievement) => achievement !== achievementToRemove
      ),
    }));
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (
      subjectInput.trim() &&
      !formData.subjects.includes(subjectInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        subjects: [...prev.subjects, subjectInput.trim()],
      }));
      setSubjectInput("");
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((subject) => subject !== subjectToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.position) {
      newErrors.position = "Position is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      setLoading(true);

      // Create FormData for multipart form submission
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("designation", formData.position); // backend expects designation
      submitData.append("department", formData.department);
      submitData.append("email", formData.email || "");
      submitData.append("phone", formData.phone || "");
      submitData.append("experience", formData.experience || "");
      submitData.append("qualifications", formData.qualification || ""); // backend expects qualifications
      submitData.append("specialization", formData.specialization || "");
      submitData.append("bio", formData.bio || "");
      submitData.append("status", formData.status || "active");
      submitData.append("displayOrder", formData.displayOrder || "0");

      // Handle arrays - convert to JSON strings
      submitData.append("subjects", JSON.stringify(formData.subjects || []));
      submitData.append(
        "achievements",
        JSON.stringify(formData.achievements || [])
      );

      // Add image file if selected
      if (selectedFile) {
        submitData.append("image", selectedFile);
      }

      // Add flag to delete image if requested
      if (imageDeleted) {
        submitData.append("deleteImage", "true");
      }

      if (isEditing) {
        await apiService.put(`/admin/faculty/${id}`, submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Faculty member updated successfully");
      } else {
        await apiService.post("/admin/faculty", submitData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Faculty member created successfully");
      }

      navigate("/admin/faculty");
    } catch (error) {
      console.error("Error saving faculty member:", error);
      toast.error("Failed to save faculty member");
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentName = (dept) => {
    return (
      dept
        ?.split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ") || ""
    );
  };

  if (initialLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/faculty")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Faculty Member" : "Add New Faculty Member"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing
              ? "Update faculty member information"
              : "Add a new faculty member to your team"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Professional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Department *
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.department ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {getDepartmentName(dept)}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.department}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Position *
                  </label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.position ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    {positions.map((position) => (
                      <option key={position} value={position}>
                        {position}
                      </option>
                    ))}
                  </select>
                  {errors.position && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.position}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="qualification"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Qualification
                  </label>
                  <input
                    type="text"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., M.A, B.Ed, Ph.D"
                  />
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Years of experience"
                    min="0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="specialization"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Area of specialization"
                  />
                </div>

                <div>
                  <label
                    htmlFor="joiningDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Joining Date
                  </label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Biography
              </h3>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write a brief biography..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Photo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Photo</h3>

              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="photo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="photo-upload"
                          name="photo-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF, WebP up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* OR Separator */}
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Photo URL */}
              <div className="mb-4">
                <label
                  htmlFor="photoUrl"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoUrl"
                  name="photoUrl"
                  value={formData.photoUrl}
                  onChange={handlePhotoUrlChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/photo.jpg"
                  disabled={selectedFile}
                />
              </div>

              {/* Photo Preview */}
              {photoPreview && (
                <div className="mt-4">
                  <div className="relative inline-block">
                    <img
                      src={photoPreview}
                      alt="Faculty Photo"
                      className="w-32 h-32 object-cover rounded-lg border shadow-sm mx-auto"
                      onError={(e) => {
                        e.target.style.display = "none";
                        toast.error("Failed to load photo preview");
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      title="Remove photo"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="retired">Retired</option>
              </select>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Subjects Teaching
              </h3>

              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add subject"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddSubject(e))
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddSubject}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {subject}
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(subject)}
                      className="ml-2 hover:text-blue-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Achievements
              </h3>

              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={achievementInput}
                    onChange={(e) => setAchievementInput(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add achievement"
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), handleAddAchievement(e))
                    }
                  />
                  <button
                    type="button"
                    onClick={handleAddAchievement}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-green-50 rounded-lg"
                  >
                    <span className="text-sm text-green-800">
                      {achievement}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(achievement)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="h-4 w-4" />
                {loading
                  ? "Saving..."
                  : isEditing
                  ? "Update Faculty Member"
                  : "Save Faculty Member"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminFacultyForm;
