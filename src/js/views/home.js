import React from "react";

import "../../styles/home.css";
import {ContactList} from "../component/ContactList.jsx"


export const Home = () => (
	<div className="container mt-4">
		  <h1 class="display-6">Lista de Contactos</h1>
		<ContactList/>
	</div>
   );
