import { generated } from "./generated";

export const api = generated.enhanceEndpoints({
  // addTagTypes: ["Weather", "WeatherById"],
  // endpoints: {
  //   getWeatherForecast: {
  //     providesTags: [{ type: "Weather" }],
  //   },
  //   getWeatherForecastById: {
  //     providesTags: [{ type: "WeatherById" }],
  //   },
  //   postWeatherForecast: {
  //     invalidatesTags: [{ type: "Weather" }],
  //   },
  //   deleteWeatherForecast: {
  //     invalidatesTags: [{ type: "Weather" }, { type: "WeatherById" }],
  //     async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
  //       const patchResult = dispatch(
  //         api.util.updateQueryData("getWeatherForecast", undefined, (draft) => {
  //           const index = draft.findIndex((d) => d.id === id);
  //           if (index < 0) {
  //             return;
  //           }
  //           draft.splice(index, 1);
  //         })
  //       );
  //       try {
  //         await queryFulfilled;
  //       } catch {
  //         patchResult.undo();
  //       }
  //     },
  //   },
  // },
});
