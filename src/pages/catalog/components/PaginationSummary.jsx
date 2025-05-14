export default function PaginationSummary({ page, data }) {
  console.log(data.data)
  return (
    <div>
      <p className="font-bold pb-3">
        Mostrando {(page - 1) * 10 + 1} -{" "}
        {Math.min(page * 10, data?.data.count || 0)} de {data?.data.count || 0} resultados
      </p>
    </div>
  );
}
