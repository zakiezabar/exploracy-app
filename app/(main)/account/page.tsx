import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";
import Heading from "@/components/Heading";
import getCurrentUser from "@/app/actions/getCurrentUser";
import LogoutButton from "@/components/LogoutButton";

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Heading title="Account" subtitle="Manage your account" />
      <div className="mt-4">
        <LogoutButton />
      </div>
    </ClientOnly>
  );
};

export default AccountPage;
