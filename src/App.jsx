import * as React from "react"; // นำเข้าโมดูลทั้งหมดที่ต้องการจาก React, ให้เราสามารถใช้งานฟีเจอร์ต่างๆ ของ React
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/auth/ProtectedRoutes";
import ProtectedRoutesSupper from "./components/auth/ProtectedRoutesSupper";
import Login from "./pages/Login";
import Navbar from "./components/navbar/Navbar";
import Register_user_master_nap from "./pages/Register_user_master_nap";
import Register_user_system_role from "./pages/Register_user_system_role";
import Register_system_detail from "./pages/Register_system_detail";
import Register_update_table from "./pages/Register_update_table";

export default function App() {
  
  return (
    
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Navbar />} />
              <Route path="/register_user_master_nap" element={<Register_user_master_nap />}/>
              <Route path="/register_user_system_role" element={<Register_user_system_role />}/>
              <Route path="/register_system_detail" element={<Register_system_detail />}/>
              <Route path="/register_update_table" element={<Register_update_table />}/>
              {/* <Route path="/env_scrap_record_weight_daily_transaction" element={<Scrap_Record_Weight_Daily_Transaction />}/>
              <Route path="/env_scrap_summary_weight_date_take_off" element={<Scrap_Summary_Weight_Date_Take_Off />}/>
              <Route path="/env_scrap_detail_weight_by_date" element={<Scrap_Deatil_Weight_by_Date />}/>
              <Route path="/env_scrap_prices_list" element={<Scrap_Prices_List />}/>
              <Route path="/env_scrap_company_list" element={<Scrap_Company_List />}/> */}
            </Route>
        </Routes>
  );
}
