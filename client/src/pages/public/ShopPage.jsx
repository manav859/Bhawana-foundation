import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, SlidersHorizontal, Grid3X3, List, ShoppingCart,
  Heart, Star, ChevronDown, X, Loader2, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { shopService } from '@/features/api/services/shop.service.js';
import { useCart } from '@/features/cart/CartContext.jsx';

export function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [addedId, setAddedId] = useState(null);

  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    sort: 'newest',
    search: '',
    page: 1,
  });
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    shopService.getCategories().then((res) => setCategories(res.data.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timeout);
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = { sort: filters.sort, page: filters.page, limit: 12 };
      if (filters.category) params.category = filters.category;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.inStock) params.inStock = 'true';
      if (filters.search) params.search = filters.search;

      const res = await shopService.getProducts(params);
      setProducts(res.data.data || []);
      setMeta(res.data.meta || { total: 0, totalPages: 1 });
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ category: '', minPrice: '', maxPrice: '', inStock: false, sort: 'newest', search: '', page: 1 });
  };

  const activeFilterCount = [filters.category, filters.minPrice, filters.maxPrice, filters.inStock].filter(Boolean).length;

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-warm-orange/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <p className="text-primary-blue/80 text-sm font-semibold tracking-widest uppercase mb-4">
            Shop with Purpose
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Art Made with <span className="text-transparent bg-clip-text bg-gradient-to-r from-warm-orange to-primary-blue">Love & Hope</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto opacity-80">
            Every product in our marketplace is crafted by talented children.
            Your purchase directly supports their education and creative growth.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-light bg-white focus:outline-none focus:ring-2 focus:ring-primary-blue/20 text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${showFilters ? 'bg-primary-blue text-white border-primary-blue' : 'bg-white border-border-light text-text-dark hover:border-primary-blue'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-warm-orange text-white text-xs flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 rounded-xl border border-border-light bg-white text-sm font-medium text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-blue/20 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            </div>

            {/* View toggle */}
            <div className="hidden sm:flex items-center border border-border-light rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary-blue text-white' : 'bg-white text-text-muted hover:text-text-dark'} transition-colors`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-primary-blue text-white' : 'bg-white text-text-muted hover:text-text-dark'} transition-colors`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <span className="text-sm text-text-muted">
              {meta.total} product{meta.total !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-5 bg-white rounded-2xl border border-border-light shadow-sm animate-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text-dark">Filter Products</h3>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-sm text-primary-blue hover:underline">
                  Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-light bg-bg-light text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              {/* Price range */}
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Min Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-light bg-bg-light text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-text-secondary mb-1 block">Max Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-light bg-bg-light text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue/20"
                  placeholder="Any"
                />
              </div>
              {/* In stock */}
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => updateFilter('inStock', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue"
                  />
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary-blue animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-dark">No products found</h3>
            <p className="text-text-secondary mt-2">Try adjusting your filters or search query.</p>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="mt-4 px-6 py-2 bg-primary-blue text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
              {products.map((product) => (
                viewMode === 'grid' ? (
                  <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} addedId={addedId} />
                ) : (
                  <ProductListItem key={product._id} product={product} onAddToCart={handleAddToCart} addedId={addedId} />
                )
              ))}
            </div>

            {/* Pagination */}
            {meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}
                  disabled={filters.page <= 1}
                  className="p-2 rounded-lg border border-border-light hover:bg-bg-light disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                {Array.from({ length: meta.totalPages }, (_, i) => i + 1).slice(
                  Math.max(0, filters.page - 3),
                  Math.min(meta.totalPages, filters.page + 2),
                ).map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilters((prev) => ({ ...prev, page: p }))}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${p === filters.page ? 'bg-primary-blue text-white' : 'border border-border-light hover:bg-bg-light text-text-dark'}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}
                  disabled={filters.page >= meta.totalPages}
                  className="p-2 rounded-lg border border-border-light hover:bg-bg-light disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Impact Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary-blue/5 via-warm-orange/5 to-primary-blue/5 rounded-3xl p-10 text-center border border-primary-blue/10">
          <h3 className="font-display text-2xl font-bold text-text-dark mb-3">
            Every Purchase Creates Impact 🌟
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
            100% of the revenue from our marketplace goes directly to supporting
            children's education, creative workshops, and community development programs.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Product Card (Grid View) ─── */
function ProductCard({ product, onAddToCart, addedId }) {
  const isOutOfStock = product.stock <= 0 && !product.isDonationOnly;
  const isAdded = addedId === product._id;

  return (
    <div className="group bg-white rounded-2xl border border-border-light overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <Link to={`/shop/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <ShoppingCart className="w-12 h-12" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="px-2.5 py-1 bg-warm-orange text-white text-xs font-bold rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" /> Featured
            </span>
          )}
          {isOutOfStock && (
            <span className="px-2.5 py-1 bg-gray-800 text-white text-xs font-bold rounded-full">Sold Out</span>
          )}
          {product.isDonationOnly && (
            <span className="px-2.5 py-1 bg-success-green text-white text-xs font-bold rounded-full">Donate</span>
          )}
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="px-2.5 py-1 bg-coral-red text-white text-xs font-bold rounded-full">
              -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        {product.category && (
          <p className="text-xs font-medium text-primary-blue uppercase tracking-wider mb-1">
            {product.category.name || product.category}
          </p>
        )}
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-text-dark line-clamp-2 hover:text-primary-blue transition-colors text-[15px]">
            {product.title}
          </h3>
        </Link>

        {product.childStory?.name && (
          <p className="text-xs text-text-muted mt-1.5 italic">
            Created by {product.childStory.name}{product.childStory.age ? `, age ${product.childStory.age}` : ''}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-text-dark">₹{product.price.toLocaleString()}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-text-muted line-through">₹{product.compareAtPrice.toLocaleString()}</span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              isAdded
                ? 'bg-success-green text-white'
                : isOutOfStock
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-primary-blue/10 text-primary-blue hover:bg-primary-blue hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Product List Item (List View) ─── */
function ProductListItem({ product, onAddToCart, addedId }) {
  const isOutOfStock = product.stock <= 0 && !product.isDonationOnly;
  const isAdded = addedId === product._id;

  return (
    <div className="flex gap-4 bg-white rounded-2xl border border-border-light p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <Link to={`/shop/${product.slug}`} className="flex-shrink-0">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.title} className="w-28 h-28 rounded-xl object-cover" loading="lazy" />
        ) : (
          <div className="w-28 h-28 rounded-xl bg-gray-100 flex items-center justify-center text-gray-300">
            <ShoppingCart className="w-8 h-8" />
          </div>
        )}
      </Link>
      <div className="flex-1 min-w-0">
        {product.category && (
          <p className="text-xs font-medium text-primary-blue uppercase tracking-wider mb-0.5">
            {product.category.name || product.category}
          </p>
        )}
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-text-dark hover:text-primary-blue transition-colors">{product.title}</h3>
        </Link>
        {product.shortDescription && (
          <p className="text-sm text-text-secondary line-clamp-2 mt-1">{product.shortDescription}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-text-dark">₹{product.price.toLocaleString()}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-text-muted line-through">₹{product.compareAtPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              isAdded ? 'bg-success-green text-white' : isOutOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-blue text-white hover:bg-blue-700'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? 'Added!' : isOutOfStock ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
