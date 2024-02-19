import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";

const AddBlogPopup = ({
  open,
  handleClose,
  formData,
  setFormData,
  popupmode,
  editId,
}) => {
  const [noOfKeywords, setNoOfKeywords] = useState([1]);
  const handleAddKeywords = (e) => {
    e.preventDefault();
    setNoOfKeywords([...noOfKeywords, 1]);
    console.log(noOfKeywords);
  };

  const [noOfCityName, setNoOfCityName] = useState([1]);
  const handleAddCityName = (e) => {
    e.preventDefault();
    setNoOfCityName([...noOfCityName, 1]);
    console.log(noOfCityName);
  };


  const [noOfComments, setNoOfComments] = useState([1]);
  const handleAddComment = (e) => {
    e.preventDefault();
    setNoOfComments([...noOfComments, 1]);
    console.log(noOfComments);
  };

  const [noOfCategories, setNoOfCategories] = useState([1]);
  const handleAddCategory = (e) => {
    e.preventDefault();
    setNoOfCategories([...noOfCategories, 1]);
    console.log(noOfCategories);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (popupmode == "edit") {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/blogs/updateblog/${editId}`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/blogs/addblog`, formData)
        .then((res) => {
          console.log(res.data);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    console.log(popupmode);
    if (popupmode == "edit" || popupmode == "view") {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/blogs/${editId}`)
        .then((res) => {
          console.log(res.data);
          setFormData(res.data);
          setNoOfCityName(res.data.cityName);
          setNoOfKeywords(res.data.keywords);
          setNoOfCategories(res.data.categories ? res.data.categories : []);
          setNoOfComments(res.data.comments ? res.data.comments : []);
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
        <form onSubmit={onSubmit} className=" bg-white rounded-xl py-7 px-10">
          <h1 className=" font-semibold text-2xl text-stone-800">
            Blog Details
          </h1>
          <div className=" grid grid-cols-2 gap-5 py-8">
            <div>
              <div className=" flex flex-col gap-6">
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Blog title
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="blogTitle"
                    onChange={handleChange}
                    value={formData.blogTitle}
                    readOnly={popupmode == "view" ? true : false}
                    required
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Country name
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="countryName"
                    onChange={handleChange}
                    value={formData.countryName}
                    readOnly={popupmode == "view" ? true : false}
                    required
                  />
                </div>

                <div className=" flex flex-col gap-2">
                  <div className=" flex items-center justify-between">
                    <label className=" text-sm font-medium text-stone-800">
                      Cityname
                    </label>
                    <button
                      onClick={handleAddCityName}
                      disabled={popupmode == "view" ? true : false}
                      className=" border border-stone-400 text-stone-800 hover:bg-stone-400 hover:text-white duration-300 cursor-pointer font-semibold px-[10px] pb-0.5 text-lg rounded-full disabled:opacity-80"
                    >
                      +
                    </button>
                  </div>
                  {noOfCityName.length > 0 &&
                    noOfCityName.map((item, index) => {
                      return (
                        <div key={index} className=" flex flex-col gap-1">
                          <label className=" text-sm font-medium text-stone-800">
                            Cityname {index + 1}
                          </label>
                          <div className=" flex flex-col gap-0.5">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="cityName"
                              placeholder="Cityname"
                              onChange={(e) => {
                                const newCityName = [...formData.cityName];
                                newCityName[index] = e.target.value;
                                setFormData({
                                  ...formData,
                                  cityName: newCityName,
                                });
                              }}
                              value={formData?.cityName[index]}
                              readOnly={popupmode == "view" ? true : false}
                              required
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Image src
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="imageSrc"
                    onChange={handleChange}
                    value={formData.imageSrc}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Content
                  </label>
                  <textarea
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="content"
                    onChange={handleChange}
                    value={formData.content}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Sub Heading 2
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="subHeading2"
                    onChange={handleChange}
                    value={formData.subHeading2}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Image src 2
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="imageSrc2"
                    onChange={handleChange}
                    value={formData.imageSrc2}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Content 2
                  </label>
                  <textarea
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="content2"
                    onChange={handleChange}
                    value={formData.content2}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" flex flex-col gap-6">
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Sub Heading 1
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="subHeading1"
                    onChange={handleChange}
                    value={formData.subHeading1}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Image src 1
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="imageSrc1"
                    onChange={handleChange}
                    value={formData.imageSrc1}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Content 1
                  </label>
                  <textarea
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="content1"
                    onChange={handleChange}
                    value={formData.content1}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>{" "}
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Sub Heading 3
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="subHeading3"
                    onChange={handleChange}
                    value={formData.subHeading3}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Image src 3
                  </label>
                  <input
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="imageSrc3"
                    onChange={handleChange}
                    value={formData.imageSrc3}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <label className=" text-sm font-medium text-stone-800">
                    Content 3
                  </label>
                  <textarea
                    className=" border border-stone-500 rounded-md py-2 px-3"
                    type="text"
                    name="content3"
                    onChange={handleChange}
                    value={formData.content3}
                    readOnly={popupmode == "view" ? true : false}
                  />
                </div>
                <div className=" flex flex-col gap-2">
                  <div className=" flex items-center justify-between">
                    <label className=" text-sm font-medium text-stone-800">
                      Keywords
                    </label>
                    <button
                      onClick={handleAddKeywords}
                      disabled={popupmode == "view" ? true : false}
                      className=" border border-stone-400 text-stone-800 hover:bg-stone-400 hover:text-white duration-300 cursor-pointer font-semibold px-[10px] pb-0.5 text-lg rounded-full disabled:opacity-80"
                    >
                      +
                    </button>
                  </div>
                  {noOfKeywords.length > 0 &&
                    noOfKeywords.map((item, index) => {
                      return (
                        <div key={index} className=" flex flex-col gap-1">
                          <label className=" text-sm font-medium text-stone-800">
                            Keyword {index + 1}
                          </label>
                          <div className=" flex flex-col gap-0.5">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="keywords"
                              placeholder="Keyword"
                              onChange={(e) => {
                                const newKeywords = [...formData.keywords];
                                newKeywords[index] = e.target.value;
                                setFormData({
                                  ...formData,
                                  keywords: newKeywords,
                                });
                              }}
                              value={formData?.keywords[index]}
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
                      Categories
                    </label>
                    <button
                      onClick={handleAddCategory}
                      disabled={popupmode == "view" ? true : false}
                      className=" border border-stone-400 text-stone-800 hover:bg-stone-400 hover:text-white duration-300 cursor-pointer font-semibold px-[10px] pb-0.5 text-lg rounded-full disabled:opacity-80"
                    >
                      +
                    </button>
                  </div>
                  {noOfCategories.length > 0 &&
                    noOfCategories.map((item, index) => {
                      return (
                        <div key={index} className=" flex flex-col gap-1">
                          <label className=" text-sm font-medium text-stone-800">
                            Category {index + 1}
                          </label>
                          <div className=" flex flex-col gap-0.5">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="categories"
                              placeholder="Category"
                              onChange={(e) => {
                                const newCategory = [...formData.categories];
                                newCategory[index] = e.target.value;
                                setFormData({
                                  ...formData,
                                  categories: newCategory,
                                });
                              }}
                              value={formData?.categories?.[index]}
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
                      Comments
                    </label>
                    <button
                      onClick={handleAddComment}
                      disabled={popupmode == "view" ? true : false}
                      className=" border border-stone-400 text-stone-800 hover:bg-stone-400 hover:text-white duration-300 cursor-pointer font-semibold px-[10px] pb-0.5 text-lg rounded-full disabled:opacity-80"
                    >
                      +
                    </button>
                  </div>
                  {noOfComments.length > 0 &&
                    noOfComments.map((item, index) => {
                      return (
                        <div key={index} className=" flex flex-col gap-1">
                          <label className=" text-sm font-medium text-stone-800">
                            Comment {index + 1}
                          </label>
                          <div className=" flex flex-col gap-0.5">
                            <input
                              className=" border border-stone-500 rounded-md py-2 px-3"
                              type="text"
                              name="comments"
                              placeholder="Comments"
                              onChange={(e) => {
                                const newComment = [...formData.comments];
                                newComment[index] = e.target.value;
                                setFormData({
                                  ...formData,
                                  comments: newComment,
                                });
                              }}
                              value={formData?.comments?.[index]}
                              readOnly={popupmode == "view" ? true : false}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-5 items-center justify-center">
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
              {popupmode == "edit" ? "Save" : "Add blog"}
            </button>
          </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddBlogPopup;
