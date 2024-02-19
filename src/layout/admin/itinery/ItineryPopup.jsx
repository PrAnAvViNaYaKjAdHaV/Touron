import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import ImageInput from "./common/ImageInput";

const ItineryPopup = ({
  open,
  handleClose,
  formData,
  setFormData,
  popupmode,
  editId,
}) => {
  const handleImage = (e, fieldName) => {
    const file = e.target.files[0];
    convertToBase64(file, fieldName);
  };

  const convertToBase64 = (file, fieldName) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, [fieldName]: reader.result });
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const [countriesList, setCountriesList] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [noOfDaysArray, setNoOfDaysArray] = useState([1]);

  const handleGetDays = (e) => {
    e.preventDefault();
    let arr = [];
    let i;
    for (i = 0; i < formData.noOfDays; i++) {
      arr.push(i);
    }
    setNoOfDaysArray(arr);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (popupmode == "edit") {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/itinery/updateitinery/${editId}`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/itinery/additinery`,
          formData
        )
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(popupmode);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/country/`)
      .then((countriesRes) => {
        setCountriesList(countriesRes.data);
      })
      .catch((err) => console.log(err));

    if (popupmode === "edit" || popupmode === "view") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/itinery/${editId}`)
        .then((res) => {
          const initialFormData = res.data; // Temporary variable to store initial data
          setFormData(initialFormData);
          setNoOfDaysArray(initialFormData.days);

          // Use the country from initialFormData for the next axios call
          return axios.get(
            `${import.meta.env.VITE_API_URL}/api/itinerydetails/${
              initialFormData.country
            }`
          );
        })
        .then((countryRes) => {
          // Now update formData with country details
          setFormData((prevFormData) => ({
            ...prevFormData,
            country: countryRes.data.country,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [popupmode]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          onSubmit={onSubmit}
          className=" bg-white rounded-xl py-7 px-10 w-[500px]"
        >
          <h1 className=" font-semibold text-2xl text-stone-800 mb-2">
            Itinery Details
          </h1>
          <div className=" flex flex-col gap-3">
            <div className=" flex flex-col gap-2">
              <label className=" text-sm font-medium text-stone-800">
                Itinery title
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="itineryTitle"
                onChange={handleChange}
                value={formData.itineryTitle}
                readOnly={popupmode == "view" ? true : false}
                required
              />
            </div>

            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Country
              </label>
              <select
                className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                name="country"
                id="country"
                onChange={handleChange}
                value={formData.country}
                defaultValue={countriesList[0]?.countryName}
                readOnly={popupmode == "view" ? true : false}
                disabled={popupmode == "view" ? true : false}
                required
              >
                {countriesList.length > 0 &&
                  countriesList.map((item, index) => {
                    return (
                      <option key={index} value={item.countryName}>
                        {item.countryName}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className=" flex flex-col gap-2">
              <label className=" text-sm font-medium text-stone-800">
                Cityname
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="cityname"
                onChange={handleChange}
                value={formData.cityname}
                readOnly={popupmode == "view" ? true : false}
                required
              />
            </div>

            <div className=" flex flex-col gap-2">
              <label className=" text-sm font-medium text-stone-800">
                No of Days
              </label>
              <div className=" flex items-center gap-2">
                <input
                  className=" border border-stone-500 rounded-md py-2 px-3 w-full"
                  type="number"
                  name="noOfDays"
                  min={1}
                  max={20}
                  onChange={handleChange}
                  value={formData.noOfDays}
                  readOnly={popupmode == "view" ? true : false}
                  required
                />
                <button
                  onClick={handleGetDays}
                  disabled={popupmode == "view" ? true : false}
                  className=" border border-primary bg-primary rounded text-white py-2 px-3 disabled:opacity-80"
                >
                  Get
                </button>
              </div>
            </div>
            {noOfDaysArray?.length > 0 && (
              <div className=" flex flex-col gap-2">
                <label className=" text-sm font-medium text-stone-800">
                  Days
                </label>
                <div className=" flex flex-col gap-1.5">
                  {noOfDaysArray.map((item, index) => {
                    return (
                      <div key={index} className=" flex flex-col gap-1">
                        <label className=" text-sm font-medium text-stone-800">
                          Day {index + 1}
                        </label>
                        <div className=" flex flex-col gap-0.5">
                          <input
                            className=" border border-stone-500 rounded-md py-2 px-3"
                            type="text"
                            name="morning"
                            placeholder="morning"
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              if (!newFormData.days[index]) {
                                newFormData.days[index] = {};
                              }
                              newFormData.days[index].morning = e.target.value;
                              setFormData(newFormData);
                            }}
                            value={formData?.days[index]?.morning}
                            readOnly={popupmode == "view" ? true : false}
                          />
                          <div className=" grid grid-cols-2 gap-2 mb-2">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="morningLat"
                              placeholder="morningLat"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].morningLat =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.morningLat}
                              readOnly={popupmode == "view" ? true : false}
                            />
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="morningLng"
                              placeholder="morningLng"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].morningLng =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.morningLng}
                              readOnly={popupmode == "view" ? true : false}
                            />
                          </div>
                          <input
                            className=" border border-stone-500 rounded-md py-2 px-3"
                            type="text"
                            name="afternoon"
                            placeholder="afternoon"
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              if (!newFormData.days[index]) {
                                newFormData.days[index] = {};
                              }
                              newFormData.days[index].afternoon =
                                e.target.value;
                              setFormData(newFormData);
                            }}
                            value={formData?.days[index]?.afternoon}
                            readOnly={popupmode == "view" ? true : false}
                          />
                          <div className=" grid grid-cols-2 gap-2 mb-2">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="afternoonLat"
                              placeholder="afternoonLat"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].afternoonLat =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.afternoonLat}
                              readOnly={popupmode == "view" ? true : false}
                            />
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="afternoonLng"
                              placeholder="afternoonLng"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].afternoonLng =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.afternoonLng}
                              readOnly={popupmode == "view" ? true : false}
                            />
                          </div>
                          <input
                            className=" border border-stone-500 rounded-md py-2 px-3"
                            type="text"
                            name="evening"
                            placeholder="evening"
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              if (!newFormData.days[index]) {
                                newFormData.days[index] = {};
                              }
                              newFormData.days[index].evening = e.target.value;
                              setFormData(newFormData);
                            }}
                            value={formData?.days[index]?.evening}
                            readOnly={popupmode == "view" ? true : false}
                          />
                          <div className=" grid grid-cols-2 gap-2 mb-2">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="eveningLat"
                              placeholder="eveningLat"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].eveningLat =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.eveningLat}
                              readOnly={popupmode == "view" ? true : false}
                            />
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="eveningLng"
                              placeholder="eveningLng"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].eveningLng =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.eveningLng}
                              readOnly={popupmode == "view" ? true : false}
                            />
                          </div>
                          <input
                            className=" border border-stone-500 rounded-md py-2 px-3"
                            type="text"
                            name="night"
                            placeholder="night"
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              if (!newFormData.days[index]) {
                                newFormData.days[index] = {};
                              }
                              newFormData.days[index].night = e.target.value;
                              setFormData(newFormData);
                            }}
                            value={formData?.days[index]?.night}
                            readOnly={popupmode == "view" ? true : false}
                          />
                          <div className=" grid grid-cols-2 gap-2 mb-2">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="nightLat"
                              placeholder="nightLat"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].nightLat =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.nightLat}
                              readOnly={popupmode == "view" ? true : false}
                            />
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="nightLng"
                              placeholder="nightLng"
                              onChange={(e) => {
                                const newFormData = { ...formData };
                                if (!newFormData.days[index]) {
                                  newFormData.days[index] = {};
                                }
                                newFormData.days[index].nightLng =
                                  e.target.value;
                                setFormData(newFormData);
                              }}
                              value={formData?.days[index]?.nightLng}
                              readOnly={popupmode == "view" ? true : false}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className=" flex flex-col gap-2">
              <label className=" text-sm font-medium text-stone-800">
                Price range start
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="number"
                name="priceRangeStart"
                onChange={handleChange}
                value={formData.priceRangeStart}
                required
                readOnly={popupmode == "view" ? true : false}
              />
            </div>
            <div className=" flex flex-col gap-2">
              <label className=" text-sm font-medium text-stone-800">
                Price range end
              </label>
              <input
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="number"
                name="priceRangeEnd"
                onChange={handleChange}
                value={formData.priceRangeEnd}
                required
                readOnly={popupmode == "view" ? true : false}
              />
            </div>

            <div className=" flex flex-col gap-2">
              <label className=" text-sm font-medium text-stone-800">
                Category
              </label>
              <select
                className=" border border-stone-500 rounded-md py-2 px-3 focus:outline-none"
                name="category"
                id="category"
                onChange={handleChange}
                value={formData.category}
                readOnly={popupmode == "view" ? true : false}
                disabled={popupmode == "view" ? true : false}
                required
              >
                <option value="Trending Plan">Trending Plan</option>
                <option value="VISA Free Plan">VISA Free Plan</option>
                <option value="Honeymoon Plan">Honeymoon Plan</option>
                <option value="Kid Friendly Plan">Kid Friendly Plan</option>
                <option value="Unique & Rare Plan">Unique & Rare Plan</option>
              </select>
            </div>

            <ImageInput
              handleImage={handleImage}
              fieldName="image1"
              formData={formData.image1}
              popupmode={popupmode}
            />
            <ImageInput
              handleImage={handleImage}
              fieldName="image2"
              formData={formData.image2}
              popupmode={popupmode}
            />
            <ImageInput
              handleImage={handleImage}
              fieldName="image3"
              formData={formData.image3}
              popupmode={popupmode}
            />
            <ImageInput
              handleImage={handleImage}
              fieldName="image4"
              formData={formData.image4}
              popupmode={popupmode}
            />
            <ImageInput
              handleImage={handleImage}
              fieldName="image5"
              formData={formData.image5}
              popupmode={popupmode}
            />
          </div>
          <div className=" grid grid-cols-2 gap-5 items-center justify-center mt-7">
            <button
              onClick={handleClose}
              className=" border border-stone-400 bg-white rounded text-stone-700 py-2 px-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={popupmode == "view" ? true : false}
              className=" border border-primary bg-primary rounded text-white py-2 px-3 disabled:opacity-80"
            >
              {popupmode == "edit" ? "Save" : "Add Itinery"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default ItineryPopup;
