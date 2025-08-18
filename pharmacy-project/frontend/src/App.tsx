import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProductTable } from './components/ProductTable';
import { SalesForm } from './components/SalesForm';
import { SettingsPage } from './pages/SettingsPage';
import { EmployeesPage } from './pages/EmployeesPage';
import { ProductsPage } from './pages/ProductsPage';
import { InventoryManagementPage } from './pages/InventoryManagementPage';
import { AnalysisPage } from './pages/ReportsPage';
import { OwnerPage } from './pages/OwnerPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/sales" element={<SalesForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/items" element={<ProductsPage />} />
          <Route path="/inventory" element={<InventoryManagementPage />} />
          <Route path="/reports" element={<AnalysisPage />} />
          <Route path="/owner" element={<OwnerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
