export function Movie(props) {
  // Destructure props into separate variables
  let { title, description } = props;
  let { posterImage } = description;

  // Add the correct domain to the image path
  posterImage = "https://cinema-rest.nodehill.se/" + posterImage;

  return (
    <div className="movie">
      <h2>{title}</h2>
      <img src={posterImage} />
    </div>
  );
}
