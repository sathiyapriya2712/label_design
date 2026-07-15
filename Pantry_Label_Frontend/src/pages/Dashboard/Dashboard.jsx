import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import IngredientCard from '../../components/IngredientCard/IngredientCard';
import Loader from '../../components/Loader/Loader';
import useAuth from '../../hooks/useAuth';
import { useProducts } from '../../hooks/useProducts';
import { useDebounce } from '../../hooks/useDebounce';
import { CustomisationContext } from '../../context/CustomisationContext';
import productService from '../../services/productService';
import './Dashboard.css';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Customisation Context
  const { selectedProductIds, toggleProductSelection, clearSelections } = React.useContext(CustomisationContext);

  // Filter States
  const [states, setStates] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 400);

  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

  // Set default state from user profile
  useEffect(() => {
    if (user && user.stateId) {
      setSelectedStateId(user.stateId.toString());
    }
  }, [user]);

  // Fetch initial filters (States & Categories)
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [statesRes, categoriesRes] = await Promise.all([
          productService.getStates(),
          productService.getCategories()
        ]);
        setStates(statesRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        console.error('Failed to fetch dashboard filters:', err);
        setError('Failed to fetch filter options. Please reload page.');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchFilters();
  }, []);

  // Use products hook with state, category, and debounced search params
  const { products, loading: productsLoading } = useProducts(
    selectedStateId,
    selectedCategoryId,
    debouncedSearch
  );

  const handleStateChange = (e) => {
    setSelectedStateId(e.target.value);
    // Clear selections when switching states, since selections must be state-specific
    clearSelections();
  };

  const handleProceed = () => {
    if (selectedProductIds.length === 0) return;
    navigate('/customisation');
  };

  if (initialLoading) {
    return <Loader fullPage={true} message="Loading platform dashboard..." />;
  }

  const selectedStateName = states.find(s => s.id.toString() === selectedStateId)?.name || 'Selected State';

  return (
    <div className="dashboard-page-container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="dashboard-content">
        <div className="dashboard-filters-row">
          <div className="state-selector-wrapper">
            <label htmlFor="dashboard-state-select">Browsing State:</label>
            <select
              id="dashboard-state-select"
              value={selectedStateId}
              onChange={handleStateChange}
              className="state-dropdown"
            >
              <option value="">Select a State</option>
              {states.map(state => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="selections-counter-box">
            Selected: <strong>{selectedProductIds.length}</strong> items
          </div>
        </div>

        {error && <div className="dashboard-error">{error}</div>}

        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />

        <div className="products-grid-section">
          {!selectedStateId ? (
            <div className="dashboard-empty-prompt">
              <h3>Select a home state to start browsing ingredients</h3>
              <p>State-wise ingredients allow us to tailor details accurately.</p>
            </div>
          ) : productsLoading ? (
            <Loader message="Fetching ingredients..." />
          ) : products.length === 0 ? (
            <div className="dashboard-empty-prompt">
              <h3>No ingredients found</h3>
              <p>Try changing your category filters or search term for {selectedStateName}.</p>
            </div>
          ) : (
            <div className="ingredients-grid">
              {products.map(product => (
                <IngredientCard
                  key={product.id}
                  ingredient={product}
                  isChecked={selectedProductIds.includes(product.id)}
                  onToggle={toggleProductSelection}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedProductIds.length > 0 && (
        <div className="dashboard-sticky-dock">
          <div className="dock-container">
            <span>
              You have selected <strong>{selectedProductIds.length}</strong> ingredient label{selectedProductIds.length > 1 ? 's' : ''}.
            </span>
            <button className="dock-proceed-btn" onClick={handleProceed}>
              Customize Appearance & Proceed →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
