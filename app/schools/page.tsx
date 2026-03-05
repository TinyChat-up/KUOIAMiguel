import { PageHeader } from "@/components/PageHeader";
import { SchoolCard } from "@/components/SchoolCard";
import { getSchools } from "@/lib/mock-api";

export default async function SchoolsPage() {
  const schools = await getSchools();
  return (
    <div className="space-y-6">
      <PageHeader title="Coles" description="Fichas verificadas de colegios con productos y servicios relacionados." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{schools.map((school) => <SchoolCard key={school.id} school={school} />)}</div>
    </div>
  );
}
