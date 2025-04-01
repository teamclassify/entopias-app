function ImageBackground() {
  return (
    <div className="inset-0">
      <img
        className="absolute top-0 left-0 h-[calc(100vh)] w-full object-cover"
        src="/imagen-cafe-fondo.webp"
      />
      <div className="absolute inset-0 bg-[#b76e49] opacity-[.37]"></div>
    </div>
  );
}
export default ImageBackground;
