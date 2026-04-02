import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseIcon, Edit2, Trash2, Plus, AlertCircle, Search } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { TableShell } from '@/components/admin/TableShell.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { StatusBadge } from '@/components/ui/StatusBadge.jsx';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminBlogsList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = async () => {
    try { setLoading(true); setError(null);
      const res = await adminService.list('posts', { search: searchTerm, limit: 50 });
      setPosts(res.data.data || []);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  useEffect(() => { const t = setTimeout(fetchPosts, 300); return () => clearTimeout(t); }, [searchTerm]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { setDeleting(true); await adminService.remove('posts', deleteTarget._id); setPosts(p => p.filter(x => x._id !== deleteTarget._id)); setDeleteTarget(null); }
    catch (err) { alert(err.message); } finally { setDeleting(false); }
  };

  return (
    <div className="space-y-6 animate-in">
      <AdminPageHeader title="Manage Blog Posts" description="Create, update, and publish articles & stories."
        action={<Button onClick={() => navigate('/admin/blogs/new')} className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Post</Button>} />
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
        <Input placeholder="Search posts..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <TableShell headings={['Title', 'Category', 'Author', 'Status', 'Actions']}>
        {loading && posts.length === 0 ? (
          <tr><td colSpan={5} className="p-8 text-center text-brand-secondary"><div className="flex justify-center items-center gap-2"><div className="w-5 h-5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" /> Loading...</div></td></tr>
        ) : error ? (
          <tr><td colSpan={5} className="p-8"><div className="flex flex-col items-center text-red-500 gap-2"><AlertCircle className="w-8 h-8" /><p>{error}</p><Button variant="outline" onClick={fetchPosts}>Retry</Button></div></td></tr>
        ) : posts.length === 0 ? (
          <tr><td colSpan={5} className="p-0"><EmptyState icon={DatabaseIcon} title="No posts found" message={searchTerm ? 'Try adjusting your search.' : 'Write your first blog post.'} action={!searchTerm && <Button onClick={() => navigate('/admin/blogs/new')}>Create Post</Button>} /></td></tr>
        ) : posts.map((post) => (
          <tr key={post._id} className="border-b border-border-light hover:bg-bg-light/50 transition-colors">
            <td className="px-6 py-4"><span className="font-medium text-text-dark text-[14px] line-clamp-1">{post.title}</span></td>
            <td className="px-6 py-4 text-[14px] text-text-secondary">{post.category || 'N/A'}</td>
            <td className="px-6 py-4 text-[14px] text-text-secondary">{post.author || 'Admin'}</td>
            <td className="px-6 py-4"><StatusBadge status={post.status} /></td>
            <td className="px-6 py-4"><div className="flex items-center gap-3">
              <button onClick={() => navigate(`/admin/blogs/${post._id}/edit`)} className="text-brand-secondary hover:text-primary-blue transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => setDeleteTarget(post)} className="text-brand-secondary hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div></td>
          </tr>
        ))}
      </TableShell>
      <ConfirmDialog isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} title="Delete Post" message={`Delete "${deleteTarget?.title}"?`} />
    </div>
  );
}
