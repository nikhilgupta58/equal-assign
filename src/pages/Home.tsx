import useIdentities from "../hooks/useIdentities";
import AppLayout from "../layouts/AppLayout";

export default function Home() {
  const { isLoading } = useIdentities();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 4 }, (_, id) => (
          <div key={id} className="animate-pulse w-full h-3" />
        ))}
      </div>
    );
  }

  return <AppLayout>Identities</AppLayout>;
}
