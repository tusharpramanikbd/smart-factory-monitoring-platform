import { useParams } from "react-router";

export default function MachineDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Machine Details</h1>

      <p className="mt-4">Machine ID: {id}</p>
    </div>
  );
}
