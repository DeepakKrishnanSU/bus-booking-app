import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const API_BASE_URL = "http://localhost:7000/api";
const getAdminConfig = () => ({
  headers: { "Content-Type": "application/json", "x-user-role": "admin" },
});



// ✅ Dashboard with clickable cards
const Dashboard = ({ setActiveTab }) => {
  const handleNavigate = (tab) => setActiveTab(tab);

  return (
    <div className="dashboard-overview">
      <h2>Welcome, Admin 👋</h2>
      <div className="dashboard-cards">
        <div className="dash-rect" onClick={() => handleNavigate("routes")}>
          <h3>Manage Routes</h3>
          <p>View, add, and edit travel routes.</p>
        </div>

        <div className="dash-rect" onClick={() => handleNavigate("buses")}>
          <h3>Manage Buses</h3>
          <p>Handle bus schedules and details.</p>
        </div>

        <div className="dash-rect" onClick={() => handleNavigate("users")}>
          <h3>Manage Users</h3>
          <p>View and control registered users.</p>
        </div>

        {/* ✅ NEW: Manage Bus Status */}
        <div className="dash-rect" onClick={() => handleNavigate("status")}>
          <h3>Manage Bus Status</h3>
          <p>Track and monitor all user bookings and their current status.</p>
        </div>

        <div className="dash-rect home" onClick={() => (window.location.href = "/home")}>
          <h3>Go to Home Page</h3>
          <p>Return to the main website.</p>
        </div>
      </div>
    </div>
  );
};

