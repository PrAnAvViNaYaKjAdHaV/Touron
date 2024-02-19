import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customizeData: {
    travelType: "",
    state: "",
    city: "",
    destination: "",
    travelWith: "",
    departureStation: "",
    dateItenary: {
      startDate: "",
      endDate: "",
    },
    tourPlan: "",
    nearestBranch: "",
    queryFrom: "Website",
  },
  step: 0,
};

const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    setTravelType: (state, action) => {
      state.customizeData.travelType = action.payload;
    },
    setState: (state, action) => {
      state.customizeData.state = action.payload;
    },
    setCity: (state, action) => {
      state.customizeData.city = action.payload;
    },
    setDestination: (state, action) => {
      state.customizeData.destination = action.payload;
    },
    setTravelWith: (state, action) => {
      state.customizeData.travelWith = action.payload;
    },
    setDepartureStation: (state, action) => {
      state.customizeData.departureStation = action.payload;
    },
    setDateItenary: (state, action) => {
      state.customizeData.dateItenary.startDate = action.payload.startDate;
      state.customizeData.dateItenary.endDate = action.payload.endDate;
      state.customizeData.tourPlan = action.payload.tourPlan;
    },
    setTourPlanId: (state, action) => {
      console.log(action.payload);
      state.customizeData.tourPlan = action.payload;
    },
    setNearestBranch: (state, action) => {
      state.customizeData.nearestBranch = action.payload;
    },
  },
});

export const selectTravelType = state => state.customize.customizeData.travelType;
export const selectState = state => state.customize.customizeData.state;
export const selectCity = state => state.customize.customizeData.city;
export const selectDestination = state => state.customize.customizeData.destination;
export const selectTravelWith = state => state.customize.customizeData.travelWith;
export const selectDepartureStation = state => state.customize.customizeData.departureStation;
export const selectDateItenaryStartDate = state => state.customize.customizeData.dateItenary.startDate;
export const selectDateItenaryEndDate = state => state.customize.customizeData.dateItenary.endDate;
export const selectTourPlan = state => state.customize.customizeData.tourPlan;
export const selectNearestBranch = state => state.customize.customizeData.nearestBranch;
export const selectCustomizeData = state => state.customize.customizeData;

export const {
  setDestination,
  setTravelWith,
  setDepartureStation,
  setDateItenary,
  setTourPlanId,
  setTravelType,
  setState,
  setCity,
  setNearestBranch,
} = customizeSlice.actions;
export default customizeSlice.reducer;
