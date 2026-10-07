"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle, LogOut } from "lucide-react";
import { logoutAdmin } from "@/lib/admin/auth/actions";
import { AdminDialog } from "./AdminDialog";
import { AdminButton } from "./AdminUI";
import styles from "./admin.module.css";

function LogoutActions({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus();
  return <div className={styles.formActions}>
    <AdminButton type="button" variant="secondary" disabled={pending} onClick={onCancel} data-autofocus="true">Cancel</AdminButton>
    <AdminButton type="submit" variant="danger" disabled={pending}>
      {pending ? <><LoaderCircle size={17} className={styles.spin}/>Logging out...</> : <><LogOut size={17}/>Log out</>}
    </AdminButton>
  </div>;
}

export function AdminLogoutDialog({ onClose }: { onClose: () => void }) {
  return <AdminDialog title="Log out?" description="You'll return to the sign-in page." onClose={onClose}>
    <form action={logoutAdmin} className={styles.confirmBody}>
      <p>Any session-only preview changes will be cleared.</p>
      <LogoutActions onCancel={onClose}/>
    </form>
  </AdminDialog>;
}
