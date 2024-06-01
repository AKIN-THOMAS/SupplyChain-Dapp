// import React, { useState } from "react"
// import { Input, Button, Box, Text } from "@chakra-ui/react"
// import { useReadContract, TransactionButton } from "thirdweb/react"
// import { CONTRACT } from "@/utils/constants"
// import { prepareContractCall } from "thirdweb"

// const ShipmentDetails = () => {
//     const [shipmentId, setShipmentId] = useState()

//     const { data: shipmentDetail, isLoading: loadingShipmentDetail } = useReadContract({
//         contract: CONTRACT,
//         method: "shipmentDetails",
//         params: [shipmentId],
//     })

//     const replacer = (key, value) => {
//         if (typeof value === "bigint") {
//             return value.toString()
//         }
//         return value
//     }
//     const keys = [
//         "shipmentId",
//         "producer",
//         "customer",
//         "productType",
//         "quantity",
//         "timestamp",
//         "deliveryTime",
//         "verified",
//         "isPaid",
//         "shipmentStages",
//         "price",
//     ]

//     const shipmentDetailObject = shipmentDetail
//         ? Object.fromEntries(shipmentDetail.map((value, index) => [keys[index], value]))
//         : null

//     return (
//         <div>
//             <Box className="mt-40 ml-[30px] mr-[70px]">
//                 <Box className="mb-4">
//                     <Input
//                         placeholder="Enter Shipment ID"
//                         value={shipmentId}
//                         onChange={(e) => setShipmentId(e.target.value)}
//                     />
//                     <TransactionButton
//                         transaction={() =>
//                             prepareContractCall({
//                                 contract: CONTRACT,
//                                 method: "shipmentDetails",
//                                 params: shipmentId,
//                             })
//                         }
//                         className="mt-2"
//                     >
//                         Get Shipment Details
//                     </TransactionButton>
//                 </Box>
//                 {loadingShipmentDetail ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <div className="mt-4">
//                         <h3>Shipment Details:</h3>
//                         {shipmentDetailObject ? (
//                             <pre>{JSON.stringify(shipmentDetailObject, replacer, 2)}</pre>
//                         ) : (
//                             <p>No details available for the given shipment ID.</p>
//                         )}
//                     </div>
//                 )}
//             </Box>
//         </div>
//     )
// }

// export default ShipmentDetails

import React, { useState } from "react"
import { Input, Button, Box, Text, VStack, HStack, Divider, Spinner } from "@chakra-ui/react"
import { useReadContract, TransactionButton } from "thirdweb/react"
import { CONTRACT } from "@/utils/constants"
import { prepareContractCall } from "thirdweb"
import CreateShipment from "./CreateShipment"

const ShipmentDetails = ({ onCreateShipment }) => {
  const [shipmentId, setShipmentId] = useState("")

  const { data: shipmentDetail, isLoading: loadingShipmentDetail } = useReadContract({
    contract: CONTRACT,
    method: "shipmentDetails",
    params: [shipmentId],
  })

  const replacer = (key, value) => {
    if (typeof value === "bigint") {
      return value.toString()
    }
    return value
  }

  const keys = [
    "shipmentId",
    "producer",
    "customer",
    "productType",
    "quantity",
    "timestamp",
    "deliveryTime",
    "verified",
    "isPaid",
    "shipmentStages",
    "price",
  ]

  const stagesMapping = {
    1: "Packaging",
    2: "Transit",
    3: "Delivered",
  }

  const shipmentDetailObject = shipmentDetail
    ? Object.fromEntries(shipmentDetail.map((value, index) => [keys[index], value]))
    : null

  const isShipmentNotFound =
    shipmentDetailObject &&
    shipmentDetailObject.producer === "0x0000000000000000000000000000000000000000"

  return (
    <div>
        <p className="flex justify-center items-center text-[24px]">Alpinist Chain</p>
      <Box className="mt-20 ml-[30px] mr-[70px]">
        <Box className="mb-4">
          <Input
            placeholder="Enter Shipment ID"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
          />
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: CONTRACT,
                method: resolveMethod("shipmentDetails"),
                params: [shipmentId],
              })
            }
            className="mt-2"
          >
            Get Shipment Details
          </TransactionButton>
        </Box>
        {loadingShipmentDetail ? (
          <div className="flex justify-center items-center h-full">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='bg-gray-800'
                size='xl'
            />
          </div>
        ) : (
          shipmentDetailObject &&
          (isShipmentNotFound ? (
            <Box className="mt-4" p="6" boxShadow="lg" rounded="md" bg="white">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                {shipmentId == "" ? "Enter Shipment ID" : "Shipment not found."}
              </Text>
              <Button colorScheme="blue">
                <CreateShipment className="cursor-pointer" />
              </Button>
            </Box>
          ) : (
            <Box className="mt-4" p="6" boxShadow="lg" rounded="md" bg="white">
              <Text fontSize="xl" fontWeight="bold" mb="4">
                Shipment Details
              </Text>
              <VStack align="start" spacing="4">
                {Object.entries(shipmentDetailObject).map(([key, value]) => (
                  <HStack key={key} w="100%" justify="space-between">
                    <Text fontWeight="medium" color="gray.600">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </Text>
                    <Text>
                      {key === "shipmentStages" ? stagesMapping[value] : value.toString()}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          ))
        )}
      </Box>
    </div>
  )
}

export default ShipmentDetails
