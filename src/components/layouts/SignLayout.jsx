import { Link } from "wouter";

function SignLayout({ children, orientation = "right" }) {
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div
        className={`hidden md:block bg-zinc-800 p-8 bg-linear-210 from-secondary to-primary ${orientation === "left" ? "order-2" : "order-1"}`}
      >
        <div className="h-full flex items-center">
          <p className="text-4xl lg:text-7xl text-primary-foreground opacity-50 font-bold mx-4 leading-12 lg:leading-20">
            “Creativity is intelligence having fun”
          </p>
        </div>
      </div>

      <div
        className={`grid place-self-center ${orientation === "left" ? "order-1" : "order-2"}`}
      >
        <Link
          href="/"
          className="text-secondary font-bold absolute top-8 left-8"
        >
          Inicio
        </Link>

        <div>{children}</div>
      </div>
    </div>
  );
}

export default SignLayout;
