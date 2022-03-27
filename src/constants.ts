import { ethers } from "ethers";
import JobStarAbi from "./abis/JobStar.json";

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
}

export interface ContractConfig {
    address: string
    abi: ethers.ContractInterface
}

export function getNetworkConfig(networkName: string): NetworkConfig {
    if (networkName === "localhost") {
        return {
            jobStar: {
                address: "0x8B04A41B64e6E38D4bE50f4d16Db841DabC7036d",
                abi: JobStarAbi
            }
        }
    } else {
        throw new Error(`Unsupported network: ${networkName}`)
    }
}