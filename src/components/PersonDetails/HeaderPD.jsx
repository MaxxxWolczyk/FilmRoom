import React from "react";

function HeaderPD({ data }) {
  const {
    profile_path,
    name,
    birthday,
    place_of_birth,
    gender,
    known_for_department,
    also_known_as,
  } = data;

  console.log(data);

  const IMG_PATH = process.env.REACT_APP_IMG_PATH;

  let genderString;

  switch (gender) {
    case 0:
      genderString = "Not set";
      break;
    case 1:
      genderString = "Female";
      break;
    case 2:
      genderString = "Male";
      break;
    case 3:
      genderString = "Non-binary";
      break;
  }

  return (
    <div className="flex flex-col w-full ">
      <div className="flex w-full flex-col md:flex-row h-80 px-8 gap-4 md:gap-8 mt-6 mb-8">
        <div className="rounded-lg overflow-hidden flex justify-center md:items-start">
          {profile_path === null ? (
            <div className="h-full w-[230px] bg-black"></div>
          ) : (
            <img
              src={`${IMG_PATH}/w500${profile_path}`}
              alt=""
              className="h-full rounded-lg shadow-2xl"
            />
          )}
        </div>
        <div className="flex flex-col justify-between py-2 flex-grow">
          <div className="flex mb-4 md:m-0">
            <h2 className=" text-2xl md:text-3xl lg:text-5xl font-bold">
              {name}
            </h2>
            <div className="badge badge-primary">
              {known_for_department === "Acting" ? "Actor" : "Crew"}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="">Gender:</h3>
              <p className="text-gray-400">{genderString}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="">Birthday:</h3>
              <p className="text-gray-400">{birthday}</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="">Place of birth:</h3>
              <p className="text-gray-400">{place_of_birth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderPD;
