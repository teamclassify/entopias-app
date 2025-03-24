import {
  ArrowLeft,
  BarChart3,
  Bell,
  CreditCard,
  CreditCardIcon,
  FileText,
  Package,
  Search,
  Settings,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Link } from "wouter";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function NotAuthPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-16 border-b bg-background flex items-center px-6 justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-md bg-primary"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-64 h-9 bg-muted rounded-md"></div>
            <div className="w-9 h-9 rounded-full bg-muted"></div>
          </div>
        </div>

        <div className="absolute top-16 left-0 bottom-0 w-64 border-r bg-background p-4">
          <div className="space-y-2">
            {[
              { icon: BarChart3, label: "Dashboard" },
              { icon: Users, label: "Usuarios" },
              { icon: FileText, label: "Reportes" },
              { icon: Package, label: "Productos" },
              { icon: CreditCardIcon, label: "Facturación" },
              { icon: Settings, label: "Configuración" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-2 rounded-md bg-accent/50"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                <div className="h-4 w-24 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-16 left-64 right-0 bottom-0 p-6 bg-background/50">
          <div className="mb-6">
            <div className="h-8 w-48 bg-muted rounded mb-2"></div>
            <div className="h-4 w-96 bg-muted/50 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 rounded-lg border bg-card p-6">
                <div className="flex justify-between mb-4">
                  <div className="h-5 w-24 bg-muted rounded"></div>
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                    {i === 0 && <Users className="h-4 w-4 text-primary" />}
                    {i === 1 && <CreditCard className="h-4 w-4 text-primary" />}
                    {i === 2 && <Bell className="h-4 w-4 text-primary" />}
                  </div>
                </div>
                <div className="h-10 w-20 bg-muted rounded-md mb-2"></div>
                <div className="h-3 w-32 bg-muted/50 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 backdrop-blur-xs bg-background/30 z-10"></div>

      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <Card className=" w-full max-w-2xl p-6 shadow-lg border bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 rounded-full bg-destructive/10">
              <ShieldAlert className="h-10 w-10 text-destructive" />
            </div>

            <h1 className="text-2xl font-bold">Acceso no autorizado</h1>

            <p className="text-muted-foreground">
              Lo sentimos, no tienes permisos de administrador para acceder a
              esta página.
            </p>

            <Button asChild className="mt-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default NotAuthPage;
