import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import { ProfileSearchField } from "../ProfileSearchField/profileSearchField";
import { Achievement, LatestAchievementsView } from "../Achievements/achievements";
import { JobStarHeader } from "../Header/header";
import { SkillList } from "../Skills/skills";

function Welcome() {
    return <Box>
        <h2>Welcome</h2>
    </Box>
}

export interface HomeProps {
    skills: string[]
    selectedSkills: Set<string>
    handleSkillClick: (skill: string) => void
    achievements: Achievement[],
    handleProfileSearchFieldChange: (value: any) => void
}

export function Home(props: HomeProps) {
    return <Box>
        <JobStarHeader></JobStarHeader>
        <Grid container spacing={5}>
            <Grid item xs={6}>
                <Welcome></Welcome>
            </Grid>
            <Grid item xs={6}>
                <LatestAchievementsView achievements={props.achievements}></LatestAchievementsView>
            </Grid>
            <Grid item xs={6}>
                <ProfileSearchField handleChange={value => props.handleProfileSearchFieldChange(value)}></ProfileSearchField>
            </Grid>
            <Grid item xs={6}>
                <HomeSkillList
                    skills={props.skills}
                    selectedSkills={props.selectedSkills}
                    handleClick={skill => props.handleSkillClick(skill)}></HomeSkillList>
            </Grid>
        </Grid>
    </Box>
}

interface HomeSkillListProps {
    skills: string[],
    selectedSkills: Set<string>,
    handleClick: (skill: string) => void
}

function HomeSkillList(props: HomeSkillListProps) {
    return <Paper style={{ maxHeight: 400, maxWidth: 400, overflow: "auto" }}><List>
        {props.skills
            .map(skill => <HomeSkillListItemView
                key={skill}
                isChecked={props.selectedSkills.has(skill)}
                skill={skill}
                handleClick={props.handleClick}></HomeSkillListItemView>)
        }
    </List>
    </Paper>
}

interface HomeSkillListItemViewProps {
    skill: string,
    isChecked: boolean,
    handleClick: (skill: string) => void
}

function HomeSkillListItemView(props: HomeSkillListItemViewProps) {
    return <ListItem>
        <ListItemButton onClick={() => props.handleClick(props.skill)}>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={props.isChecked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': props.skill }}
                />
            </ListItemIcon>
            <ListItemText primary={props.skill}></ListItemText>
        </ListItemButton>
    </ListItem>
}