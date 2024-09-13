import { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../config/config";

const useTransport = () => {
  const [isTypesLoading, setIsTypesLoading] = useState(true);
  const [isTransportsLoading, setIsTransportsLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [transports, setTransports] = useState([]);
  const [typesError, setTypesError] = useState(null);
  const [transportsError, setTransportsError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transportReqs, setTransportReqs] = useState([]);
  const [transportReqsNotActive, setTransportReqsNotActive] = useState([]);
  const [transportReqsActive, setTransportReqsActive] = useState([]);
  const jwtToken = sessionStorage.getItem("accessToken");


  // Fetch types of transport
  const fetchTypes = async () => {
    setIsTypesLoading(true);
    try {
      const response = await axios.get(
        `${Config.baseUrl}/transport/all_type_transport`,
        { headers: { "Content-Type": "application/json" } }
      );
      setTypes(response.data);
      setTypesError(null);
    } catch (error) {
      setTypesError("Error fetching types.");
    } finally {
      setIsTypesLoading(false);
    }
  };

  // Fetch transports
  const fetchTransports = async () => {
    setIsTransportsLoading(true);
    try {
      const response = await axios.get(
        `${Config.baseUrl}/transport/all_transport`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setTransports(response.data);
      setTransportsError(null);
    } catch (error) {
      setTransportsError("خطایی پیش آمده است.");
    } finally {
      setIsTransportsLoading(false);
    }
  };

  // Fetch transport requests
  const fetchTransportRequests = async () => {

    try {
      const [notPayResponse, notActiveResponse, activeResponse] =
        await Promise.all([
          axios.post(
            `${Config.baseUrl}/transport/not_pay_transport_req_api`,
            {},
            { headers: { Authorization: `Bearer ${jwtToken}` } }
          ),
          axios.post(
            `${Config.baseUrl}/transport/not_active_transport_req_api`,
            {},
            { headers: { Authorization: `Bearer ${jwtToken}` } }
          ),
          axios.post(
            `${Config.baseUrl}/transport/active_transport_req_api`,
            {},
            { headers: { Authorization: `Bearer ${jwtToken}` } }
          ),
        ]);

      setTransportReqs(notPayResponse.data);
      setTransportReqsNotActive(notActiveResponse.data);
      setTransportReqsActive(activeResponse.data);
    } catch (error) {
      console.error("Error fetching transport requests:", error);
    }
  };

  // Handle type selection
  const handleSelectType = (type) => setSelectedType(type);

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle transport addition
  const handleTransportAdded = async () => {
    await fetchTransports();
    await fetchTransportRequests();
  };

  // Initial data fetching
  useEffect(() => {
    fetchTypes();
    fetchTransports();
    fetchTransportRequests();
  }, []);

  return {
    isTypesLoading,
    isTransportsLoading,
    types,
    selectedType,
    transports,
    typesError,
    transportsError,
    isModalOpen,
    transportReqs,
    transportReqsNotActive,
    transportReqsActive,
    handleSelectType,
    openModal,
    closeModal,
    handleTransportAdded,
  };
};

export default useTransport;
