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
import React, { useState } from "react"
import { TransactionButton, useSendTransaction } from "thirdweb/react"
import { prepareContractCall, resolveMethod } from "thirdweb"
import { CONTRACT } from "@/utils/constants"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateShipment = () => {

  // State variables for each input field
  const [shipmentId, setShipmentId] = useState("")
  const [productType, setProductType] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")

  const handleShipmentIdChange = (e) => setShipmentId(e.target.value)
  const handleProductTypeChange = (e) => setProductType(e.target.value)
  const handleCustomerAddressChange = (e) => setCustomerAddress(e.target.value)
  const handleQuantityChange = (e) => setQuantity(e.target.value)
  const handlePriceChange = (e) => setPrice(e.target.value)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const OverlayTwo = () => (
    <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />
  )

  const [overlay, setOverlay] = React.useState(<OverlayTwo />)

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
          Create Shipment
        </div>
      </div>
      <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create Shipment</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="6">
            <div className="space-y-6">
              <div className="flex space-x-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Shipment ID</label>
                  <Input
                    placeholder="uint256"
                    _placeholder={{ opacity: 1, color: "gray.500" }}
                    className="mt-1"
                    value={shipmentId}
                    onChange={handleShipmentIdChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Product Type</label>
                  <Input
                    placeholder="string"
                    _placeholder={{ opacity: 1, color: "gray.500" }}
                    className="mt-1"
                    value={productType}
                    onChange={handleProductTypeChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Customer Address</label>
                <Input
                  placeholder="address 0x000..."
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  className="mt-1"
                  value={customerAddress}
                  onChange={handleCustomerAddressChange}
                />
              </div>
              <div className="flex space-x-6">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <Input
                    placeholder="string"
                    _placeholder={{ opacity: 1, color: "gray.500" }}
                    className="mt-1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <Input
                    placeholder="price"
                    _placeholder={{ opacity: 1, color: "gray.500" }}
                    className="mt-1"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <TransactionButton
              transaction={() => {
                const tx = prepareContractCall({
                  contract: CONTRACT,
                  method: resolveMethod("createShipment"),
                  params: [shipmentId, customerAddress, productType, quantity, price],
                });
                return tx;
              }}
              onTransactionSent={(result) => {
                // Notification
                toast.info(result.transactionHash);
              }}
              onTransactionConfirmed={(receipt) => {
                // Notification
                toast.success(receipt.transactionHash);
                setShipmentId("");
                setProductType("");
                setCustomerAddress("");
                setQuantity("");
                setPrice("");
                onClose();
              }}
              onError={(error) => {
                // Notification
                toast.error(error.message);
              }}
            >
              Create
            </TransactionButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default CreateShipment
