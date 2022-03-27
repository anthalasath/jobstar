import { ethers } from "ethers";
import JobStarAbi from "./abis/JobStar.json";
import MockLensHubABI from "./abis/MockLensHub.json";

// APP TEXT
export const APP_TITLE = "Jobstar"
export const APP_BASELINE = "Share love with your jobs"
export const FOOTER_TEXT = `${new Date().getFullYear()} ${APP_TITLE}, built with ♡ by Anthalasath & Fwoued`
// PAGES TITLE
export const PAGE_TITLE_HOME = "Home"
export const PAGE_TITLE_PROFILE = "Profile"
// UI CONSTANTS
export const FOOTER_HEIGHT = 30
export const HEADER_HEIGHT = 60
export const DRAWER_WIDTH = 250

// ETH CONSTANTS

export interface NetworkConfig {
    jobStar: ContractConfig
    lensHub: ContractConfig
}

export interface ContractConfig {
    address: string
    abi: ethers.ContractInterface
}

export function getNetworkConfig(networkName: string): NetworkConfig {
    if (networkName === "localhost") {
        return {
            jobStar: {
                address: "0x1c7294fd3A24e9caCD64bB83e2504fd9273F718a",
                abi: JobStarAbi
            },
            lensHub: {
                address: "0xba66896B25280E3bD7C2cd3bEcAab95bBBA7B534",
                abi: MockLensHubABI
            }
        }
    } else {
        throw new Error(`Unsupported network: ${networkName}`)
    }
}