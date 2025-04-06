import { Timestamp } from '@angular/fire/firestore';

export type TUser = {
    uid?: string;
    email: string;
    password: string;
    username?: string;
    displayName?: string;
    startDate?: Timestamp;
    onboardingDone?: boolean;
};
