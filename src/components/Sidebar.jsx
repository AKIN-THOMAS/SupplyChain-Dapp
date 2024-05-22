import React, { useState } from "react"
import Login from "./Login"
import {
    ModalOverlay,
    Button,
    useDisclosure,
} from "@chakra-ui/react"
import CreateShipment from "./CreateShipment"
import { useActiveAccount, useReadContract } from "thirdweb/react"
import { CONTRACT } from "@/utils/constants";

const Sidebar = ({ setIsOpen, isOpened }) => {
    const OverlayTwo = () => (
        <ModalOverlay bg="none" backdropFilter="auto" backdropInvert="80%" backdropBlur="2px" />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayTwo />)
    const account = useActiveAccount()

    const {data: shipmentCount, isLoading: loadingShipmentCount} = useReadContract({
      contract: CONTRACT,
      method: "shipmentCount",
    })

    return (
        <>
        <button
            className="md:hidden fixed top-4 left-4 bg-gray-800 text-white p-2 rounded"
            onClick={() => setIsOpen(!isOpened)}
        >
            Menu
        </button>

        <div
          className={`fixed h-screen box-border rounded-r-[45px] border border-gray-300 bg-white overflow-y-scroll transform transition-transform duration-300 ${
              isOpened ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static`}
      >
          <div className="flex items-center gap-6 my-12 mx-5">
              <Login />
          </div>
          <div className="flex flex-col items-center">
            {account && (
            <>
              <div className="w-[226px] h-[86px] flex justify-center items-center">
                <div className="flex justify-center items-center gap-3 text-gray-600 text-lg font-semibold">
                    <Button
                        ml="4"
                        onClick={() => {
                            setOverlay(<OverlayTwo />)
                            onOpen()
                        }}
                    >
                        Create Shipment
                    </Button>
                    <CreateShipment
                        isOpen={isOpen}
                        onClose={onClose}
                        overlay={overlay}
                    />
                </div>
              </div>
              <div className="w-[226px] h-[86px] bg-[rgba(190,18,60,0.1)] flex justify-center items-center">
                <div className="flex justify-center items-center gap-3 text-[#be123c] text-lg font-semibold">
                    <p>Start Shipment</p>
                </div>
              </div>

              <div className="w-[226px] h-[86px] flex justify-center items-center">
                <div className="flex justify-center items-center gap-3 text-gray-600 text-lg font-semibold">
                    <p>Shipment Details</p>
                </div>
              </div>
          </>
            )}
              <div className="flex justify-center items-center my-20 p-3 w-[170px] h-[210px] rounded-[20px] border border-[rgba(190,18,60,0.7)] bg-[rgba(248,231,235,0.4)]">
                  <div className="flex flex-col justify-center items-center p-1">
                      <div className="text-[rgba(51,51,51,0.8)] text-sm font-semibold flex justify-center items-center">
                          <p>Create and Verify Shipment before Starting the Shipment</p>
                      </div>
                      <div className="text-gray-600 text-xs font-medium flex justify-center items-center">
                          <p>Shipment Count</p>
                      </div>
                      <div className="flex-shrink-0">
                        <button className="w-[130px] p-13 h-[30px] rounded-full bg-[rgba(190,18,60,0.2)] text-[#be123c] text-xs font-medium">
                            {shipmentCount?.toString()} Shipment counts
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        </>
    )
}

export default Sidebar
