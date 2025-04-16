import { AdminLayout } from "@/components/admin/admin-layout";
import { PackageEditor } from "@/components/admin/package-editor";

export default function AdminPackages() {
  return (
    <AdminLayout title="Package">
      <PackageEditor />
    </AdminLayout>
  );
}