// pages/protected-page.js
import { withAuth } from "../context/AuthProvider";

function ProtectedPage() {
    return <div>This page is protected.</div>;
}

export default withAuth(ProtectedPage);
