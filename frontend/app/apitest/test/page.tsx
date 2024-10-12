"use client"

import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  
interface Medicines{
    pm_id : number;
    Med_name : string;
    medicines: {
        medicine_description: number;
        medicine_price: number;
        medicine_stock: number;
    };
    pharmacies: {
        pharma_name: string;
    };
}
export default function Test() {
    const { register, formState : {errors}, watch } = useForm();
    const [MedicineData, setMedicineData] = useState<Medicines[]>([]);

    var toBeSearched = watch("Name"); 

    useEffect(()=>{
        (async ()=>{
            try {
                const RResponse = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/med/show-med-by-name/${toBeSearched}`, {withCredentials: true});
                setMedicineData(RResponse.data);
            } catch (error) {
                console.error("Error is :: ", error);
                setMedicineData([]);
            }
        })()
    },[toBeSearched]);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl text-red-600 font-bold">API Test</h1><br/>
            <input 
                type="text"
                placeholder="Search for"
                {...register('Name', {
                    required: "Field can't be empty",
                    minLength: {value: 2, message: "minimum input length is 2 characters."}
                })}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            /><br/>
            {errors.Name && typeof errors.Name.message === "string" && (
                <span className="text-red-700 text-sm font-bold">{errors.Name.message}</span>
            )}

            {/* Viewing the Data */}

            {MedicineData.length === 0 ? (
                    <h1>No data</h1>
                ) : (
                    <Table>
                    <TableCaption>A list of medicines from all pharmacies.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Pharmacy Name</TableHead>
                        <TableHead>Pharmacy ID</TableHead>
                        <TableHead>Medicine Name</TableHead>
                        <TableHead>Medicine Price</TableHead>
                        <TableHead>Medicine Stock</TableHead>
                        <TableHead className="text-right">Medicine Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {MedicineData.map((data, key) => (
                        <TableRow key={key}>
                            <TableCell className="font-medium">{data.pharmacies.pharma_name}</TableCell>
                            <TableCell>{data.pm_id}</TableCell>
                            <TableCell>{data.Med_name}</TableCell>
                            <TableCell>{data.medicines.medicine_price}</TableCell>
                            <TableCell>{data.medicines.medicine_stock}</TableCell>
                            <TableCell className="text-right">{data.medicines.medicine_description}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                )}
       
        </div>
    );
}