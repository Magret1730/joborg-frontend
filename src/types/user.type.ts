export type UpdateUserPayload = {
    first_name?: string;
    last_name?: string;
    email?: string;
};

export type UpdateUserResponse = {
    success: boolean;
    message: string;
};