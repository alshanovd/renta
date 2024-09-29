import prisma from "@/prisma/prisma";

export default async function AllFlats() {
  const flats = await prisma.flat.findMany();
  console.log("one more data request");
  return (
    <ul className="flatsss">
      {flats.map((flat) => (
        <li key={flat.id}>{flat.title}</li>
      ))}
    </ul>
  );
}
