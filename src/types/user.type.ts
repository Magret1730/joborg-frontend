export type UpdateUserPayload = {
    first_name?: string;
    last_name?: string;
    email?: string;
};

export type UpdateUserResponse = {
    message?: string;
    error?: string;
    success?: boolean;
    data: {
    //   token: string;
      user: {
        // id: string;
        // email: string;
        first_name: string;
        last_name: string;
        // is_admin: boolean;
        // is_verified: boolean;
      };
    };
};