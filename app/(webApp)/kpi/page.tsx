"use client";
import React, { useState } from "react";
import CrudView from "@/components/shared/CrudView";
import { useRouter } from "next/navigation";







const KpiPage = () => {
 const router = useRouter();
 const onAdd = ()=>{
  router.push("/kpi/add");
 }

  return (
    <CrudView onAdd={onAdd}></CrudView>
  );
};

export default KpiPage;
