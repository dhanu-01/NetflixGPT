import Button from "../uicomponents/Button";

const Preview = ({ trailerKey, currentMovie }) => {
  const { title, overview } = currentMovie;

  return (
    <div>
      <div className="bg-gradient-to-r from-black aspect-video pl-12 pt-[20%] absolute">
        <h1 className="text-white text-6xl font-bold">{title}</h1>
        <p className="text-white text-lg w-2/4">{overview}</p>
        <div className="flex mt-2">
          <Button
            text="Play"
            className="text-black bg-white p-2 text-xl rounded px-12 mr-4 hover:bg-opacity-90"
          />
          <Button
            text="More Info"
            className="text-white  bg-[#6d6d6eb3] p-2 text-xl rounded px-12 hover:bg-opacity-90"
          />
        </div>
      </div>

      <div>
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Preview;
