import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Eye,
  Trash2,
  Calendar,
  User,
  Mail,
  Phone,
  MessageSquare,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import { toast } from "react-hot-toast";
import apiService from "../../../services/apiService";
import AdminLayout from "../../../components/admin/AdminLayout";

const AdminContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10;

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        status: filterStatus !== "all" ? filterStatus : undefined,
      };

      // Try to fetch from contact endpoint, fallback to empty if not available
      try {
        const response = await apiService.get("/admin/contacts", { params });
        setContacts(response.data.contacts || []);
        setTotalPages(Math.ceil((response.data.total || 0) / itemsPerPage));
      } catch (error) {
        if (error.response?.status === 404) {
          // Endpoint doesn't exist yet, show empty state
          setContacts([]);
          setTotalPages(1);
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast.error("Failed to load contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterStatus]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const handleDelete = async (id, name) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the message from "${name}"?`
      )
    ) {
      return;
    }

    try {
      await apiService.delete(`/admin/contacts/${id}`);
      toast.success("Contact message deleted successfully");
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact message");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await apiService.patch(`/admin/contacts/${id}`, { status: "read" });
      toast.success("Message marked as read");
      fetchContacts();
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast.error("Failed to update message status");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      unread: "bg-blue-100 text-blue-800",
      read: "bg-green-100 text-green-800",
      replied: "bg-purple-100 text-purple-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusClasses[status] || statusClasses.unread
        }`}
      >
        {status || "unread"}
      </span>
    );
  };

  const ContactModal = ({ contact, onClose }) => {
    if (!contact) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Contact Message
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{contact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1">{getStatusBadge(contact.status)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{contact.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {contact.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <p className="mt-1 text-sm text-gray-900">{contact.subject}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Received
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {formatDate(contact.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              {contact.status === "unread" && (
                <button
                  onClick={() => {
                    handleMarkAsRead(contact._id);
                    onClose();
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() =>
                  (window.location.href = `mailto:${contact.email}?subject=Re: ${contact.subject}`)
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reply via Email
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600 mt-1">
            Manage contact form submissions and inquiries
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Messages List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {contacts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-4">
              <MessageSquare className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No messages found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "No messages match your search criteria."
                : "Contact messages will appear here when visitors submit the contact form."}
            </p>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-700">
              <div className="col-span-3">Name & Email</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {contacts.map((contact) => (
                <div
                  key={contact._id}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-3">
                    <div className="flex items-center">
                      <User className="h-8 w-8 text-gray-400 bg-gray-100 rounded-full p-1.5 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {contact.name}
                        </p>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <p className="font-medium text-gray-900">
                      {contact.subject}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {contact.message}
                    </p>
                  </div>

                  <div className="col-span-2 flex items-center">
                    {getStatusBadge(contact.status)}
                  </div>

                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(contact.createdAt)}
                    </div>
                  </div>

                  <div className="col-span-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowModal(true);
                      }}
                      className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                      title="View Message"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() =>
                        (window.location.href = `mailto:${contact.email}?subject=Re: ${contact.subject}`)
                      }
                      className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                      title="Reply"
                    >
                      <Mail className="h-4 w-4" />
                    </button>

                    {contact.phone && (
                      <button
                        onClick={() =>
                          (window.location.href = `tel:${contact.phone}`)
                        }
                        className="p-1 text-purple-600 hover:bg-purple-100 rounded transition-colors"
                        title="Call"
                      >
                        <Phone className="h-4 w-4" />
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(contact._id, contact.name)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing page {currentPage} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Contact Detail Modal */}
      {showModal && (
        <ContactModal
          contact={selectedContact}
          onClose={() => {
            setShowModal(false);
            setSelectedContact(null);
          }}
        />
      )}
    </AdminLayout>
  );
};

export default AdminContactsList;
