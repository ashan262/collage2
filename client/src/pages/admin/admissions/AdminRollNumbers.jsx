import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Download,
  Upload,
  FileText,
  Calendar,
  Filter,
  Eye,
  X,
  Check,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import AdminLayout from "../../../components/admin/AdminLayout";
import { apiService } from "../../../services/apiService";

const AdminRollNumbers = () => {
  const [rollNumbers, setRollNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterSession, setFilterSession] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    session: "",
    program: "",
    color: "blue",
    fileUrl: "",
    academicYear: "2025-26",
    isActive: true,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchRollNumbers();
  }, []);

  const fetchRollNumbers = async () => {
    try {
      setLoading(true);
      const response = await apiService.get("/admin/roll-numbers/admin");
      setRollNumbers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching roll numbers:", error);
      toast.error("Failed to load roll numbers");
      setRollNumbers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedFile) {
        // Upload file first
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);
        uploadFormData.append("category", "roll-numbers");

        console.log("Uploading file:", selectedFile.name);

        const uploadResponse = await apiService.post(
          "/admin/roll-numbers/upload",
          uploadFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(progress);
            },
          }
        );

        console.log("Upload response:", uploadResponse.data);
        formData.fileUrl = uploadResponse.data.data?.fileUrl;
        formData.fileName = uploadResponse.data.data?.fileName;
        formData.fileSize = uploadResponse.data.data?.fileSize;
      }

      if (editingItem) {
        await apiService.put(
          `/admin/roll-numbers/admin/${editingItem._id}`,
          formData
        );
        toast.success("Roll number updated successfully");
      } else {
        await apiService.post("/admin/roll-numbers/admin", formData);
        toast.success("Roll number added successfully");
      }

      fetchRollNumbers();
      resetForm();
      setShowAddModal(false);
    } catch (error) {
      console.error("Error saving roll number:", error);
      toast.error(
        error.response?.data?.message || "Failed to save roll number"
      );
    } finally {
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this roll number entry?")
    ) {
      try {
        await apiService.delete(`/admin/roll-numbers/admin/${id}`);
        toast.success("Roll number deleted successfully");
        fetchRollNumbers();
      } catch (error) {
        console.error("Error deleting roll number:", error);
        toast.error("Failed to delete roll number");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await apiService.patch(`/admin/roll-numbers/admin/${id}/toggle`, {
        isActive: !currentStatus,
      });
      toast.success("Status updated successfully");
      fetchRollNumbers();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      session: "",
      program: "",
      color: "blue",
      fileUrl: "",
      academicYear: "2025-26",
      isActive: true,
    });
    setSelectedFile(null);
    setEditingItem(null);
    setUploadProgress(0);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (item) => {
    setFormData({
      name: item.name,
      session: item.session,
      program: item.program,
      color: item.color || "blue",
      fileUrl: item.fileUrl || "",
      academicYear: item.academicYear || "2025-26",
      isActive: item.isActive,
    });
    setEditingItem(item);
    setShowAddModal(true);
  };

  const filteredRollNumbers = rollNumbers.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgram =
      filterProgram === "all" || item.program === filterProgram;
    const matchesSession =
      filterSession === "all" ||
      item.session.toLowerCase().includes(filterSession.toLowerCase());
    return matchesSearch && matchesProgram && matchesSession;
  });

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-800",
      red: "bg-red-100 text-red-800",
      green: "bg-green-100 text-green-800",
      purple: "bg-purple-100 text-purple-800",
      indigo: "bg-indigo-100 text-indigo-800",
      orange: "bg-orange-100 text-orange-800",
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Roll Numbers Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage class roll number files for student downloads
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Roll Number File
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search classes..."
                className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
            >
              <option value="all">All Programs</option>
              <option value="HSSC">HSSC</option>
              <option value="BS">BS Programs</option>
            </select>
            <select
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={filterSession}
              onChange={(e) => setFilterSession(e.target.value)}
            >
              <option value="all">All Sessions</option>
              <option value="morning">Morning Session</option>
              <option value="evening">Evening Session</option>
            </select>
            <button
              onClick={fetchRollNumbers}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Filter className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>

        {/* Roll Numbers List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Roll Number Files ({filteredRollNumbers.length})
            </h3>
          </div>

          {loading ? (
            <div className="p-6">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredRollNumbers.length === 0 ? (
            <div className="p-6 text-center">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No roll number files
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a roll number file.
              </p>
              <div className="mt-6">
                <button
                  onClick={openAddModal}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Roll Number File
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Session
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRollNumbers.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 h-2 w-2 rounded-full ${
                              item.color === "blue"
                                ? "bg-blue-400"
                                : item.color === "red"
                                ? "bg-red-400"
                                : item.color === "green"
                                ? "bg-green-400"
                                : item.color === "purple"
                                ? "bg-purple-400"
                                : item.color === "indigo"
                                ? "bg-indigo-400"
                                : "bg-blue-400"
                            } mr-3`}
                          ></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.academicYear}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.session}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getColorClasses(
                            item.color
                          )}`}
                        >
                          {item.program}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {item.fileUrl ? (
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 text-green-500 mr-2" />
                              <a
                                href={`http://localhost:5000${item.fileUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-900"
                              >
                                Download
                              </a>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                              <span className="text-sm text-gray-500">
                                No file
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() =>
                            handleToggleStatus(item._id, item.isActive)
                          }
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          {item.fileUrl && (
                            <a
                              href={`http://localhost:5000${item.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900"
                              title="Download file"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          )}
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-2/3 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingItem ? "Edit Roll Number File" : "Add Roll Number File"}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Class Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., XI Pre Engineering A1"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Session *
                  </label>
                  <select
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.session}
                    onChange={(e) =>
                      setFormData({ ...formData, session: e.target.value })
                    }
                  >
                    <option value="">Select Session</option>
                    <option value="Morning Session">Morning Session</option>
                    <option value="Evening Session">Evening Session</option>
                    <option value="Medical Group">Medical Group</option>
                    <option value="Morning • Math, Physics, CS">
                      ICS Morning
                    </option>
                    <option value="Evening • Math, Physics, CS">
                      ICS Evening
                    </option>
                    <option value="Math, Statistics, Economics">
                      Commerce
                    </option>
                    <option value="Arts & Literature">Humanities</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Program *
                  </label>
                  <select
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.program}
                    onChange={(e) =>
                      setFormData({ ...formData, program: e.target.value })
                    }
                  >
                    <option value="">Select Program</option>
                    <option value="HSSC">HSSC</option>
                    <option value="BS">BS Programs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Color Theme
                  </label>
                  <select
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  >
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="indigo">Indigo</option>
                    <option value="orange">Orange</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 2025-26"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={formData.academicYear}
                    onChange={(e) =>
                      setFormData({ ...formData, academicYear: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Active (visible to students)
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".pdf,.doc,.docx,.xls,.xlsx"
                          className="sr-only"
                          onChange={(e) => setSelectedFile(e.target.files[0])}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, XLS, XLSX up to 10MB
                    </p>
                  </div>
                </div>
                {selectedFile && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {selectedFile.name}
                  </div>
                )}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
                {formData.fileUrl && (
                  <div className="mt-2">
                    <a
                      href={`http://localhost:5000${formData.fileUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-900"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Current file
                    </a>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {uploadProgress > 0 && uploadProgress < 100
                    ? "Uploading..."
                    : editingItem
                    ? "Update"
                    : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRollNumbers;
