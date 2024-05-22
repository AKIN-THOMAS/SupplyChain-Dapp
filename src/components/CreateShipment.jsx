import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    Button,
    Input,
    ModalHeader,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { TransactionButton } from "thirdweb/react";
import { CONTRACT } from "@/utils/constants"


const CreateShipment = ({ isOpen, onClose, overlay }) => {

     // State variables for each input field
  const [shipmentId, setShipmentId] = useState('');
  const [productType, setProductType] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  // Handler functions for each input field
  const handleShipmentIdChange = (e) => setShipmentId(e.target.value);
  const handleProductTypeChange = (e) => setProductType(e.target.value);
  const handleCustomerAddressChange = (e) => setCustomerAddress(e.target.value);
  const handleQuantityChange = (e) => setQuantity(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);

  const handleCreateShipment = () => {
    setShipmentId("");
    setProductType("");
    setCustomerAddress("");
    setQuantity("");
    setPrice("");
    // onClose();
  };
  return (
    <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
      {overlay}
      <ModalContent>
        <ModalHeader>Create Shipment</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="6">
          <div className="space-y-6">
            <div className="flex space-x-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Shipment ID
                </label>
                <Input
                  placeholder="Shipment ID"
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
                  placeholder="Product Type"
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  className="mt-1"
                  value={productType}
                  onChange={handleProductTypeChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer Address
              </label>
              <Input
                placeholder="Customer Address"
                _placeholder={{ opacity: 1, color: "gray.500" }}
                className="mt-1"
                value={customerAddress}
                onChange={handleCustomerAddressChange}
              />
            </div>
            <div className="flex space-x-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <Input
                  placeholder="Quantity"
                  _placeholder={{ opacity: 1, color: "gray.500" }}
                  className="mt-1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <Input
                  placeholder="Price"
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
           transaction={() =>
            prepareContractCall({
                contract: CONTRACT,
                method: "createShipment",
                params: [shipmentId, productType, customerAddress, quantity, price,],
            })
        }
          onClick={handleCreateShipment}>Create</TransactionButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateShipment
