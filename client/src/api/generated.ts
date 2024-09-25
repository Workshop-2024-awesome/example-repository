import { base as api } from "./base";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerSignIn: build.mutation<
      AuthControllerSignInApiResponse,
      AuthControllerSignInApiArg
    >({
      query: (queryArg) => ({
        url: `/api/auth/login`,
        method: "POST",
        body: queryArg.loginRequestDto,
      }),
    }),
    authControllerSignOut: build.mutation<
      AuthControllerSignOutApiResponse,
      AuthControllerSignOutApiArg
    >({
      query: () => ({ url: `/api/auth/logout`, method: "POST" }),
    }),
    authControllerGetSession: build.query<
      AuthControllerGetSessionApiResponse,
      AuthControllerGetSessionApiArg
    >({
      query: () => ({ url: `/api/auth/session` }),
    }),
    userControllerGetProfile: build.query<
      UserControllerGetProfileApiResponse,
      UserControllerGetProfileApiArg
    >({
      query: () => ({ url: `/api/user/profile` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as generated };
export type AuthControllerSignInApiResponse =
  /** status 200  */ LoginResponseDto;
export type AuthControllerSignInApiArg = {
  loginRequestDto: LoginRequestDto;
};
export type AuthControllerSignOutApiResponse = unknown;
export type AuthControllerSignOutApiArg = void;
export type AuthControllerGetSessionApiResponse = /** status 200  */ AuthUser;
export type AuthControllerGetSessionApiArg = void;
export type UserControllerGetProfileApiResponse =
  /** status 200  */ UserProfile;
export type UserControllerGetProfileApiArg = void;
export type LoginResponseDto = {
  token: string;
};
export type LoginRequestDto = {
  email: string;
  password: string;
};
export type AuthUser = {
  userId: string;
  email: string;
};
export type UserProfile = {
  email: string;
  firstname: string;
  lastname: string;
  description: string;
  profession: string;
  githubUrl?: string;
  linkedInUrl?: string;
  profileImageUrl?: string;
};
export const {
  useAuthControllerSignInMutation,
  useAuthControllerSignOutMutation,
  useAuthControllerGetSessionQuery,
  useUserControllerGetProfileQuery,
} = injectedRtkApi;
