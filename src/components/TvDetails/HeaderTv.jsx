const IMG_PATH = process.env.REACT_APP_IMG_PATH;

function HeaderTV({ data }) {
  const { backdrop_path, status, name, first_air_date, episode_run_time } =
    data;

  return (
    <div
      className="h-96 relative"
      style={
        backdrop_path
          ? {
              backgroundImage: `linear-gradient(180deg,rgb(0,0,0),rgba(0,0,0,.001) 26.7%,rgba(0,0,0,.001) 64%,rgb(0,0,0) 100%),linear-gradient(90deg,rgb(0,0,0),rgba(0,0,0,.001) 32%,rgba(0,0,0,0) 81.41%,rgb(0,0,0) 100%) ,url(${IMG_PATH}/original${backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { backgroundColor: "black" }
      }
    >
      <div className="w-full absolute bottom-0 px-10 py-7 text-white">
        <p className="text-primary">{status}</p>
        <h3 className=" text-3xl lg:text-5xl mb-1">{name}</h3>
        <div className="flex gap-5 text-slate-500">
          <p>{first_air_date}</p>
        </div>
      </div>
    </div>
  );
}

export default HeaderTV;
