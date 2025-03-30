function ImageBackground() {
  return (
    <div className="absolute inset-0 h-[calc(100svh-4rem)] mt-[4rem]">
      <img
        className="h-[calc(100svh-4rem)] w-full object-cover"
        src="/imagen-cafe-fondo.jpg"
      />
      <div className="absolute inset-0 bg-[#b76e49] opacity-[.27]"></div>
    </div>
  );
}
export default ImageBackground;
