import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import { MainLayout } from './Components/Mainlayout';
import { Product } from './Components/Product';
import { ProductType } from './Components/ProductType';
import { Order } from './Components/Order';
import { Addorder } from './Components/AddOrder';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={<MainLayout />} />
          <Route path="/product"
            element={<MainLayout><Product /></MainLayout>} />
            <Route path="/product-type"
            element={<MainLayout><ProductType/></MainLayout>} />
             <Route path="/order"
            element={<MainLayout><Order/></MainLayout>} />
            <Route path="/add-order"
            element={<MainLayout><Addorder/></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
