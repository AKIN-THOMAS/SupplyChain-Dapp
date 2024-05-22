import React, { useState } from "react"
import { Input, Button, Box, Text } from "@chakra-ui/react"
import { useReadContract, TransactionButton } from "thirdweb/react"
import { CONTRACT } from "@/utils/constants"
import { prepareContractCall } from "thirdweb"

const ShipmentDetails = () => {
    const [shipmentId, setShipmentId] = useState()

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

    const shipmentDetailObject = shipmentDetail
        ? Object.fromEntries(shipmentDetail.map((value, index) => [keys[index], value]))
        : null

    return (
        <div>
            <Box className="mt-40 ml-[30px] mr-[70px]">
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
                                method: "shipmentDetails",
                                params: shipmentId,
                            })
                        }
                        className="mt-2"
                    >
                        Get Shipment Details
                    </TransactionButton>
                </Box>
                {loadingShipmentDetail ? (
                    <p>Loading...</p>
                ) : (
                    <div className="mt-4">
                        <h3>Shipment Details:</h3>
                        {shipmentDetailObject ? (
                            <pre>{JSON.stringify(shipmentDetailObject, replacer, 2)}</pre>
                        ) : (
                            <p>No details available for the given shipment ID.</p>
                        )}
                    </div>
                )}
            </Box>
        </div>
    )
}

export default ShipmentDetails
