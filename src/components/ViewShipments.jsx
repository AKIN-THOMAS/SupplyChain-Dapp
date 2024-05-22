import React, { useState } from "react";
import { Input, Button, Box, Text } from "@chakra-ui/react";
import { useReadContract, TransactionButton } from "thirdweb/react";
import { CONTRACT } from "@/utils/constants";
import ShipmentDetails from "./ShipmentDetails";

const ViewShipments = () => {
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const [isShipmentVerified, setIsShipmentVerified] = useState(false);

  const {data: owner, isLoading: loadingOwner} = useReadContract({
    contract: CONTRACT,
    method: "owner"
  })

  

  const {data: shipmentDetail, isLoading: loadingShipmentDetail} = useReadContract({
    contract: CONTRACT,
    method: "shipmentDetails",
    
  })

  const handleSearch = () => {
    // Mock API call to get shipment details
    const details = {
      owner: loadingOwner ? <p>...</p> : owner?.toString(),
      count: 200,
      details: "Shipment details here...",
    };
    setShipmentDetails(details);
    setIsShipmentVerified(true); // Simulate verification
  };

  const handleStartShipment = () => {
    // Logic to start shipment
    console.log("Starting shipment...");
  };

  return (
   <Box>
    <ShipmentDetails />
      {shipmentDetails && (
        <Box>
          <Text fontWeight="bold">Owner: {shipmentDetails.owner}</Text>
          <Text fontWeight="bold">Shipment Count: {shipmentDetails.count}</Text>
          <Text>Details: {shipmentDetails.details}</Text>
        </Box>
      )}
      {isShipmentVerified && (
        <Button
          colorScheme="green"
          onClick={handleStartShipment}
          className="mt-4"
        >
          Start Shipment
        </Button>
      )}
    </Box>
  );
};

export default ViewShipments;
