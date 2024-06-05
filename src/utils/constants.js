import { createThirdwebClient, defineChain } from "thirdweb"
import { getContract } from "thirdweb"

const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const secretKey = process.env.NEXT_PUBLIC_TEMPLATE_SECRET_KEY;

if (!clientId || !secretKey) {
    throw new Error('clientId or secretKey must be provided');
}

export const client = createThirdwebClient({
    clientId: clientId,
    secretKey: secretKey
});
export const chain = defineChain(11155111)
export const CONTRACT_ADDRESS = "0x7dF5CD0251CABB03EE00C678400C0413F9F30E48"



const contractABI = [
    {
        type: "constructor",
        name: "",
        inputs: [],
        outputs: [],
        stateMutability: "payable",
    },
    {
        type: "event",
        name: "PaymentDetails",
        inputs: [
            {
                type: "address",
                name: "customer",
                indexed: true,
                internalType: "address",
            },
            {
                type: "address",
                name: "producer",
                indexed: true,
                internalType: "address",
            },
            {
                type: "uint256",
                name: "amount",
                indexed: false,
                internalType: "uint256",
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: "event",
        name: "PaymentMade",
        inputs: [
            {
                type: "uint256",
                name: "shipmentId",
                indexed: true,
                internalType: "uint256",
            },
            {
                type: "uint256",
                name: "amount",
                indexed: false,
                internalType: "uint256",
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: "event",
        name: "ProductVerified",
        inputs: [
            {
                type: "uint256",
                name: "shipmentId",
                indexed: true,
                internalType: "uint256",
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: "event",
        name: "ShipmentCreated",
        inputs: [
            {
                type: "uint256",
                name: "shipmentId",
                indexed: true,
                internalType: "uint256",
            },
            {
                type: "address",
                name: "producer",
                indexed: true,
                internalType: "address",
            },
            {
                type: "string",
                name: "productType",
                indexed: false,
                internalType: "string",
            },
            {
                type: "uint256",
                name: "_price",
                indexed: false,
                internalType: "uint256",
            },
            {
                type: "address",
                name: "_customer",
                indexed: false,
                internalType: "address",
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: "event",
        name: "ShipmentDelivered",
        inputs: [
            {
                type: "address",
                name: "producer",
                indexed: true,
                internalType: "address",
            },
            {
                type: "address",
                name: "customer",
                indexed: false,
                internalType: "address",
            },
            {
                type: "uint256",
                name: "deliveryTime",
                indexed: false,
                internalType: "uint256",
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: "event",
        name: "ShipmentInTransit",
        inputs: [
            {
                type: "uint256",
                name: "shipmentId",
                indexed: true,
                internalType: "uint256",
            },
            {
                type: "string",
                name: "productType",
                indexed: false,
                internalType: "string",
            },
            {
                type: "address",
                name: "customer",
                indexed: false,
                internalType: "address",
            },
            {
                type: "uint256",
                name: "timestamp",
                indexed: false,
                internalType: "uint256",
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: "event",
        name: "ShipmentStageUpdated",
        inputs: [
            {
                type: "uint256",
                name: "shipmentId",
                indexed: true,
                internalType: "uint256",
            },
            {
                type: "uint8",
                name: "stage",
                indexed: false,
                internalType: "enum SupplyChain.ShipmentStatus",
            },
        ],
        outputs: [],
        anonymous: false,
    },
    {
        type: "function",
        name: "completeShipment",
        inputs: [
            {
                type: "uint256",
                name: "_shipmentId",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "payable",
    },
    {
        type: "function",
        name: "createShipment",
        inputs: [
            {
                type: "uint256",
                name: "_shipmentId",
                internalType: "uint256",
            },
            {
                type: "address",
                name: "_customer",
                internalType: "address",
            },
            {
                type: "string",
                name: "_productType",
                internalType: "string",
            },
            {
                type: "uint256",
                name: "_quantity",
                internalType: "uint256",
            },
            {
                type: "uint256",
                name: "_price",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
            {
                type: "address",
                name: "",
                internalType: "address",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "shipmentCount",
        inputs: [],
        outputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "shipmentDetails",
        inputs: [
            {
                type: "uint256",
                name: "_shipmentId",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256",
            },
            {
                type: "address",
                name: "",
                internalType: "address",
            },
            {
                type: "address",
                name: "",
                internalType: "address",
            },
            {
                type: "string",
                name: "",
                internalType: "string",
            },
            {
                type: "uint256",
                name: "",
                internalType: "uint256",
            },
            {
                type: "uint256",
                name: "",
                internalType: "uint256",
            },
            {
                type: "uint256",
                name: "",
                internalType: "uint256",
            },
            {
                type: "bool",
                name: "",
                internalType: "bool",
            },
            {
                type: "bool",
                name: "",
                internalType: "bool",
            },
            {
                type: "uint8",
                name: "",
                internalType: "enum SupplyChain.ShipmentStatus",
            },
            {
                type: "uint256",
                name: "",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "shipments",
        inputs: [
            {
                type: "uint256",
                name: "",
                internalType: "uint256",
            },
        ],
        outputs: [
            {
                type: "uint256",
                name: "shipmentId",
                internalType: "uint256",
            },
            {
                type: "address",
                name: "producer",
                internalType: "address",
            },
            {
                type: "address",
                name: "customer",
                internalType: "address",
            },
            {
                type: "string",
                name: "productType",
                internalType: "string",
            },
            {
                type: "uint256",
                name: "quantity",
                internalType: "uint256",
            },
            {
                type: "uint256",
                name: "timestamp",
                internalType: "uint256",
            },
            {
                type: "uint256",
                name: "deliveryTime",
                internalType: "uint256",
            },
            {
                type: "bool",
                name: "verified",
                internalType: "bool",
            },
            {
                type: "bool",
                name: "isPaid",
                internalType: "bool",
            },
            {
                type: "uint8",
                name: "shipmentStages",
                internalType: "enum SupplyChain.ShipmentStatus",
            },
            {
                type: "uint256",
                name: "price",
                internalType: "uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        type: "function",
        name: "startShipment",
        inputs: [
            {
                type: "address",
                name: "customer",
                internalType: "address",
            },
            {
                type: "uint256",
                name: "_shipmentId",
                internalType: "uint256",
            },
            {
                type: "string",
                name: "_productType",
                internalType: "string",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
    {
        type: "function",
        name: "verifyProduct",
        inputs: [
            {
                type: "uint256",
                name: "_shipmentId",
                internalType: "uint256",
            },
        ],
        outputs: [],
        stateMutability: "nonpayable",
    },
]

export const CONTRACT = getContract({
    client: client,
    chain: chain,
    address: CONTRACT_ADDRESS,
    abi: contractABI,
})
