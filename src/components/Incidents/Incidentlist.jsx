import { useEffect, useState, useRef } from "react";
import { IncidentEndpoints } from "../../api/axios_instance";

const Incidentlist = () => {
  const [incidents, setIncidents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  // 1. Load initial incidents via axios
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await IncidentEndpoints.incidents_list();
        setIncidents(res.data);
      } catch (err) {
        console.error("Failed to fetch incidents:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIncidents();
  }, []);

  // 2. Open websocket once, for realtime updates
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const host = "127.0.0.1:8000";
    const socket = new WebSocket(`${protocol}://${host}/ws/incidents/`);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("websocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "emergency_alert") {
        setIncidents((prev) => [message.data, ...prev]);
      }
    };

    socket.onclose = () => {
      console.log("websocket disconnected");
      setIsConnected(false);
    };

    socket.onerror = (err) => {
      console.error("websocket error:", err);
    };

    // 3. Cleanup on unmount
    return () => {
      socket.close();
    };
  }, []);

  if (loading) return <div>Loading incidents...</div>;

  return (
    <div>
      {/* <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p> */}
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            {incident.incident_type ?? JSON.stringify(incident)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Incidentlist;