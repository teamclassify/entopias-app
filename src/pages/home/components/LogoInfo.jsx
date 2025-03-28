function LogoInfo() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-around gap-4 mb-30 mt-30">
      <img
        className="w-[60%] sm:w-[30%]"
        src="/logo-completo.png"
        alt="logo de la empresa entopias cafe"
      />
      <div className="flex flex-col w-[60%] items-start">
        <h2 className="text-2xl font-bold mb-2">Sobre Nosotros</h2>
        <div>
          <p className="text-[16px] mb-4">
            En Entopias Café, vivimos la pasión por el buen café. Seleccionamos
            granos de alta calidad directamente de productores, asegurando
            autenticidad y sabor en cada taza. Nos enfocamos en resaltar las
            mejores características de cada cosecha a través de un proceso
            cuidadoso que garantiza frescura y excelencia. <br />
            <br /> Más que una marca, somos una comunidad que celebra la
            tradición cafetera, conectando a los amantes del café con
            experiencias únicas y auténticas.
          </p>
        </div>
      </div>
    </div>
  );
}
export default LogoInfo;
