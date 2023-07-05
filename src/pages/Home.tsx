import useIdentities from "../hooks/useIdentities";
import AppLayout from "../layouts/AppLayout";

export default function Home() {
  const { isLoading } = useIdentities();

  if (!isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }, (_, id) => (
            <div key={id} className="animate-pulse bg-gray-300 w-full h-[35px] rounded-md" />
          ))}
        </div>
      </AppLayout>
    );
  }

  return <AppLayout>Identities</AppLayout>;
}
