import React, {useState} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    Input,
    ModalHeader,
    useDisclosure,
} from "@chakra-ui/react"
import { isAddress } from "ethers";
import { TransactionButton, useSendTransaction } from "thirdweb/react"
import { prepareContractCall, resolveMethod } from "thirdweb"
import { CONTRACT } from "@/utils/constants"

const StartShipment = () => {
    const [shipmentId, setShipmentId] = useState("")
    const [productType, setProductType] = useState("")
    const [customerAddress, setCustomerAddress] = useState("")

    const handleShipmentIdChange = (e) => setShipmentId(e.target.value)
    const handleProductTypeChange = (e) => setProductType(e.target.value)
    const handleCustomerAddressChange = (e) => setCustomerAddress(e.target.value)
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const OverlayTwo = () => (
      <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />
    )
    
    const [overlay, setOverlay] = React.useState(<OverlayTwo />)

    const handleCreateShipment = async () => {
        // Validate the customer address
        if (!isAddress(customerAddress)) {
          alert("Invalid customer address");
          return;
        }
    
        try {
          const transaction = prepareContractCall({
            contract: CONTRACT,
            method: "createShipment",
            params: [shipmentId, customerAddress, productType, quantity, price],
          });
    
          const result = await sendTransaction(transaction);
    
          if (result && result.transactionHash) {
            console.log("Transaction successful:", result.transactionHash);
            // Clear the form inputs
            setShipmentId("");
            setProductType("");
            setCustomerAddress("");
            setQuantity("");
            setPrice("");
            // Optionally close the modal
            onClose();
          } else {
            console.error("Transaction failed:", result);
          }
        } catch (error) {
          console.error("Error creating shipment:", error);
        }
      };
    

    return (
        <div>
            <div className="w-[226px] h-[86px] flex justify-center items-center cursor-pointer">
                <div
                    className="flex justify-center items-center gap-3 text-gray-600 text-lg font-semibold"
                    onClick={() => {
                        setOverlay(<OverlayTwo />)
                        onOpen()
                    }}
                >
                    Start Shipment
                </div>
            </div>
            <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
                <ModalHeader>
                    Start Shipment
                    <div className="flex justify-center items-center text-[14px]">Ensure you verify the product before starting a shipment</div>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody padding="6">
                    <div className="space-y-6">
                    <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Shipment ID
                                </label>
                                <Input
                                    placeholder="uint256"
                                    _placeholder={{ opacity: 1, color: "gray.500" }}
                                    className="mt-1"
                                    value={shipmentId}
                                    onChange={handleShipmentIdChange}
                                />
                            </div>
                        <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product Type
                                </label>
                                <Input
                                    placeholder="string"
                                    _placeholder={{ opacity: 1, color: "gray.500" }}
                                    className="mt-1"
                                    value={productType}
                                    onChange={handleProductTypeChange}
                                />
                            </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Customer Address
                            </label>
                            <Input
                                placeholder="address 0x00..."
                                _placeholder={{ opacity: 1, color: "gray.500" }}
                                className="mt-1"
                                value={customerAddress}
                                onChange={handleCustomerAddressChange}
                            />
                        </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <TransactionButton
                        // onClick={handleCreateShipment }
                        transaction={() => {
                            const tx = prepareContractCall({
                                contract: CONTRACT,
                                method: "startShipment",
                                params: [
                                    shipmentId,
                                    customerAddress,
                                    productType,
                                ],
                            })
                            return tx
                        }}
                       
                        onTransactionSent={(result) => {
                            console.log("Transaction submitted", result.transactionHash)
                        }}
                        onTransactionConfirmed={(receipt) => {
                            console.log("Transaction confirmed", receipt.transactionHash)
                            setShipmentId("")
                            setProductType("")
                            setCustomerAddress("")
                            onClose()
                        }}
                        onError={(error) => {
                            console.error("Transaction error", error)
                        }}
                    >
                        Start Shipment
                    </TransactionButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </div>
    )
}

export default StartShipment