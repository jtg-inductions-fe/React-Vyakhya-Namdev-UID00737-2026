import { IGithubUser } from '@services/api';

/** Props used to display the user's main profile information. */
export interface IProfileHeaderProps {
    user: IGithubUser;
}

/** Props used to display the user's bio. */
export interface IProfileBioProps {
    bio: string | null;
}

/** Props used to display the user's contact and profile links. */
export interface IProfileLinksProps {
    githubUrl: string | null;
    blog: string | null;
    email: string | null;
}

/** Defining Profile state for triggering followers */
export interface IProfileState {
    followers: number;
    followStatus: 'idle' | 'loading' | 'success' | 'error';
    isFollowing: boolean;
}