// ✅ Route Manager
const RouteManager = () => {
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchRoutes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/routes`);
      setRoutes(res.data);
    } catch {
      setMessage({ type: "error", text: "Failed to load routes." });
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const handleAddRoute = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});
    try {
      const res = await axios.post(
        `${API_BASE_URL}/routes/add`,
        formData,
        getAdminConfig()
      );
      setMessage({
        type: "success",
        text: res.data.message || "Route added successfully!",
      });
      setFormData({ from: "", to: "" });
      fetchRoutes();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to add route.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRoute = async (id) => {
    if (!window.confirm("Delete this route permanently?")) return;
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/routes/delete/${id}`,
        getAdminConfig()
      );
      setMessage({
        type: "success",
        text: res.data.message || "Route deleted!",
      });
      fetchRoutes();
    } catch {
      setMessage({ type: "error", text: "Failed to delete route." });
    }
  };

  const allFilled = formData.from.trim() !== "" && formData.to.trim() !== "";

  return (
    <div className="route-manager main-content">
      <div className="back-btn">
        <a href="/admin" className="back-link">← Back to Dashboard</a>
      </div>
      <h3>Add Route</h3>
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

      <form onSubmit={handleAddRoute} className="route-form">
        <input
          placeholder="From City"
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          required
        />
        <input
          placeholder="To City"
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          required
        />
        <button type="submit" disabled={!allFilled || loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <h3>Existing Routes ({routes.length})</h3>
      {routes.length === 0 ? (
        <p>No routes available.</p>
      ) : (
        <table className="route-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route._id}>
                <td>{route.from}</td>
                <td>{route.to}</td>
                <td>
                  <button
                    onClick={() => handleDeleteRoute(route._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ✅ Bus Scheduler
const BusScheduler = () => {
  const [formData, setFormData] = useState({
    busName: "",
    busType: "",
    busDate: "",
    departureTime: "",
    startLocation: "",
    endLocation: "",
    travelDuration: "",
    price: "",
    stops: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const fetchSchedules = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/bus-schedule`);
      setSchedules(res.data);
    } catch {
      setMessage({ type: "error", text: "Failed to load schedules." });
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    const payload = {
      busName: formData.busName.trim(),
      departureTime: formData.departureTime,
      busDate: formData.busDate,
      busStartLocation: formData.startLocation,
      busEndLocation: formData.endLocation,
      timeDuration: formData.travelDuration,
      busType: formData.busType,
      busPrice: formData.price,
      stops: formData.stops.split(",").map((s) => s.trim()),
      seats: 49,
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/bus-schedule/add`,
        payload,
        getAdminConfig()
      );
      setMessage({ type: "success", text: res.data.message || "Bus added!" });
      setFormData({
        busName: "",
        busType: "",
        busDate: "",
        departureTime: "",
        startLocation: "",
        endLocation: "",
        travelDuration: "",
        price: "",
        stops: "",
      });
      fetchSchedules();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to add schedule.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bus-scheduler">
      <div className="back-btn">
        <a href="/admin" className="back-link">← Back to Dashboard</a>
      </div>

      <h3>Add Bus</h3>
      {message.text && <p className={`message ${message.type}`}>{message.text}</p>}

      <form onSubmit={handleSubmit} className="bus-route-form">
        <input
          placeholder="Name of the Bus"
          value={formData.busName}
          onChange={(e) => setFormData({ ...formData, busName: e.target.value })}
          required
        />
        <input
          placeholder="Type (Non-AC/AC/Sleeper)"
          value={formData.busType}
          onChange={(e) => setFormData({ ...formData, busType: e.target.value })}
          required
        />
        <input
          type="date"
          value={formData.busDate}
          min={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
          onChange={(e) => setFormData({ ...formData, busDate: e.target.value })}
          required
        />
        <input
          type="time"
          value={formData.departureTime}
          onChange={(e) =>
            setFormData({ ...formData, departureTime: e.target.value })
          }
          required
        />
        <input
          placeholder="Starting Location"
          value={formData.startLocation}
          onChange={(e) =>
            setFormData({ ...formData, startLocation: e.target.value })
          }
          required
        />
        <input
          placeholder="Final Destination"
          value={formData.endLocation}
          onChange={(e) =>
            setFormData({ ...formData, endLocation: e.target.value })
          }
          required
        />
        <input
          placeholder="Total Duration"
          value={formData.travelDuration}
          onChange={(e) =>
            setFormData({ ...formData, travelDuration: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Stops (comma separated)"
          value={formData.stops}
          onChange={(e) => setFormData({ ...formData, stops: e.target.value })}
          required
        />
        <input type="hidden" value="49" />

        <button
          type="submit"
          disabled={
            loading ||
            !formData.busName.trim() ||
            !formData.busType.trim() ||
            !formData.busDate.trim() ||
            !formData.departureTime.trim() ||
            !formData.startLocation.trim() ||
            !formData.endLocation.trim() ||
            !formData.travelDuration.trim() ||
            !formData.price ||
            !formData.stops.trim()
          }
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>

      <h3>Existing ({schedules.length})</h3>
      {schedules.length === 0 ? (
        <p>No bus schedules yet.</p>
      ) : (
        <table className="bus-route-table small">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.busName}</td>
                <td>
                  {new Date(bus.busDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </td>
                <td>{bus.departureTime}</td>
                <td>{bus.busType}</td>
                <td>{bus.busStartLocation}</td>
                <td>{bus.busEndLocation}</td>
                <td>{bus.timeDuration}</td>
                <td>₹{bus.busPrice}</td>
                <td>{bus.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ✅ User Manager
const UserManager = () => {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleteMode, setDeleteMode] = React.useState(false);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:7000/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Toggle checkbox selection
  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  // ✅ Handle delete button click
  const handleDeleteClick = async () => {
    if (!deleteMode) {
      // Enter delete mode
      setDeleteMode(true);
    } else {
      // Confirm deletion
      if (selectedUsers.length === 0) {
        alert("Please select at least one user to delete.");
        return;
      }

      if (window.confirm(`Delete ${selectedUsers.length} selected user(s)?`)) {
        try {
          const response = await fetch("http://localhost:7000/api/user/delete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userIds: selectedUsers }),
          });

          if (response.ok) {
            // Filter out deleted users
            setUsers((prev) => prev.filter((u) => !selectedUsers.includes(u._id)));
            alert("Selected users deleted successfully!");
          } else {
            alert("Error deleting users.");
          }
        } catch (err) {
          console.error(err);
          alert("Error occurred while deleting users.");
        }
      }

      // Reset delete mode
      setDeleteMode(false);
      setSelectedUsers([]);
    }
  };

  return (
    <div className="user-manager">
      <div className="back-btn">
        <a href="/admin" className="back-link">← Back to Dashboard</a>
      </div>
      <h3>👥 User Manager</h3>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                {deleteMode && <th>Select</th>}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {deleteMode && (
                    <td>
                      <input
                        type="checkbox"
                        className="user-select-checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleSelect(user._id)}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="user-delete-btn"
            onClick={handleDeleteClick}
            style={{
              backgroundColor: deleteMode ? "red" : "green",
              color: "white",
              border: "none",
              padding: "10px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              marginTop: "10px",
              transition: "0.3s",
            }}
          >
            {deleteMode ? "Confirm Delete" : "Delete Users"}
          </button>
        </>
      )}
    </div>
  );
};

// ✅ Bus Status Manager
const BusStatusManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/bookings/all")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load bookings.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bus-status-manager">
      <div className="back-btn">
        <a href="/admin" className="back-link">← Back to Dashboard</a>
      </div>
      <h3>Bus Booking Status Overview</h3>

      {loading ? (
        <p>Loading booking data...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="bus-status-table">
          <thead>
            <tr>
              <th>Ticket #</th>
              <th>User Email</th>
              <th>Bus Name</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Time</th>
              <th>Seat</th>
              <th>Price</th>
              <th>Status</th>
              <th>Booked At</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.ticketNumber}</td>
                <td>{b.userEmail}</td>
                <td>{b.busName}</td>
                <td>{b.from}</td>
                <td>{b.to}</td>
                <td>{b.date}</td>
                <td>{b.time || "—"}</td>
                <td>{b.seatNumber || "—"}</td>
                <td>₹{b.price}</td>
                <td
                  style={{
                    color: b.status === "Cancelled" ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {b.status}
                </td>
                <td>{new Date(b.bookedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ✅ Main Admin Layout
function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "routes":
        return <RouteManager />;
      case "buses":
        return <BusScheduler />;
      case "users":
        return <UserManager />;
      case "status":
        return <BusStatusManager />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="sidebar open">
          <div className="sidebar-header">
            <h3 className="app-title">🧭 Admin Panel</h3>
            <button
  className="sidebar-toggle"
  onClick={() => setSidebarOpen(false)}
>
  ≫
</button>
          </div>

          <nav>
            {["dashboard", "routes", "buses", "users", "status"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "status" ? "Bus Status" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Reopen Button (Vertical 3 Dots) */}
      {!sidebarOpen && (
        <button
          className="open-sidebar-btn"
          onClick={() => setSidebarOpen(true)}
          title="Open sidebar"
        >
          ⋮
        </button>
      )}

      {/* Main Content */}
      <main className="admin-page">
        <header className="admin-header">
          <h1>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h1>
        </header>
        <section key={activeTab} className="content-area">
          {renderContent()}
        </section>
      </main>
    </div>
  );
}

export default Admin;