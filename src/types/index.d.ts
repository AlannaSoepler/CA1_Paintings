export interface MyAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export interface LoginFormType {
    email?: string;
    password?: string;
}

export interface FestivalType {
    title: string;
    description: string;
    city: string;
    start_date: date;
    end_date: date;
}