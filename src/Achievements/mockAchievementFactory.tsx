import { Job, Project } from "../Skills/skills";
import { Achievement } from "./achievements";

const cosCsharpDeveloperJob: Job = {
    title: "C# Programmer",
    description: "Develop UI and tools for the game Clash Of Streamers"
}

const cosProject: Project = {
    name: "Clash Of Streamers",
    teamDisplayName: "The Singularity Group",
    imageUri: "https://play-lh.googleusercontent.com/7WBLXw6FGMFqwmCaqU1KXLDl73oFJ6iVlQ5Dl_Wq3Mlfv95eCDwdS7kdB-5TDUuojVo=s360"
}


export interface MockAchievementInput {
    skill: string,
    job: Job,
    project: Project,
    description: string,
    dateOfDelivery: Date,
}

export class MockAchievementFactory {
    static lastId = 0;

    static createCoS(description: string): Achievement {
        return this.create({
            description,
            skill: "C#",
            job: cosCsharpDeveloperJob,
            project: cosProject,
            dateOfDelivery: new Date(Date.parse("31 May 2022"))
        });
    }

    static createAutomation(description: string, project: Project, dateOfDelivery: Date): Achievement {
        return this.create({
            description,
            skill: "NodeJS",
            job: {
                title: "Automation developer",
                description: "Develop automated internal tools"
            },
            project,
            dateOfDelivery
        });
    }

    static create(input: MockAchievementInput): Achievement {
        const id = (++this.lastId).toString();
        return {
            id,
            skill: input.skill,
            project: input.project,
            description: input.description,
            dateOfDelivery: input.dateOfDelivery,
            job: input.job,
            issuer: "0x0000000000000000000000000000000000000000"
        }
    }
}