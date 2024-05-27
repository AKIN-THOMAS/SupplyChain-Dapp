import React, { useState } from "react"
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
import { TransactionButton, useSendTransaction } from "thirdweb/react"
import { prepareContractCall, resolveMethod } from "thirdweb"
import { CONTRACT } from "@/utils/constants"

const VerifyProduct = () => {
    const [shipmentId, setShipmentId] = useState("")
    const handleShipmentIdChange = (e) => setShipmentId(e.target.value)
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
                    Verify Product
                </div>
            </div>
            <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent>
                    <ModalHeader>
                        Verify Product
                        <div className="flex justify-center items-center text-[14px]">Verification of products can and should be done at all stages</div>
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
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <TransactionButton
                            transaction={() => {
                                const tx = prepareContractCall({
                                    contract: CONTRACT,
                                    method: "verifyProduct",
                                    params: [shipmentId],
                                })
                                return tx
                            }}
                            onTransactionSent={(result) => {
                                console.log("Transaction submitted", result.transactionHash)
                            }}
                            onTransactionConfirmed={(receipt) => {
                                console.log("Transaction confirmed", receipt.transactionHash)
                                setShipmentId("")
                                onClose()
                            }}
                            onError={(error) => {
                                console.error("Transaction error", error)
                            }}
                        >
                            Verify Product
                        </TransactionButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default VerifyProduct
