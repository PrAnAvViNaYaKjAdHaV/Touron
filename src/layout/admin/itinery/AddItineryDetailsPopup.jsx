import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddItineryDetailsPopup = ({
  open,
  handleClose,
  formData,
  setFormData,
  popupmode,
  //   editId,
}) => {
  const [countriesList, setCountriesList] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const [noOfReviewsArray, setNoOfReviewsArray] = useState([1]);
  const handleAddReview = (e) => {
    e.preventDefault();
    setNoOfReviewsArray([...noOfReviewsArray, 1]);
    console.log(noOfReviewsArray);
  };

  const [noOfFaqArray, setNoOfFaqArray] = useState([1]);
  const handleAddFaq = (e) => {
    e.preventDefault();
    setNoOfFaqArray([...noOfFaqArray, 1]);
    console.log(noOfFaqArray);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (popupmode === "edit" && e.target.name === "country") {
      const country = e.target.value;
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/itinerydetails/getbyname`, {
          params: { country },
        })
        .then((res) => {
          if (res.data && Array.isArray(res.data) && res.data.length > 0) {
            const data = res.data[0];
            setFormData(data);

            const newReviewsArray = Array.isArray(data.review)
              ? Array(data.review.length).fill(1)
              : [];
            const newFaqArray = Array.isArray(data.faq)
              ? Array(data.faq.length).fill(1)
              : [];

            setNoOfReviewsArray(newReviewsArray);
            setNoOfFaqArray(newFaqArray);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (popupmode == "edit") {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/itinerydetails/update/`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/itinerydetails/add`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    // Fetch countries list
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/country/`)
      .then((countriesRes) => {
        setCountriesList(countriesRes.data);

        // Fetch itineraries
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/itinerydetails/`)
          .then((itinerariesRes) => {
            const itineraryCountries = itinerariesRes.data.map(
              (item) => item.country
            );
            const availableCountries = countriesRes.data.filter(
              (country) => !itineraryCountries.includes(country.countryName)
            );
            setFilteredCountries(availableCountries);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
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
            Country Details
          </h1>
          <div className=" flex flex-col gap-3">
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
                defaultValue={filteredCountries[0]?.countryName}
                readOnly={popupmode == "view" ? true : false}
                required
              >
                {filteredCountries.length > 0 && popupmode == "add"
                  ? filteredCountries.map((item, index) => {
                      return (
                        <option key={index} value={item.countryName}>
                          {item.countryName}
                        </option>
                      );
                    })
                  : countriesList.length > 0 &&
                    countriesList.map((item, index) => {
                      return (
                        <option key={index} value={item.countryName}>
                          {item.countryName}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Overview
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="overview"
                placeholder="Overview"
                onChange={handleChange}
                value={formData.overview}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Inclusion
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="inclusion"
                placeholder="inclusion"
                onChange={handleChange}
                value={formData.inclusion}
                required
              />
            </div>
            <div className=" flex flex-col gap-1">
              <label className=" text-sm font-medium text-stone-800">
                Weather
              </label>
              <textarea
                className=" border border-stone-500 rounded-md py-2 px-3"
                type="text"
                name="weather"
                placeholder="weather"
                onChange={handleChange}
                value={formData.weather}
              />
            </div>

            <div className=" flex flex-col gap-2">
              <div className=" flex items-center justify-between">
                <label className=" text-sm font-medium text-stone-800">
                  Reviews
                </label>
                <button
                  onClick={handleAddReview}
                  disabled={popupmode == "view" ? true : false}
                  className=" border border-stone-400 text-stone-800 hover:bg-stone-400 hover:text-white duration-300 cursor-pointer font-semibold px-[10px] pb-0.5 text-lg rounded-full disabled:opacity-80"
                >
                  +
                </button>
              </div>
              {noOfReviewsArray.length > 0 &&
                noOfReviewsArray.map((item, index) => {
                  return (
                    <div key={index} className=" flex flex-col gap-1">
                      <label className=" text-sm font-medium text-stone-800">
                        review {index + 1}
                      </label>
                      <div className=" flex flex-col gap-0.5">
                        <input
                          className=" border border-stone-500 rounded-md py-2 px-3"
                          type="text"
                          name="reviewName"
                          placeholder="Name"
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            if (!newFormData.review[index]) {
                              newFormData.review[index] = {};
                            }
                            newFormData.review[index].name = e.target.value;
                            setFormData(newFormData);
                          }}
                          value={formData?.review?.[index]?.name || ""}
                          readOnly={popupmode == "view" ? true : false}
                        />
                        <input
                          className=" border border-stone-500 rounded-md py-2 px-3"
                          type="text"
                          placeholder="Title"
                          name="reviewTitle"
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            if (!newFormData.review[index]) {
                              newFormData.review[index] = {};
                            }
                            newFormData.review[index].title = e.target.value;
                            setFormData(newFormData);
                          }}
                          value={formData?.review?.[index]?.title || ""}
                          readOnly={popupmode == "view" ? true : false}
                        />
                        <input
                          className=" border border-stone-500 rounded-md py-2 px-3"
                          type="text"
                          placeholder="Comment"
                          name="reviewComment"
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            if (!newFormData.review[index]) {
                              newFormData.review[index] = {};
                            }
                            newFormData.review[index].comment = e.target.value;
                            setFormData(newFormData);
                          }}
                          value={formData?.review?.[index]?.comment || ""}
                          readOnly={popupmode == "view" ? true : false}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className=" flex flex-col gap-2">
              <div className=" flex items-center justify-between">
                <label className=" text-sm font-medium text-stone-800">
                  FAQ
                </label>
                <button
                  onClick={handleAddFaq}
                  disabled={popupmode == "view" ? true : false}
                  className=" border border-stone-400 text-stone-800 hover:bg-stone-400 hover:text-white duration-300 cursor-pointer font-semibold px-[10px] pb-0.5 text-lg rounded-full disabled:opacity-80"
                >
                  +
                </button>
              </div>
              {noOfFaqArray.length > 0 &&
                noOfFaqArray.map((item, index) => {
                  return (
                    <div key={index} className=" flex flex-col gap-1">
                      <label className=" text-sm font-medium text-stone-800">
                        FAQ {index + 1}
                      </label>
                      <div className=" flex flex-col gap-0.5">
                        <input
                          className=" border border-stone-500 rounded-md py-2 px-3"
                          type="text"
                          name="question"
                          placeholder="Question"
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            if (!newFormData.faq[index]) {
                              newFormData.faq[index] = {};
                            }
                            newFormData.faq[index].question = e.target.value;
                            setFormData(newFormData);
                          }}
                          value={formData?.faq?.[index]?.question || ""}
                          readOnly={popupmode == "view" ? true : false}
                        />
                        <input
                          className=" border border-stone-500 rounded-md py-2 px-3"
                          type="text"
                          placeholder="Answer"
                          name="answer"
                          onChange={(e) => {
                            const newFormData = { ...formData };
                            if (!newFormData.faq[index]) {
                              newFormData.faq[index] = {};
                            }
                            newFormData.faq[index].answer = e.target.value;
                            setFormData(newFormData);
                          }}
                          value={formData?.faq?.[index]?.answer || ""}
                          readOnly={popupmode == "view" ? true : false}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className=" grid grid-cols-2 gap-5 items-center justify-center mt-4">
            <button
              onClick={handleClose}
              className=" border border-stone-400 bg-white rounded text-stone-700 py-2 px-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" border border-primary bg-primary rounded text-white py-2 px-3"
            >
              {popupmode == "edit" ? "Save" : "Add Details"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddItineryDetailsPopup;
