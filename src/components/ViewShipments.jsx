// import React, { useState } from "react";
// import { Input, Button, Box, Text } from "@chakra-ui/react";
// import { useReadContract, useActiveAccount } from "thirdweb/react";
// import { CONTRACT } from "@/utils/constants";
// import ShipmentDetails from "./ShipmentDetails";

// const ViewShipments = () => {
//   const [shipmentDetails, setShipmentDetails] = useState(null);
//   const account = useActiveAccount()


//   const {data: owner, isLoading: loadingOwner} = useReadContract({
//     contract: CONTRACT,
//     method: "owner"
//   })

//   const { data: shipmentCount, isLoading: loadingShipmentCount } = useReadContract({
//     contract: CONTRACT,
//     method: "shipmentCount",
// })

  

//   const handleSearch = () => {
//     // Mock API call to get shipment details
//     const details = {
//       owner: loadingOwner ? <p>...</p> : owner?.toString(),
//       count: 200,
//     };
//     setShipmentDetails(details);
//   };

//   const handleStartShipment = () => {
//     // Logic to start shipment
//     console.log("Starting shipment...");
//   };

//   return (
//    <Box>
//     {account ? (
//     <ShipmentDetails />
      
//     ) : (
//       <>
//         <Box>
//           <Text fontWeight="bold">Owner: {loadingOwner ? <p>...</p> : owner?.toString()}</Text>
//           <Text fontWeight="bold">{loadingShipmentCount ? <p>...</p> : shipmentCount?.toString()} Shipment counts</Text>
//         </Box>
//       </>
//     )}
//     </Box>
//   );
// };

// export default ViewShipments;

import React, { useState } from "react";
import { Input, Button, Box, Text, Flex, VStack, Heading, useDisclosure, Center } from "@chakra-ui/react";
import { useReadContract, useActiveAccount, TransactionButton } from "thirdweb/react";
import { CONTRACT } from "@/utils/constants";
import ShipmentDetails from "./ShipmentDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Login"


const ViewShipments = () => {
  const account = useActiveAccount();
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: owner, isLoading: loadingOwner } = useReadContract({
    contract: CONTRACT,
    method: "owner",
  });

  const { data: shipmentCount, isLoading: loadingShipmentCount } = useReadContract({
    contract: CONTRACT,
    method: "shipmentCount",
  });

  return (
    <Center minHeight="100vh" bg="gray.50" p={4}>
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="md"
        w={{ base: "90%", md: "70%", lg: "80%" }}
        textAlign="center"
      >
        {account ? (
          <ShipmentDetails />
        ) : (
          <VStack spacing={6} align="center">
            <Heading as="h1" size="xl" mb={4} color="teal.600">
              Welcome to the Shipment Dashboard
            </Heading>
            <Text fontSize="lg" color="gray.700">
              Please connect your wallet to start managing your shipments.
            </Text>
            <Login />
            <Box mt={6} w="100%">
              <Text fontWeight="bold" color="gray.600">
                Owner: {loadingOwner ? <p>Loading...</p> : owner?.toString()}
              </Text>
              <Text fontWeight="bold" color="gray.600">
                Shipment Count: {loadingShipmentCount ? <p>Loading...</p> : shipmentCount?.toString()}
              </Text>
            </Box>
            <Box mt={6} textAlign="left">
              <Heading as="h2" size="md" mb={4} color="teal.500">
                Instructions
              </Heading>
              <Text fontSize="md" color="gray.700" mb={2}>
                Follow these steps to manage shipments:
              </Text>
              <Text as="ol" listStyleType="decimal" color="gray.700">
                <li>Connect your wallet using the "Connect Wallet" button above.</li>
                <li>Create a product by providing the required details (e.g., Product Type, Quantity, etc.).</li>
                <li>Verify the product to ensure its details are correct.</li>
                <li>Start a shipment by providing the shipment ID, customer address, and other necessary information. Ensure you verify products before starting</li>
                <li>Track the shipment through different stages: Packaging, Transit, and Delivered.</li>
                <li>Complete the shipment once it reaches the final destination.</li>
              </Text>
            </Box>
          </VStack>
        )}
        <ToastContainer />
      </Box>
    </Center>
  );};

export default ViewShipments;
