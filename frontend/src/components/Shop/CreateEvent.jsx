import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createEvent } from "../../redux/actions/event";

function CreateEvent() {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleStartDateChange = (e) => {
    const start = new Date(e.target.value);
    setStartDate(start);
    setEndDate(null); // reset end date when start date changes
  };

  const handleEndDateChange = (e) => {
    const end = new Date(e.target.value);
    setEndDate(end);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfulyy!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("Finish_Date", endDate.toISOString());
    dispatch(createEvent(newForm));
  };

  return (
    <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[50%] bg-white mx-auto shadow rounded-[4px] p-3 h-auto md:h-[80vh] overflow-y-auto">
      <h5 className="text-[20px] sm:text-[24px] md:text-[30px] font-[Poppins] text-center">
        Create Event
      </h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="pb-2 block">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Event Product Name..."
          />
        </div>

        {/* Description */}
        <div>
          <label className="pb-2 block">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            type="text"
            name="description"
            value={description}
            className="mt-2 block w-full px-3 pt-2 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Your Event Product Description..."
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="pb-2 block">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[40px] rounded-[5px] text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="pb-2 block">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter Your Event Product Tags..."
          />
        </div>

        {/* Original price */}
        <div>
          <label className="pb-2 block">
            Original Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter Your Event Product Price..."
          />
        </div>

        {/* Discount price */}
        <div>
          <label className="pb-2 block">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter Your Event Product Price with Discount..."
          />
        </div>

        {/* Product Stock */}
        <div>
          <label className="pb-2 block">
            Product Stock<span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter Your Event Product Stock..."
          />
        </div>

        {/* start date */}
        <div>
          <label className="pb-2 block">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={handleStartDateChange}
            min={today}
          />
        </div>

        {/* end date */}
        <div>
          <label className="pb-2 block">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 block w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
          />
        </div>

        {/* Images */}
        <div>
          <label className="pb-2 block">
            Upload Images<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle
                size={30}
                className="mt-3 cursor-pointer"
                color="#555"
              />
            </label>
            {images &&
              images.map((i, index) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={index}
                  alt=""
                  className="h-[100px] w-[100px] object-cover m-2 rounded"
                />
              ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <input
            type="submit"
            value="Create"
            className="mt-2 bg-gray-500 text-white block w-full sm:w-[70%] px-3 h-[50px] border cursor-pointer  border-gray-300 rounded-[3px] mx-auto"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
