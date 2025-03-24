import DefaultLayout from "@/components/layouts/DefaultLayout";

function RecoveryPasswordCompletedPage() {
  return (
    <DefaultLayout className="flex items-center justify-center h-[calc(100vh-20rem)]">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Correo enviado correctamente
        </h1>
        <p className="text-gray-600 mb-4">
          Hemos enviado un correo a tu bandeja de entrada con las instrucciones
          para recuperar tu contraseña.
        </p>
      </div>
    </DefaultLayout>
  );
}

export default RecoveryPasswordCompletedPage;
