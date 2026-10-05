import './admin.css';
import './dashboard.css';
import './attachments.css';
import './tech-stack.css';

export const metadata = { title: 'Portfolio Admin' };

export default function AdminLayout({ children }) {
  return <main className="admin-root">{children}</main>;
}
