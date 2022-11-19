declare type middleware = 'auth' | 'guest'
export interface AuthInterface {
    middleware?: middleware,
    redirectIfAuthenticated?: string;
}
