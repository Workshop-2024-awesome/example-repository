import { useDispatch } from "react-redux";
import { useUserControllerGetProfileQuery } from "../api/generated"
import { signOut } from "../stores/auth/authSlice";
import { LoadingIndicator } from "../components/LoadingIndicator";

export const Profile = () => {

    const dispatch = useDispatch();

    const { data, isFetching, isLoading } = useUserControllerGetProfileQuery();

    const isBusy = isFetching || isLoading;
    const hasData = data != null;

    const getProfileImage = () => data && data.profileImageUrl
        ? data.profileImageUrl
        : 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        {isBusy && <LoadingIndicator/>}
                        {!isBusy && !hasData && <>No data</>}
                        {!isBusy && hasData && (
                            <>
                                <div className="mx-auto max-w-2xl lg:mx-0">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Your Profile</h2>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                        {data.description}
                                    </p>
                                </div>
                                <ul
                                    role="list"
                                    className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none"
                                >
                                    <li key='you'>
                                        <img alt="" src={getProfileImage()} className="aspect-full w-full rounded-2xl object-cover" />
                                        <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{data.firstname} {data.lastname}</h3>
                                        <p className="text-base leading-7 text-gray-600">{data.profession}</p>
                                        <ul role="list" className="mt-6 flex gap-x-6">
                                            {data.linkedInUrl && (
                                                <li>
                                                    <a href={data.linkedInUrl} target="_blank" className="text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">LinkedIn</span>
                                                        <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
                                                            <path
                                                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                                clipRule="evenodd"
                                                                fillRule="evenodd"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                            )}

                                            {data.githubUrl && (
                                                <li>
                                                    <a href={data.githubUrl} target="_blank" className="text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">Github</span>
                                                        <svg fill="currentColor" viewBox="0 0 496 512" aria-hidden="true" className="h-5 w-5">
                                                            <path
                                                                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                                                clipRule="evenodd"
                                                                fillRule="evenodd"
                                                            />
                                                        </svg>
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                </ul>

                                <button
                                    type="button"
                                    onClick={() => dispatch(signOut())}
                                    className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Logout
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

