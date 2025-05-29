import { Card, CardContent } from "@/components/ui/card";

export default function UserRecentTable({ users }) {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Usuarios registrados recientemente</h2>
        <div className="space-y-3">
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.photo || "/img/default-user.png"}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="text-sm text-right text-gray-400">
                {new Date(user.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
