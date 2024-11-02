// pages/protected-page.js
import { withAuth } from "@/contexts/AuthProvider";

function ProtectedPage() {
    return <div>This page is protected.</div>;
}

export default withAuth(ProtectedPage);
