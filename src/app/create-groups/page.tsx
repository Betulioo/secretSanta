import React from "react"
import GroupCreationForm from './../../components/ui/GroupCreationForm';
import MenuPrincipal from "@/components/Layout/MenuPrincipal";

const Login:  React.FC = () => {
    return (
        <>
         <MenuPrincipal></MenuPrincipal>
         <GroupCreationForm></GroupCreationForm>
        </>
       
       
    )
}
export default Login