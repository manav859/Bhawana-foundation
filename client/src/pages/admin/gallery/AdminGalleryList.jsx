import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseIcon, Edit2, Trash2, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader.jsx';
import { EmptyState } from '@/components/admin/EmptyState.jsx';
import { Button } from '@/components/ui/Button.jsx';
import { Input } from '@/components/ui/Input.jsx';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog.jsx';
import { adminService } from '@/features/api/services/admin.service.js';

export function AdminGalleryList() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [activeMonth, setActiveMonth] = useState('All Months');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const fetch = async () => {
    try { 
      setLoading(true); 
      // Fetch a high limit so we can paginate locally like the public gallery
      const res = await adminService.list('gallery', { limit: 2000 }); 
      setItems(res.data.data || []); 
    }
    catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try { 
      setDeleting(true); 
      await adminService.remove('gallery', deleteTarget._id); 
      setItems(p => p.filter(x => x._id !== deleteTarget._id)); 
      setDeleteTarget(null); 
    }
    catch (err) { alert(err.message); } finally { setDeleting(false); }
  };

  // Extract unique categories and months
  const categories = [...new Set(['All', 'Photos', 'Videos', ...items.map(item => item.category).filter(Boolean)])];
  const months = ['All Months', ...new Set(items.map(item => {
    if (!item.createdAt) return null;
    return new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
  }).filter(Boolean))];

  const getType = (item) => {
    if (item.image?.match(/\.(mp4|webm|mov|mkv)/i)) return 'video';
    return 'image';
  };

  const filtered = items.filter(item => {
    if (searchTerm && !(item.title || '').toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Category Filter
    const type = getType(item);
    let categoryMatch = false;
    if (activeTab === 'All') categoryMatch = true;
    else if (activeTab === 'Photos') categoryMatch = (type === 'image');
    else if (activeTab === 'Videos') categoryMatch = (type === 'video');
    else categoryMatch = (item.category === activeTab);
    
    if (!categoryMatch) return false;

    // Month Filter
    if (activeMonth !== 'All Months') {
       if (!item.createdAt) return false;
       const itemMonth = new Date(item.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
       if (itemMonth !== activeMonth) return false;
    }

    return true;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset page when filters change
  useEffect(() => setCurrentPage(1), [searchTerm, activeTab, activeMonth]);

  return (
    <div className="space-y-6 animate-in pb-10">
      <AdminPageHeader title="Manage Gallery" description="Upload and manage photos & videos."
        action={<Button onClick={() => navigate('/admin/gallery/new')} className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Item</Button>} />
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-secondary" />
          <Input placeholder="Search gallery..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-full font-sans text-[13px] font-semibold whitespace-nowrap border transition-colors ${
                  activeTab === cat 
                    ? 'bg-primary-blue border-primary-blue text-white shadow-sm' 
                    : 'bg-white border-border-light text-text-secondary hover:border-primary-blue/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Month Filter */}
          {months.length > 1 && (
            <select
              value={activeMonth}
              onChange={(e) => setActiveMonth(e.target.value)}
              className="px-3 py-1.5 bg-white border border-border-light rounded-lg font-sans text-[13px] text-text-secondary outline-none focus:border-primary-blue transition-colors min-w-[140px]"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          )}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={DatabaseIcon} title="No gallery items" message="Upload your first photo or video." action={<Button onClick={() => navigate('/admin/gallery/new')}>Upload</Button>} />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-1 md:gap-2">
            {currentItems.map((item) => {
              const isVid = item.image?.match(/\.(mp4|webm|mov|mkv)/i);
              return (
                <div key={item._id} className="relative group rounded-none overflow-hidden border border-border-light/30 aspect-square bg-slate-50">
                  {isVid ? (
                    <video src={`${item.image}${item.image.includes('?') ? '&' : '?'}tr=f-mp4`} className="w-full h-full object-cover" preload="metadata" />
                  ) : (
                    <img src={`${item.image}${item.image.includes('?') ? '&' : '?'}tr=f-auto,w-auto`} alt={item.title || ''} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button onClick={() => navigate(`/admin/gallery/${item._id}/edit`)} className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"><Edit2 className="w-4 h-4 text-text-dark" /></button>
                    <button onClick={() => setDeleteTarget(item)} className="p-2 bg-red-500 rounded-full shadow-md hover:bg-red-600"><Trash2 className="w-4 h-4 text-white" /></button>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8 flex-wrap pt-4">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center p-2 rounded-lg border border-border-light bg-white text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1.5 flex-wrap justify-center">
                {[...Array(totalPages)].map((_, idx) => {
                  const p = idx + 1;
                  if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                    return (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg font-sans text-sm font-semibold transition-colors ${
                          currentPage === p
                            ? 'bg-primary-blue text-white shadow-sm'
                            : 'bg-white border border-border-light text-text-secondary hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  }
                  if (p === currentPage - 2 || p === currentPage + 2) {
                    return <span key={p} className="text-text-secondary px-1 tracking-widest">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center p-2 rounded-lg border border-border-light bg-white text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                aria-label="Next Page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
      <ConfirmDialog isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} title="Delete Item" message="Delete this gallery item?" />
    </div>
  );
}
