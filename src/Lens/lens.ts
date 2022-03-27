import { BigNumber } from "ethers";
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