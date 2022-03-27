import { BigNumber, Contract } from "ethers";
import { Profile } from "../Profile/profile";

export async function getProfileIds(address: string): Promise<BigNumber[]> {
    return []; // TODO
}

export async function getProfileByHandle(handle: string): Promise<Profile | undefined> {
    return undefined;
}

export async function getProfilesByIds(profileIds: BigNumber[]): Promise<Profile | null[]> {
    return [];
}

export interface LensProfile {
    id: BigNumber
    handle: string
    imageURI: string,

}

export class LensProtocol {
    public lensHub: Contract;

    constructor(lensHub: Contract) {
        this.lensHub = lensHub;
    }

    async getProfileIds(address: string): Promise<BigNumber[]> {
        return []; // TODO
    }

    async getProfileByHandle(handle: string): Promise<LensProfile | undefined> {
        return undefined;
    }

    async getProfilesByIds(profileIds: BigNumber[]): Promise<LensProfile[]> {
        return Promise.all(profileIds.map(id => this.lensHub.getProfile(id)));
    }

}